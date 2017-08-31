import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import types from './types'
import { default as Container, ID as portalContainerId } from './Container'

const propTypes = Object.assign({}, types, {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  id: PropTypes.string
})

const defaultProps = {
  timeout: 0
}

class Portal extends React.Component {
  constructor (props) {
    super()
    this.document = this.getWindowDocument()
    this.node = null
    this.portal = null
    this.mountSelector = null
    this.isOpening = false
    this.isOpen = false
    this.isClosing = false
  }

  componentDidMount () {
    this.mountSelector = this.getMountSelector()
    this.openPortal(this.props)
  }

  /* istanbul ignore next */
  componentWillReceiveProps (nextProps) {
    if (this.node && this.props.className !== nextProps.className) {
      this.node.className = nextProps.className
    }

    this.openPortal(nextProps)
  }

  componentWillUnmount () {
    setTimeout(() => {
      this.closePortal(this.props)
    }, this.props.timeout)
  }

  getWindowDocument () {
    return (window.frameElement && window.frameElement.contentDocument) || window.document
  }

  getMountSelector () {
    const { renderTo } = this.props
    // 1. Prioritize renderTo selector
    let mountSelector = renderTo ? this.document.querySelector(renderTo) : false
    // 2. Fallback to <Portal.Container />
    mountSelector = mountSelector || this.document.querySelector(`#${portalContainerId}`)
    // 3. Fallback to document.body
    return mountSelector || this.document.body // fallback
  }

  mountPortal (props) {
    if (this.node) return

    const {
      children,
      className,
      id,
      onOpen
    } = props

    this.node = this.document.createElement('div')
    if (className) {
      this.node.className = className
    }
    if (id) {
      this.node.id = id
    }
    // Render to specified target, instead of document
    this.mountSelector.appendChild(this.node)

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node
    )

    if (onOpen) onOpen(this)

    this.isOpening = false
    this.isOpen = true
  }

  unmountPortal (props) {
    /* istanbul ignore next */
    if (!this.node) return

    const {
      onClose
    } = props

    ReactDOM.unmountComponentAtNode(this.node)
    // Unmount from specified target, instead of document
    this.mountSelector.removeChild(this.node)

    if (onClose) onClose(this)

    this.node = null
    this.portal = null
    this.isClosing = false
    this.isOpen = false
  }

  openPortal (props) {
    const {
      onBeforeOpen
    } = props

    const mountPortal = this.mountPortal.bind(this)

    if (onBeforeOpen) {
      /* istanbul ignore next */
      if (!this.isOpening && !this.isOpen) {
        this.isOpening = true
        onBeforeOpen(() => { mountPortal(props) })
      }
    } else {
      this.isOpening = true
      mountPortal(props)
    }
  }

  closePortal (props) {
    const {
      onBeforeClose
    } = props

    const unmountPortal = this.unmountPortal.bind(this)

    if (onBeforeClose) {
      /* istanbul ignore next */
      if (!this.isClosing) {
        this.isClosing = true
        onBeforeClose(() => { unmountPortal(props) })
      }
    } else {
      this.isClosing = true
      unmountPortal(props)
    }
  }

  render () {
    return null
  }
}

Portal.propTypes = propTypes
Portal.defaultProps = defaultProps
Portal.Container = Container

export default Portal
