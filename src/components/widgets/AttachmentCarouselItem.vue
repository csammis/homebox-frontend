<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Attachment, downloadAttachmentThumbnailFromEntity } from '../../models/HomeBox/attachment';
import { Entity } from '../../models/HomeBox/entity';

const props = defineProps<{attachment: Attachment, entity: Entity}>()
const thumbnailUrl = ref<string>();

onMounted(() => {
  Promise.all([
    downloadAttachmentThumbnailFromEntity(props.entity, props.attachment).then(
      r => thumbnailUrl.value = r),
    //downloadAttachmentFromEntity(props.entity, props.attachment).then(
    //  r => imageUrl.value = r)
  ])
})
</script>
<template>
  <v-carousel-item :src="thumbnailUrl" cover></v-carousel-item>
</template>