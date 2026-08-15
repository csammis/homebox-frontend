<script setup lang="ts">
import { ref } from 'vue';
import { Entity, getEntityImage } from '../../models/HomeBox/entity';

const imageUrl = ref<string>()
const props = defineProps<{ item: Entity }>()

getEntityImage(props.item).then(function (response) {
  imageUrl.value = response
});

const routeToDetails = () => { return "/details/" + props.item.id };
</script>

<template>
  <div class="item-card">
    <RouterLink :to="routeToDetails()">
      <div class="item-name">{{ item.name }}</div>
    </RouterLink>
    <div class="item-img-container">
      <img class="item-img" :src="imageUrl" :title="item.name" />
    </div>
    <div class="item-description">{{ item.description }}</div>
  </div>
</template>
<style lang="css" scoped>
.item-card {
  width: 20%;
  border: solid 2px var(--color-border);
  border-radius: 5px;
  margin: 1em;
  aspect-ratio: 1;
}

.item-name {
  margin-top: 0.2em;
  font-size:larger;
  font-weight: bold;
}

.item-description {
  font-style: italic;
  margin-bottom: 0.2em;
}

.item-img {
  width: 80%;
}
</style>
