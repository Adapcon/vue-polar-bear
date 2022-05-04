<template>
  <section class="layout-grid-container pb-row">
    <div class="pb-row pb-col-12 pb-col-md-3">
      <div class="sidebar pb-col-12">
        <div class="pb-row">
          <div class="pb-col-12 pb-col-md-10">
            <div style="display: flex;">
              <PbButton
                v-if="!state.isMobileCell"
                color="primary"
                button-style="regular"
                :icon="`fas fa-${state.isMobileTablet ? 'bars': 'arrow-up fa-rotate-270'}`"
                @click.native="backFunction"
              />
              <h2 class="pb">
                {{ title }}
              </h2>
            </div>
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
    window.addEventListener("resize", this.getWidthSizeCell);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWidthSizeCell);
  },

  methods: {
    getWidthSizeCell(e) {
      const { target } = e;

      this.state.isMobileCell = target.innerWidth <= 375;
      this.state.isMobileTablet = target.innerWidth <= 768;
    },

    toggleSidebar() {
      this.$emit('update:show-side-menu', !this.showSideMenu) ;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-grid-container {
  .sidebar {
    border-right: solid #eeeeee 1px;
    margin: 28px 0px 40px;
    
    .sidebar-content {
      margin-top: 40px;
    }
  }

  .tool-bar {
    height: 40px;
    margin-top: 28px;
  }

  .main {
    margin-top: 40px;
  }
}
</style>
