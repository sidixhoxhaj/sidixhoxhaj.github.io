<template>
  <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
    <Icon :name="currentTheme === 'light' ? 'sun' : 'moon'" />
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Icon from './Icon.vue';

const currentTheme = ref('light');

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme.value);
  localStorage.setItem('theme', currentTheme.value);
};

onMounted(() => {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  currentTheme.value = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme.value);
});
</script>

<style scoped lang="scss">
    .theme-toggle {
        background: none;
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius-sm);
        padding: var(--spacing-xs);
        color: var(--color-text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color var(--transition-fast);

        &:hover {
            border-color: var(--color-text-primary);
        }
    }
</style>
