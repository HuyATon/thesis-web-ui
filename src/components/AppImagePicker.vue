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
      :for="pickType"
      style="cursor: pointer"
    >
      {{buttonTitle}}
      <input
        :id="pickType"
        type="file"
        class="d-none"
        accept="image/*"
        @change="onFileChange"
      />
    </label>
  </div>
</template>

<script>
  const PickType = {
    IMAGE: 'image',
    MASK: 'mask'
  }
export default {
  name: "AppImagePicker",
  emits: ['picked'],
  props: {
    placeholderImage: {
      type: String,
      default: "",
    },
    buttonTitle: {
      type: String,
      default: "Choose Image"
    },
    pickType: {
      type: String,
      default: PickType.IMAGE
    }
  },
  data() {
    return {
      imageUrl: null
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.imageUrl = URL.createObjectURL(file)
        this.$emit('picked', file, this.pickType)
      } else {
        this.imageUrl = null;
        this.$emit('picked', null)
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