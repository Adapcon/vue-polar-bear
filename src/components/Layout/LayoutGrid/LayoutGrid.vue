<template>
  <section class="layout-grid-container pb-row">
    <div class="pb-row pb-col-12 pb-col-md-3">
      <div class="sidebar pb-col-12">
        <div class="pb-row">
          <div class="pb-col-12 pb-col-md-10">
            <div class="sidebar-area">
              <PbButton
                v-if="!state.isMobileCell && !state.isMobileTablet"
                color="primary"
                button-style="regular"
                class="back-button"
                icon="fas fa-arrow-up fa-rotate-270"
                @click.native="backFunction"
              />

              <div>
                <h2 class="pb">
                  {{ title }}
                </h2>

                <div
                  v-show="(!state.isMobileTablet && !state.isMobileCell) || showSideMenu"
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
    <div v-show="!showSideMenu" class="pb-col-12 pb-col-md-9">
      <div class="pb-row" style="justify-content: center;">
        <div class="tool-bar pb-col-11" v-if="!disableToolBar">
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
  },

  data() {
    return {
      state: {
        isMobileTablet: window.innerWidth <= 768,
        isMobileCell: window.innerWidth <= 375,
      },
    };
  },

  mounted() {
    window.addEventListener('resize', this.getWidthSizeCell);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getWidthSizeCell);
  },

  methods: {
    getWidthSizeCell(e) {
      const { target } = e;

      this.state.isMobileCell = target.innerWidth <= 375;
      this.state.isMobileTablet = target.innerWidth <= 768;
    },

    toggleSidebar() {
      this.$emit('update:show-side-menu', !this.showSideMenu);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-grid-container {
  padding-top: 28px;
  
  .sidebar {
    border-right: solid #eeeeee 1px;
    margin: 0px 0px 40px;

    .sidebar-area {
      display: flex;
      align-items: flex-start;

      .back-button {
        margin-top: 0px;
      }
    }

    .sidebar-content {
      margin-top: 40px;
    }
  }

  .tool-bar {
    height: 40px;
  }

  .main {
    margin-top: 40px;
  }
}
</style>
