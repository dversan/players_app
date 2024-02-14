import React from 'react'
import renderer from 'react-test-renderer'
import App from '../src/App'
import { describe, expect, test } from '@jest/globals'

describe('App is rendered', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
