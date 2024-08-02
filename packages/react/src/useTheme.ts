import { useState, useEffect } from "react"
import { ThemeManager } from "@theme-smooth/core"

export const useTheme = () => {
    const [themeManager] = useState(() => new ThemeManager)
    const [theme, setTheme] = useState(themeManager.getTheme())

    useEffect(() => {
        const handleThemeChange = () => {
            setTheme(themeManager.getTheme());
        };

        themeManager.subscribe(handleThemeChange);

        return () => {
            themeManager.unsubscribe(handleThemeChange);
        };


    }, [themeManager])

    const toggleTheme = () => {
        themeManager.toggleTheme()
    }

    return {
        theme,
        toggleTheme
    }
}