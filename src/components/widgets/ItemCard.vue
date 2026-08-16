<script setup lang="ts">
import { ref } from 'vue';
import { Entity, getEntityImage } from '../../models/HomeBox/entity';
import { firstSentence, priceAsCurrency } from '../../utilities/formatters';

const imageUrl = ref<string>()
const props = defineProps<{ item: Entity }>()

getEntityImage(props.item).then(function (response) {
  imageUrl.value = response
});

const routeToDetails = () => { return "/details/" + props.item.id };
</script>

<template>
  <v-col class="item-card">
    <RouterLink :to="routeToDetails()">
      <div class="item-name">{{ item.name }}</div>
    </RouterLink>
    <div class="item-img-container">
      <img class="item-img" :src="imageUrl" :title="item.name" />
    </div>
    <div class="item-description">{{ firstSentence(item.description) }}</div>
    <div class="item-price">{{ priceAsCurrency(item.purchasePrice) }}</div>
  </v-col>
</template>
<style lang="css" scoped>
.item-card {
  border: solid 2px var(--color-border);
  border-radius: 5px;
  padding: 0.5em;
  margin: 1em;
}

.item-name {
  margin-top: 0.2em;
  font-size:larger;
  font-weight: bold;
}

.item-description {
  font-style: italic;
}

.item-price {
  font-weight: bold;
  font-family: monospace;
}

.item-img {
  width: 80%;
}
</style>
