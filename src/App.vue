<script setup lang="ts">
import bannerUrl from '@/assets/pgop-banner.png'
</script>
<template>
  <div class="banner">
    <header>
      <div class="title">
        <a href="https://prettygoodonpaper.com">
          <v-img :src="bannerUrl" width="fit-content"></v-img>
        </a>
      </div>
    </header>
  </div>
  <div class="main">
    <main>
      <v-container fluid class="d-flex justify-center gx-1">
        <a href="https://prettygoodonpaper.com">
          <v-btn prepend-icon="mdi-home" rounded="xl" class="mx-4 pa-3">
            Home
          </v-btn>
        </a>
        <v-btn prepend-icon="mdi-format-list-text" rounded="xl" class="mx-4 pa-3">
          <RouterLink style="text-decoration: none; color: inherit;" to="/">Listings</RouterLink>
        </v-btn>
        <v-btn prepend-icon="mdi-mail" rounded="xl" class="mx-4 pa-3">
          <RouterLink style="text-decoration: none; color: inherit;" to="/contact">Contact</RouterLink>
        </v-btn>
      </v-container>
      <RouterView />
    </main>
  </div>
  <footer>
    <div>Copyright 2026 by Pretty Good On Paper</div>
  </footer>
</template>
<style lang="css" scoped>
header {
  top: 0px;
  margin: 0px;
  padding: 0.1em 0.5em;
  vertical-align: middle;
  background-color: var(--color-banner);
  width: 100%;
}

footer {
  margin-top: 1em;
  padding: 0.1em 0.5em;
  vertical-align: middle;
  background-color: var(--color-banner);
  width: 100%;
}

.main {
  padding: 1em;
}
</style>