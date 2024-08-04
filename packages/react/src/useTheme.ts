import { useState, useEffect, useCallback } from "react"
import { ThemeManager } from "@theme-smooth/core"
export const useTheme = () => {
    const [themeManager] = useState(() => new ThemeManager())
    const [theme, setTheme] = useState(themeManager.getTheme())

    useEffect(() => {
        const handleThemeChange = () => {
            const __theme = themeManager.getTheme()
            setTheme(__theme);
        };

        themeManager.subscribe(handleThemeChange);

        return () => {
            themeManager.unsubscribe(handleThemeChange);
        };


    }, [themeManager])

    const toggleTheme = useCallback(() => {
        themeManager.toggleTheme()
        setTheme(themeManager.getTheme())
    }, [themeManager])

    const setTransitionDuration = useCallback((duration: number) => {
        themeManager.setTransitionDuration(duration)
    }, [themeManager])

    const setThemeManually = useCallback((newTheme: 'light' | 'dark') => {
        themeManager.setTheme(newTheme)
        setTheme(newTheme)
    }, [themeManager])

    const getTheme = () => {
        return themeManager.getTheme()
    }

    return {
        theme,
        toggleTheme,
        setTransitionDuration,
        setTheme: setThemeManually,
        getTheme
    }
}