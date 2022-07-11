<template>
  <section class="accordion-container">
    <div
      class="accordion"
      @click="toggleCollapse"
    >
      <div class="accordion-infos">
        <h6 class="pb">{{ title }}</h6>
        <div
          v-if="showQuantity"
          class="quantity"
        >
          <small style="color: var(--color-gray-40)">{{ quantity }}</small>
        </div>
      </div>
      <PbCollapseIcon
        :is-icon-up="state.collapsed"
        :color="isOpened()"
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
    quantity: {
      type: Number,
      default: 0,
    },
    showQuantity: {
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
    isOpened() {
      return this.state.collapsed ? 'var(--color-primary)' : 'var(--color-gray-20)';
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion-container {
  width: 100%;
  height: auto;
  .accordion {
    .accordion-infos {
      width: calc(100% - 48px);
      display: flex;
      justify-content: space-between;

      .quantity {
        width: 26px;
        height: 20px;
        border-radius: 20px;
        background: rgba(var(--color-gray-40-rgb), 0.08);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
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
