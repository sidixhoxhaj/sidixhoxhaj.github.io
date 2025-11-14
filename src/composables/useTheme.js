import { ref, watchEffect } from 'vue';

// Global theme state shared across all components
const currentTheme = ref(null);
const isInitialized = ref(false);

export function useTheme() {
  const initTheme = () => {
    if (isInitialized.value) return;

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    currentTheme.value = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme.value);
    isInitialized.value = true;
  };

  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
    currentTheme.value = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setTheme = (theme) => {
    if (theme !== 'light' && theme !== 'dark') return;
    currentTheme.value = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return {
    currentTheme,
    toggleTheme,
    setTheme,
    initTheme,
    isInitialized,
  };
}
