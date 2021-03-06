import * as React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import NavLink from '../NavLink'

const wrap = Component => {
  return mount(
    <Router>
      <div>{Component}</div>
    </Router>
  )
}

describe('className', () => {
  test('Has default className', () => {
    const wrapper = wrap(<NavLink />)
    const el = wrapper.find('a')

    expect(el.hasClass('c-NavLink')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = wrap(<NavLink className={customClassName} />)
    const el = wrapper.find('a')

    expect(el.hasClass(customClassName)).toBeTruthy()
  })

  test('Can render a custom active className', () => {
    const customClassName = 'yup'
    const isActive = () => true
    const wrapper = wrap(
      <NavLink isActive={isActive} activeClassName={customClassName} />
    )
    const el = wrapper.find('a')

    expect(el.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = wrap(<NavLink data-cy="blue" />)
    const el = wrapper.find('a')

    expect(el.prop('data-cy')).toBe('blue')
  })

  test('Does not render aria-current when inactive', () => {
    const wrapper = wrap(<NavLink aria-current="blue" isActive={() => false} />)

    expect(wrapper.find('a').prop('aria-current')).toBeFalsy()
  })

  test('Renders aria-current when active', () => {
    const wrapper = wrap(<NavLink aria-current="blue" isActive={() => true} />)

    expect(wrapper.find('a').prop('aria-current')).toBe('blue')
  })
})

describe('Style', () => {
  test('Can render custom styles', () => {
    const wrapper = wrap(<NavLink style={{ background: 'red' }} />)
    const el = wrapper.find('a')

    expect(el.prop('style')).toEqual({ background: 'red' })
  })

  test('Can render custom styles + custom active styles', () => {
    const isActive = () => true
    const wrapper = wrap(
      <NavLink
        isActive={isActive}
        style={{ background: 'red' }}
        activeStyle={{ display: 'flex' }}
      />
    )
    const el = wrapper.find('a')

    expect(el.prop('style')).toEqual({ background: 'red', display: 'flex' })
  })
})

describe('Route', () => {
  test('Passes appropriate props to Route', () => {
    const props = {
      strict: true,
      location: {},
      exact: true,
    }
    const wrapper = wrap(<NavLink {...props} />)
    const el = wrapper.find('Route')

    expect(el.prop('strict')).toBe(props.strict)
    expect(el.prop('location')).toBe(props.location)
    expect(el.prop('exact')).toBe(props.exact)
  })

  test('Parses a to object', () => {
    const props = {
      to: { pathname: '/blue' },
    }
    const wrapper = wrap(<NavLink {...props} />)
    const el = wrapper.find('Route')

    expect(el.prop('path')).toContain('/blue')
  })
})

describe('Link', () => {
  test('Renders a Link', () => {
    const wrapper = wrap(<NavLink />)
    const el = wrapper.find('Link')

    expect(el.length).toBeTruthy()
  })

  test('Can pass an href to Link', () => {
    const wrapper = wrap(<NavLink href="/blue" />)
    const el = wrapper.find('Link')

    expect(el.prop('href')).toBe('/blue')
  })
})
