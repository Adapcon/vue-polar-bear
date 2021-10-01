<template>
  <PbButton
    :disabled="disabled"
    :color="buttonColor"
    :icon="buttonIcon"
    :label="label"
    :button-style="value ? 'background' : 'outline'"
    icon-position="right"
    @click.native="toggleSort"
  >
    <slot />
  </PbButton>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';

export default {
  name: 'PbSortButton',
  components: {
    PbButton,
  },

  props: {
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
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
    buttonColor() {
      return this.value
        ? 'primary'
        : 'muted';
    },
    buttonIcon() {
      return this.value === 'asc'
        ? 'fas fa-arrow-up fa-rotate-180'
        : 'fas fa-arrow-up';
    },
  },
  methods: {
    toggleSort() {
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
