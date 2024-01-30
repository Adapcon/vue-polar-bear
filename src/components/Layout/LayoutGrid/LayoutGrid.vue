<template>
  <section class="layout-grid-container">
    <Sidebar
      :title="title"
      :subtitle="subtitle"
      :headline="headline"
      :back-function="backFunction"
      :collapsible-sidebar="collapsibleSidebar"
      :collapsible-content="collapsibleContent"
      @content-is-collapsed="contentIsCollapsed"
      @is-collapsed="sidebarIsCollapsed"
    >
      <template #sidebar-action>
        <slot name="sidebar-action" />
      </template>
      <template #sidebar-tabs>
        <slot name="sidebar-tabs" />
      </template>
      <template #sidebar-content>
        <slot name="sidebar-content" />
      </template>
    </Sidebar>

    <main
      class="layout-grid-content pb-scroll-primary"
      :class="{'content-is-collapsed': contentCollapsed}"
    >
      <slot name="main" />
    </main>
  </section>
</template>

<script>
import Sidebar from '../Sidebar/Sidebar.vue';

export default {
  name: 'PbLayoutGrid',

  components: {
    Sidebar,
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
      isCollapsed: false,
      contentCollapsed: false,
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

    sidebarIsCollapsed() {
      this.isCollapsed = !this.isCollapsed;
    },

    contentIsCollapsed() {
      this.contentCollapsed = !this.contentCollapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
$page-navbar-size: 120px;

@media screen and (min-width: 1024px) {
  .layout-grid-container {
    display: flex;

    .layout-grid-content {
      width: 100%;
      height: calc(100vh - $page-navbar-size);
      overflow: scroll;
      padding: 40px;
    }
  }
}

@media screen and (max-width: 1024px) {
  .layout-grid-content {
    width: 100%;
    padding: 0 0 40px;

    &.content-is-collapsed {
      display: none;
    }
  }
}
</style>
