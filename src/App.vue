<script setup>
import AppHomePage from './views/AppHomePage.vue'


</script>

<template>
    <!-- <AppHomePage/> -->
    <div id="main" class="container-fluid">
        <AppHomePage/>
    </div>
</template>

<style>
#main {
  font-family: 'Ubuntu';
  background-color: #F7F7F7;
  padding: 0;
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