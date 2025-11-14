<template>
  <svg :width="width" :height="height" class="icon">
    <use :href="`/icons/sprite.svg#${iconName}`" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme';

const props = defineProps({
  name: String,
  width: {
    type: [String, Number],
    default: 24
  },
  height: {
    type: [String, Number],
    default: 24
  }
});

const { currentTheme } = useTheme();

const iconName = computed(() => {
  return currentTheme.value === 'dark' ? `${props.name}-light` : props.name;
});
</script>

<style scoped lang="scss">
    .icon {
        display: block;
        color: currentColor;
    }
</style>
