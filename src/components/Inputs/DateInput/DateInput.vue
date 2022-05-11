<template>
  <div class="pb-date-input-container">
    <input
      v-model="inputDate"
      class="pb"
      type="date"
      :style="inputStyle"
      :class="{
        'input-error': !state.validation,
        'white-calendar': color === 'white'
      }"
    >
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbDateInput',
  props: {
    value: { type: [String, Date], default: '' },
    onValidate: { type: Function, default: null },
    color: {
      type: String,
      default: 'gray-20',
      validator: color => validateColor(color),
    },
  },

  data() {
    return {
      state: {
        validation: true,
        changeDate: null,
      },
    };
  },
  computed: {
    inputDate: {
      get() {
        if (typeof this.value === 'string' && this.value !== '')
          return this.value;

        return this.value ? this.dateToString(this.value) : this.dateToString(new Date());
      },
      set(date) {
        if (!date) {
          this.state.validation = false;
          return;
        }

        const dateObj = new Date(date);
        dateObj.setHours(dateObj.getHours() + (dateObj.getTimezoneOffset() / 60));

        if (this.state.changeDate)
          clearTimeout(this.state.changeDate);

        this.state.changeDate = setTimeout(() => {
          clearTimeout(this.state.changeDate);

          this.validate(dateObj);

          this.$emit('input', dateObj);

          this.$emit('validation', {
            validation: this.state.validation,
          });
        }, 1000);
      },
    },

    inputStyle() {
      return {
        color: `var(--color-${this.color})`,
        border: `1px solid var(--color-${this.color})`,
      };
    },
  },

  methods: {
    validate(date) {
      let validation = true;
      if (!this.isValidDate(date))
        validation = false;
      else if (typeof this.onValidate === 'function')
        validation = this.onValidate(date);

      this.state.validation = validation;
    },

    dateToString(date) {
      return date.toISOString().split('T')[0];
    },

    isValidDate(date) {
      if (Object.prototype.toString.call(date) === '[object Date]') {
        if (!Number.isNaN(date.getTime()))
          return true;
      }
      return false;
    },
  },
};
</script>

<style lang='scss' scoped>
.pb-date-input-container {
  display: flex;
  flex-direction: column;

  input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    transition: all 0.3s ease;
    background: none;

    &:focus {
      border: 1px solid var(--color-gray-90) !important;
    }

    &.input-error {
      border-color: var(--color-danger) !important;
    }

    &::-webkit-calendar-picker-indicator:hover {
      cursor: pointer;
    }

    &.white-calendar {
      &::-webkit-calendar-picker-indicator {
        filter: invert(1);
      }
    }
  }
}
</style>
