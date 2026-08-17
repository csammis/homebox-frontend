<script setup lang="ts">
import { shallowRef } from 'vue';
import { Entity } from '../../models/HomeBox/entity';
import AttachmentCarouselItem from './AttachmentCarouselItem.vue';

const currentIndex = shallowRef(0)
const props = defineProps<{item : Entity}>()

</script>
<template>
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
</template>