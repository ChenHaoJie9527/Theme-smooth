import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ThemeManager } from '../ThemeManager'

describe('ThemeManager', () => {
  let themeManager: ThemeManager
  let documentElement: HTMLElement

  beforeEach(() => {
    // 模拟 document.documentElement
    documentElement = document.createElement('html')
    vi.spyOn(document, 'documentElement', 'get').mockReturnValue(documentElement)
    
    themeManager = new ThemeManager()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with light theme', () => {
    expect(documentElement.classList.contains('light')).toBe(true)
    expect(documentElement.classList.contains('dark')).toBe(false)
  })

  it('should toggle theme from light to dark', () => {
    themeManager.toggleTheme()
    expect(documentElement.classList.contains('dark')).toBe(true)
    expect(documentElement.classList.contains('light')).toBe(false)
  })

  it('should toggle theme from dark to light', () => {
    themeManager.setTheme('dark')
    themeManager.toggleTheme()
    expect(documentElement.classList.contains('light')).toBe(true)
    expect(documentElement.classList.contains('dark')).toBe(false)
  })

  it('should set theme correctly', () => {
    themeManager.setTheme('dark')
    expect(documentElement.classList.contains('dark')).toBe(true)
    expect(documentElement.classList.contains('light')).toBe(false)

    themeManager.setTheme('light')
    expect(documentElement.classList.contains('light')).toBe(true)
    expect(documentElement.classList.contains('dark')).toBe(false)
  })

  it('should set transition duration', () => {
    themeManager.toggleTheme()
    expect(documentElement.style.getPropertyValue('--transition-duration')).toBe('300ms')
  })
})