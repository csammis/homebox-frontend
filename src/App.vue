<script setup lang="ts">
import HomeScreen from './components/HomeScreen.vue';
</script>

<template>
  <div class="banner">
    <header>
      <div class="title">Pretty Good On Paper</div>
      <div class="subtitle">An Unprofitable Side Hustle</div>
    </header>
  </div>
  <div class="main">
    <main>
      <HomeScreen />
    </main>
  </div>
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

.title {
  font-size: 3em;
}

.subtitle {
  font-style: italic;
  padding-left:1em;
}

.main {
  padding-left: 2em;
  padding-top: 1em;
}

svg {
  width: 24px;
  height: 24px;
  margin-right: 0.5em;
}

.nav-menu-item {
  padding: 0.5em;
}

.nav-menu-item,
.nav-menu-item > a,
.nav-menu-item > svg {
  vertical-align: middle;
}

.nav-menu-item > a,
a:visited {
  color: var(--vt-teal-ligthen-5);
  text-decoration: underline;
}

.indent1 {
  margin-left: 1em;
}
</style>