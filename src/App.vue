<script setup>
import AppHomePage from "./views/AppHomePage.vue";
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Ubuntu";
  background-color: #f7f7f7;
  padding: 0;
  min-height: 100vh;
}

.app-btn-primary {
  background-color: #3674b5;
  color: white;
  font-weight: 510;
  width: 256px;
  text-align: center;
}

.app-disabled-btn {
  background-color: #3674b5;
  color: white;
  font-weight: 400;
  width: 256px;
  text-align: center;
  opacity: 0.3;
}

.app-btn-primary:hover {
  opacity: 0.8;
}
</style>