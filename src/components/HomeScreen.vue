<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTags, Tag } from '../models/HomeBox/tag.ts';
import HomeBoxTagViewer from './items/HomeBoxTagViewer.vue';

const tags = ref<Tag[]>()

onMounted(function() {
  getTags().then(function (response) {
    let wantedTags: Tag[] = []
    response.forEach((tag) => { 
      if (tag.id == "5829ac63-a8bf-4ddd-aa26-029798d2ad6d") {
        wantedTags.push(tag)
      }
    });
    tags.value = wantedTags 
  });
});
</script>
<template>
  <HomeBoxTagViewer
    v-for="tag in tags"
    :key="tag.id"
    :tag="tag" />
</template>