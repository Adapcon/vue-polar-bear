<template>
  <section
    class="accordion-container"
  >
    <div
      class="accordion"
      @click="toggleCollapse"
    >
      <h6 class="pb">{{ title }}</h6>
      <PbCollapseIcon
        :is-icon-up="state.collapsed"
        color="var(--color-gray-20)"
      />
    </div>
    <slot v-if="state.collapsed" />
  </section>
</template>

<script>
import { PbCollapseIcon } from '@pb';

export default {
  name: 'PbAccordion',

  components: {
    PbCollapseIcon,
  },

  props: {
    title: {
      type: String,
      default: 'Nome do campo',
    },
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      state: {
        collapsed: this.open,
      },
    };
  },

  methods: {
    toggleCollapse() {
      this.state.collapsed = !this.state.collapsed;
    },
  },
};
</script>

<style lang="scss" scoped>

.accordion-container {
    width: 100%;
    height: auto;
  .accordion {
    background: var(--color-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
