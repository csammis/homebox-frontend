<script setup lang="ts">
import Isotope from 'isotope-layout'
import type { IsotopeOptions } from 'isotope-layout'
import { useTemplateRef, ref, onMounted, nextTick } from 'vue'
import { getEntitiesByTag } from '../../models/HomeBox/entities.ts';
import { Entity } from '../../models/HomeBox/entity.ts';
import { Tag } from '../../models/HomeBox/tag.ts';
import HomeBoxItem from './HomeBoxItem.vue';

const items = ref<Entity[]>([])
const props = defineProps<{ tag: Tag }>()

const gridContainer = useTemplateRef('items-container')

let iso: Isotope
const isoOptions = {
  itemSelector: '.item-card',
  layoutMode: 'fitRows',
} as IsotopeOptions

onMounted(() => {
  iso = new Isotope(gridContainer.value as HTMLElement, isoOptions)
  getEntitiesByTag(props.tag).then(async function (resource) {
    items.value = resource.items
      await nextTick()
      iso?.reloadItems()
      iso?.arrange(isoOptions)
  })
})

</script>
<template>
  <div class="items">
    <div class="items-title">{{ tag.name }}</div>
    <div class="items-container" ref="items-container">
      <HomeBoxItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      /> 
    </div>
  </div>
</template>
<style lang="css" scoped>
.items-title {
  text-align: left;
}
</style>
