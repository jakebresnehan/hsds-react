// @flow
import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ArrowUI } from './Arrow.css.js'
import { noop } from '../../utilities/other'

type Props = {
  className?: string,
  children?: any,
  placement: string,
  offset: number,
  size: number,
  showArrow: boolean,
  theme: Object | string,
  zIndex: number,
}

export class Arrow extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    offset: 0,
    placement: 'top',
    showArrow: true,
    size: 5,
    style: {},
    zIndex: 999,
  }

  setArrowNodeRef = node => this.props.innerRef(node)

  render() {
    const {
      className,
      children,
      color,
      innerRef,
      placement,
      offset,
      showArrow,
      size,
      style,
      theme,
      zIndex,
      ...rest
    } = this.props

    const position = getPosition(placement)

    const positionClassName = classNames(
      placement && `is-${getPlacement(placement)}`,
      position && `is-${position}`
    )

    const wrapperClassName = classNames(
      'c-PopPopperArrowWrapper',
      !showArrow && 'is-hidden',
      positionClassName
    )

    const componentClassName = classNames(
      'c-PopArrow',
      positionClassName,
      className
    )

    const ghostClassName = classNames(
      'c-PopArrow',
      'c-PopArrowGhost',
      'is-ghost',
      positionClassName,
      className
    )

    const componentStyle = { zIndex }
    const ghostComponentStyle = { zIndex: zIndex + 3 }

    return (
      <ArrowUI
        className={wrapperClassName}
        innerRef={this.setArrowNodeRef}
        data-x-placement={placement}
        color={color}
        size={size}
        style={style}
      >
        <div
          {...getValidProps(rest)}
          className={componentClassName}
          style={componentStyle}
        />
        <div
          {...getValidProps(rest)}
          className={ghostClassName}
          style={ghostComponentStyle}
        />
      </ArrowUI>
    )
  }
}

/**
 * Gets the top|right|bottom|left label from a Popper placement
 *
 * @param   {string} placement
 * @returns {string}
 */
export const getPlacement = (placement: string) => {
  if (!placement) return ''

  return placement.split('-')[0]
}

/**
 * Gets the start|end label from a Popper placement
 *
 * @param   {string} placement
 * @returns {string}
 */
export const getPosition = (placement: string) => {
  if (!placement || placement.indexOf('-') < 0) return ''

  return placement.split('-')[1]
}

export default Arrow
