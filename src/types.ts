
import { ComponentType } from 'react'
import { Collection, Messages } from 'verificator/es';

export interface ComponentDecorator<TOwnProps = {}, TMergedProps = {}> {
    (component: ComponentType<TMergedProps>): ComponentType<TOwnProps>
}

export interface ValidatorOptions {
    rules: Collection<string|string[]>
    attributes?: Collection<string>
    messages?: Messages
}