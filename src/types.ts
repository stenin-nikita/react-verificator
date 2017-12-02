
import { ComponentType } from 'react'
import { Items, Messages, Validator } from 'verificator/es'

export interface ComponentDecorator<TOwnProps = {}, TMergedProps = {}> {
    (component: ComponentType<TMergedProps>): ComponentType<TOwnProps>
}

export interface ILocaleOptions {
    attributes?: Items<string>
    messages?: Messages
}

export interface IOptions {
    rules: Items<string|string[]>
    customLocale?: ILocaleOptions
}

export interface IState {
    validator: Validator
}
