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
          v-if="collapsible"
          class="collapse-button"
        >
          <PbButton
            color="primary"
            button-style="background"
            button-size="medium"
            :icon="'fas fa-chevron-up fa-rotate-270'"
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
      style="width: 320px; height: 568px;"
    >
      <div class="sidebar-area">
        <div style="display: flex;">
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
          <PbButton
            color="primary"
            button-style="background"
            button-size="medium"
            class="back-button"
            icon="fas fa-bars"
            @click.native="showSidebar = !showSidebar"
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
      v-if="isMobile"
      class="title-mobile"
    >
      <PbButton
        color="primary"
        button-style="background"
        button-size="medium"
        :icon="'fas fa-bars'"
        @click.native="showSidebar = !showSidebar"
      />
      <h2
        v-if="title && !showSidebar"
        class="pb"
      >
        {{ title }}
      </h2>
    </div>
    <div class="main-container">
      <div style="justify-content: center;">
        <div
          v-if="!disableToolBar"
          class="tool-bar "
        >
          <slot name="tool-bar" />
        </div>
        <div class="main ">
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
    collapsible: { type: Boolean, default: true },
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

  .sidebar {
    border-right: solid #eeeeee 1px;
    width: 441px;
    padding: 48px 40px;
    transition: width 0.3s ease, padding 0.3s ease;

    .sidebar-area {
      .back-button {
        margin-top: 0px;
        margin-right: 16px;
      }

      .collapse-button {
        position: absolute;
        justify-content: flex-end;
        display: flex;
        width: 355px;
        height: 330px;
        align-items: center;
      }
    }

    .sidebar-content {
      margin-top: 40px;
      margin-left: 56px;
    }
  }

  .collapsed-sidebar {
    border-right: solid #eeeeee 1px;
    width: 60px;
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
      }

      .collapse-button {
        position: absolute;
        justify-content: flex-end;
        display: flex;
        width: 175px;
        height: 600px;
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
    }
  }

}

@media (max-width: 768px) {
  .layout-grid-container {
    display: flex;
    flex-direction: column;

    .title-mobile {
      display: flex;
      padding: 48px 40px;
      align-items: center;
    }

    .sidebar {
      position: absolute;
      z-index: 5;
      border: solid 2px green;
      padding: 48px 40px;
      height: auto;
      width: auto;
      background-color: var(--color-white);

      .sidebar-area {
        width: auto;

        .back-button {
          margin-top: 0px;
          margin-right: 16px;
        }
      }

      .sidebar-content {
        margin-top: 40px;
        margin-left: auto;
      }
    }

    .main-container {
      padding: 20px 40px;
      width: auto;

      .main {
        margin-top: 40px;
      }
    }
  }
}
</style>
