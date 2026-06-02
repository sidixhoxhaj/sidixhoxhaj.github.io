<template>
  <header class="header">
    <div class="header-container container">
      <nav class="nav">
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.path">
            <router-link :to="link.path" class="nav-link">
              {{ link.label }}
            </router-link>
          </li>
        </ul>
        <div class="nav-actions">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  import ThemeToggle from './ThemeToggle.vue';

  const navLinks = [
    { path: '/', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    // { path: '/blog', label: 'Blog' }
  ];
</script>

<style scoped lang="scss">
  @use '@/styles/tokens.scss';
  @use '@/styles/utils.scss';

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--color-bg-primary);
    border-bottom: 1px solid var(--color-border);
    z-index: var(--z-index-header);
    transition: background-color var(--transition-base);
  }

  .header-container {
    padding-top: var(--spacing-sm);
    padding-bottom: var(--spacing-sm);
    display: flex;
    align-items: center;
  }

  .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .nav-list {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-lg);
  }

  .nav-link {
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-text-primary);
    }

    &.router-link-active {
      color: var(--color-text-primary);
    }
  }

  .nav-actions {
    display: flex;
    align-items: center;
  }
</style>
