<template>
  <div class="pb-checkbox-container">
    <div class="checkbox-wrapper">
      <div class="check-box" :style="`border: 1px solid var(--color-primary);`" @click="toggleCheckbox">
        <transition name="scale">
          <div v-if="checkboxState !== false" class="checked" :style="`background-color: var(--color-primary);`">
            <PbIcon
              :icon="icon"
              :style="`color: var(--color-white);`"
              class="icon"
            />
          </div>
        </transition>
      </div>
      <div
        class="checkbox-label-action"
      >
        <p
          class="pb"
          :style="`margin-left: 10px !important; color: var(--color-gray-20);`"
          @click="toggleCheckbox"
        >
          {{ label }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PbIcon,
} from '@pb';

export default {
  name: 'PbThreeStateCheckbox',

  components: {
    PbIcon,
  },

  props: {
    value: {
      type: [Object, Boolean, String, Number, Array],
      default: null,
    },
    indeterminateValue: {
      type: [Object, Boolean, String, Number, Array],
      default: null,
    },
    toggleIndeterminate: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },

  computed: {
    checkboxState: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },

    icon() {
      if (this.checkboxState === true)
        return 'fa fa-check';
      return 'fa fa-minus';
    },
  },

  methods: {
    toggleCheckbox() {
      if (this.toggleIndeterminate && this.checkboxState === false)
        this.checkboxState = this.indeterminateValue;
      else this.checkboxState = !this.checkboxState;
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
