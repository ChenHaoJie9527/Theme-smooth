export class ThemeManager {
    private currentTheme: 'light' | 'dark' = 'light'
    private transitionDuration: number = 300

    constructor() {
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
        this.applyTheme()
    }

    setTheme(theme: 'light' | 'dark') {
        this.currentTheme = theme
        this.applyTheme()
    }

    getTheme() {
        return this.currentTheme
    }

    setTransitionDuration(duration: number) {
        this.transitionDuration = duration
    }
}