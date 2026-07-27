<script setup lang="ts">
import { Tag } from '../models/HomeBox/tag.ts';
import HomeBoxTagViewer from './items/HomeBoxTagViewer.vue';

const tag = new Tag("5829ac63-a8bf-4ddd-aa26-029798d2ad6d")
</script>
<template>
  <HomeBoxTagViewer :tag="tag" />
</template>