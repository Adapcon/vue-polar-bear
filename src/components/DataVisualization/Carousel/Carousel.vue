<!-- This component is a wrapper of the vueper-slides component. -->
<template>
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
    :touchable="touchable"
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
    />
  </VueperSlides>
</template>

<script>
// A nice documentation about this component can be found here: https://antoniandre.github.io/vueper-slides/
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
    disable: { type: Boolean, default: false },
    // Ability to disable arrows on slideshow edges. Only if not infinite mode.
    disableArrowsOnEdges: { type: [Boolean, String], default: false },
    // By default when touch is enabled you have to drag from a slide side and pass 50% of
    // slideshow width to change slide. This setting changes this behavior to a horizontal
    // pixel amount from anywhere on slideshow.
    draggingDistance: { type: Number, default: null },
    duration: { type: [Number, String], default: 4000 }, // Autoplay slide duration.
    infinite: { type: Boolean, default: true },
    fade: { type: Boolean, default: false },
    fixedHeight: { type: [Boolean, String], default: false },
    fractions: { type: Boolean, default: false },
    gap: { type: Number, default: 0 },
    initSlide: { type: Number, default: 1 },
    lazy: { type: Boolean, default: false },
    lazyLoadOnDrag: { type: Boolean, default: false },
    pauseOnHover: { type: Boolean, default: true },
    pauseOnTouch: { type: Boolean, default: true },
    parallax: { type: [Boolean, Number], default: false },
    pageScrollingElement: { type: String, default: '' },
    parallaxFixedContent: { type: Boolean, default: false },
    // This one is not modifiable through breakpoints: event handlers are added/removed.
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
    is3d: { type: Boolean, default: false },

    data: { type: Array, default: () => ([]) },
    carouselStyle: {
      type: String,
      default: 'large',
      validator: style => [
        'small',
        'medium',
        'large',
      ].includes(style),
    },
  },

  computed: {
    carouselClass() {
      return this.carouselStyle !== 'large' ? `carousel-${this.carouselStyle}` : '';
    },
  },

  emits: [
    'ready', 'next', 'previous', 'autoplay-pause', 'autoplay-resume',
    'before-slide', 'slide', 'image-loaded', 'image-failed',
  ],
};
</script>
