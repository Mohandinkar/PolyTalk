import { create } from 'zustand'


//Zustand store to manage theme state globally in the application 
export const useThemeStore = create((set) => ({
  theme : localStorage.getItem('theme') || "coffee",
  setTheme: (newTheme) => {
    localStorage.setItem('theme', newTheme),
    set({theme: newTheme })},
}))

