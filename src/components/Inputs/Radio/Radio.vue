<template>
  <div class="pb-radio-container">
    <div
      v-for="option in options"
      :key="option.value"
      class="option"
    >
      <label>
        <input
          v-model="selected"
          type="radio"
          :value="option.value"
        >
        <p class="pb">{{ option.label }}</p>
      </label>
      <div />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PbRadio',

  props: {
    value: { type: String, default: '' },
    options: { type: Array, default: () => [] },
  },

  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-radio-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 2fr));
  gap: 20px 10px;

  .option {
    label {
      display: flex;

      input[type="radio"] {
        -webkit-appearance: none;
        width: 13px;
        height: 13px;
        border: 1px solid darkgray;
        border-radius: 50%;
        outline: none;
      }

      input[type="radio"]:before .desktop-radio-input {
        height: 70%;
      }

      .mobile-radio-input input[type="radio"]:before {
        height: 60%;
      }

      input[type="radio"]:before {
        content: "";
        display: block;
        width: 60%;
        height: 60%;
        margin: 20% auto;
        border-radius: 50%;
      }

      input[type="radio"]:checked {
        border: 1px solid var(--color-primary);
      }

      input[type="radio"]:checked:before {
        background: var(--color-primary);
      }

      p {
        margin-left: 5px !important;
        color: var(--color-gray-90) !important;
      }
    }
  }
}
</style>
