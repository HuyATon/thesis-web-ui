<template>
  <div class="card">
    <img
      class="card-img-top"
      :src="src || 'https://placehold.co/256'"
      alt="Card image"
    >
    <div class="card-body">
      <p class="card-text text-center">{{ caption }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppImageView",
  props: {
    caption: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: "" 
    }
  }
};
</script>

<style scoped>
img {
  aspect-ratio: 1 / 1;
  width: 256px;
  object-fit: cover;
}
</style>
