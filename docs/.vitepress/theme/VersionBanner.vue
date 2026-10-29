<script setup lang="ts">
import version from '../../../data/version.json'
</script>

<template>
  <div class="version-banner">
    Documents Kurblanc {{ version.version }}
    <span aria-hidden="true">·</span>
    build <code>{{ version.gameCommit }}</code>
    <span aria-hidden="true">·</span>
    verified {{ version.verified }}
  </div>
</template>
