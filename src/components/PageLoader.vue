<template>
  <Transition name="loader">
    <div v-if="visible" class="page-loader">
      <Icon name="logo" :width="46" :height="54" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

defineProps<{ visible: boolean }>();
</script>

<style scoped lang="scss">
  @use '@/styles/tokens.scss';

  .page-loader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: var(--color-bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      animation: logo-fade 1s ease-in-out infinite;
    }
  }

  @keyframes logo-fade {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  .loader-enter-active,
  .loader-leave-active {
    transition: opacity var(--transition-base);
  }

  .loader-enter-from,
  .loader-leave-to {
    opacity: 0;
  }
</style>
