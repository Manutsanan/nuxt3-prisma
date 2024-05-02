<template>
  <div>Index</div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "PageIndex",
  middleware: process.client ? "auth" : undefined,
});
</script>
