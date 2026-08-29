<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Entity, getEntityThumbnail} from '../../models/HomeBox/entity';
import { firstSentence, priceAsCurrency } from '../../utilities/formatters';
import { useDisplay } from 'vuetify';

const imageUrl = ref<string>()
const props = defineProps<{ item: Entity }>()

onMounted(() =>
getEntityThumbnail(props.item).then(function (response) {
  imageUrl.value = response
}));

const routeToDetails = () => { return "/details/" + props.item.id };

const { xs } = useDisplay();

const cols = computed(() => {
  return xs.value ? 6 : 4;
})

</script>
<template>
  <v-col class="item-card" :cols="cols">
    <RouterLink :to="routeToDetails()">
      <div class="text-title-large w-100 mt-2">{{ item.name }}</div>
      <div class="d-flex justify-center">
        <v-img aspect-ratio="1/1" cover :src="imageUrl" :title="item.name" />
      </div>
    </RouterLink>
    <div class="d-none">{{ firstSentence(item.description) }}</div>
    <div class="font-weight-bold item-price">{{ priceAsCurrency(item.purchasePrice) }}</div>
  </v-col>
</template>
<style lang="css" scoped>
.item-card {
  border: solid 2px var(--color-border);
  border-radius: 5px;
  padding: 0.5em;
}

.item-price {
  font-weight: bold;
  font-family: monospace;
}

</style>
