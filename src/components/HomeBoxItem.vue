<script setup lang="ts">
import { Entity } from '../models/HomeBox/entity';

const props = defineProps<{ item: Entity }>()
</script>

<template>
  <div class="item">
    <div class="item-name">{{ item.name }}</div>
    <div class="item-img">{{ item.image }}
    </div>
    <div class="item-description">{{ item.description }}</div>
  </div>
</template>

