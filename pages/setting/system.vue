<template>
  <div>System</div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "PageSettingSystem",
  middleware: process.client ? "auth" : undefined,
});
</script>
