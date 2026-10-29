<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import VersionBanner from './VersionBanner.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <VersionBanner />
    </template>
  </DefaultTheme.Layout>
</template>
