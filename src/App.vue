<template>
  <div class="banner">
    <header>
      <div class="title">
        <img src="@/assets/pgop-logo.svg" width="500px" title="Pretty Good On Paper logo" />
      </div>
    </header>
  </div>
  <div class="main">
    <main>
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