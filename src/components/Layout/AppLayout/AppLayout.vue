<template>
  <section class="layout-grid-container">
    <div
      v-if="!isMobile"
      class="sidebar"
      :class="{
        'collapsed-sidebar': collapseSidebar,
        'sidebar': !collapseSidebar
      }"
    >
      <div class="sidebar-area">
        <div style="display: flex;">
          <PbButton
            color="primary"
            button-style="background"
            button-size="medium"
            class="back-button"
            icon="fas fa-arrow-up fa-rotate-270"
            @click.native="backFunction"
          />

          <div style="display: flex; flex-direction: column;">
            <h2
              v-if="title && !collapseSidebar"
              class="pb"
            >
              {{ title }}
            </h2>
            <h3
              v-if="subtitle && !collapseSidebar"
              class="pb-light"
              style="padding-top: 12px;"
            >
              {{ subtitle }}
            </h3>
            <h4
              v-if="headline && !collapseSidebar"
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
          v-if="collapseSidebar"
          style="padding-top: 12px;"
        >
          <slot name="extra-infos" />
        </div>
        <div
          v-if="collapsible"
          class="collapse-button"
        >
          <PbButton
            color="primary"
            button-style="background"
            button-size="medium"
            :icon="!collapseSidebar ? 'fas fa-chevron-up fa-rotate-270' : 'fas fa-chevron-up fa-rotate-90'"
            @click.native="collapseSidebar = !collapseSidebar"
          />
        </div>
        <div
          v-if="!collapseSidebar"
          class="pb-scroll-primary"
          :class="{
            'sidebar-content': subtitle,
            'sidebar-content-infos': !subtitle
          }"
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

export default {
  name: 'PbAppLayout',
  components: {
    PbButton,
  },

  props: {
    title: { type: [String, Number], default: '' },
    subtitle: { type: [String, Number], default: '' },
    headline: { type: [String, Number], default: '' },
    disableToolBar: { type: Boolean, default: false },
    backFunction: { type: Function, default: () => () => { } },
    collapsible: { type: Boolean, default: false },
  },

  data() {
    return {
      screenWidth: window.innerWidth,
      collapseSidebar: false,
      showSidebar: false,
    };
  },

  computed: {
    isMobile() {
      return this.screenWidth < 768;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
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
.layout-grid-container {
  display: flex;
  overflow: hidden;
  height: calc(100vh - 105px);

  .sidebar {
    border-right: solid #eeeeee 1px;
    max-width: 441px;
    min-width: 441px;
    padding: 48px 40px;
    transition: width 0.3s ease, padding 0.3s ease;

    .sidebar-area {
      .back-button {
        margin-top: 0px;
        margin-right: 16px;
        padding: 17px;
      }

      .collapse-button {
        position: absolute;
        justify-content: flex-end;
        display: flex;
        transform: translateX(900%);
        top: 50vh;
        align-items: center;
      }
    }

    .sidebar-content {
      margin-top: 40px;
      overflow: auto;
      height: 500px;
      margin-left: 56px;
      padding-right: 10px;
    }

    .sidebar-content-infos{
      margin-top: 40px;
      overflow: auto;
      height: 800px;
      margin-left: 56px;
      padding-right: 10px;
    }
  }

  .collapsed-sidebar {
    border-right: solid #eeeeee 1px;
    max-width: 60px;
    min-width: 60px;
    padding: 48px 40px;
    transition: width 0.3s ease, padding 0.3s ease;

    .sidebar-area {
      height: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .back-button {
        margin-top: 0px;
        margin-right: 16px;
        padding: 17px;
      }

      .collapse-button {
        position: absolute;
        justify-content: flex-end;
        display: flex;
        transform: translateX(100%);
        top: 50vh;
        align-items: center;
      }
    }

    .sidebar-content {
      margin-top: 40px;
      margin-left: 56px;
    }
  }

  .main-container {
    padding: 48px 40px;
    width: 100%;

    .tool-bar {
      width: 100%;
    }

    .main {
      margin-top: 40px;
      overflow: auto;
      height: 700px;
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
      padding: 48px 40px;
      align-items: center;
    }

    .sidebar {
      z-index: 5;
      padding: 48px 40px;
      height: 100%;
      width: 100%;
      border-right: none;
      background-color: var(--color-white);

      .sidebar-area {
        width: auto;

        .header {
          display: flex;
          align-items: start;
        }

      }

      .sidebar-content {
        margin-top: 40px;
        margin-left: auto;
        height: 100%;
        overflow: auto;
      }
    }

    .main-container {
      padding: 20px 40px;
      width: auto;

      .main {
        margin-top: 40px;
        overflow: hidden;
        height: 100%;
      }
    }
  }
}
</style>
