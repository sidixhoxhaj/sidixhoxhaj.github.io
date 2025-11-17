<template>
  <div class="page">
    <header class="page-header">
      <div class="container">
        <router-link to="/portfolio" class="back-link btn btn__transparent btn--small">
          <Icon name="arrow-left" :width="16" :height="16" />
          Back to Portfolio
        </router-link>
        <ThemeToggle />
      </div>
    </header>

    <div v-if="loading" class="loading-state">
      <div class="container">
        <p>Loading project...</p>
      </div>
    </div>

    <div v-else-if="!project" class="error-state">
      <div class="container">
        <h1 class="heading-2xl">Project Not Found</h1>
        <p class="text-body">The project you're looking for doesn't exist.</p>
        <router-link to="/portfolio" class="btn">
          Back to Portfolio
        </router-link>
      </div>
    </div>

    <!-- Project Content -->
    <div v-else class="page-content">
      <div class="container">
        <h1 class="heading-3xl">{{ project.title }}</h1>
        <p class="hero-description">{{ project.description }}</p>

        <!-- Technology Tags -->
        <div v-if="project.technologies?.length" class="tech-tags">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Action Links -->
        <div class="hero-actions">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn"
          >
            <Icon name="external-link" :width="18" :height="18" />
            View Live Site
          </a>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn__transparent btn--inline"
          >
            <Icon name="github" :width="18" :height="18" />
            View Source
          </a>
        </div>
      </div>

      <div class="container">
        <div class="main-image">
          <img :src="project.mainImage" :alt="project.title" />
        </div>
      </div>

      <div class="container">
        <div class="rich-text" v-html="project.content"></div>
      </div>

      <div class="container">
        <h2 class="heading-xl mb-lg">Gallery</h2>
        <div class="gallery-grid">
          <div
            v-for="(image, index) in project.gallery"
            :key="index"
            class="gallery-item"
          >
            <img :src="image.url" :alt="image.alt || `${project.title} screenshot ${index + 1}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import ThemeToggle from '@/components/ThemeToggle.vue';
import Icon from '@/components/Icon.vue';
import { usePortfolio } from '@/composables/usePortfolio';

const route = useRoute();
const router = useRouter();
const { portfolio, loading } = usePortfolio();

const project = computed(() => {
  return portfolio.value.find(item => item.slug === route.params.slug);
});

// SEO Meta Tags
watch(project, (newProject) => {
  if (newProject) {
    useHead({
      title: `${newProject.title} - Sidi Xhoxhaj Portfolio`,
      meta: [
        {
          name: 'description',
          content: newProject.description || `View ${newProject.title} project details`
        },
        {
          property: 'og:title',
          content: `${newProject.title} - Sidi Xhoxhaj Portfolio`
        },
        {
          property: 'og:description',
          content: newProject.description || `View ${newProject.title} project details`
        },
        {
          property: 'og:image',
          content: newProject.mainImage || ''
        }
      ]
    });
  }
}, { immediate: true });

watch([loading, project], ([isLoading, proj]) => {
  if (!isLoading && !proj && portfolio.value.length > 0) {
    router.push('/portfolio');
  }
});
</script>

<style lang="scss" scoped>
  @use '@/styles/tokens.scss';
  @use '@/styles/utils.scss';

  .page-header {
    padding: var(--spacing-lg) 0;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  .loading-state,
  .error-state {
    padding: var(--spacing-3xl) 0;
    text-align: center;

    h1 {
      margin-bottom: var(--spacing-md);
    }

    p {
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-lg);
    }
  }

  .hero-description {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--spacing-lg);
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-lg);
  }

  .tech-tag {
    padding: var(--spacing-xs) var(--spacing-sm);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  .hero-actions {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;

    .btn {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
    }
  }

  .main-image {
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    background: var(--color-bg-secondary);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .rich-text {
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-primary);
  }

  .gallery-grid {
    display: grid;
    gap: var(--spacing-lg);
    grid-template-columns: 1fr;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .gallery-item {
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    border-bottom: 2px solid var(--color-text-primary);
    background: var(--color-bg-secondary);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .mb-lg {
    margin-bottom: var(--spacing-lg);
  }
</style>
