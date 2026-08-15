<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Entity, getEntity, getEntityImage } from '../models/HomeBox/entity';
import { useHead } from '@unhead/vue';

const imageUrl = ref<string>()
const props = defineProps<{ id: string }>()
const item = ref<Entity>()

useHead({title: "Item Details"})

onMounted(() => {
  getEntity(props.id).then(function (entityResponse) {
    item.value = entityResponse
    useHead({title: entityResponse.name})
    getEntityImage(item.value).then(function (imageResponse) {
      imageUrl.value = imageResponse
    })
  })
})
</script>
<template>
<div class="item-details">
  <div v-if="item === undefined" class="item-missing">
    No item found by that ID. <br />
    <RouterLink to="/">Go to item listings</RouterLink>
  </div>
  <div v-else>
    <div class="item-title">{{ item?.name }}</div>
    <!-- image carousel? -->
    <div class="item-img-container">
      <img class="item-img" :src="imageUrl" :title="item?.name" />
    </div>
    <div class="item-description">{{ item?.description }}</div>
  </div>
</div>
</template>