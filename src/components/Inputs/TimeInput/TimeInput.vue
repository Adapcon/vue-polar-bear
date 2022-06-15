<template>
  <div>
    <input
      v-model="inputTime"
      class="pb"
      type="time"
      :style="inputStyle"
      style="width: 110px"
    >
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbTimeInput',
  props: {
    value: { type: String, default: '' },
    color: {
      type: String,
      default: 'gray-20',
      validator: color => validateColor(color),
    },
  },

  computed: {
    inputTime: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    inputStyle() {
      return {
        color: `var(--color-${this.color})`,
        border: `1px solid var(--color-${this.color})`,
      };
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
