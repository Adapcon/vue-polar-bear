<template>
  <section class="accordion-container">
    <div class="accordion">
      <h6 class="pb">{{ title }}</h6>
      <PbCollapseIcon
        :is-icon-up="state.collapsed"
        color="var(--color-gray-20)"
        @click.native="toggleCollapse"
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
  },

  data() {
    return {
      state: {
        collapsed: false,
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
  }
}
</style>
