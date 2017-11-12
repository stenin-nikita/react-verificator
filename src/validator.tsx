import React, { Component, ComponentType } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { Validator, Collection } from 'verificator/es'
import { ComponentDecorator } from './types'

const defaultMapToProps = (props: any) => props

export default function validator(rules: Collection<string|string[]>, mapToProps: Function = defaultMapToProps): ComponentDecorator {
    const validator = new Validator({}, rules)

    function wrapWithValidatorComponent(WrappedComponent: ComponentType<any>): ComponentType {
        const displayName = `Validator(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

        class Validator extends Component {
            static displayName = displayName

            static WrappedComponent = WrappedComponent

            constructor(props: any) {
                super(props)

                this.state = {
                    validating: false,
                }
            }

            calculateMapToProps() {
                const result = {
                    validator: validator,
                    ownProps: this.props,
                }

                if (typeof mapToProps === 'function') {
                    return mapToProps(result)
                }

                return {
                    validator: defaultMapToProps(validator)
                }
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