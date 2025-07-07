<template>
  <div class="editor-container mt-3">
    <div class="canvas-container app-rounded" ref="container">
      <img
        ref="image"
        :src="this.imageSrc || 'https://placehold.co/256'"
        @load="onImageLoad"
        class="background app-rounded"
        alt="background"
      />
      <div class="position-absolute backdrop app-rounded"></div>
      <canvas
        ref="canvas"
        class="overlay app-rounded"
        @mousedown="startDrawing"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @mousemove="draw"
      ></canvas>
    </div>
    <button
      class="mt-2 p-2 app-rounded border-0 app-btn-primary"
      style="cursor: pointer"
      @click="reset"
    >
      Reset
    </button>
  </div>
</template>

<script>
export default {
  name: "MaskEditor",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    brushSize: {
        type: Number,
        required: true,
    }
  },
  data() {
    return {
      isDrawing: false,
      ctx: null,
      canvasSize: 256,
    };
  },
  methods: {
    reset() {
      const canvas = this.$refs.canvas;
      canvas.width = this.canvasSize;
      canvas.height = this.canvasSize;
      this.ctx = canvas.getContext("2d");
      this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    },
    onImageLoad() {
      this.reset();
    },
    startDrawing(e) {
      this.isDrawing = true;
      this.draw(e);
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    draw(e) {
      if (!this.isDrawing) return;
      if (!this.imageSrc) return;

      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.ctx.fillStyle = "white";
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.brushSize, 0, Math.PI * 2);
      this.ctx.fill();
      this.exportMask()
    },
    exportMask() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(
        0,
        0,
        this.canvasSize,
        this.canvasSize
      );
      const data = imageData.data;

      // Create a new canvas for the binary mask
      const outCanvas = document.createElement("canvas");
      outCanvas.width = this.canvasSize;
      outCanvas.height = this.canvasSize;
      const outCtx = outCanvas.getContext("2d");
      const outImageData = outCtx.createImageData(
        this.canvasSize,
        this.canvasSize
      );
      const outData = outImageData.data;

      // Set white for drawn, black for background
      for (let i = 0; i < data.length; i += 4) {
        const isWhite =
          data[i] === 255 &&
          data[i + 1] === 255 &&
          data[i + 2] === 255 &&
          data[i + 3] === 255;
        outData[i] = isWhite ? 255 : 0; // R
        outData[i + 1] = isWhite ? 255 : 0; // G
        outData[i + 2] = isWhite ? 255 : 0; // B
        outData[i + 3] = 255; // A (opaque)
      }

      outCtx.putImageData(outImageData, 0, 0);

      // Export as PNG and emit to parent
      outCanvas.toBlob((blob) => {
        const file = new File([blob], "mask.png", { type: "image/png" });
        this.$emit("mask-exported", file);
      }, "image/png");
    },
  },
};
</script>

<style scoped>
.canvas-container {
  position: relative;
  width: 256px;
  height: 256px;
}
.background {
  position: absolute;
  width: 256px;
  height: 256px;
  z-index: 0;
}
.overlay {
  position: absolute;
  width: 256px;
  height: 256px;
  z-index: 1;
  cursor: crosshair;
}
.backdrop {
  position: absolute;
  width: 256px;
  height: 256px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 0;
}
</style>
