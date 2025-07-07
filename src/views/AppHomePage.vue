<script setup>
import axios from "axios";
import { ref } from "vue";
import AppImagePicker from "../components/AppImagePicker.vue";
import AppImageView from "../components/AppImageView.vue";
import AppLoadingOverlay from "../components/AppLoadingOverlay.vue";
</script>

<template>
  <div class="container-fluid p-0">
    <div class="container py-3">
      <div class="text-center">
       <div class="app-container mb-4">
         <h2>Image Inpainting</h2>
        <h5 class="mb-3">
          Demonstration of image inpainting follows Transformer-based approach.
        </h5>
        <p class="mb-2">
          Provide a tuple of image: an image of human face & an according
          mask (256x256 image size is preferred).
        </p>
        <p class="text-secondary">
          Visit the
          <a href="/benchmark" class="link-primary"> benchmark </a> of
          Continously Transformer Mamba (proposed) on CelebA-HQ.
        </p>
      </div>
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
            <AppImageView caption="Baseline" :src="this.baseline" />
            <AppImageView caption="Proposed" :src="this.proposed" />
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
      baseline: null,
      proposed: null,
      endpoint: 'https://05b4-34-125-164-154.ngrok-free.app/inpaint',
    };
  },
  computed: {
    isEnabled() {
      return this.mask !== null && this.gt !== null;
    }
  },
  methods: {
    handleImagePicked(file, pickType) {
      console.log("Image picked:", file, pickType);
      if (!file) { return }
      if (pickType === "image") {
        this.gt = file;
      } else {
        this.mask = file;
      }
    },
    async handleSubmit() {
      this.isLoading = true
      const formData = new FormData()
      formData.append('image', this.gt)
      formData.append('mask', this.mask)
      console.log([...formData.entries()])
      console.log(this.gt)
      try {
        const response = await axios.post(this.endpoint, formData)
        this.proposed = `data:image/png;base64,${response.data.mamba}`
        this.baseline = `data:image/png;base64,${response.data.cmt}`
      }
      catch (error) {
        alert("Something went wrong. Please try again.")
      }
      finally {
        this.isLoading = false
      }
    },
  },
};
</script>