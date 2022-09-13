<template>
  <section class="accordion-container">
    <div
      class="accordion"
      :class="{ 'accordion-background': !noBackground, 'accordion-collapsed': state.collapsed }"
      @click="openOnIconOnly ? null : toggleCollapse()"
    >
      <div class="accordion-infos">
        <h6
          v-if="title"
          class="pb"
          :style="hasHeaderLabels ? 'flex: 1' : ''"
        >
          {{ title }}
        </h6>
        <HeaderLabels
          v-if="hasHeaderLabels"
          :labels="labels"
        />
        <slot name="header" />
        <div
          v-if="showQuantity"
          class="quantity"
        >
          <small style="color: var(--color-gray-40)">{{ quantity }}</small>
        </div>
      </div>
      <PbCollapseIcon
        :is-icon-up="state.collapsed"
        :color="isOpened"
        @click.native="openOnIconOnly ? toggleCollapse() : null"
      />
    </div>
    <slot v-if="state.collapsed" />
  </section>
</template>

<script>
import { PbCollapseIcon } from '@pb';
import HeaderLabels from './HeaderLabels.vue';

export default {
  name: 'PbAccordion',

  components: {
    PbCollapseIcon,
    HeaderLabels,
  },

  props: {
    title: {
      type: String,
      default: '',
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
    noBackground: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Array,
      default: () => [],
    },
    openOnIconOnly: {
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

  computed: {
    hasHeaderLabels() {
      return this.labels.length > 0;
    },
    isOpened() {
      return this.state.collapsed ? 'var(--color-primary)' : 'var(--color-gray-20)';
    },
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;

    &-background {
      background-color: var(--color-gray);
      padding: 12px 14px;
    }

    &-background:hover {
      background-color: #F5F6F7;
    }

    &-collapsed {
      border-radius: 8px 8px 0px 0px;
    }

    .accordion-infos {
      width: calc(100% - 48px);
      display: flex;
      justify-content: space-between;
      align-items: center;

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
  }
}
</style>
