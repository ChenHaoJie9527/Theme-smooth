export class ThemeManager {
    private currentTheme: 'light' | 'dark' = 'light'
    private transitionDuration: number = 300
    private static readonly THEME_STORAGE_KEY = 'theme-preference'

    constructor() {
        this.currentTheme = this.getSavedTheme() || 'light'
        this.applyTheme()
    }

    applyTheme() {
        const root = document.documentElement
        root.style.setProperty('--transition-duration', `${this.transitionDuration}ms`)
        root.classList.remove('light', 'dark')
        root.classList.add(this.currentTheme)
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
        this.saveTheme()
        this.applyTheme()
    }

    setTheme(theme: 'light' | 'dark') {
        this.currentTheme = theme
        this.saveTheme()
        this.applyTheme()
    }

    getTheme() {
        return this.currentTheme
    }

    setTransitionDuration(duration: number) {
        this.transitionDuration = duration
        this.applyTheme()
    }

    private saveTheme() {
        localStorage.setItem(ThemeManager.THEME_STORAGE_KEY, this.currentTheme)
    }

    private getSavedTheme() {
        const savedTheme = localStorage.getItem(ThemeManager.THEME_STORAGE_KEY) as 'light' | 'dark' | null
        return savedTheme
    }
}