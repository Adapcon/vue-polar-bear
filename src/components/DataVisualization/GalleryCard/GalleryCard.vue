<template>
  <div class="pb-card-container">
    <div
      class="background-container"
      :style="backgroundStyle"
    >
      <div
        v-if="showBackgroundContent"
        class="background-content pb-scroll-primary"
        @click="() => $emit('click:background')"
      >
        <slot name="background" />
      </div>

      <div
        v-if="title"
        class="footer-container"
        :style="footerStyle"
        @click="toggleFooter"
      >
        <div
          class="expansive-footer"
          :style="reducedFooterStyle"
        >
          <h6
            class="pb"
            style="color: var(--color-white) !important;"
            :style="textStyle"
          >
            {{ title }}
          </h6>

          <small
            v-if="subtitle"
            class="pb"
            style="color: var(--color-gray-10) !important"
            :style="textStyle"
          >
            {{ subtitle }}
          </small>

          <slot
            v-if="state.footerShow"
            name="expansive-footer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PbGalleryCard',

  props: {
    title: { type: String, default: '' },
    subtitle: { type: [String, Number], default: '' },
    backgroundImage: { type: String, default: '' },
    footerOverlayBackground: { type: Boolean, default: false },
    width: { type: String, default: '175px' },
    height: { type: String, default: '205px' },
  },

  data() {
    return {
      state: {
        footerShow: false,
      },
    };
  },

  computed: {
    showBackgroundContent() {
      return !(this.footerOverlayBackground && this.state.footerShow);
    },

    footerStyle() {
      if (this.state.footerShow) {
        return {
          height: '100%',
          'border-radius': '9px',
        };
      }

      return {
        height: '69px',
        'border-radius': '0px 0px 9px 9px',
      };
    },

    textStyle() {
      return !this.state.footerShow ? {
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        overflow: 'hidden',
      } : {};
    },

    reducedFooterStyle() {
      if (!this.state.footerShow)
        return '';

      return {
        'justify-content': 'flex-end',
      };
    },

    backgroundStyle() {
      return `background-image: url(${this.backgroundImage}); width: ${this.width}; height: ${this.height}`;
    },
  },

  methods: {
    toggleFooter() {
      this.state.footerShow = !this.state.footerShow;
      this.$emit('click:footer', this.state.footerShow);
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-card-container {
  .background-container {
    background: var(--color-gray);
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    position: relative;

    .background-content {
      overflow: auto;
      padding: 15px;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .footer-container {
      position: absolute;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      cursor: pointer;
      bottom: 0;
      transition: all .3s ease-in-out;

      .expansive-footer {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        padding: 15px;
      }
    }
  }
}
</style>
