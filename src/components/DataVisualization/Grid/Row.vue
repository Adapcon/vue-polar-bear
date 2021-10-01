<template>
  <div class="pb-row-wrapper">
    <div
      class="pb-row-container-wrapper"
      :class="{ bordered: !hideBorders }"
      :style="!noPadding ? 'padding: 10px 0px;' : ''"
    >
      <div
        class="pb-row-container"
        :class="{ 'cursor-pointer': state.hasChildren }"
        :style="{
          'grid-template-columns': gridColumns,
        }"
        @click.stop="toggleCollapse"
      >
        <slot />
      </div>

      <div
        v-if="state.hasActions || state.hasChildren"
        class="pb-row-col-actions"
        :class="{ 'cursor-pointer': state.hasChildren }"
        :style="{
          'align-items': alignActions,
        }"
        @click.stop="toggleCollapse"
      >
        <slot name="actions" />

        <pb-button
          v-if="state.hasChildren"
          :icon="`fas fa-chevron-up ${!state.collapse ? 'fa-rotate-180' : ''} collapse-icon`"
          @click.native.stop="toggleCollapse"
        />
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="state.collapse" class="pb-row-children">
        <slot name="children" />
      </div>
    </transition>
  </div>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';

export default {
  name: 'PbRow',
  components: {
    PbButton,
  },
  props: {
    alignActions: {
      type: String,
      default: 'center',
      validator: value => ['flex-start', 'center', 'flex-end'].includes(value),
    },
    cols: {
      type: Number,
      default: 12,
      validator: value => value <= 24 && value > 0 && value % 6 === 0,
    },
    hideBorders: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
  },
  data() {
    return {
      state: {
        collapse: false,
        hasChildren: false,
        hasActions: false,
      },
    };
  },

  computed: {
    gridColumns() {
      return `repeat(${this.cols}, minmax(${100 / this.cols}%, 1fr))`;
    },
  },

  mounted() {
    this.state.hasChildren = !!this.$slots.children;
    this.state.hasActions = !!this.$slots.actions;
  },
  methods: {
    toggleCollapse() {
      this.$emit('click');
      if (!this.state.hasChildren) return;
      return this.state.collapse ? this.close() : this.open();
    },
    open() {
      this.state.collapse = true;
    },
    close() {
      this.state.collapse = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-row-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;

  .pb-row-container-wrapper {
    display: flex;

    &.bordered {
      border-bottom: 1px solid #eee;
    }

    .pb-row-container {
      display: grid;
      width: 100%;
    }

    .pb-row-col-actions {
      display: flex;
      justify-content: flex-end;
      max-width: 100px;
      min-width: 100px;
    }
  }

  .pb-row-children {
    background: #FAFAFA;
  }
}
</style>
<style lang="scss">
.pb-row-wrapper {
  .collapse-icon {
    transition: transform 0.4s !important;
  }
}
</style>
