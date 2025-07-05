<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AppImagePicker from "../components/AppImagePicker.vue";
import AppImageView from "../components/AppImageView.vue";
import AppLoadingOverlay from "../components/AppLoadingOverlay.vue";

// REPLACE THIS Flask endpoint
const backendUrl = 'https://309c-34-125-150-129.ngrok-free.app/inpaint'

const imageFile = ref(null)
const maskFile = ref(null)
const resultImageUrl = ref(null)
const isLoading = ref(false)

function onImageSelect(file) {
  imageFile.value = file
  console.log("Selected image:", file)
}

function onMaskSelect(file) {
  maskFile.value = file
  console.log("Selected mask:", file)
}

// async function submitToBackend() {
//   console.log("Submitting:", imageFile.value, maskFile.value)

//   if (!imageFile.value || !maskFile.value) {
//     alert("Please select both an image and a mask.")
//     return
//   }

//   isLoading.value = true

//   const formData = new FormData()
//   formData.append('image', imageFile.value)
//   formData.append('mask', maskFile.value)

//   try {
//     const response = await axios.post(backendUrl, formData, {
//       responseType: 'blob',
//     })
//     const blob = new Blob([response.data], { type: 'image/png' })
//     resultImageUrl.value = URL.createObjectURL(blob)
//   } catch (error) {
//     alert("Error contacting backend")
//     console.error(error)
//   } finally {
//     isLoading.value = false
//   }
// }

async function submitToBackend() {
  if (!imageFile.value || !maskFile.value) {
    alert("Please select both an image and a mask.")
    return
  }

  isLoading.value = true

  const formData = new FormData()
  formData.append('image', imageFile.value)
  formData.append('mask', maskFile.value)

  try {
    const response = await axios.post(backendUrl, formData)
    cmtImage.value = `data:image/png;base64,${response.data.cmt}`
    mambaImage.value = `data:image/png;base64,${response.data.mamba}`
  } catch (error) {
    alert("Error contacting backend")
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

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
          🔎 Visit the <a href="/benchmark" class="link-primary"> benchmark </a> of
          Continously Transformer Mamba (proposed) on CelebA-HQ.
        </p>
      </div>
      <div class="row justify-content-center">
        <div class="col">
          <div class="row">
            <AppImagePicker @selected="onImageSelect"
              placeholderImage="https://icons.veryicon.com/png/o/education-technology/power-icon/face-recognition-1.png" />
          </div>
          <div class="row">
            <AppImagePicker buttonTitle="Choose Mask"  @selected="onMaskSelect" class="mt-3"
              placeholderImage="https://icons.veryicon.com/png/o/application/designe-editing/layer-13.png" />
          </div>
        </div>

        <div class="col d-flex flex-column justify-content-center">
          <div class="d-flex justify-content-between align-items-center">
            <AppImageView caption="Baseline" :src="cmtImage" />
            <AppImageView caption="Proposed" />
          </div>
          <div class="w-100 mt-3 text-center">
            <button class="app-btn-primary mt-2 p-2 rounded border-0" @click="submitToBackend" :disabled="isLoading" style="cursor: pointer">
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
    };
  },
};
</script>