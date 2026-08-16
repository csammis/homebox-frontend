<script setup lang="ts">
import { ref } from 'vue';
import { Entity, getEntityThumbnail} from '../../models/HomeBox/entity';
import { firstSentence, priceAsCurrency } from '../../utilities/formatters';

const imageUrl = ref<string>()
const props = defineProps<{ item: Entity }>()

getEntityThumbnail(props.item).then(function (response) {
  imageUrl.value = response
});

const routeToDetails = () => { return "/details/" + props.item.id };
</script>

<template>
  <v-col class="item-card" cols="4">
    <RouterLink :to="routeToDetails()">
      <div class="item-name"><h2>{{ item.name }}</h2></div>
      <div class="item-img-container">
        <v-img aspect-ratio="1/1" cover :src="imageUrl" :title="item.name" />
      </div>
    </RouterLink>
    <div class="item-description">{{ firstSentence(item.description) }}</div>
    <div class="item-price">{{ priceAsCurrency(item.purchasePrice) }}</div>
  </v-col>
</template>
<style lang="css" scoped>
.item-card {
  border: solid 2px var(--color-border);
  border-radius: 5px;
  padding: 0.5em;
}

.item-img-container {
  display:flex;
  justify-content: center;
}

.item-name {
  margin-top: 0.2em;
  font-weight: bold;
  width:100%;
}

.item-description {
  margin-top: 0.5em;
  font-style: italic;
}

.item-price {
  font-weight: bold;
  font-family: monospace;
}

.item-img {
  width: 90%;
  aspect-ratio: 1;
}
</style>
