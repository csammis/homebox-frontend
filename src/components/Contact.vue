<script setup lang="ts">
import { computed, nextTick, onMounted, ref, shallowRef } from 'vue';
import { ContactForm, getRandomChallenge, postContact } from '../models/service/contact';
import { useHead } from '@unhead/vue';
import { NameNotBlank, SubjectNotBlank } from '../utilities/formrules';
import { useDisplay } from 'vuetify';

const modelValue = ref(new ContactForm) // defineModel<ContactForm>({default: () => new ContactForm()});
const challengeText = ref("")

const form = ref()

const snackbarOpen = shallowRef(false)
const snackbarColor = shallowRef("")
const snackbarText = shallowRef("")

const contactFormOpen = shallowRef(true)
const submitting = shallowRef(false)

useHead({title: "Contact"})

function showSnackbarError(message: string) {
  snackbarColor.value = "error";
  snackbarText.value = message;
  snackbarOpen.value = true;
}

async function submitModel() {
  snackbarOpen.value = false;
  submitting.value = true;
  await nextTick();

  const { isValid } = form.value.validate();

  if (isValid === false) {
    showSnackbarError("All fields must be filled out to send a message.");
  } else {
    postContact(modelValue.value).then(success => {
      if (success) {
        contactFormOpen.value = false;
      } else {
        showSnackbarError("Your message was not able to be sent. Please try again in a few minutes.");
      }
    })
  }
  submitting.value = false;
}

onMounted(() => {
  getRandomChallenge().then(c => {
    modelValue.value.challengeKey = c.key;
    challengeText.value = c.text;
  }
)
})

const { xs } = useDisplay();

const cols = computed(() => {
  return xs.value ? [12, 6] : [6, 3];
})


</script>
<template>
<v-container fluid v-if="contactFormOpen">
  <v-form validate-on="blur" ref="form" @submit.prevent>
  <v-row><div class="text-headline-large">Contact</div></v-row>
  <v-row density="comfortable">
    <v-col :cols="cols[0]">
      <v-text-field density="comfortable" label="Name"
                    :rules="NameNotBlank" v-model="modelValue.name"></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col :cols="cols[0]">
      <v-text-field density="comfortable" label="Subject"
                    :rules="SubjectNotBlank" v-model="modelValue.subject"></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col :cols="cols[0]">
      <v-textarea label="Message" counter="250" v-model="modelValue.message"></v-textarea>
    </v-col>
  </v-row>
  <v-row>
    <v-col :cols="cols[1]">
      <span>Human check!</span><br />
      <span class="text-body-large">{{ challengeText }}</span>
    </v-col>
    <v-col :cols="cols[1]">
      <input type="hidden" name="challengeKey" :value="modelValue.challengeKey">
      <v-number-input density="comfortable" :min="0" v-model="modelValue.challengeResponse"></v-number-input>
    </v-col>
  </v-row>
  <v-row>
    <v-col :cols="cols[0]">
      <v-btn class="mt-2" @click="submitModel" block>
        <span v-if="submitting === false">Submit</span>
        <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
      </v-btn>
    </v-col>
  </v-row>
</v-form>
</v-container>
<v-container fluid v-else>
  <v-row><div class="text-headline-large">Thanks!</div></v-row>
  <v-row><span>Your message has been sent.</span></v-row>
    <v-row>
      <RouterLink to="/"><< Go to inventory listings</RouterLink>
    </v-row>
</v-container>
<v-snackbar v-model="snackbarOpen" timeout="5000" :color="snackbarColor">
  {{ snackbarText }}
  <template v-slot:actions>
    <v-btn variant="text" @click="snackbarOpen = false"> Close </v-btn>
  </template>
</v-snackbar>
</template>