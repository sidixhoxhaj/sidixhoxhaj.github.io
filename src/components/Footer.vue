<template>
  <footer class="footer">
    <div class="footer-container">
      <p class="copyright">
        &copy; {{ currentYear }} Sidi Xhoxhaj. All rights reserved.
      </p>

      <div v-if="about?.socialLinks?.length" class="social-links">
        <a
          v-for="link in about.socialLinks"
          :key="link.id"
          :href="link.url"
          :aria-label="link.platform"
          class="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon :name="link.icon" :width="20" :height="20" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAbout } from '@/composables/useAbout';
import Icon from './Icon.vue';

const { about } = useAbout();
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped lang="scss">
.footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-4xl);
  transition: background-color var(--transition-base);
}

.footer-container {
  max-width: 1124px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-2xl);
    padding: var(--spacing-sm) var(--spacing-lg);
  }
}


.copyright {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--color-text-secondary);
    transition: all var(--transition-fast);
    padding: var(--spacing-xs);
    border-radius: var(--border-radius-sm);

    &:hover {
      color: var(--color-text-primary);
      background: var(--color-bg-primary);
    }

    span {
      font-size: var(--font-size-sm);
    }
  }
}
</style>
