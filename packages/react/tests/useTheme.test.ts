import { renderHook } from '@testing-library/react'
import { act } from "react"
import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from '../src/useTheme'
import { ThemeManager } from '@theme-smooth/core'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('should initialize with the default theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('should toggle theme', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  })

  it('should set a specific theme', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true);

  })

  it('should persist theme preference', () => {
    const { result, rerender } = renderHook(() => useTheme());
    act(() => {
      result.current.setTheme('dark');
    });

    expect(localStorageMock.getItem('theme-preference')).toBe('dark');
    // 模拟页面加载
    rerender()
    expect(result.current.theme).toBe('dark');
  })

  it('should set transition duration', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.setTransitionDuration(500);
    });
    expect(document.documentElement.style.getPropertyValue('--transition-duration')).toBe('500ms');
  });

});