<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTags, Tag } from '../models/HomeBox/tag.ts';
import HomeBoxTagViewer from './items/HomeBoxTagViewer.vue';

const tags = ref<Tag[]>()

onMounted(function() {
  getTags().then(function (response) {
    let wantedTags: Tag[] = []
    response.forEach((tag) => { 
      if (tag.parentId == "472b43c2-c880-4a82-8065-5a51239916b6") {
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