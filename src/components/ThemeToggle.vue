<template>
  <button 
    v-if="currentTheme" 
    class="theme-toggle" 
    @click="toggleTheme" 
    aria-label="Toggle theme"
  >
    <Icon :name="currentTheme === 'dark' ? 'sun' : 'moon'" />
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
        border: none;
        padding: var(--spacing-xs);
        color: var(--color-text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color var(--transition-fast);

        &:hover {
          transform: rotate(35deg);
          color: var(--color-text-primary);
        }
    }
</style>
