export type ThemeTransitionEffect = 'none' | 'fade' | 'slide' | 'flip'
export type Theme = 'light' | 'dark'
export interface ThemeManagerOPtions {
    initialTheme?: 'light' | 'dark'
    transitionEffect?: ThemeTransitionEffect
    transitionDuration?: number
}

export class ThemeManager {
    private currentTheme: 'light' | 'dark' = 'light'
    private transitionDuration: number = 300
    private static readonly THEME_STORAGE_KEY = 'theme-smooth-preference'
    private transitionEffect: ThemeTransitionEffect;

    constructor(options: ThemeManagerOPtions = {}) {
        this.currentTheme = options.initialTheme || this.getSavedTheme() || 'light'
        this.transitionEffect = options.transitionEffect || 'none'
        this.transitionDuration = options.transitionDuration || 300
        this.applyTheme()
    }

    applyTheme() {
        const root = document.documentElement
        root.style.setProperty('--transition-duration', `${this.transitionDuration}ms`)
        root.setAttribute('data-theme', this.currentTheme)
        root.setAttribute('data-transition-effect', this.transitionEffect)
        root.classList.remove('light', 'dark')
        root.classList.add(this.currentTheme)

        window.dispatchEvent(new CustomEvent('theme-changed', { detail: this.currentTheme }))
    }

    toggleTheme() {
        this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light')
    }

    setTheme(theme: Theme) {
        this.currentTheme = theme
        this.saveTheme(theme)
        this.applyTheme()
    }

    getTheme(): Theme {
        return this.currentTheme
    }

    setTransitionEffect(effect: ThemeTransitionEffect) {
        this.transitionEffect = effect
        this.applyTheme()
    }

    getTransitionEffect() {
        return this.transitionEffect
    }
    setTransitionDuration(duration: number) {
        this.transitionDuration = duration
        this.applyTheme()
    }

    getTransitionDuration() {
        return this.transitionDuration
    }


    subscribe(callback?: () => void) {
        callback?.()
    }

    unsubscribe(callback?: () => void) {
        callback?.()
    }

    private saveTheme(theme: Theme) {
        localStorage.setItem(ThemeManager.THEME_STORAGE_KEY, theme)
    }

    private getSavedTheme() {
        const savedTheme = localStorage.getItem(ThemeManager.THEME_STORAGE_KEY) as Theme | null
        return savedTheme
    }
}