import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './Pagination.utils'
import {
  PaginationUI,
  InformationUI,
  NavigationUI,
  RangeUI,
} from './Pagination.css.js'
import Text from '../Text'
import Icon from '../Icon'
import Button from '../Button'

export interface Props {
  className?: string
  onChange: (nextPageNumber: number) => void
  innerRef: (node: HTMLElement) => void
  showNavigation?: boolean
  activePage: number
  totalItems: number
  rangePerPage: number
  subject?: string
  separator?: string
}

export class Pagination extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    onChange: noop,
    showNavigation: true,
    activePage: 1,
    rangePerPage: 50,
    separator: 'of',
    totalItems: 0,
  }

  getNumberOfPages() {
    const { rangePerPage, totalItems } = this.props
    return Math.ceil(totalItems / rangePerPage)
  }

  getCurrentPage() {
    const { activePage } = this.props
    if (activePage < 1) {
      return 1
    }
    return Math.min(this.getNumberOfPages(), Math.round(activePage))
  }

  getStartRange() {
    const { rangePerPage } = this.props
    const page = this.getCurrentPage()
    return page * rangePerPage - rangePerPage + 1
  }

  getEndRange() {
    const { rangePerPage, totalItems } = this.props
    const page = this.getCurrentPage()
    return Math.min(page * rangePerPage, totalItems)
  }

  isNavigationVisible() {
    const { showNavigation } = this.props
    return showNavigation && this.getNumberOfPages() > 1
  }

  handleStartClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(1)
  }

  handlePrevClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(this.getCurrentPage() - 1)
  }

  handleNextClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(this.getCurrentPage() + 1)
  }

  handleEndClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(this.getNumberOfPages())
  }

  renderRange() {
    return (
      <Text>
        <RangeUI>{this.getStartRange()}</RangeUI>
        {` `}-{` `}
        <RangeUI>{this.getEndRange()}</RangeUI>
      </Text>
    )
  }

  renderTotal() {
    const { totalItems, subject } = this.props
    return (
      <Text>
        {totalItems}
        {subject && ` ${subject}`}
      </Text>
    )
  }

  renderNavigation() {
    const currentPage = this.getCurrentPage()
    const isNotFirstPage = currentPage > 1
    const isLastPage = currentPage >= this.getNumberOfPages()

    return (
      <NavigationUI>
        {isNotFirstPage && (
          <Button version={2} onClick={this.handleStartClick}>
            <Icon name="arrow-left-double-large" size="24" center />
          </Button>
        )}
        {isNotFirstPage && (
          <Button version={2} onClick={this.handlePrevClick}>
            <Icon name="arrow-left-single-large" size="24" center />
          </Button>
        )}

        <Button
          version={2}
          disabled={isLastPage}
          onClick={this.handleNextClick}
        >
          <Icon name="arrow-right-single-large" size="24" center />
        </Button>
        <Button version={2} disabled={isLastPage} onClick={this.handleEndClick}>
          <Icon name="arrow-right-double-large" size="24" center />
        </Button>
      </NavigationUI>
    )
  }

  render() {
    const {
      children,
      className,
      innerRef,
      separator,
      showNavigation,
      onChange,
      ...rest
    } = this.props

    const componentClassName = classNames('c-Pagination', className)

    return (
      <PaginationUI
        aria-label="Pagination"
        {...getValidProps(rest)}
        className={componentClassName}
        innerRef={innerRef}
      >
        <InformationUI>
          <Text size={13}>
            {this.renderRange()}
            {` `}
            {separator}
            {` `}
            {this.renderTotal()}
          </Text>
        </InformationUI>
        {this.isNavigationVisible() && this.renderNavigation()}
      </PaginationUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Pagination)
const PropConnectedComponent = propConnect(COMPONENT_KEY)(Pagination)

export default PropConnectedComponent
