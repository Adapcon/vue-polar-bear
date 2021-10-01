<template>
  <div
    class="gallery-container"
    :style="{
      width: normalizeSize( width || size, 1, 'width' ),
      height: normalizeSize( height || size, 1 )}"
  >
    <div style="display: flex;">
      <div
        class="gallery-images-transitions pb-scroll-primary layer-overlay"
        :style="galleryImagesTransitionsStyle"
      >
        <img
          v-for="( image, index ) in state.filteredImages"
          :key="index"
          :src="image"
          :style="{ width: width || size, height: normalizeSize(height || size, 1, 'height')}"
        >
      </div>
      <div
        v-if="images.length > 1"
        class="gallery-align-icon"
        :style="{ padding: !state.openedIcon ? '0px' : '5px' }"
        @click="toggleImages"
      >
        <PbIcon
          :style="{ color: `var(--color-${ color ? color : 'primary' })` }"
          :icon="`fas fa-sort-up fa-rotate-${ state.openedIcon ? '270' : '90' }`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import { validateCssUnit, validateColor } from '@pb/utils/validator';

export default {
  name: 'PbGalleryImage',

  components: {
    PbIcon,
  },

  props: {
    images: { type: Array, default: () => [] },

    color: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },

    height: {
      type: String,
      default: '50px',
      validator: height => (height ? validateCssUnit(height) : true),
    },

    width: {
      type: String,
      default: '50px',
      validator: width => (width ? validateCssUnit(width) : true),
    },

    size: {
      type: String,
      default: '50px',
    },
  },

  data() {
    return {
      state: {
        openedIcon: false,
        filteredImages: [this.images[0]],
      },

    };
  },

  computed: {
    galleryImagesTransitionsStyle() {
      return {
        width: !this.state.openedIcon
          ? this.width || this.size
          : this.normalizeSize(this.width || this.size, this.images.length === 2 ? 2 : 3, 'width'),
        height: this.height || this.size,
        overflow: !this.state.openedIcon ? 'hidden' : 'auto',
      };
    },

  },

  watch: {
    'state.openedIcon': {
      handler() {
        if (this.state.openedIcon) {
          this.state.filteredImages = this.images;
        } else {
          setTimeout(() => {
            this.state.filteredImages = [this.images[0]];
          }, 1000);
        }
      },
    },
  },

  methods: {
    normalizeSize(text, size, direction) {
      const splitNumber = text.split(/[^0-9]/);
      const splitString = text.split(/[^a-zA-Z]+/);
      if (!direction || direction === 'width') {
        // eslint-disable-next-line radix
        return `${(parseInt(splitNumber[0]) - (size === 1 ? -2 : 10)) * size}${splitString[1]}`;
      }
      // eslint-disable-next-line radix
      return `${parseInt(splitNumber[0]) - 5}${splitString[1]}`;
    },

    toggleImages() {
      this.state.openedIcon = !this.state.openedIcon;
      this.$emit('toggleImages', this.state.openedIcon);
      return this.state.openedIcon;
    },

  },
};
</script>
<style lang="scss" scoped>
  .gallery-container {
    display: flex;
    background-color: var(--color-white);

    .gallery-images-transitions {
      display: flex;
      flex-wrap: nowrap;
      transition: width 1s;
    }

    .gallery-align-icon {
      display: flex;
      align-self: center;
      justify-content: center;
    }
  }
</style>
