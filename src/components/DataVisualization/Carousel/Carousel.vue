<template>
  <div
    class="pb-carousel-container"
    :style="`cursor: ${cursorClass}`"
  >
    <div class="carousel-container">
      <VueperSlides
        :always-refresh-clones="alwaysRefreshClones"
        :arrows="arrows"
        :arrows-outside="arrowsOutside"
        :autoplay="autoplay"
        :breakpoints="breakpoints"
        :bullets="bullets"
        :bullets-outside="bulletsOutside"
        :disable="disable"
        :disable-arrows-on-edges="disableArrowsOnEdges"
        :dragging-distance="draggingDistance"
        :duration="duration"
        :infinite="infinite"
        :fade="fade"
        :fixed-height="fixedHeight"
        :fractions="fractions"
        :gap="gap"
        :init-slide="initSlide"
        :lazy="lazy"
        :lazy-load-on-drag="lazyLoadOnDrag"
        :pause-on-hover="pauseOnHover"
        :pause-on-touch="pauseOnTouch"
        :parallax="parallax"
        :page-scrolling-element="pageScrollingElement"
        :parallax-fixed-content="parallaxFixedContent"
        :prevent-y-scroll="preventYScroll"
        :progress="progress"
        :rtl="rtl"
        :slide-content-outside="slideContentOutside"
        :slide-content-outside-class="slideContentOutsideClass"
        :slide-image-inside="slideImageInside"
        :slide-multiple="slideMultiple"
        :slide-ratio="slideRatio"
        :touchable="isTouchable"
        :transition-speed="transitionSpeed"
        :visible-slides="visibleSlides"
        :3d="is3d"
        :class="carouselClass"
        @ready="(value) => $emit('ready', value)"
        @next="(value) => $emit('next', value)"
        @previous="(value) => $emit('previous', value)"
        @autoplay-pause="(value) => $emit('autoplay-pause', value)"
        @autoplay-resume="(value) => $emit('autoplay-resume', value)"
        @before-slide="(value) => $emit('before-slide', value)"
        @slide="(value) => $emit('slide', value)"
        @image-loaded="(value) => $emit('image-loaded', value)"
        @image-failed="(value) => $emit('image-failed', value)"
      >
        <VueperSlide
          v-for="(item, count) in data"
          :key="count"
          :title="item.title"
          :content="item.content"
          :link="item.link"
          :open-in-new="item.openInNew"
          :image="item.image"
          :video="item.video"
          :duration="item.duration"
          @click.native="toggleZoom(item.image, count)"
        />
      </VueperSlides>
    </div>

    <div
      v-if="allowZoom"
      class="zoom-container"
      @click="toggleZoomOut"
    >
      <div
        class="zoom"
        @mousemove="handleMouseMove"
      >
        <div
          ref="zoomed"
          class="zoomed-image"
          :style="zoom.imageZoomed"
        >
          <img
            ref="image"
            :src="zoom.imageZoomed.src"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import './carousel.scss';

export default {
  name: 'PbCarousel',

  components: {
    VueperSlides,
    VueperSlide,
  },

  props: {
    alwaysRefreshClones: { type: Boolean, default: false },
    arrows: { type: Boolean, default: true },
    arrowsOutside: { type: Boolean, default: null },
    autoplay: { type: Boolean, default: false },
    breakpoints: { type: Object, default: () => ({}) },
    bullets: { type: Boolean, default: true },
    bulletsOutside: { type: Boolean, default: null },
    carouselStyle: {
      type: String,
      default: 'large',
      validator: style => [
        'small',
        'medium',
        'large',
      ].includes(style),
    },
    clickToZoom: { type: Boolean, default: false },
    data: { type: Array, default: () => ([]) },
    disable: { type: Boolean, default: false },
    disableArrowsOnEdges: { type: [Boolean, String], default: false },
    draggingDistance: { type: Number, default: null },
    duration: { type: [Number, String], default: 4000 },
    infinite: { type: Boolean, default: true },
    fade: { type: Boolean, default: false },
    fixedHeight: { type: [Boolean, String], default: false },
    fractions: { type: Boolean, default: false },
    gap: { type: Number, default: 0 },
    initSlide: { type: Number, default: 1 },
    is3d: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    lazyLoadOnDrag: { type: Boolean, default: false },
    pauseOnHover: { type: Boolean, default: true },
    pauseOnTouch: { type: Boolean, default: true },
    parallax: { type: [Boolean, Number], default: false },
    pageScrollingElement: { type: String, default: '' },
    parallaxFixedContent: { type: Boolean, default: false },
    preventYScroll: { type: Boolean, default: false },
    progress: { type: Boolean, default: false },
    rtl: { type: Boolean, default: false },
    slideContentOutside: { type: [Boolean, String], default: false },
    slideContentOutsideClass: { type: String, default: '' },
    slideImageInside: { type: Boolean, default: false },
    slideMultiple: { type: [Boolean, Number], default: false },
    slideRatio: { type: Number, default: 1 / 3 },
    touchable: { type: Boolean, default: true },
    transitionSpeed: { type: [Number, String], default: 600 },
    visibleSlides: { type: Number, default: 1 },
    zoomScale: { type: Number, default: 2 },
  },

  emits: [
    'ready', 'next', 'previous', 'autoplay-pause', 'autoplay-resume',
    'before-slide', 'slide', 'image-loaded', 'image-failed',
  ],

  data() {
    return {
      zoom: {
        isZoomed: false,
        imageZoomed: {
          src: '',
          transform: 'scale(1)',
          transformOrigin: '0 0',
        },
      },
      currentIndex: 0,
    };
  },

  computed: {
    carouselClass() {
      return this.carouselStyle !== 'large' ? `carousel-${this.carouselStyle}` : '';
    },

    allowZoom() {
      return this.clickToZoom ? this.zoom.isZoomed : false;
    },

    cursorClass() {
      return this.clickToZoom ? 'zoom-in' : '';
    },

    isTouchable() {
      return this.clickToZoom ? false : this.touchable;
    },
  },

  methods: {
    toggleZoom(image, index) {
      this.currentIndex = index;
      this.zoom.isZoomed = !this.zoom.isZoomed;
      this.zoom.imageZoomed.src = image;
    },

    toggleZoomOut() {
      this.zoom.isZoomed = false;
    },

    handleMouseMove(event) {
      if (this.zoom.isZoomed) {
        const { image } = this.$refs.image;
        const rect = image.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const zoomX = (x / rect.width) * 100;
        const zoomY = (y / rect.height) * 100;

        this.zoom.imageZoomed.transform = `scale(${this.zoomScale})`;
        this.zoom.imageZoomed.transformOrigin = `${zoomX}% ${zoomY}%`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-carousel-container {
  position: relative;
  width: 100%;
  height: 100%;

  .carousel-container {
    position: relative;
  }

  .zoom-container {
    overflow: hidden;
    position: absolute;
    z-index: 30;
    width: 100%;
    height: 100%;
    top: 0;
    cursor: zoom-in;
    cursor: -webkit-zoom-in;
    cursor: -moz-zoom-in;

    .zoom {
      background: white;
      width: 100%;
      height: 100%;
      position: relative;

      .zoomed-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: transform .3s ease;
        display: flex;
        cursor: zoom-out;
        cursor: -webkit-zoom-out;
        cursor: -moz-zoom-out;

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
