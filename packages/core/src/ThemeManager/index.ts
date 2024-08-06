export type ThemeTransitionEffect = 'none' | 'view-transition' | 'circle';
export type Theme = 'light' | 'dark';

export interface ThemeManagerOptions {
    initialTheme?: Theme;
    transitionEffect?: ThemeTransitionEffect;
    transitionDuration?: number;
}

type ThemeChangeCallback = (theme: Theme) => void;

export class ThemeManager {
    private currentTheme: Theme = 'light';
    private transitionDuration: number = 300;
    private static readonly THEME_STORAGE_KEY = 'theme-smooth-preference';
    private transitionEffect: ThemeTransitionEffect;
    private lastDirection: 'forward' | 'reverse' = 'forward';
    private subscribers: Set<ThemeChangeCallback> = new Set();


    constructor(options: ThemeManagerOptions = {}) {
        this.currentTheme = options.initialTheme || this.getSavedTheme() || 'light';
        this.transitionEffect = options.transitionEffect || 'none';
        this.transitionDuration = options.transitionDuration || 300;
        this.applyTheme();
    }

    private notifySubscribers() {
        this.subscribers.forEach(fn => fn(this.currentTheme));
    }

    applyTheme() {
        const root = document.documentElement;
        root.style.setProperty('--transition-duration', `${this.transitionDuration}ms`);
        root.setAttribute('data-theme', this.currentTheme);
        root.setAttribute('data-transition-effect', this.transitionEffect);
        root.classList.remove('light', 'dark');
        root.classList.add(this.currentTheme);

        this.notifySubscribers()

        window.dispatchEvent(new CustomEvent('theme-changed', { detail: this.currentTheme }));
    }

    async toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        const direction = newTheme === 'dark' ? 'forward' : 'reverse';

        if ((this.transitionEffect === 'view-transition' || this.transitionEffect === 'circle') && 'startViewTransition' in document) {
            await this.toggleThemeWithViewTransition(newTheme, direction);
        } else {
            this.setTheme(newTheme);
        }

    }

    private async toggleThemeWithViewTransition(newTheme: Theme, direction: 'forward' | 'reverse') {
        if (this.transitionEffect === 'view-transition') {
            document.documentElement.classList.toggle('theme-transition-reverse', direction === 'reverse');
        }

        // @ts-ignore (for document.startViewTransition)
        const transition = document.startViewTransition(() => {
            this.setTheme(newTheme);
        });

        try {
            await transition.finished;
        } finally {
            this.lastDirection = direction;
        }

    }

    setTheme(theme: Theme) {
        this.currentTheme = theme;
        this.saveTheme(theme);
        this.applyTheme();
    }

    getTheme(): Theme {
        return this.currentTheme;
    }

    setTransitionEffect(effect: ThemeTransitionEffect) {
        this.transitionEffect = effect;
        this.applyTheme();
    }

    getTransitionEffect() {
        return this.transitionEffect;
    }

    setTransitionDuration(duration: number) {
        this.transitionDuration = duration;
        this.applyTheme();
    }

    getTransitionDuration() {
        return this.transitionDuration;
    }

    private saveTheme(theme: Theme) {
        localStorage.setItem(ThemeManager.THEME_STORAGE_KEY, theme);
    }

    subscribe(fn: ThemeChangeCallback) {
        this.subscribers.add(fn)
    }

    unsubscribe(fn: ThemeChangeCallback) {
        this.subscribers.delete(fn)
    }

    private getSavedTheme() {
        return localStorage.getItem(ThemeManager.THEME_STORAGE_KEY) as Theme | null;
    }
}