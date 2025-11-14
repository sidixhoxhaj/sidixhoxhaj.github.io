<template>
  <div class="page">
    <!-- Header with Theme Toggle -->
    <header class="page-header">
      <div class="container">
        <ThemeToggle />
      </div>
    </header>

    <div v-if="!loading && about" class="page-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-text">
              <h1 class="hero-intro">
                Senior Frontend Developer
              </h1>
              <h3 class="hero-bio">
                Specializing in <b>Vue.js</b>, <b>React.js</b>, and building <b>design systems</b> for high-traffic platforms. Proven track record of delivering measurable business impact.
              </h3>
              <div class="hero-actions">
                <a
                  v-for="link in about.socialLinks"
                  :key="link.id"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="['btn', 'btn--small', { 'btn__with-label': link.showLabel }]"
                  :aria-label="link.platform"
                >
                  <Icon :name="link.icon" :width="18" :height="18" />
                  <span class="hero-actions__label" v-if="link.showLabel">{{ link.platform }}</span>
                </a>
              </div>
            </div>
            <div class="hero-illustration">
              <div class="illustration-placeholder">
                <img src="/images/hero_image.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section v-if="about.experiences?.length" class="experience-section">
        <div class="container">
          <h2 class="heading-xl mb-2xl">My <strong>Experience</strong></h2>
          <div class="experience-list">
            <article
              v-for="exp in about.experiences"
              :key="exp.company"
              class="experience-card"
            >
              <div class="experience-header">
                <h3 class="experience-title">{{ exp.position }}<span> at {{ exp.company }}</span></h3>
                <span class="experience-date text-muted">
                  {{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : 'Present' }}
                </span>
              </div>
              <p class="text-body experience-description">{{ exp.responsibilities }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section v-if="about.skills?.length" class="skills-section">
        <div class="container">
          <h2 class="heading-xl mb-2xl">My <strong>Skills</strong></h2>
          <div class="skills-grid grid grid-12">
            <div
              v-for="skill in about.skills"
              :key="skill.id"
              class="skills-item"
            >
              <Icon :name="skill.icon" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue';
import Icon from '@/components/Icon.vue';
import { useAbout } from '@/composables/useAbout';

const { about, loading } = useAbout();

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
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

  .hero {
    &-section {
      padding-top: 0;
    }

    &-grid {
      display: grid;
      gap: var(--spacing-2xl);
      align-items: center;

      @media (min-width: 768px) {
        grid-template-columns: 2fr 1fr;
        gap: 4rem;
      }
    }

    &-text {
      order: 2;

      @media (min-width: 768px) {
        order: 1;
      }
    }

    &-greeting {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-regular);
      margin-bottom: var(--spacing-sm);

      @media (min-width: 768px) {
        font-size: var(--font-size-3xl);
      }
    }

    &-name-inline {
      font-weight: var(--font-weight-extrabold);
    }

    &-title {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-extrabold);
      line-height: var(--line-height-tight);
      margin-bottom: var(--spacing-sm);

      @media (min-width: 768px) {
        font-size: var(--font-size-hero);
      }
    }

    &-experience {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-tight);

      @media (min-width: 768px) {
        font-size: var(--font-size-2xl);
      }
    }

    &-years {
      font-weight: var(--font-weight-extrabold);
      font-size: var(--font-size-2xl);
      text-decoration: underline;
      text-decoration-thickness: 3px;
      text-underline-offset: 8px;

      @media (min-width: 768px) {
        font-size: var(--font-size-3xl);
      }
    }

    &-bio {
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-thin);
      margin-bottom: var(--spacing-xl);

      b {
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
      }
    }

    &-intro {
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--spacing-sm);
    }

    &-actions {
      display: flex;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
    }

    &-illustration {
      order: 1;
      width: 100%;
      display: flex;
      justify-content: center;

      @media (min-width: 768px) {
        order: 2;
      }
    }
  }

  .illustration-placeholder {
    width: 100%;
    max-width: 300px;
    max-height: 300px;
    aspect-ratio: 1;
    border-radius: var(--border-radius-lg);
    border-bottom: 3px solid var(--color-text-primary);

    img {
      width: auto;
      height: 100%;
      margin: 0 auto;
    }
  }

  .experience {
    &-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2xl);
    }

    &-header {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-md);

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
      }
    }

    &-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);

      @media (min-width: 768px) {
        font-size: var(--font-size-xl);
      }

      span {
        font-weight: var(--font-weight-regular);
      }
    }

    &-date {
      font-size: var(--font-size-sm);
      white-space: nowrap;
    }
  }

  .skills {
    &-grid {
      gap: var(--spacing-md);
    }
    
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--color-text-primary);
        transform: translateY(-4px);
      }

      :deep(svg) {
        width: 100%;
        height: 100%;
        max-width: 40px;
        max-height: 40px;
      }
    }
  }

  .loading-state,
  .error-state {
    padding: var(--spacing-2xl) 0;
    text-align: center;
    color: var(--color-text-secondary);
  }

  .error-state {
    color: var(--color-error, #e74c3c);
  }

  h2 strong {
    font-weight: var(--font-weight-extrabold);
  }
</style>
