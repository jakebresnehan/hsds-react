// @flow
import type { StatusDotStatus } from '../StatusDot/types'
import type { AvatarShape, AvatarSize } from './types'
import React, { PureComponent as Component } from 'react'
import { getValidProps } from '@helpscout/react-utils'
import StatusDot from '../StatusDot'
import VisuallyHidden from '../VisuallyHidden'
import { includes } from '../../utilities/arrays'
import { namespaceComponent } from '../../utilities/component'
import { classNames } from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'
import {
  AvatarUI,
  CropUI,
  ImageUI,
  StatusUI,
  TitleUI,
} from './styles/Avatar.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  borderColor?: string,
  className?: string,
  count?: number | string,
  image?: string,
  initials?: string,
  light: boolean,
  name: string,
  onLoad?: () => void,
  onError?: () => void,
  outerBorderColor?: string,
  showStatusBorderColor: boolean,
  shape: AvatarShape,
  size: AvatarSize,
  statusIcon?: string,
  status?: StatusDotStatus,
}

type State = {
  imageLoaded: string,
}

export const IMAGE_STATES = {
  loading: 'loading',
  loaded: 'loaded',
  failed: 'failed',
}

class Avatar extends Component<Props, State> {
  static defaultProps = {
    light: false,
    name: '',
    showStatusBorderColor: false,
    size: 'md',
    shape: 'circle',
  }

  state = {
    // Assume image is loading so that we only re-render on error
    imageLoaded: IMAGE_STATES.loading,
  }

  onImageLoadedError = () => {
    this.setState({
      imageLoaded: IMAGE_STATES.failed,
    })
    this.props.onError && this.props.onError()
  }

  onImageLoadedSuccess = () => {
    this.setState({
      imageLoaded: IMAGE_STATES.loaded,
    })
    this.props.onLoad && this.props.onLoad()
  }

  isImageLoaded = (): boolean => {
    const { image } = this.props
    const { imageLoaded } = this.state

    return !!(image && imageLoaded === IMAGE_STATES.loaded)
  }

  hasImage = (): boolean => {
    const { image } = this.props
    const { imageLoaded } = this.state

    return !!(
      image &&
      includes([IMAGE_STATES.loading, IMAGE_STATES.loaded], imageLoaded)
    )
  }

  getShapeClassNames = (): string => {
    const { shape, size } = this.props

    return classNames(shape && `is-${shape}`, size && `is-${size}`)
  }

  getCropStyles = (): ?Object => {
    const { borderColor, outerBorderColor } = this.props

    let styles =
      borderColor || outerBorderColor
        ? {
            border: borderColor ? '2px solid' : undefined,
            borderColor,
            boxShadow: outerBorderColor
              ? `0 0 0 2px ${outerBorderColor}`
              : undefined,
          }
        : {}

    if (this.hasImage()) {
      styles = {
        ...styles,
        backgroundColor: 'transparent',
      }
    }

    styles = Object.keys(styles).length ? styles : null

    return styles
  }

  getCropMarkup = () => {
    const contentMarkup = this.getContentMarkup()
    const styles = this.getCropStyles()

    const componentClassName = classNames(
      'c-Avatar__crop',
      this.getShapeClassNames()
    )

    return (
      <CropUI className={componentClassName} style={styles}>
        {contentMarkup}
      </CropUI>
    )
  }

  getStatusMarkup = () => {
    const {
      borderColor,
      showStatusBorderColor,
      size,
      statusIcon,
      status,
    } = this.props

    const componentClassName = classNames(
      'c-Avatar__status',
      this.getShapeClassNames()
    )

    return (
      status && (
        <StatusUI className={componentClassName}>
          <StatusDot
            icon={statusIcon}
            outerBorderColor={showStatusBorderColor ? borderColor : undefined}
            size={size === 'lg' ? 'md' : 'sm'}
            status={status}
          />
        </StatusUI>
      )
    )
  }

  getText = () => {
    const { count, initials, name } = this.props

    return count || initials || nameToInitials(name)
  }

  getTitleMarkup = () => {
    const { light } = this.props

    const componentClassName = classNames(
      'c-Avatar__title',
      light && 'is-light'
    )
    const text = this.getText()

    return <TitleUI className={componentClassName}>{text}</TitleUI>
  }

  getContentMarkup = () => {
    const { image, name } = this.props

    const isImageLoaded = this.isImageLoaded()

    const imageStyle =
      image && isImageLoaded ? { backgroundImage: `url('${image}')` } : null

    const titleMarkup = this.getTitleMarkup()
    const contentMarkup = (
      <ImageUI className="c-Avatar__image" style={imageStyle}>
        <div className="c-Avatar__name">
          <VisuallyHidden>{name}</VisuallyHidden>
          <img
            alt={name}
            onError={this.onImageLoadedError}
            onLoad={this.onImageLoadedSuccess}
            src={image}
            style={{ display: 'none' }}
          />
        </div>
      </ImageUI>
    )

    return this.hasImage() ? contentMarkup : titleMarkup
  }

  render() {
    const {
      borderColor,
      className,
      count,
      image,
      name,
      light,
      initials,
      onLoad,
      outerBorderColor,
      showStatusBorderColor,
      size,
      shape,
      status,
      statusIcon,
      ...rest
    } = this.props

    const hasImage = this.hasImage()

    const componentClassName = classNames(
      'c-Avatar',
      borderColor && 'has-borderColor',
      hasImage && 'has-image',
      statusIcon && 'has-statusIcon',
      light && 'is-light',
      outerBorderColor && 'has-outerBorderColor',
      status && `is-${status}`,
      this.getShapeClassNames(),
      className
    )

    const cropMarkup = this.getCropMarkup()
    const statusMarkup = this.getStatusMarkup()

    return (
      <AvatarUI
        {...getValidProps(rest)}
        className={componentClassName}
        title={name}
      >
        {cropMarkup}
        {statusMarkup}
      </AvatarUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Avatar)

export default Avatar