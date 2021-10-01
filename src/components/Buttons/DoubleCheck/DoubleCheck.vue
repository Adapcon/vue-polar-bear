<template>
  <div class="pb-double-check-container layer-overlay">
    <div
      class="pb-double-check disable-select"
      :class="{ 'double-check': state.showDoubleCheck }"
      :style="`background-color: ${state.showDoubleCheck ? `var(--color-${color})` : ''};`"
      @click.stop="clickHandler"
    >
      <PbIcon
        :icon="icon"
        :color="state.showDoubleCheck ? `var(--color-${textColor})` : `var(--color-${getIconColor})`"
        :class="{ 'double-check-disabled': disabled }"
      />

      <p v-if="state.showDoubleCheck" class="pb" :style="`color: var(--color-${textColor}) !important;`">
        {{ confirmText }}
      </p>
    </div>
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbDoubleCheck',

  components: {
    PbIcon,
  },

  props: {
    color: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },

    // ? Optional parameter, if it is not informed, the icon color will be the same as `color` prop
    iconColor: {
      type: String,
      default: '',
      validator: color => !color || validateColor(color),
    },

    textColor: {
      type: String,
      default: 'white',
      validator: color => validateColor(color),
    },

    disabled: { type: Boolean, default: false },

    confirmText: { type: String, required: true },

    icon: { type: String, required: true },
  },

  data() {
    return {
      state: {
        showDoubleCheck: false,
        doubleCheckTimeout: undefined,
      },
    };
  },

  computed: {
    getIconColor() {
      return this.iconColor || this.color;
    },
  },

  methods: {
    clickHandler() {
      if (this.disabled)
        return;

      if (!this.state.showDoubleCheck) {
        this.state.doubleCheckTimeout = setTimeout(
          () => { this.state.showDoubleCheck = false; },
          1500,
        );

        this.state.showDoubleCheck = true;
        return;
      }

      if (this.state.trashTimeout)
        clearTimeout(this.state.doubleCheckTimeout);

      this.state.showDoubleCheck = false;
      this.$emit('confirmed');
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-double-check-container {
  width: 13px;

  .pb-double-check {
    height: 30px;
    border-radius: 20px;
    transition: all .3s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;

    p {
      margin-left: 10px !important;
    }

    .double-check-disabled {
      cursor: not-allowed;
      color: var(--color-gray-20) !important;
    }

    &.double-check {
      margin-left: -110px;
      padding: 15px;
    }
  }
}
</style>
