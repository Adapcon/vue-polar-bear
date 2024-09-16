<template>
  <section class="layout-grid-container">
    <div
      v-if="!isMobile"
      class="sidebar"
      :class="{ 'collapsed': collapseSidebar }"
    >
      <div
        class="sidebar-area"
        :style="{ marginTop: `calc(${headerSizeHeight}px - 8px)` }"
      >
        <div
          ref="header"
          class="header-infos"
        >
          <PbButton
            color="primary"
            button-style="background"
            button-size="medium"
            class="back-button"
            icon="fas fa-arrow-up fa-rotate-270"
            @click.native="backFunction"
          />

          <div
            v-if="!collapseSidebar"
            style="display: flex; flex-direction: column;"
          >
            <PbHint
              v-if="title && titleSizeWidth"
              :hint-text="title"
              position="bottom-right"
            >
              <h2
                v-if="title"
                ref="title"
                class="pb header-title"
              >
                {{ title }}
              </h2>
            </PbHint>
            <h2
              v-else
              ref="title"
              class="pb header-title"
            >
              {{ title }}
            </h2>

            <PbHint
              v-if="subtitle && subtitleSizeWidth"
              :hint-text="subtitle"
              position="bottom-right"
            >
              <h3
                v-if="subtitle"
                class="pb-light header-subtitle"
                style="padding-top: 12px;"
              >
                {{ subtitle }}
              </h3>
            </PbHint>
            <h3
              v-else
              ref="subtitle"
              class="pb-light header-subtitle"
              style="padding-top: 12px;"
            >
              {{ subtitle }}
            </h3>
            <PbHint
              v-if="headline && headLineSizeWidth"
              :hint-text="headline"
              position="bottom-right"
            >
              <h4
                ref="headline"
                class="pb-light header-headline"
                style="padding-top: 12px;"
              >
                {{ headline }}
              </h4>
            </PbHint>
            <h4
              v-else
              ref="headline"
              class="pb-light header-headline"
              style="padding-top: 12px;"
            >
              {{ headline }}
            </h4>
            <div style="padding-top: 12px;">
              <slot name="extra-infos" />
            </div>
          </div>
        </div>
        <div
          v-if="collapsible"
          class="collapse-button"
          :class="{ 'collapsed': collapseSidebar }"
        >
          <PbButton
            color="primary"
            button-style="background-light"
            button-size="medium"
            style="margin: 0;"
            :icon="!collapseSidebar ? 'fas fa-chevron-up fa-rotate-270' : 'fas fa-chevron-up fa-rotate-90'"
            @click.native="collapseSidebar = !collapseSidebar"
          />
        </div>
        <div
          v-if="!collapseSidebar"
          class="sidebar-content"
        >
          <slot name="sidebar" />
        </div>
      </div>
    </div>
    <div
      v-if="isMobile && showSidebar"
      class="sidebar"
    >
      <div class="sidebar-area">
        <div class="header">
          <PbButton
            color="primary"
            style="margin: 3px 5px; "
            button-style="background"
            button-size="medium"
            class="back-button"
            icon="fas fa-bars"
            @click.native="showSidebar = !showSidebar"
          />
          <div style="display: flex; flex-direction: column;">
            <h2
              v-if="title"
              class="pb"
            >
              {{ title }}
            </h2>
            <h3
              v-if="subtitle"
              class="pb-light"
              style="padding-top: 12px;"
            >
              {{ subtitle }}
            </h3>
            <h4
              v-if="headline"
              class="pb-light"
              style="padding-top: 12px;"
            >
              {{ headline }}
            </h4>
            <div
              v-if="!collapseSidebar"
              style="padding-top: 12px;"
            >
              <slot name="extra-infos" />
            </div>
          </div>
        </div>
        <div
          v-if="!collapseSidebar"
          class="sidebar-content"
        >
          <slot name="sidebar" />
        </div>
      </div>
    </div>
    <div
      v-if="isMobile && !showSidebar"
      class="title-mobile"
    >
      <PbButton
        color="primary"
        button-style="background"
        button-size="medium"
        icon="fas fa-bars"
        @click.native="showSidebar = !showSidebar"
      />
      <h2
        v-if="title && !showSidebar"
        class="pb"
      >
        {{ title }}
      </h2>
    </div>
    <div
      v-if="!showSidebar"
      class="main-container"
      :class="{ 'collapsed': collapseSidebar }"
    >
      <div style="justify-content: center;">
        <div
          v-if="!disableToolBar"
          class="tool-bar "
        >
          <slot name="tool-bar" />
        </div>
        <div class="main pb-scroll-primary">
          <slot name="main" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button';
import PbHint from '@pb/Miscellaneous/Hint/Hint';

export default {
  name: 'PbAppLayout',
  components: {
    PbButton,
    PbHint,
  },

  props: {
    title: { type: [String, Number], default: '' },
    subtitle: { type: [String, Number], default: '' },
    headline: { type: [String, Number], default: '' },
    disableToolBar: { type: Boolean, default: false },
    backFunction: { type: Function, default: () => () => { } },
    collapsible: { type: Boolean, default: false },
    sidebarState: { type: String, default: 'open' },
  },

  data() {
    return {
      screenWidth: window.innerWidth,
      headerSizeHeight: 0,
      headLineSizeWidth: 0,
      titleSizeWidth: 0,
      subtitleSizeWidth: 0,
      collapseSidebar: false,
      showSidebar: false,
    };
  },

  computed: {
    isMobile() {
      return this.screenWidth < 768;
    },
  },
  watch: {
    sidebarState: {
      handler(val) {
        if (val === 'close')
          this.$set(this, 'collapseSidebar', true);
      },
    },
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.$nextTick(() => {
      const { header } = this.$refs;
      this.headerSizeHeight = header ? header.offsetHeight : 0;
      this.$nextTick(() => {
        setTimeout(() => {
          const { title, subtitle, headline } = this.$refs;

          this.titleSizeWidth = title.offsetWidth < title.scrollWidth;
          this.subtitleSizeWidth = subtitle.offsetWidth < subtitle.scrollWidth;
          this.headLineSizeWidth = headline.offsetWidth < headline.scrollWidth;
        }, 5000);
      });
    });

    if (this.sidebarState === 'close') return this.$set(this, 'collapseSidebar', true);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
$sidebar-width: 440px;
$sidebar-width-collapsed: 60px;

@mixin pb-scroll-base {
  &::-webkit-scrollbar {
    width: 3px;
    height: 2px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: var(--color-gray);
    border-radius: 10px;
  }
}

.layout-grid-container {
  display: flex;
  overflow: hidden;
  height: calc(100vh - 105px);

  .collapse-button {
    position: absolute;
    transition: transform .3s ease;
    transform: translateX(420px);
    top: 50vh;
    left: 0;
    z-index: 36;

    &::v-deep .pb-button {
      border-radius: 40px 0 0 40px;
    }

    &.collapsed {
      transform: translateX(40px);
    }
  }

  .sidebar {
    border-right: solid #eeeeee 1px;
    max-width: $sidebar-width;
    min-width: $sidebar-width;
    margin: 16px 12px;
    transition: max-width .3s ease, min-width .3s ease;
    overflow-y: scroll;
    @include pb-scroll-base;
  &::-webkit-scrollbar-thumb {
    background: var(--color-secondary);
  }

    // &:has(.pb-hint) {
    //   overflow: visible;
    //   padding-right: 15px;
    // }

    &:not(:hover) {
      &::-webkit-scrollbar,
      &::-webkit-scrollbar-thumb,
      &::-webkit-scrollbar-track {
        width: 3px;
        background: transparent;
      }
    }

    &:not(.collapsed) {
      .header-infos {
        display: flex;
        position: fixed;
        max-width: calc($sidebar-width - 5px);
        top: 102px;
        padding-top: 48px;
        z-index: 34;
        background-color: var(--color-white);

        .header-title {
          width: calc($sidebar-width - 85px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .header-subtitle {
          width: calc($sidebar-width - 85px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .header-headline {
          width: calc($sidebar-width - 85px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    &-area {
      .back-button {
        margin-top: 0;
        margin-right: 16px;
        padding: 17px;
      }
    }

    &-content {
      overflow: auto;
      margin-top: 40px;
      margin-left: 56px;
      padding-right: 10px;
      position: relative;

      &:has(.pb-hint) {
        overflow: visible;
      }
    }

    &.collapsed {
      overflow: hidden !important;
      max-width: $sidebar-width-collapsed;
      min-width: $sidebar-width-collapsed;
      padding-top: 33px;

      .sidebar-area {
        height: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0 !important;
        margin-top: 0 !important;
      }
    }
  }

  .main-container {
    padding: 16px 12px;
    width: calc(100% - $sidebar-width);
    transition: width .3s ease;

    &.collapsed {
      width: calc(100% - $sidebar-width-collapsed);
    }

    .tool-bar {
      width: 100%;
    }

    .main {
      margin-top: 40px;
      overflow: auto;
      height: calc(100vh - 250px);
    }
  }
}

@media (max-width: 1400px) {
  $sidebar-width: 350px;
  $sidebar-width-collapsed: 60px;

  .layout-grid-container {
    .collapse-button {
      transform: translateX(330px);
      z-index: 36;

      &.collapsed {
      transform: translateX(40px);
    }
    }

    .sidebar {
      max-width: $sidebar-width;
      min-width: $sidebar-width;

      &:not(.collapsed) {
        .header-infos {
          width: calc($sidebar-width - 5px);
          background-color: var(--color-white);

          .header-title {
          width: calc($sidebar-width - 100px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .header-subtitle {
          width: calc($sidebar-width - 100px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .header-headline {
          width: calc($sidebar-width - 100px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

          h2.pb {
            font-size: 2.8rem !important;
          }
        }
      }
    }

    .main-container {
      width: calc(100% - $sidebar-width);
    }
  }
}

@media (max-width: 768px) {
  .layout-grid-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;

    .title-mobile {
      display: flex;
      padding: 16px 12px;
      align-items: center;
    }

    .sidebar {
      z-index: 5;
      padding: 16px 12px;
      height: 100%;
      width: 100%;
      overflow: hidden !important;
      border-right: none;
      background-color: var(--color-white);

      &-area {
        width: auto;

        .header {
          display: flex;
          align-items: start;
        }
      }

      &-content {
        margin-left: auto;
        height: 100%;
      }
    }

    .main-container {
      padding: 20px 40px;
      width: auto;

      .main {
        overflow: hidden;
        height: 100%;
      }
    }
  }
}
</style>
