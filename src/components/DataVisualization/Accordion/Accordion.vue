<template>
  <section class="accordion-container">
    <div
      class="accordion"
      :class="{
        'accordion-background': !noBackground,
        'accordion-collapsed': state.collapsed,
      }"
      @click="openOnIconOnly ? null : toggleCollapse()"
    >
      <div class="accordion-infos">
        <div class="prepend">
          <div style="padding-right: 16px">
            <slot name="prepend" />
          </div>
          <h6
            v-if="title"
            class="pb ellipsis"
            :style="hasHeaderLabels ? 'flex: 1' : ''"
          >
            {{ title }}
          </h6>
        </div>
        <HeaderLabels
          v-if="hasHeaderLabels"
          :labels="labels"
        />
        <slot name="header" />
        <div
          v-if="showQuantity"
          class="quantity"
          :style="changeStyleWhenEmpty('background')"
        >
          <small
            class="pb"
            :style="changeStyleWhenEmpty('color')"
          >
            {{ quantity }}
          </small>
        </div>
      </div>
      <PbCollapseIcon
        :is-icon-up="state.collapsed"
        :color="isOpened"
        @click.native="openOnIconOnly ? toggleCollapse() : null"
      />
    </div>
    <slot v-if="state.collapsed" />
    <slot name="footer" />
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
      return this.state.collapsed
        ? 'var(--color-primary)'
        : 'var(--color-gray-20)';
    },
  },

  methods: {
    changeStyleWhenEmpty(prop) {
      if (prop === 'background') {
        return this.quantity > 0
          ? 'background: rgba(var(--color-primary-rgb), 0.08)'
          : 'background: rgba(var(--color-gray-40-rgb), 0.08)';
      }
      if (prop === 'color') {
        return this.quantity > 0
          ? 'color: var(--color-primary)'
          : 'color: var(--color-gray-40)';
      }
      return '';
    },

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
      background-color: #f5f6f7;
    }

    &-collapsed {
      border-radius: 8px 8px 0px 0px;
    }

    .accordion-infos {
      width: calc(100% - 48px);
      display: flex;
      justify-content: space-between;
      align-items: center;

      .prepend {
        display: flex;
        align-items: center;
        height: 100%;
      }

      h6 {
        padding-right: 40px;
      }

      .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .quantity {
        width: 26px;
        height: 20px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
