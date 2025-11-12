<template>
  <svg :width="width" :height="height" class="icon">
    <use :href="`/icons/sprite.svg#${name}`" />
  </svg>
</template>

<script setup>
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
</script>

<style scoped lang="scss">
    .icon {
        display: block;
        color: currentColor;
    }
</style>
