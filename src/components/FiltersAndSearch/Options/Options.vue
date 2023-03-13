<template>
  <section class="pb-options-container">
    <button
      v-for="option in options"
      :key="`${option}`"
      :class="`option ${border}`"
      :style="optionButtonStyle(option)"
      @click="updateValue(option)"
    >
      <p
        class="pb-strong option-text"
        :style="optionTextColor(option)"
      >
        {{ option }}
      </p>
    </button>
  </section>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbOptions',
  props: {
    value: { type: String, required: true },
    options: { type: Array, required: true },
    border: {
      type: String,
      default: 'curved',
    },
    color: {
      type: String,
      default: 'primary',
      validator: validateColor,
    },
  },
  computed: {
    optionWidthPercentage() {
      return `${100 / this.options.length}%`;
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
    isSelected(value) {
      return this.value === value;
    },
    optionTextColor(option) {
      return this.isSelected(option) ? `color: var(--color-${this.color})` : 'color: var(--color-gray-20)';
    },
    optionButtonStyle(option) {
      return this.isSelected(option) ? `background-color: rgba(var(--color-${this.color}-rgb), 0.1);` : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-options-container {
  display: flex;

  .flat {
    &:first-child {
      border-radius: 12px 0 0 0;
    }

    &:last-child {
      border-radius: 0 12px 0 0;
      border: 1px solid var(--color-gray-10);
    }
  }

  .curved {
    &:first-child {
      border-radius: 25px 0 0 25px;
    }

    &:last-child {
      border-radius: 0 25px 25px 0;
      border: 1px solid var(--color-gray-10);
    }
  }

  .option {
    display: flex;
    max-width: 180px;
    width: auto;
    height: 40px;
    background-color: var(--color-transparent);
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    border: 1px solid var(--color-gray-10);
    border-right: 0px;
    cursor: pointer;

    .option-text {
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 12px;
      white-space: nowrap;
    }
  }
}
</style>
