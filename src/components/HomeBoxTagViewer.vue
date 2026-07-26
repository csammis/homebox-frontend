<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getEntitiesByTag } from '../models/HomeBox/entities';
import { Entity } from '../models/HomeBox/entity.ts';
import { Tag } from '../models/HomeBox/tag.ts';
import HomeBoxItem from './HomeBoxItem.vue';

const items = ref<Entity[]>()

onMounted(() => {
  let tag = new Tag("5829ac63-a8bf-4ddd-aa26-029798d2ad6d", "", "", "", "", "", "", "")
  getEntitiesByTag(tag).then(async function (resource) {
    console.log(resource)
    items.value = resource.items
  })
})

</script>
<template>
        <HomeBoxItem
          v-for="item in items"
          :key="item.id"
          :item="item"
        /> 
</template>
