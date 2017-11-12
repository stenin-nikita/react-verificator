import React, { Component, ComponentType } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { Validator } from 'verificator/es'
import { ComponentDecorator, ValidatorOptions } from './types'

const defaultMapToProps = (props: any) => props

export default function validator(options: ValidatorOptions, mapToProps: Function = defaultMapToProps): ComponentDecorator<any, any> {
    const validator = new Validator({}, options.rules, options.messages || {}, options.attributes || {})

    function wrapWithValidatorComponent(WrappedComponent: ComponentType<any>): ComponentType {
        const displayName = `Validator(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

        class Validator extends Component<any, any> {
            static displayName = displayName

            static WrappedComponent = WrappedComponent

            constructor(props: any) {
                super(props)

                this.state = {
                    validating: false,
                    validator: validator,
                }
            }

            calculateMapToProps(validator: Validator) {
                const result = {
                    validator,
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

                const validatorProps = this.calculateMapToProps(this.state.validator)
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