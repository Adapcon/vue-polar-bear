<template>
  <div
    class="pb-quantity-selector-container disable-select"
    :class="quantitySelectorClasses"
    :style="quantitySelectorInputStyle"
  >
    <PbIcon
      class="pb-quantity-selector-icon"
      icon="fas fa-minus-circle fa-lg"
      @click.stop="
        () => changeQuantity(valueHandler(state.value, 'minus'))
      "
    />
    <input
      ref="inputNumber"
      :value="valueFormatted"
      :disabled="disabled"
      class="pb-quantity-selector-input"
      @click.stop
      @blur="(val) => changeQuantity(val.target.value, false, true)"
      @keypress.enter="(val) => changeQuantity(val.target.value, false, true)"
    >
    <PbIcon
      class="pb-quantity-selector-icon"
      icon="fas fa-plus-circle fa-lg"
      @click.stop="
        () => changeQuantity(valueHandler(state.value, 'plus'))
      "
    />
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import { validateColor } from '@pb/utils/validator';
import { isUndefined } from '@pb/utils/inspect';

export default {
// SUGG: We can see some dynamics to increase the size of the component in the mobile
  name: 'PbQuantitySelector',
  components: {
    PbIcon,
  },
  props: {
    value: { type: Number, default: null },
    placeholder: { type: String, default: null },
    suffix: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    max: { type: Number, default: undefined },
    canBeEmpty: { type: Boolean, default: false },
    min: { type: Number, default: 0 },
    isLoading: { type: Boolean, default: false },
    fractions: { type: Number, default: 0 },
    step: { type: Number, default: 1 },
    multiple: { type: Boolean, default: false },
    quantitySelectorStyle: {
      type: String,
      default: 'regular',
      validator: style => [
        'regular',
        'outline',
      ].includes(style),
    },
    status: {
      type: String,
      default: '',
      validator: err => ['success', 'error', ''].includes(err),
    },
    color: {
      type: String,
      default: 'white',
      validator: color => validateColor(color),
    },
  },
  data() {
    return {
      state: {
        error: false,
        changeQuantity: null,
        value: this.value,
      },
    };
  },
  computed: {
    componentWidth() {
      if (!this.suffix) return '115px';

      const chars = String(this.valueFormatted).length;
      const width = 55 + (+chars * 9);

      return `${width}px`;
    },
    quantitySelectorClasses() {
      return {
        'pb-quantity-selector-style-regular': this.quantitySelectorStyle === 'regular',
        'pb-quantity-selector-style-outline': this.quantitySelectorStyle === 'outline',
        'pb-quantity-selector-error': this.state.error || this.status === 'error',
        'pb-quantity-selector-success': this.status === 'success',
        'pb-quantity-selector-disabled': this.disabled,
        'pb-quantity-selector-loading': this.isLoading,
      };
    },
    valueFormatted() {
      if (this.state.value === null)
        return this.placeholder;

      const value = this.state.value.toFixed(this.fractions);

      return this.suffix ? `${value} ${this.suffix}` : `${value}`;
    },
    quantitySelectorInputStyle() {
      const baseStyle = {
        'min-width': '115px',
        width: this.componentWidth,
        'max-width': '280px',
      };

      return this.quantitySelectorStyle === 'outline'
        ? { ...baseStyle, color: `var(--color-${this.color})` }
        : baseStyle;
    },
  },
  methods: {
    isNumberValidByStep(value) {
      return value % this.step === 0;
    },

    isNumberValidByMin(value) {
      if (value < this.min && !(value === 0 && !this.canBeEmpty))
        return false;
      return true;
    },

    valueHandler(oldValue, operation) {
      const value = operation === 'plus'
        ? Math.max(oldValue + this.step, this.min)
        : Math.min(oldValue - this.step);

      const isNewNumberValid = this.isNumberValidByStep(value) && this.isNumberValidByMin(value);
      if (isNewNumberValid)
        return value;

      return this.round(value, this.step, operation);
    },

    round(number, multiple, operation) {
      if (number < this.min)
        return 0;
      if (operation === 'minus')
        return Math.floor(number / multiple) * multiple;
      return Math.ceil(number / multiple) * multiple;
    },

    changeQuantity(val, useTimeout = true, isManually = false) {
      if (this.disabled) return;

      if (this.state.changeQuantity)
        clearTimeout(this.state.changeQuantity);

      let numberValue = typeof val === 'string' ? Number(val.replace(this.suffix, '')) : val;

      numberValue = Number.isNaN(numberValue) ? 0 : numberValue;

      const isValid = this.isValidNumber(numberValue);

      if (isValid)
        return this.emitQuantity(numberValue, useTimeout ? 600 : 0);

      return isManually
        ? this.errorHandlerByManuallyInput(numberValue)
        : this.errorHandler();
    },

    errorHandlerByManuallyInput(value) {
      if (value === 0)
        return this.emitQuantity(0);

      let valueToBeRounded = value;

      if (value < this.min)
        valueToBeRounded = this.min;
      else if (value > this.max)
        valueToBeRounded = this.max;

      const roundedValue = this.round(valueToBeRounded, this.step, value === this.max ? 'minus' : 'plus');

      this.emitQuantity(roundedValue);
      this.errorHandler();
    },

    errorHandler() {
      if (this.state.error) return;

      // ? Check if the user is doing several operations using the action buttons
      // ? in this case, it will be emitted the last valid number value.
      if (this.state.value !== this.value)
        return this.emitQuantity(this.state.value);

      this.state.error = true;
      setTimeout(() => {
        this.state.error = false;
      }, 1000);
    },
    emitQuantity(newQuantity, timeout = 0) {
      this.state.value = this.getValue(this.min, this.max, newQuantity);

      this.state.changeQuantity = setTimeout(() => {
        clearTimeout(this.state.changeQuantity);

        return this.$emit('input', this.state.value);
      }, timeout);
    },

    isValidNumber(number) {
      if ((number === 0 && this.state.value !== 0) && this.canBeEmpty)
        return true;

      if (this.multiple && !this.isNumberValidByStep(number)) return false;
      if (!isUndefined(this.max) && number > this.max) return false;
      if (!isUndefined(this.min) && number < this.min) return false;
      if (typeof number !== 'number' || Number.isNaN(number)) return false;

      return true;
    },
    getValue(min, max, value) {
      if (isUndefined(min) && isUndefined(max))
        return value;

      const getQuantity = () => {
        if (isUndefined(min))
          return value;

        if (value < min) {
          if (!this.canBeEmpty)
            return Math.max(min, value);
          if (value > this.state.value)
            Math.max(min, value);
          else return 0;
        }

        return value;
      };
      const quantity = getQuantity();
      return isUndefined(max) ? quantity : Math.min(max, quantity);
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-quantity-selector-container {
  border-radius: 70px;
  height: 37px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .pb-quantity-selector-input {
    width: 100%;
    border: none;
    outline: 0px;
    text-align: center;
    font-weight:bold;
    background: transparent;
  }

  .pb-quantity-selector-icon {
    cursor: pointer;
    touch-action: manipulation;
    -ms-touch-action: manipulation;
  }

  &.pb-quantity-selector-error {
    animation: shake 0.08s;
    animation-iteration-count: 3;
    border: 1.5px solid var(--color-danger);
  }

  &.pb-quantity-selector-success {
    border: 1.5px solid var(--color-success);
  }

  &.pb-quantity-selector-disabled {
    cursor: not-allowed;
    border-color: var(--color-gray-10);

    .pb-quantity-selector-icon {
      color: var(--color-gray-10);
      cursor: not-allowed;
    }

    .pb-quantity-selector-input {
      cursor: not-allowed;
    }
  }

  &.pb-quantity-selector-loading {
    animation: border-spin 2s infinite;
  }
}

.pb-quantity-selector-style-regular {
  box-shadow: 0px 0px 10px -4px rgba(0, 0, 0, 0.25), 0px 0px 36px rgba(0, 0, 0, 0.1);
  border: 1.5px solid #FFFF;

  .pb-quantity-selector-icon {
    color: var(--color-secondary);
  }
}

.pb-quantity-selector-style-outline {
  border: 1.5px solid;
}

</style>
