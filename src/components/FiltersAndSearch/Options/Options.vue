<template>
  <section class="pb-options-container">
    <div v-for="(option) in options" :key="`${option}`">
      <PbButton
        style="font-size: 16px !important; margin: 10px"
        :color="buttonColor(option)"
        :button-style="buttonDinamicStyle(option)"
        @click.native="updateValue(option)"
      >
        <p class="pb">
          <b>{{ option.toUpperCase() }}</b>
        </p>
      </PbButton>
    </div>
  </section>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbOptions',
  components: {
    PbButton,
  },
  props: {
    value: { type: String, required: true },
    options: { type: Array, required: true },
    buttonStyle: {
      type: String,
      default: 'regular',
      validator: style => [
        'regular',
        'outline',
        'background',
      ].includes(style),
    },
    color: {
      type: String,
      default: 'primary',
      validator: validateColor,
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
    isSelected(value) {
      return this.value === value;
    },
    buttonColor(option) {
      return this.isSelected(option)
        ? this.color
        : 'gray-20';
    },
    buttonDinamicStyle(option) {
      if (this.buttonStyle === 'outline')
        return this.isSelected(option) ? 'background' : 'outline';

      return this.buttonStyle;
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-options-container {
  display: flex;
}
</style>
