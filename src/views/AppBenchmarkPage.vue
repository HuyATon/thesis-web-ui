<script setup>
import url from '../assets/test.jpg'
const images = [
    url,
    url,
    url
]
const samples = import.meta.glob('@/assets/samples/*.png', {
  eager: true,
  import: 'default'
})

</script>

<template>
  <div class="container-fluid p-0">
    <div class="container d-flex flex-column align-items-center py-3">
      <h1 class="mb-3">Benchmark</h1>
      <p class="mb-3">Comparision between the proposed and common inpainting models</p>
    
      <h5>Sample from proposed</h5>
      <p>100 samples from proposed testing dataset.</p>
      <div class="d-flex flex-column align-items-center p-3 sample-container">
        <div v-for="(img, idx) in samples"
            :key="idx"
        >
            <div class="d-flex justify-content-around w-100 mt-3 mb-1">
                <div class="text-center">
                    Masked
                </div>
                 <div class="text-center">
                    GT
                </div>
                 <div class="text-center">
                    Proposed
                </div>
            </div>
            <img :src="img" class="" alt="">
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

img {
  width: 384px;
}
</style>

<script>
export default {
  name: "AppBenchmarkPage"
};
</script>