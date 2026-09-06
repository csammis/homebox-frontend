<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getTagByName, Tag } from '../models/HomeBox/tag.ts';
import { useHead } from '@unhead/vue';
import { sortItemsByOption, SortOptions } from '../utilities/sorting.ts';
import { hbfeStore } from '../utilities/store.ts';
import { getEntitiesByTag } from '../models/HomeBox/entities.ts';
import type { Entity } from '../models/HomeBox/entity.ts';
import ItemCard from './widgets/ItemCard.vue';

const tag = ref<Tag>()
const items = ref<Entity[]>([])
const props = defineProps<{ name: string }>()
const storage = hbfeStore()

useHead({title: "Inventory"})

function loadAndSortEntities() {
  console.log("loading and sorting ")
  if (tag.value) {
    getEntitiesByTag(tag.value).then(async function (resource) {
      items.value = sortItemsByOption(resource.items, SortOptions[storage.sortIndex])
    })
  }
}

watch(() => storage.sortIndex, (_, __) => {
  loadAndSortEntities()
}, {immediate: true})

onMounted(function() {
  getTagByName(props.name).then(function (response) {
    tag.value = response
    loadAndSortEntities()
  });
});
</script>
<template>
  <v-container v-if="tag">
    <v-container fluid class="d-flex justify-right">
      <v-select density="compact" v-model="storage.sortIndex" :items="SortOptions" item-title="name" prepend-icon="mdi-sort">
      </v-select>
    </v-container>
    <v-container fluid v-if="items.length > 0" class="items-container">
      <v-row>
        <ItemCard
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </v-row>
    </v-container>
  </v-container>
</template>