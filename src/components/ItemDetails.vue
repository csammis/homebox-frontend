<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Entity, getEntity } from '../models/HomeBox/entity';
import { useHead } from '@unhead/vue';
import FieldGridRow from './widgets/FieldGridRow.vue';
import { htmlizeLineBreaks, priceAsCurrency } from '../utilities/formatters.ts';
import AttachmentCarousel from './widgets/AttachmentCarousel.vue';

const props = defineProps<{ id: string }>()
const item = ref<Entity>();

useHead({title: "Item Details"})

onMounted(() => {
  getEntity(props.id).then(function (entityResponse) {
    item.value = entityResponse
  })
})
</script>
<template>
  <div v-if="item === undefined" class="item-missing">
    No item found by that ID.
  </div>
  <v-container v-else fluid class="w-100">
    <v-row><div class="item-title"><h1>{{ item?.name }}</h1></div></v-row>
    <v-row>
      <v-col>
        <AttachmentCarousel :item="item" />
      </v-col>
      <v-col class="item-description">
        <v-container>
          <v-row>
            <div v-html="htmlizeLineBreaks(item?.description)"></div>
          </v-row>
          <v-row>
            <v-col class="item-price">{{ priceAsCurrency(item.purchasePrice) }}</v-col>
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
          <v-row>
            <v-col cols="2"></v-col>
            <v-col class="d-flex justify-center align-center">
              <v-btn>
                <RouterLink style="text-decoration: none; color: inherit;" class="mt-4" to="/contact">Send a message</RouterLink>
              </v-btn>
            </v-col>
            <v-col cols="2"></v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <RouterLink to="/"><< Go to item listings</RouterLink>
    </v-row>
  </v-container>
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