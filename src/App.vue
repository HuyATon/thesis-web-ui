<script setup>
import AppHomePage from './views/AppHomePage.vue'


</script>

<template>
    <div id="app">
      <router-view />
    </div>
</template>

<style>
#app {
  font-family: 'Ubuntu';
  background-color: #F7F7F7;
  padding: 0;
  min-height: 100vh;
}

.app-btn-primary {
  background-color: #3674B5;
  color: white;
  font-weight: 510;
  width: 256px;
  text-align: center;
}

.app-btn-primary:hover {
  opacity: 0.8;
}
</style>