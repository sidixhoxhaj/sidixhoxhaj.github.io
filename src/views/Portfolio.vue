<template>
  <div class="page">
    <!-- Header with Theme Toggle -->
    <header class="page-header">
      <div class="container">
        <ThemeToggle />
      </div>
    </header>

    <div v-if="loading" class="loading-state">
      <div class="container">
        <p>Loading portfolio...</p>
      </div>
    </div>

    <div v-else-if="portfolio.length === 0" class="empty-state">
      <div class="container">
        <p>No portfolio items yet.</p>
      </div>
    </div>

    <div v-else class="page-content">
      <section class="portfolio-section">
        <div class="container">
          <h2 class="heading-xl mb-2xl">My <strong>Projects</strong></h2>
          <div class="portfolio-list">
            <PortfolioCard
              v-for="(item, index) in sortedPortfolio"
              :key="item.id"
              :item="item"
              :index="index + 1"
              :reverse="index % 2 !== 0"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import PortfolioCard from '@/components/PortfolioCard.vue';
import { usePortfolio } from '@/composables/usePortfolio';

const { portfolio, loading } = usePortfolio();

const sortedPortfolio = computed(() => {
  return [...portfolio.value].sort((a, b) => a.order - b.order);
});
</script>

<style lang="scss" scoped>
  @use '@/styles/tokens.scss';
  @use '@/styles/utils.scss';

  .page-header {
    padding: var(--spacing-lg) 0;

    .container {
      display: flex;
      justify-content: flex-end;
    }
  }

  .portfolio {
    &-list {
      display: flex;
      flex-direction: column;
      gap: 6rem;

      @media (min-width: 768px) {
        gap: 8rem;
      }
    }
  }

  .loading-state,
  .empty-state {
    padding: var(--spacing-2xl) 0;
    text-align: center;
    color: var(--color-text-secondary);
  }

  h2 strong {
    font-weight: var(--font-weight-extrabold);
  }
</style>
