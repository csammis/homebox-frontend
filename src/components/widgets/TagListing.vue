<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getEntitiesByTag } from '../../models/HomeBox/entities.ts';
import { Entity } from '../../models/HomeBox/entity.ts';
import { Tag } from '../../models/HomeBox/tag.ts';
import ItemCard from '../widgets/ItemCard.vue';

const items = ref<Entity[]>([])
const props = defineProps<{ tag: Tag }>()

onMounted(() => {
  getEntitiesByTag(props.tag).then(async function (resource) {
    items.value = resource.items
  })
})
</script>
<template>
  <div class="tag-name">{{ tag.name }}</div>
    <div class="items-container-empty" v-if="items.length == 0">
      Nothing here yet!
    </div>
    <v-container v-else class="items-container">
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
