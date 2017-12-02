import React, { Component, ComponentType } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { Validator } from 'verificator/es'
import { ComponentDecorator, IOptions, IState } from './types'

const defaultMapToProps = ({ validator }: any) => ({
    validator
})

export default function validator(options: IOptions, mapToProps: Function = defaultMapToProps): ComponentDecorator<any, any> {
    const validator = new Validator({}, options.rules, options.customLocale)

    if (typeof mapToProps !== 'function') {
        mapToProps = defaultMapToProps
    }

    function wrapWithValidatorComponent(WrappedComponent: ComponentType<any>): ComponentType {
        const displayName = `Validator(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

        class Validator extends Component<any, IState> {
            protected unsubscribe: Function

            static displayName = displayName

            static WrappedComponent = WrappedComponent

            constructor(props: any) {
                super(props)

                this.state = {
                    validator: validator
                }
            }

            componentWillMount() {
                this.unsubscribe = this.state.validator.subscribe(() => {
                    this.setState({
                        validator: this.state.validator,
                    })
                })
            }
            
            componentWillUnmount() {
                this.unsubscribe()
            }

            calculateMapToProps() {
                const result = {
                    validator,
                    ownProps: this.props,
                }

                return mapToProps(result)
            }

            render() {
                const { props } = this

                const validatorProps = this.calculateMapToProps()
                const mergedPropsAndValidator = {
                    ...props,
                    ...validatorProps,
                }

                return (
                    <WrappedComponent {...mergedPropsAndValidator}/>
                )
            }
        }

        return hoistNonReactStatics(Validator, WrappedComponent)
    }

    return wrapWithValidatorComponent
}