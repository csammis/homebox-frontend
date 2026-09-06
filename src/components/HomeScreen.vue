<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTags, Tag } from '../models/HomeBox/tag.ts';
import { useHead } from '@unhead/vue';
import TagListing from './widgets/TagListing.vue';
import { SortOptions } from '../utilities/sorting.ts';

const tags = ref<Tag[]>()
const sortIndex = ref<number>(0)

useHead({title: "Inventory"})

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
  <v-container fluid class="d-flex justify-right">
    <v-select density="compact" v-model="sortIndex" :items="SortOptions" item-title="name" prepend-icon="mdi-sort">
    </v-select>
  </v-container>
  <TagListing
    v-for="tag in tags"
    :key="tag.id"
    :tag="tag"
    :sortIndex="sortIndex" />
</template>