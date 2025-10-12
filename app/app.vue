<template>
  <div class="bg-gray-800 h-dvh flex justify-center">
    <SpeedInsights />

    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>
