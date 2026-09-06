<script setup lang="ts">
import { ref, watch } from 'vue'
import { getEntitiesByTag } from '../../models/HomeBox/entities.ts';
import { Entity } from '../../models/HomeBox/entity.ts';
import { Tag } from '../../models/HomeBox/tag.ts';
import ItemCard from '../widgets/ItemCard.vue';
import { sortItemsByOption, SortOptions } from '../../utilities/sorting.ts';

const items = ref<Entity[]>([])
const props = defineProps<{ tag: Tag, sortIndex: number }>()

function loadAndSortEntities() {
  console.log("loading and sorting ")
  console.log(props.sortIndex)
  getEntitiesByTag(props.tag).then(async function (resource) {
    items.value = sortItemsByOption(resource.items, SortOptions[props.sortIndex])
  })
}

watch(() => props.sortIndex, (_, __) => {
  loadAndSortEntities()
}, {immediate: true})
</script>
<template>
  <v-container fluid v-if="items.length > 0" class="items-container">
    <v-row>
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </v-row>
  </v-container>
</template>
<style lang="css" scoped>
.tag-name {
  text-align: left;
  font-weight: bold;
  font-size: larger;
}
</style>
