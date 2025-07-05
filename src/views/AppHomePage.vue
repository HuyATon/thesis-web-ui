<script setup>
import AppImagePicker from "../components/AppImagePicker.vue";
import AppImageView from "../components/AppImageView.vue";
import AppLoadingOverlay from "../components/AppLoadingOverlay.vue";
</script>

<template>
  <div class="container-fluid p-0">
    <div class="container py-3">
      <div class="text-center">
        <h1>Image Inpainting</h1>
        <h5 class="mb-3">
          Demonstration of image inpainting follows Transformer-based approach.
        </h5>
        <p class="mb-2">
          📚 Provide a tuple of image: an image of human face & an according
          mask (256x256 image size is preferred).
        </p>
        <p class="text-secondary">
          🔎 Visit the
          <a href="/benchmark" class="link-primary"> benchmark </a> of
          Continously Transformer Mamba (proposed) on CelebA-HQ.
        </p>
      </div>
      <div class="row justify-content-center">
        <div class="col">
          <div class="row">
            <AppImagePicker
              placeholderImage="https://icons.veryicon.com/png/o/education-technology/power-icon/face-recognition-1.png"
              @picked="handleImagePicked"
            />
          </div>
          <div class="row">
            <AppImagePicker
              pickType="mask"
              buttonTitle="Choose Mask"
              class="mt-3"
              placeholderImage="https://icons.veryicon.com/png/o/application/designe-editing/layer-13.png"
              @picked="handleImagePicked"
            />
          </div>
        </div>

        <div class="col d-flex flex-column justify-content-center">
          <div class="d-flex justify-content-between align-items-center">
            <AppImageView caption="Baseline" />
            <AppImageView caption="Proposed" />
          </div>
          <div class="w-100 mt-3 text-center">
            <button
              class=" mt-2 p-2 rounded border-0"
              :class="{ 'app-btn-primary' : this.isEnabled,
                        'app-disabled-btn' : !this.isEnabled,
              }"
              :disabled="!this.isEnabled"
              style="cursor: pointer"
              @click="handleSubmit"
            >
              Process
            </button>
          </div>
        </div>
      </div>
      <!-- Spinner overlay -->
      <AppLoadingOverlay :isLoading="isLoading" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHomePage",
  data() {
    return {
      isLoading: false,
      gt: null,
      mask: null,
    };
  },
  computed: {
    isEnabled() {
      return this.mask !== null && this.gt !== null;
    }
  },
  methods: {
    handleImagePicked(file, pickType) {
      if (!file) { return }
      if (pickType === "image") {
        this.gt = file;
      } else {
        this.mask = file;
      }
    },
    handleSubmit() {
      this.isLoading = true
    },
  },
};
</script>