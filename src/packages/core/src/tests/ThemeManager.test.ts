import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest'
import { ThemeManager } from '../ThemeManager'

describe('ThemeManager', () => {
  let themeManager: ThemeManager
  let documentElement: HTMLElement
  let localStorageMock: { getItem: Mock, setItem: Mock }

  beforeEach(() => {
    // 模拟 document.documentElement
    documentElement = document.createElement('html')
    vi.spyOn(document, 'documentElement', 'get').mockReturnValue(documentElement)

    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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

  it('should not change theme when setting to current theme', () => {
    themeManager.setTheme('dark')
    expect(documentElement.classList.contains('dark')).toBe(true)


    themeManager.setTheme('dark')
    expect(documentElement.classList.contains('dark')).toBe(true)
    expect(documentElement.classList.contains('light')).toBe(false)
  })

  it('should toggle theme correctly when called multiple times', () => {
    expect(documentElement.classList.contains('light')).toBe(true)

    themeManager.toggleTheme()
    expect(documentElement.classList.contains('dark')).toBe(true)

    themeManager.toggleTheme()
    expect(documentElement.classList.contains('light')).toBe(true)

    themeManager.toggleTheme()
    expect(documentElement.classList.contains('dark')).toBe(true)
  })

  it('should return current theme', () => {
    expect(themeManager.getTheme()).toBe('light')
    themeManager.setTheme('dark')
    expect(themeManager.getTheme()).toBe('dark')
  })

  it('should set custom transition duration', () => {
    themeManager.setTransitionDuration(500)
    themeManager.toggleTheme()
    expect(documentElement.style.getPropertyValue('--transition-duration')).toBe('500ms')
  })

  it('should persist theme across page reloads', () => {
    // 模拟首次加载，没有保存的主题
    localStorageMock.getItem.mockReturnValue(null)
    themeManager = new ThemeManager()
    expect(themeManager.getTheme()).toBe('light')

    // 切换主题并验证是否保存
    themeManager.toggleTheme()
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme-preference', 'dark')
    expect(documentElement.classList.contains('dark')).toBe(true)

    // 模拟页面重新加载，有保存的主题
    localStorageMock.getItem.mockReturnValue('dark')
    themeManager = new ThemeManager()
    expect(themeManager.getTheme()).toBe('dark')
    expect(documentElement.classList.contains('dark')).toBe(true)
  })

  it('should apply saved theme on initialization', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    themeManager = new ThemeManager()
    expect(themeManager.getTheme()).toBe('dark')
    expect(documentElement.classList.contains('dark')).toBe(true)
  })
})