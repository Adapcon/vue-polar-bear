<template>
  <div class="sidebar-container">
    <PbButton
      v-if="collapsibleSidebar && !isMobile"
      color="primary"
      button-style="background-light"
      button-size="medium"
      class="sidebar-collapse-button"
      :class="{ 'is-collapsed': sidebarIsCollapsed }"
      :icon="!sidebarIsCollapsed ? 'fas fa-chevron-up fa-rotate-270' : 'fas fa-chevron-up fa-rotate-90'"
      style="margin: 0;"
      @click.native="handleSidebarCollapse"
    />
    <div
      class="sidebar pb-scroll-primary"
      :class="{ 'is-collapsed': sidebarIsCollapsed }"
    >
      <header class="sidebar-header">
        <PbButton
          v-if="collapsibleContent && isMobile"
          color="primary"
          button-style="background"
          class="sidebar-header-button"
          icon="fas fa-bars"
          @click.native="handleContentCollapse"
        />
        <PbButton
          v-else
          color="primary"
          button-style="background"
          class="sidebar-header-button"
          icon="fas fa-arrow-up fa-rotate-270"
          @click.native="backFunction"
        />
        <div
          v-if="!sidebarIsCollapsed"
          class="sidebar-header-row"
        >
          <div class="sidebar-header-title">
            <h2
              v-if="title"
              class="pb"
            >
              {{ title }}
            </h2>
            <h3
              v-if="subtitle"
              class="pb-light"
            >
              {{ subtitle }}
            </h3>
            <h4
              v-if="headline"
              class="pb-light"
            >
              {{ headline }}
            </h4>
          </div>
          <div class="sidebar-header-action">
            <slot name="sidebar-action" />
          </div>
        </div>
      </header>

      <main
        v-if="!sidebarIsCollapsed"
        class="sidebar-content-wrapper"
      >
        <div class="sidebar-tabs">
          <slot name="sidebar-tabs" />
        </div>

        <div
          v-if="!isMobile"
          class="sidebar-content"
        >
          <slot name="sidebar-content" />
        </div>
      </main>

      <div
        v-if="isMobile && !contentIsCollapsed"
        class="sidebar-content"
        :class="{ 'is-collapsed': !contentIsCollapsed }"
      >
        <slot name="sidebar-content" />
      </div>
    </div>
  </div>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button';

export default {
  name: 'PbSidebar',

  components: {
    PbButton,
  },

  props: {
    title: { type: [String, Number], default: '' },
    subtitle: { type: [String, Number], default: '' },
    headline: { type: [String, Number], default: '' },
    backFunction: { type: Function, default: () => () => { } },
    collapsibleSidebar: { type: Boolean, default: false },
    collapsibleContent: { type: Boolean, default: false },
  },

  data() {
    return {
      screenWidth: window.innerWidth,
      sidebarIsCollapsed: false,
      contentIsCollapsed: true,
    };
  },

  computed: {
    isMobile() {
      return this.screenWidth <= 1024;
    },
  },

  mounted() {
    window.addEventListener('resize', this.handleScreenResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleScreenResize);
  },

  methods: {
    handleScreenResize() {
      this.screenWidth = window.innerWidth;
    },

    handleSidebarCollapse() {
      this.sidebarIsCollapsed = !this.sidebarIsCollapsed;
      this.$emit('is-collapsed');
    },

    handleContentCollapse() {
      this.contentIsCollapsed = !this.contentIsCollapsed;
      this.$emit('content-is-collapsed');
    },
  },
};

</script>

<style lang="scss" scoped>

$pb-button-size: 40px;
$padding-mobile: 0;
$padding-desktop: 40px;
$back-button-margin-right: 16px;
$page-navbar-size: 120px;

.sidebar-container {
  display: flex;
  background-color: var(--color-white);
  position: sticky;
  top: 100px;
  z-index: 34;

  .sidebar {

    &-header {
      display: flex;
      background-color: var(--color-white);
      z-index: 34;

      &-button {
        margin: 0 $back-button-margin-right 0 0;
      }

      .sidebar-header-row {
        display: flex;
        flex: 1;

        .sidebar-header-title {
          flex: 1;
          margin-top: 4px;

          :where(h3, h4) {
            margin-top: 8px!important;
          }

          :where(h2, h3, h4) {
            line-break: anywhere;
          }
        }

        .sidebar-header-action {
          &:empty {
            display: none;
          }
        }
      }
    }

    .sidebar-content-wrapper {

      .sidebar-tabs,
      .sidebar-content {
        &:empty {
          display: none;
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .sidebar-container {
    height: calc(100vh - $page-navbar-size);

    .sidebar-collapse-button {
      position: absolute;
      transition: transform .3s ease;
      border-radius: 40px 0 0 40px;
      top: 50%;
      right: 0;
      z-index: 35;
    }

    .sidebar {
      width: 380px;
      overflow-y: scroll;
      border-right: 1px solid var(--color-gray-5);

      &.is-collapsed {
        width: calc($pb-button-size + $padding-desktop * 2);
      }

      &-header {
        padding: $padding-desktop;
        position: sticky;
        top: 0;
      }

      .sidebar-content-wrapper {
        padding-left: calc($pb-button-size + $padding-desktop + $back-button-margin-right);
        padding-right: $padding-desktop;
        padding-bottom: $padding-desktop;

        .sidebar-tabs {
          padding-bottom: $padding-desktop;
        }

        .sidebar-content {
          overflow: auto;
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .sidebar-container {
    width: 100%;
    min-height: 120px;

    .sidebar {
      width: 100%;

      &-header {
        padding: $padding-desktop $padding-mobile;
      }

      &-content,
      &-tabs {
        padding: 0 $padding-mobile $padding-desktop;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar-container {
    top: 32px;

    .sidebar-header {
      position: sticky;
      top: 32px;
    }
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .sidebar-container {
    top: 80px;

    .sidebar-header {
      position: sticky;
      top: 80px;
    }
  }
}
</style>
