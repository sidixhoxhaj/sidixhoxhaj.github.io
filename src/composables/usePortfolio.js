import { ref, onMounted } from 'vue';

export function usePortfolio() {
  const portfolio = ref([]);
  const loading = ref(true);

  onMounted(async () => {
    try {
      const data = await import('@/data/portfolio.json');
      portfolio.value = data.default;
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
    } finally {
      loading.value = false;
    }
  });

  return {
    portfolio,
    loading,
  };
}
