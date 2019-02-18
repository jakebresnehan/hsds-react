import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'

import Header from './Header'
import Item from './Item'
import Section from './Section'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { SideNavigationUI } from './SideNavigation.css'

export interface Props {
  className?: string
}

export class SideNavigation extends React.PureComponent<Props> {
  static defaultProps = {}

  static Header = Header
  static Item = Item
  static Section = Section

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-SideNavigation', className)

    return (
      <SideNavigationUI
        aria-label="SideNavigation"
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </SideNavigationUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.SideNavigation)(SideNavigation)

export default SideNavigation
