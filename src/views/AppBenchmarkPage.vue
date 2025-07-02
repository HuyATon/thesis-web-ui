<script setup>
import url from '../assets/test.jpg'
const images = [
    url,
    url,
    url
]
</script>

<template>
  <div class="container-fluid p-0">
    <div class="container d-flex flex-column align-items-center py-3">
      <h1 class="mb-3">Benchmark</h1>
      <p class="mb-3">Comparision between the proposed and common inpainting models</p>
    
      <h5>Sample from proposed</h5>
      <p>Sample images from proposed testing dataset.</p>
      <div class="d-flex flex-column align-items-center p-3 sample-container">
        <div v-for="(img, idx) in images"
            :key="idx"
        >
            <div class="d-flex justify-content-around w-100 mt-3 mb-1">
                <div class="text-center">
                    GT
                </div>
                 <div class="text-center">
                    Masked
                </div>
                 <div class="text-center">
                    Proposed
                </div>
            </div>
            <img :src="img" class="mb-3" alt="">
            <hr v-if="idx !== images.length - 1" class="rounded">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sample-container {
  width: 800px;
}
</style>

<script>
export default {
  name: "AppBenchmarkPage"
};
</script>