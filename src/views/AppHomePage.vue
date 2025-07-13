<script setup>
import axios from "axios";
import { ref } from "vue";
import AppImagePicker from "../components/AppImagePicker.vue";
import AppImageView from "../components/AppImageView.vue";
import AppLoadingOverlay from "../components/AppLoadingOverlay.vue";
import AppMaskEditor from "../components/AppMaskEditor.vue";
</script>

<template>
  <div class="container-fluid">
    <div class="container py-3">
      <div class="text-center">
        <div class="app-container mb-4">
          <h2>Image Inpainting</h2>
          <h5 class="mb-3">
            Demonstration of image inpainting follows Transformer-based
            approach.
          </h5>
          <p class="mb-2">
            Provide a tuple of image: an image of human face & an according mask
            (256x256 image size is preferred).
          </p>
          <p class="text-secondary">
            Visit the
            <a href="/benchmark" class="link-primary"> benchmark </a> of
            Hybrid Mamba Transformer (proposed) on CelebA-HQ.
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col position-relative">
          <div class="position-absolute top-0 start-50 app-container-base" style="width: 250px;">
            <h6 class="w-100 text-center">Setting</h6>
            <div class="d-flex justify-content-between w-100">
              <div class="me-2">
                Draw Mask:
              </div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  v-model="isDrawing"
                />
            </div>
            </div>
            <div v-if="isDrawing" class="d-flex justify-content-between w-100">
              <label for="customRange2" class="form-label">Brush Size:</label>
              <div class="d-flex justify-content-between">
                <div class="fs-6 font-monospace me-2" >1</div>
                <div>
                  <input
                  v-model="brushSize"
                  type="range"
                  class="form-range"
                  min="1"
                  max="25"
                  id="customRange2"
                  style="width: 70px;"
                />
                </div>
                <div class="fs-6 font-monospace ms-2" >25</div>
              </div>
            </div>
          </div>
          <AppImagePicker
            placeholderImage="https://icons.veryicon.com/png/o/education-technology/power-icon/face-recognition-1.png"
            @picked="handleImagePicked"
          />
          <AppMaskEditor
            v-if="isDrawing"
            :imageSrc="this.gtUrl"
            :brushSize="this.brushSize"
            @mask-exported="handleMaskDrawn"
          />
          <AppImagePicker
            v-else
            pickType="mask"
            buttonTitle="Choose Mask"
            class="mt-3"
            placeholderImage="https://icons.veryicon.com/png/o/application/designe-editing/layer-13.png"
            @picked="handleImagePicked"
          />
        </div>

        <div class="col d-flex flex-column justify-content-center">
          <div class="d-flex justify-content-around align-items-center">
            <AppImageView caption="Baseline" :src="this.baseline" />
            <AppImageView caption="Proposed" :src="this.proposed" />
          </div>
          <div class="w-100 mt-3 text-center">
            <button
              class="mt-2 p-2 app-rounded border-0"
              :class="{
                'app-btn-primary': this.isEnabled,
                'app-disabled-btn': !this.isEnabled,
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
      isDrawing: true,
      gt: null,
      mask: null,
      baseline: null,
      proposed: null,
      brushSize: 10,
      endpoint: "https://1815-34-127-52-102.ngrok-free.app/inpaint",
    };
  },
  computed: {
    isEnabled() {
      return this.mask !== null && this.gt !== null;
    },
    gtUrl() {
      if (this.gt instanceof File) {
        return URL.createObjectURL(this.gt);
      }
    },
  },
  methods: {
    handleImagePicked(file, pickType) {
      console.log("Image picked:", file, pickType);
      if (!file) {
        return;
      }
      if (pickType === "image") {
        this.gt = file;
      } else {
        this.mask = file;
      }
    },
    async handleSubmit() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("image", this.gt);
      formData.append("mask", this.mask);
      console.log([...formData.entries()]);
      console.log(this.gt);
      try {
        const response = await axios.post(this.endpoint, formData);
        this.proposed = `data:image/png;base64,${response.data.mamba}`;
        this.baseline = `data:image/png;base64,${response.data.cmt}`;
      } catch (error) {
        alert("Something went wrong. Please try again.");
      } finally {
        this.isLoading = false;
      }
    },
    handleMaskDrawn(mask) {
      this.mask = mask;
    },
  },
};
</script>