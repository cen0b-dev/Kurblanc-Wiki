<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import VersionBanner from './VersionBanner.vue'
import GatedNotice from './GatedNotice.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #layout-top>
      <VersionBanner />
    </template>
    <template #doc-before>
      <GatedNotice v-if="frontmatter.gated" />
    </template>
  </Layout>
</template>
