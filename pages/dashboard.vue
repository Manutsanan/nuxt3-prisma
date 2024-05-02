<template>
  <div>Dashboard</div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "PageDashboard",
  middleware: process.client ? "auth" : undefined,
});
</script>
