<script>
export default {
    name: 'AppLoadingOverlay',
    props: {
        isLoading: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<template>
    <div v-if="isLoading" class="position-fixed h-100 w-100 spinner-overlay d-flex justify-content-center align-items-center">
      <div class="loading-container bg-light py-5 d-flex flex-column align-items-center px-5 rounded">
        <div class="spinner-border" role="status"/>
        <span class="mt-2">Processing...</span>
      </div>
    </div>
</template>


<style scoped>
.spinner-overlay {
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.75);
  z-index: 10;
}
.spinner-border {
    /* color: F5F0CD; */
}
.loading-container {
  width: 220px;
  height: 160px;
}
</style>