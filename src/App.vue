<template>
  <div class="layout">
    <PageLoader :visible="loading" />
    <Header />

    <main id="main-content" class="main-content">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import PageLoader from '@/components/PageLoader.vue';

  const router = useRouter();
  const loading = ref(false);
  let navStart = 0;

  router.beforeEach(() => {
    navStart = Date.now();
    loading.value = true;
  });

  router.afterEach(() => {
    const elapsed = Date.now() - navStart;
    const remaining = Math.max(0, 1000 - elapsed);

    setTimeout(() => {
      loading.value = false;
    }, remaining);
  });
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
