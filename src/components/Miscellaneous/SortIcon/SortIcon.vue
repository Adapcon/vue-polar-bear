<template>
  <PbIcon
    class="pb-sort-icon"
    :class="disabled ? 'sort-icon-disable' : ''"
    :style="`color: var(--color-${color});`"
    :icon="icon"
    @click="toggleSort"
  />
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbSortIcon',

  components: {
    PbIcon,
  },

  props: {
    color: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },

    disabled: { type: Boolean, default: false },

    value: {
      type: String,
      default: '',
      validator: value => [
        '',
        'desc',
        'asc',
      ].includes(value),
    },
  },

  data() {
    return {
      state: {
        values: ['', 'desc', 'asc'],
      },
    };
  },

  computed: {
    icon() {
      if (this.value === 'asc')
        return 'fas fa-sort-down';

      if (this.value === 'desc')
        return 'fas fa-sort-up';

      return 'fas fa-sort';
    },
  },

  methods: {
    toggleSort() {
      if (this.disabled)
        return;

      const index = this.state.values.indexOf(this.value);

      this.$emit('input', (
        (index === -1 || (this.state.values.length - 1 === index))
          ? this.state.values[0]
          : this.state.values[index + 1]
      ));

      this.$emit('changed-sort');
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-sort-icon {
  transition: all .3s ease;
  cursor: pointer;

  &.sort-icon-disable {
    cursor: not-allowed;
    color: var(--color-gray-20) !important;
  }
}
</style>
