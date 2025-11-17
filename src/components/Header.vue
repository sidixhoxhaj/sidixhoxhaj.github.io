<template>
  <header class="header">
    <div class="header-container container">
      <router-link to="/" class="logo">
        <Icon name="logo" :width="35" :height="35" /> Sidi Xhoxhaj
      </router-link>

      <nav class="nav" :class="{ 'is-open': isMobileMenuOpen }">
        <button 
          @click="closeMobileMenu"
          class="btn btn__transparent btn--inline close-menu"
        >
          <Icon name="xclose" :width="20" :height="20" />
        </button>
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.path">
            <router-link
              :to="link.path"
              class="nav-link"
              @click="closeMobileMenu"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>

        <div class="nav-actions">
          <ThemeToggle />
        </div>
      </nav>

      <button
        class="mobile-menu-toggle"
        :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isMobileMenuOpen"
        @click="toggleMobileMenu"
      >
        <span class="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
      aria-hidden="true"
    ></div>
  </header>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import ThemeToggle from './ThemeToggle.vue';
  import Icon from './Icon.vue';

  const isMobileMenuOpen = ref(false);

  const navLinks = [
    { path: '/', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    // { path: '/blog', label: 'Blog' }
  ];

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;

    if (isMobileMenuOpen.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
  };
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
    z-index: var(--z-header);
    transition: background-color var(--transition-base);
  }

  .header-container {
    padding: var(--spacing-sm) var(--spacing-xl);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacing-3xl) var(--spacing-lg);
    gap: var(--spacing-lg);
    transition: right var(--transition-base);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-modal);

    &.is-open {
      right: 0;
      background: var(--color-bg-primary);
    }

    @media (min-width: 768px) {
      position: static;
      height: auto;
      width: auto;
      flex-direction: row;
      align-items: center;
      padding: 0;
      gap: var(--spacing-xl);
      box-shadow: none;
    }

    .close-menu {
      position: absolute;
      top: var(--spacing-lg);
      right: var(--spacing-lg);
      
      @media (min-width: 768px) {
        display: none;
      }
    }
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    width: 100%;
    text-align: right;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: var(--spacing-lg);
      width: auto;
    }
  }

  .nav-link {
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
    transition: color var(--transition-fast);
    position: relative;
    font-size: var(--font-size-lg);
    padding: var(--spacing-sm) 0;
    width: 100%;

    &:hover {
      color: var(--color-text-primary);
    }

    &.router-link-active {
      color: var(--color-text-primary);
    }

    @media (min-width: 768px) {
      font-size: var(--font-size-base);
      padding: 0;
      width: auto;
    }
  }

  .nav-actions {
    display: flex;
    align-items: center;
    margin-top: var(--spacing-md);
    align-self: flex-end;

    @media (min-width: 768px) {
      margin-top: 0;
    }
  }

  .mobile-menu-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    z-index: calc(var(--z-modal) + 1);

    @media (min-width: 768px) {
      display: none;
    }
  }

  .hamburger-icon {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 24px;

    span {
      display: block;
      width: 100%;
      height: 2px;
      background: var(--color-text-primary);
      transition: all var(--transition-fast);
    }
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;

    @media (min-width: 768px) {
      display: none;
    }
  }
</style>
