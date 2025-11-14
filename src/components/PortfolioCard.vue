<template>
  <article :class="['portfolio-card', { 'portfolio-card--reverse': reverse }]">
    <div class="portfolio-card__image">
      <img :src="item.mainImage" :alt="item.title" />
    </div>
    <div class="portfolio-card__content">
      <div class="portfolio-card__number">{{ formattedNumber }}</div>
      <h3 class="portfolio-card__title">{{ item.title }}</h3>
      <p class="portfolio-card__description">{{ item.description }}</p>
      <div class="portfolio-card__links">
        <a
          href="#"
          target="_self"
          class="btn btn--small"
          >
          View Project
        </a>
        <a
          v-if="item.liveUrl"
          :href="item.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--small"
        >
          <Icon name="react" :width="16" :height="16" />
          Website
        </a>
        <a
          v-if="item.githubUrl"
          :href="item.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn__transparent btn--small btn--inline"
        >
          <Icon name="github" :width="16" :height="16" />
          Github
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  reverse: {
    type: Boolean,
    default: false
  }
});

const formattedNumber = computed(() => {
  return String(props.index).padStart(2, '0');
});
</script>

<style lang="scss" scoped>
  @use '@/styles/tokens.scss';
  @use '@/styles/utils.scss';

  .portfolio-card {
    display: grid;
    gap: var(--spacing-2xl);
    align-items: center;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }

    &--reverse {
      @media (min-width: 768px) {
        .portfolio-card__image {
          order: 2;
        }
        .portfolio-card__content {
          order: 1;
        }
      }
    }

    &__image {
      width: 100%;
      aspect-ratio: 16 / 10;
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      border-bottom: 3px solid var(--color-text-primary);
      background: var(--color-bg-secondary);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    &__number {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-extrabold);
      color: var(--color-text-primary);
      line-height: 1;
    }

    &__title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
      margin: 0;

      @media (min-width: 768px) {
        font-size: var(--font-size-3xl);
      }
    }

    &__description {
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
      margin: 0;
    }

    &__links {
      display: flex;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
      margin-top: var(--spacing-sm);

      .btn {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-xs);
      }
    }
  }
</style>
