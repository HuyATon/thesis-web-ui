<script setup>
import url from '../assets/test.jpg'
import benchmarkImage from '../assets/benchmark/benchmark.png'

const images = [
    url,
    url,
    url
]
const samples = import.meta.glob('@/assets/samples/*.png', {
  eager: true,
  import: 'default'
})
const score = benchmarkImage

</script>

<template>
  <div class="container-fluid p-0">
    <div class="container d-flex flex-column align-items-center py-3">
      <div class="app-container">
        <h2 class="mb-3">Benchmark</h2>
        <p class="mb-3">Comparision between the proposed and common inpainting models</p>
        <img :src="score" class="img-score w-75 mb-5"  alt="Benchmark Score">
      </div>
      <div class="app-container w-100 mt-4">
         <h2>Sample Images </h2>
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
            <img :src="img" class="comparision" alt="">
            <hr v-if="idx !== images.length - 1" class="rounded">
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sample-container {
  width: 800px;
}

.comparision {
  width: 384px;
}


</style>



<script>
export default {
  name: "AppBenchmarkPage"
};
</script>