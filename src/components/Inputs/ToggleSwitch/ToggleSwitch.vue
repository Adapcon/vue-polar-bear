<template>
  <section class="toggle-section-container">
    <label class="switch">
      <input v-model="clickButtonSwitch" type="checkbox">
      <span class="slider round" />
    </label>
  </section>
</template>

<script>
export default {
  name: 'PbToggleSwitch',

  prop: {
    selection: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    clickButtonSwitch: {
      get() {
        return this.value;
      },
      set(clickValue) {
        this.$emit('update:selection', clickValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.toggle-section-container {
  .switch {
    position: relative;
    display: inline-block;
    width: 41px;
    height: 22px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-gray-10);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 0px;
    bottom: 1px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: var(--color-primary);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--color-checkedColor);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(19px);
    -ms-transform: translateX(19px);
    transform: translateX(19px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
}
</style>
