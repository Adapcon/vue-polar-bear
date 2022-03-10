<template>
  <div class="pb-checkbox-container">
    <div
      class="checkbox-wrapper"
      @click="() => (checked = !checked)"
    >
      <div
        class="check-box"
        :style="`border: 1px solid var(--color-${getColor(color)});`"
      >
        <transition name="scale">
          <div
            v-if="checked"
            class="checked"
            :style="`background-color: var(--color-${getColor(checkedColor)});`"
          >
            <PbIcon
              icon="fa fa-check"
              :style="`color: var(--color-${checkedIconColor});`"
              class="icon"
            />
          </div>
        </transition>
      </div>

      <slot name="description">
        <p
          v-if="label"
          class="pb"
          :style="`margin-left: 10px !important; color: var(--color-${labelColor});`"
        >
          {{ label }}
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbCheckbox',
  components: {
    PbIcon,
  },
  props: {
    value: { type: Boolean, default: false },
    label: { type: String, default: '' },
    labelColor: {
      type: String,
      default: 'gray-20',
      validator: color => validateColor(color),
    },
    color: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },
    checkedColor: {
      type: String,
      default: 'primary',
      validator: checkedColor => validateColor(checkedColor),
    },
    checkedIconColor: {
      type: String,
      default: 'white',
      validator: checkedColor => validateColor(checkedColor),
    },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        if (this.disabled) return;

        this.$emit('input', val);
      },
    },
  },

  methods: {
    getColor(color) {
      return this.disabled ? 'muted' : color;
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-checkbox-container {
  display: flex;

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;

    .check-box {
      width: 14px;
      height: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;

      .checked {
        width: 14px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;

        .icon {
          max-width: 8px;
          max-height: 9px;
        }
      }
    }
    p {
      user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
    }
  }
  .scale-enter-active, .scale-leave-active {
    transition: .2s;
  }
  .scale-enter, .scale-leave-to {
    transform: scale(0);
  }
}
</style>
