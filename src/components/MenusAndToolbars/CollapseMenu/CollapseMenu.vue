<template>
  <ul class="pb-collapse-menu-container">
    <li v-for="(option, index) in options" :key="index" class="options">
      <div
        class="option"
        :style="
          index === state.navigationOption
            ? `border-bottom: 2px solid var(--color-primary);`
            : ''
        "
        @click="setNavigationOption(index)"
      >
        <p class="pb title">
          <b v-if="index === state.navigationOption" class="pb">
            {{ option.title }}
          </b>
          <span v-else style="color: var(--color-gray-20);">
            {{ option.title }}
          </span>
        </p>
        <PbCollapseIcon
          class="icon"
          :is-icon-up="index === state.navigationOption"
          :color="
            index !== state.navigationOption
              ? 'var(--color-gray-20)'
              : 'var(--color-primary)'
          "
        />
      </div>
      <transition
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
      >
        <ul v-show="index === state.navigationOption" class="pb-scroll-primary sub-options">
          <li
            v-for="(subOption, subIndex) in option.subOptions"
            :key="subIndex"
            class="sub-option"
            :style="
              subIndex === value.subOption && index === value.option
                ? `background-color: var(--color-gray);`
                : ''
            "
            @click="optionHandler(index, subIndex)"
          >
            <p class="pb" style="color: var(--color-gray-80);">
              <b
                v-if="subIndex === value.subOption && index === value.option"
                class="pb"
              >
                {{ subOption }}
              </b>
              <template v-else>
                {{ subOption }}
              </template>
            </p>
          </li>
        </ul>
      </transition>
    </li>
  </ul>
</template>

<script>
import { PbCollapseIcon } from '@pb';

export default {
  name: 'PbCollapseMenu',

  components: {
    PbCollapseIcon,
  },

  props: {
    options: { type: Array, default: () => ([]) },
    value: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      state: {
        navigationOption: null,
      },
    };
  },

  mounted() {
    this.state.navigationOption = this.value.option;
  },

  methods: {
    optionHandler(option, subOption) {
      this.$emit('input', {
        option,
        subOption,
      });
    },

    setNavigationOption(option) {
      this.state.navigationOption = (option !== this.state.navigationOption) ? option : null;
    },

    enter(el) {
      const element = el;
      element.style.height = 'auto';

      const { height } = window.getComputedStyle(el);
      element.style.height = 0;

      setTimeout(() => {
        element.style.height = height;
      });
    },

    afterEnter(el) {
      const element = el;
      element.style.height = 'auto';
    },

    leave(el) {
      const element = el;

      element.style.height = window.getComputedStyle(el).height;

      setTimeout(() => {
        element.style.height = 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-collapse-menu-container {
  list-style: none;
  overflow: hidden;
  padding: 0;
  width: 100%;

  .options {
    position: relative;
    color: var(--color-primary);
    cursor: pointer;

    .option {
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    .title {
      text-transform: uppercase !important;
    }

    .icon {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    .expand-enter-active,
    .expand-leave-active {
      transition: height 0.4s ease-in-out;
      overflow: hidden;
    }

    .sub-options {
      list-style: none;
      padding: 0;
      max-height: 200px;
      overflow: auto;

      .sub-option {
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 5px;

        &:hover {
          background-color: var(--color-gray);
        }
      }

      &:last-child {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
