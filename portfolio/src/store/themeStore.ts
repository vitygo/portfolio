import { create } from 'zustand'

type ThemeStore = {
  theme: 'dark' | 'light'
  toggle: () => void
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',
  toggle: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
      return { theme: next }
    }),
}))

export default useThemeStore