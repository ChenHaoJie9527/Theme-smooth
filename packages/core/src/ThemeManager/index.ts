export type ThemeTransitionEffect = 'none' | 'fade' | 'slide' | 'flip' | 'view-transition';
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
    private lastDirection: 'forward' | 'reverse' = 'forward'

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

    async toggleTheme() {
        const newTheme = this.currentTheme === 'light'? 'dark' : 'light'
        const direction = newTheme === 'light'? 'forward' : 'reverse'
        
        if (this.transitionEffect === 'view-transition') {
            await this.toggleThemeWithViewTransition(newTheme, direction)
        } else {
            this.setTheme(newTheme)
        }
    }

    private async toggleThemeWithViewTransition(newTheme: Theme, direction: 'forward' | 'reverse') {
        // @ts-ignore (for document.startViewTransition)
        if (!document.startViewTransition) {
            this.setTheme(newTheme)
            return
        }

        if (direction === 'reverse') {
            document.documentElement.classList.add('theme-transition-reverse')
        } else {
            document.documentElement.classList.remove('theme-transition-reverse')
        }

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            this.setTheme(newTheme)
        })

        try {
            await transition.finished
        } finally {
            this.lastDirection = direction
        }
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