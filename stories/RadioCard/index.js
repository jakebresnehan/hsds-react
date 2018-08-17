import React from 'react'
import { storiesOf } from '@storybook/react'
import { ChoiceGroup, RadioCard } from '../../src/index.js'

const stories = storiesOf('RadioCard', module)

const onChange = value => {
  // console.log(value)
}

stories.add('default', () => (
  <ChoiceGroup align="horizontal" onChange={onChange} value="chat">
    <RadioCard icon="fab-chat" value="chat" />
    <RadioCard icon="fab-antenna" value="antenna" />
    <RadioCard icon="fab-buoy" value="buoy" />
    <RadioCard icon="fab-search" value="search" />
    <RadioCard icon="fab-question" value="question" />
  </ChoiceGroup>
))
