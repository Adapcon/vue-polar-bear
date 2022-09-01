<template>
  <div class="pb-dropdown-container layer-overlay">
    <div class="content-header" @click="toggleDropdown">
      <p v-if="text" class="pb disable-select">
        <b class="pb">{{ text }}</b>
      </p>

      <slot name="header" />

      <PbCollapseIcon
        v-if="!hideCollapseIcon"
        :is-icon-up="state.isDropdownVisible"
        color="var(--color-primary)"
        style="margin-left: 10px;"
      />
    </div>

    <transition name="slide-fade">
      <div
        v-if="state.isDropdownVisible"
        v-click-outside="closeDropDown"
        :class="[
          'dropdown-item-wrapper',
          `dropdown-${side}`,
          `${withBoxShadow ? 'dropdown-box-shaddow' : ''}`
        ]"
        :style="getStyle"
        @click="closeDropDownOnClick()"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import PbCollapseIcon from "@pb/Miscellaneous/CollapseIcon/CollapseIcon.vue";
import { validateColor } from "@pb/utils/validator";

export default {
  name: 'PbDropdown',

  components: {
    PbCollapseIcon,
  },

  props: {
    text: { type: String, default: '' },
    hideCollapseIcon: { type: Boolean, default: false },
    withBoxShadow: { type: Boolean, default: false },
    closeOnOptionSelect: { type: Boolean, default: true },
    side: {
      type: String,
      default: 'right',
      validator: side => {
        const sides = ['right', 'left'];

        return sides.includes(side);
      },
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
        isDropdownVisible: false,
      },
    };
  },

  computed: {
    getStyle() {
      const styleString = `background-color: var(--color-${this.color});`;

      if (!this.$slots.header) return styleString.concat("top: 30px;");
      return styleString.concat("top: 50px;");
    },
  },

  methods: {
    closeDropDownOnClick() {
      if (this.closeOnOptionSelect) return this.closeDropDown();
    },

    toggleDropdown() {
      return this.state.isDropdownVisible
        ? this.closeDropDown()
        : this.openDropDown();
    },
    openDropDown() {
      this.state.isDropdownVisible = true;
      this.$emit('update:dropdownOpened');
    },
    closeDropDown() {
      this.state.isDropdownVisible = false;
      this.$emit('update:dropdownClosed');
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.pb-dropdown-container {
  position: relative;

  .content-header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .dropdown-item-wrapper {
    position: absolute;

    &.dropdown-right {
      right: 20px;
      border-radius: 10px 0 10px 10px;
    }

    &.dropdown-left {
      left: 0;
      border-radius: 0 10px 10px 10px;
    }
  }

  .dropdown-box-shaddow {
    box-shadow: -2px 4px 14px 8px rgba(0, 0, 0, 0.05),
      -1px 1px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
