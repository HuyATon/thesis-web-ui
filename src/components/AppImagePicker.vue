<template>
  <div>
    <div>
      <img
        :src="imageUrl || placeholderImage"
        alt="Preview"
        class="img-fluid rounded shadow"
        style="max-width: 400px"
      />
    </div>

    <label
      class="app-btn-primary mt-2 p-2 rounded"
      :for="inputId"
      style="cursor: pointer"
    >
      {{buttonTitle}}
      <input
        :id="inputId"
        type="file"
        class="d-none"
        accept="image/*"
        @change="onFileChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "AppImagePicker",
  props: {
    placeholderImage: {
      type: String,
      default: "",
    },
    buttonTitle: {
      type: String,
      default: "Choose Image"
    }
  },
  data() {
    return {
      imageUrl: null,
      inputId: "image-picker-" + Math.random().toString(36).substr(2, 9),
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.imageUrl = null;
      }
    },
  },
};
</script>

<style scoped>
img {
  aspect-ratio: 1 / 1;
  width: 256px;
  background: white;
  border: 1px solid #ddd;
}
</style>