<template>
  <div class="layout">
    <Header />

    <main id="main-content" class="main-content">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  </script>

<style lang="scss">
  @use './styles/tokens.scss';
  @use './styles/reset.scss';

  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    margin-top: 100px;
    scroll-behavior: smooth;
  }
</style>
