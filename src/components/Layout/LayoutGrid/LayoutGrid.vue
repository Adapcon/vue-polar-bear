<template>
  <section class="layout-grid-container pb-row">
    <div class="pb-row pb-col-12 pb-col-md-3">
      <div class="sidebar pb-col-12">
        <div class="pb-row">
          <div class="pb-col-12">
            <div class="sidebar-area">
              <PbButton
                color="white"
                button-style="regular"
                class="back-button"
                icon="fas fa-arrow-up fa-rotate-270"
                @click.native="backFunction"
              />

              <div class="right-container">
                <h2 class="pb">
                  {{ title }}
                </h2>

                <div
                  :class="showContentSideBar"
                  class="sidebar-content"
                >
                  <slot name="sidebar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="!showSideMenu"
      class="pb-col-12 pb-col-md-9 content-toobar-main"
    >
      <div
        class="pb-row"
        style="justify-content: center;"
      >
        <div
          v-if="!disableToolBar"
          class="tool-bar pb-col-11"
        >
          <slot name="tool-bar" />
        </div>
        <div class="main pb-col-11">
          <slot name="main" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button';

export default {
  name: 'PbLayoutGrid',
  components: {
    PbButton,
  },

  props: {
    title: { type: [String, Number], default: '' },
    disableToolBar: { type: Boolean, default: false },
    backFunction: { type: Function, default: () => () => {} },
    showSideMenu: { type: Boolean, default: false },
    newStyle: { type: Boolean, default: false },
  },

  computed: {
    showContentSideBar() {
      if (this.newStyle) return 'show';

      return 'hidden';
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-grid-container {
  width: 100%;
  padding-top: 28px;
  
  .sidebar {
    display: block;
    height: 80vh;
    border-right: solid #eeeeee 1px;
    margin: 0px 0px 40px;
    padding-right: 40px;

    .sidebar-content {
      margin-top: 40px;
    }

    @media (max-width: 768px) {
      .hidden {
        display: none
      }

      .show {
        display: block
      }
    }

    .right-container {
      width: 100%;
      margin-top: 5px;
    }
  }

  .tool-bar {
    height: 40px;
  }

  .main {
    margin-top: 40px;
  }
  .content-toobar-main {
    width: 70%;
    margin-left: 4%
  }
}
</style>
