<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ContactForm, getRandomChallenge, postContact } from '../models/service/contact';
import { useHead } from '@unhead/vue';
import { NameNotBlank, SubjectNotBlank } from '../utilities/formrules';

const modelValue = ref(new ContactForm) // defineModel<ContactForm>({default: () => new ContactForm()});
const challengeText = ref("")

useHead({title: "Contact"})

function submitModel() {
  postContact(modelValue.value).then(success => {
    if (success) {
      alert("yay");
    } else {
      alert("no");
    }
  })
}

onMounted(() => {
  getRandomChallenge().then(c => {
    modelValue.value.challengeKey = c.key;
    challengeText.value = c.text;
  }
)
})
</script>
<template>
<v-container fluid>
  <v-form validate-on="submit" v-on:submit="submitModel()" >
  <v-row><div class="text-headline-large">Contact</div></v-row>
  <v-row density="comfortable">
    <v-col cols="6">
      <v-text-field density="comfortable" label="Name"
                    :rules="NameNotBlank" v-model="modelValue.name"></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <v-text-field density="comfortable" label="Subject"
                    :rules="SubjectNotBlank" v-model="modelValue.subject"></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <v-textarea label="Message" counter="250" v-model="modelValue.message"></v-textarea>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="3">
      <span>Human check!</span><br />
      {{ challengeText }}
    </v-col>
    <v-col cols="1"></v-col>
    <v-col cols="2">
      <input type="hidden" name="challengeKey" :value="modelValue.challengeKey">
      <v-number-input density="comfortable" :min="0" v-model="modelValue.challengeResponse"></v-number-input>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-col>
  </v-row>
</v-form>
</v-container>
</template>