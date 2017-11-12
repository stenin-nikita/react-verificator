
import { ComponentType } from 'react'

export interface ComponentDecorator<TOwnProps = {}, TMergedProps = {}> {
    (component: ComponentType<TMergedProps>): ComponentType<TOwnProps>
}
