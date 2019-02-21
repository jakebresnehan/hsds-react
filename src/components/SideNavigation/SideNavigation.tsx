import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'

import PropProvider from '../PropProvider'
import Header from './Header'
import Item from './Item'
import Section from './Section'
import Footer from './Footer'
import Button from './Button'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { SideNavigationUI } from './SideNavigation.css'

export interface Props {
  className?: string
  width?: number
  collapsed?: boolean
  floatingMenu?: boolean
}

export class SideNavigation extends React.PureComponent<Props> {
  static defaultProps = {}

  static Header = Header
  static Item = Item
  static Section = Section
  static Footer = Footer
  static Button = Button

  getProviderValue() {
    const { collapsed, floatingMenu } = this.props
    return {
      [COMPONENT_KEY.Item]: {
        collapsed,
        floatingMenu,
      },
      [COMPONENT_KEY.Section]: {
        collapsed,
      },
      [COMPONENT_KEY.Header]: {
        collapsed,
      },
      [COMPONENT_KEY.Footer]: {
        collapsed,
        floatingMenu,
      },
      [COMPONENT_KEY.Button]: {
        floatingMenu,
      },
    }
  }

  render() {
    const {
      children,
      className,
      width,
      collapsed,
      floatingMenu,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-SideNavigation',
      collapsed ? 'is-collapsed' : '',
      floatingMenu ? 'is-floating' : '',
      className
    )

    let styles: object = {}
    if (width) {
      styles = {
        width: `${width}px`,
      }
    }

    return (
      <PropProvider value={this.getProviderValue()}>
        <SideNavigationUI
          aria-label="SideNavigation"
          {...getValidProps(rest)}
          className={componentClassName}
          style={styles}
        >
          {children}
        </SideNavigationUI>
      </PropProvider>
    )
  }
}

namespaceComponent(COMPONENT_KEY.SideNavigation)(SideNavigation)

export default SideNavigation
