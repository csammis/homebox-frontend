<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { Entity, getEntity } from '../models/HomeBox/entity';
import { useHead } from '@unhead/vue';
import FieldGridRow from './widgets/FieldGridRow.vue';
import { priceAsCurrency } from '../utilities/formatters.ts';
import AttachmentCarouselItem from './widgets/AttachmentCarouselItem.vue';

const props = defineProps<{ id: string }>()
const item = ref<Entity>();
const currentIndex = shallowRef(0)

useHead({title: "Item Details"})

onMounted(() => {
  getEntity(props.id).then(function (entityResponse) {
    item.value = entityResponse
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
          <v-carousel v-model="currentIndex"
            :hide-delimiters="true">
            <AttachmentCarouselItem v-for="attachment in item?.attachments"
              :key="attachment.id"
              :entity="item"
              :attachment="attachment">
            </AttachmentCarouselItem>
            <v-overlay
              contained
              persistent
              no-click-animation
              model-value
              :scrim="false"
              content-class="align-center d-flex flex-column w-100 h-100 py-3 justify-end pointer-pass-through">
              <v-chip
                :text="`${ currentIndex + 1 } / ${item.attachments?.length }`"
                color="#eee"
                size="small"
                variant="flat"
              ></v-chip>
            </v-overlay>
          </v-carousel>
        </v-col>
        <v-col class="item-description">
          <v-container>
            <v-row>
              {{ item?.description }}
            </v-row>
            <v-row class="item-price">{{ priceAsCurrency(item.purchasePrice) }}</v-row>
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

.item-price {
  padding: 0.5em;
  font-weight: bold;
  font-family: monospace;
}

.item-img {
  width:80%;
}
</style>