<template>
  <div
    class="pb-upload-container"
    :class="{
      'circle-drop-zone': round,
    }"
    :style="{
      'border-color': `var(--color-${primaryColor})`,
      'cursor': disabled ? '' : 'pointer',
      'background-color': state.beingHovered ? `var(--color-${primaryColor})` : '',
    }"
    @dragover.prevent
    @drop.prevent="dropHandler"
    @dragenter="dragEnterHandler"
    @dragleave="dragLeaveHandler"
    @click="clickHandler"
  >
    <template v-if="!hasSlot && !isLoading">
      <PbIcon
        icon="fas fa-upload"
        class="upload-icon"
        :style="{
          'color': state.beingHovered
            ? `var(--color-${secondaryColor})`
            : `var(--color-${primaryColor})`,
        }"
      />

      <p
        v-if="showDragZoneLabel && !round"
        class="pb drop-zone-title"
        :style="{
          'color': state.beingHovered
            ? `var(--color-${secondaryColor}) !important`
            : `var(--color-${primaryColor}) !important`,
        }"
      >
        Arraste e solte o arquivo ou clique para selecionar.
      </p>

      <input
        ref="upload-input"
        type="file"
        :accept="accept"
        :disabled="disabled"
        style="display: none;"
        @click.stop
        @change="fileHandler"
      >
    </template>

    <slot v-if="!isLoading" />

    <template v-if="isLoading">
      <PbPulseLoading
        :color="state.beingHovered ? secondaryColor : primaryColor"
      />

      <h3
        v-if="showDragZoneLabel && !round"
        class="pb drop-zone-title"
        :style="{
          'color': state.beingHovered
            ? `var(--color-${secondaryColor}) !important`
            : `var(--color-${primaryColor}) !important`,
        }"
      >
        Carregando...
      </h3>
    </template>
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import PbPulseLoading from '@pb/Loadings/PulseLoading/PulseLoading.vue';

import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbUpload',

  components: {
    PbIcon,
    PbPulseLoading,
  },

  props: {
    primaryColor: {
      type: String,
      default: 'gray-40',
      validator: color => validateColor(color),
    },

    secondaryColor: {
      type: String,
      default: 'white',
      validator: color => validateColor(color),
    },

    showDragZoneLabel: {
      type: Boolean,
      default: true,
    },

    round: {
      type: Boolean,
      default: false,
    },

    accept: {
      type: String,
      default: '*',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    hasSlot: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      state: {
        beingHovered: false,
      },
    };
  },

  methods: {
    clickHandler() {
      if (!this.disabled)
        this.$refs['upload-input'].click();
    },

    dragEnterHandler() {
      if (this.disabled) return;
      this.state.beingHovered = true;
    },

    dragLeaveHandler() {
      if (this.disabled) return;
      this.state.beingHovered = false;
    },

    dropHandler(event) {
      if (this.disabled) return;
      const { files } = event.dataTransfer;
      this.$emit('change', files);

      this.state.beingHovered = false;
    },

    fileHandler(event) {
      if (!this.disabled)
        this.$emit('change', event.target.files);
    },
  },
};
</script>

<style lang="scss" scoped>
  .pb-upload-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all .1s ease;

    border: 2px dashed;
    border-radius: 10px;

    .upload-icon {
      position: relative;
      width: 40%;
      height: 40%;
      max-width: 40px;
      max-height: 48px;
      opacity: 0.98;
      pointer-events: none;
    }

    .drop-zone-title {
      margin-top: 24px !important;
      max-width: 65%;
      text-align: center;
      user-select: none;
      pointer-events: none;
    }
  }

  .circle-drop-zone {
    border-radius: 50%;
  }
</style>
