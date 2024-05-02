<template>
  <div class="flex justify-center items-center h-screen w-full">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineComponent({
  setup() {
    definePageMeta({
      name: "LayoutCustom",
    });
  },
});

const definePageMeta = (arg0: { name: string }) => {
  throw new Error("Function not implemented.");
};
</script>

<style lang="scss" scoped>
//
</style>
