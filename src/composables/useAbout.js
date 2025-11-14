import { ref, onMounted } from 'vue';

export function useAbout() {
  const about = ref(null);
  const loading = ref(true);

  onMounted(async () => {
    try {
      const data = await import('@/data/about.json');
      about.value = data.default;
    } catch (error) {
      console.error('Failed to load about data:', error);
    } finally {
      loading.value = false;
    }
  });

  return {
    about,
    loading,
  };
}
