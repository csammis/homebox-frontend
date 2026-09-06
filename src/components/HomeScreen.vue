<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTags, Tag } from '../models/HomeBox/tag.ts';
import { useHead } from '@unhead/vue';
import TagListing from './widgets/TagListing.vue';
import { SortOptions } from '../utilities/sorting.ts';
import { hbfeStore } from '../utilities/store.ts';

const tags = ref<Tag[]>()

const storage = hbfeStore()

useHead({title: "Inventory"})

onMounted(function() {
  getTags().then(function (response) {
    tags.value = response
  });
});
</script>
<template>
  <v-container fluid class="d-flex justify-right">
    <v-select density="compact" v-model="storage.sortIndex" :items="SortOptions" item-title="name" prepend-icon="mdi-sort">
    </v-select>
  </v-container>
  <TagListing
    v-for="tag in tags"
    :key="tag.id"
    :tag="tag"
    :sortIndex="storage.sortIndex" />
</template>