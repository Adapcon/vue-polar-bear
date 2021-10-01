<template>
  <div class="pb-extra-info-container" :class="{ bordered: bordered }">
    <slot />
    <transition name="fade">
      <slot v-if="state.collapse" name="extra" />
    </transition>
    <div class="pb-extra-info-action-container" @click.stop="toggleCollapse">
      <PbIcon
        :icon="`fas fa-chevron-up ${!state.collapse ? 'fa-rotate-180' : ''} collapse-icon`"
        :style="`color: var(--color-${iconColor}) !important`"
      />
    </div>
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbExtraInfo',
  components: {
    PbIcon,
  },
  props: {
    bordered: { type: Boolean, default: true },
    iconColor: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },
    initialState: {
      type: String,
      default: 'closed',
      validator: state => ['open', 'closed'].includes(state),
    },
  },
  data() {
    return {
      state: {
        collapse: this.initialState === 'open',
      },
    };
  },
  methods: {
    toggleCollapse() {
      const toggleValue = this.state.collapse ? this.close() : this.open();
      return toggleValue;
    },
    open() {
      this.state.collapse = true;
      this.$emit('open');
    },
    close() {
      this.state.collapse = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-extra-info-container {
  .pb-extra-info-action-container {
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
}
.bordered {
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
}
</style>
