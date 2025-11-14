<template>
  <button 
    v-if="currentTheme" 
    class="theme-toggle" 
    @click="toggleTheme" 
    aria-label="Toggle theme"
  >
    <Icon :name="currentTheme === 'light' ? 'sun' : 'moon'" />
  </button>
</template>

<script setup>
import { onMounted } from 'vue';
import Icon from './Icon.vue';
import { useTheme } from '@/composables/useTheme';

const { currentTheme, toggleTheme, initTheme } = useTheme();

onMounted(() => {
  initTheme();
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
