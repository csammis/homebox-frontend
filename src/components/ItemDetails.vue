<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Entity, getEntity, getEntityImage } from '../models/HomeBox/entity';
import { useHead } from '@unhead/vue';
import FieldGridRow from './widgets/FieldGridRow.vue';

const imageUrl = ref<string>()
const props = defineProps<{ id: string }>()
const item = ref<Entity>()

useHead({title: "Item Details"})

onMounted(() => {
  getEntity(props.id).then(function (entityResponse) {
    item.value = entityResponse
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
  </div>
  <div v-else>
    <div class="item-title"><h1>{{ item?.name }}</h1></div>
    <v-container class="item-description-container">
      <v-row>
        <v-col class="item-img-container">
          <img class="item-img" :src="imageUrl" :title="item?.name" />
        </v-col>
        <v-col class="item-description">
          <v-container>
            <v-row>
              {{ item?.description }}
            </v-row>
            <v-row>
              <v-container v-if="item.fields !== undefined && item.fields.length > 0">
                <FieldGridRow
                  v-for="field in item.fields"
                  :key="field.id"
                  :field="field"
                />
              </v-container>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</div>
<div>
  <RouterLink to="/"><< Go to item listings</RouterLink>
</div>
</template>
<style lang="css" scoped>
.item-details {
  text-align: left;
}

.item-img {
  width:80%;
}
</style>