import { describe, expect, it, vi } from "vitest"
import { renderHook, act } from "@testing-library/react-hooks"
import { useTheme } from "../src/useTheme"
import { ThemeManager } from "@theme-smooth/core"

vi.mock("@theme-smooth/core", () => {
    ThemeManager: vi.fn(() => ({
        getTheme: vi.fn(() => 'light'),
        toggleTheme: vi.fn(),
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
    }))
})

describe("should return the initial theme", () => {
    it("should render theme", () => {
        const { result } = renderHook(() => useTheme())
        expect(result.current.theme).toBe('light')
    })
})