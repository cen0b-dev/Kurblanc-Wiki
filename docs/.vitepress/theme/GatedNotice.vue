<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <aside class="gated-notice" role="note">
    <strong>Not in the public build yet.</strong>
    This page describes the D25 build (<code>7050b38</code>). The live game and
    sample pack still use the earlier format; see
    <a :href="withBase('/reference/format-changelog')">Format changelog</a>.
  </aside>
</template>
