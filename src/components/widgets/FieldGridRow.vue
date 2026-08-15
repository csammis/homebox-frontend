<script setup lang="ts">
import { Field } from '../../models/HomeBox/field';

const props = defineProps<{field: Field}>()
function renderFieldValue() : string {
  switch (props.field.type) {
    case "text":
      return props.field.textValue;
    case "number":
      return props.field.numberValue.toString();
    case "boolean":
      return props.field.booleanValue ? "True" : "False"
  }
  return ""
}
</script>
<template>
  <v-row>
    <v-col class="field-name">
      {{ field.name }}
    </v-col>
    <v-col class="field-value">
      {{ renderFieldValue() }}
    </v-col>
  </v-row>
</template>
<style lang="css" scoped>
.field-name {
  font-weight: bold;
}
</style>