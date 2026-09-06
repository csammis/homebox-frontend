<script setup lang="ts">
import { ref, watch } from 'vue';
import { getTagByName, Tag } from '../models/HomeBox/tag.ts';
import { useHead } from '@unhead/vue';
import { sortItemsByOption, SortOptions } from '../utilities/sorting.ts';
import { hbfeStore } from '../utilities/store.ts';
import { Entities, getEntitiesByTag } from '../models/HomeBox/entities.ts';
import type { Entity } from '../models/HomeBox/entity.ts';
import ItemCard from './widgets/ItemCard.vue';
import { capitalize } from '../utilities/formatters.ts';

const tags = ref<Tag[]>()
const items = ref<Entity[]>([])
const props = defineProps<{ name: string }>()
const storage = hbfeStore()

useHead({title: "Inventory"})

function loadAndSortEntities() {
  if (tags.value) {
    let allItems: Entity[] = [];
    let allFetches: Promise<Entities>[] = []
    tags.value.forEach(tag => {
      allFetches = allFetches.concat(getEntitiesByTag(tag))
    })

    Promise.all(allFetches).then((responses) => {
      responses.forEach((response) => {
        allItems = allItems.concat(response.items)
      })
    }).finally(() => {
      items.value = sortItemsByOption(allItems, SortOptions[storage.sortIndex])
    });
  }
}

watch(() => storage.sortIndex, (_, __) => {
  loadAndSortEntities()
}, {immediate: true})

watch(() => props.name, (_, __) => {
  getTagByName(props.name).then(function (response) {
    tags.value = response
    loadAndSortEntities()
  }).catch(() => { console.log("No data from " + props.name)});
}, {immediate: true });

function headerFromName() {
  if (props.name.toLowerCase() == "all") {
    return "All Listings"
  } else {
    return capitalize(props.name)
  }
}
</script>
<template>
  <v-container fluid class="d-flex justify-left pa-0">
    <h1 class="ma-0">{{  headerFromName() }}</h1>
  </v-container>
  <v-container fluid class="d-flex justify-right">
    <v-select density="compact" v-model="storage.sortIndex" :items="SortOptions" item-title="name" prepend-icon="mdi-sort">
    </v-select>
  </v-container>
  <v-container fluid v-if="items.length > 0">
    <v-container fluid class="items-container">
      <v-row>
        <ItemCard
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </v-row>
    </v-container>
  </v-container>
  <v-container v-else class="d-flex justify-center">
    No items to show
  </v-container>
</template>