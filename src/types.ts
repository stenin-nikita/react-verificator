
import { ComponentType } from 'react'
import { Items, Validator, CustomLocale } from 'verificator/es'

export interface ComponentDecorator<TOwnProps = {}, TMergedProps = {}> {
    (component: ComponentType<TMergedProps>): ComponentType<TOwnProps>
}

export interface IOptions {
    rules: Items<string|string[]>
    customLocale?: CustomLocale
}

export interface IState {
    validator: Validator
}
