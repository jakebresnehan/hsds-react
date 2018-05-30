import { getTextAreaLineCurrent, getTextAreaLineTotal } from '../helpers'

describe('getTextAreaLineCurrent', () => {
  test('Retrieves the correct line number for a single line', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen pomegranate'
    expect(getTextAreaLineCurrent(textarea)).toBe(1)
  })

  test('Retrieves the correct line number for a multiple lines', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen\npomegranate'

    textarea.selectionStart = 10
    expect(getTextAreaLineCurrent(textarea)).toBe(2)

    textarea.selectionStart = 1
    expect(getTextAreaLineCurrent(textarea)).toBe(1)
  })

  test('Returns 0 if textarea is not defined', () => {
    expect(getTextAreaLineCurrent()).toBe(0)
  })
})

describe('getTextAreaLineTotal', () => {
  test('Retrieves the correct total line number for a single line', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen pomegranate'
    expect(getTextAreaLineTotal(textarea)).toBe(1)
  })

  test('Retrieves the correct total line number for a multiple lines', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen\npomegranate'

    expect(getTextAreaLineTotal(textarea)).toBe(2)
  })

  test('Retrieves the correct total line number for a multiple lines, regardless of cursor position', () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'stephen\npomegranate'
    textarea.selectionStart = 1

    expect(getTextAreaLineTotal(textarea)).toBe(2)
  })

  test('Returns 0 if textarea is not defined', () => {
    expect(getTextAreaLineTotal()).toBe(0)
  })
})
