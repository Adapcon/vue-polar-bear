<template>
  <transition name="fade">
    <div
      v-if="show"
      class="pb-dialog layer-modal"
      @keyup.esc="close"
    >
      <div
        class="dialog-container"
        :style="fixedWidth ? `width: ${fixedWidth}` : ''"
      >
        <div v-if="showHeader" class="dialog-header">
          <div class="dialog-header-button-close">
            <PbButton
              class="close-button"
              icon="fas fa-times"
              style="margin: 0;"
              @click.native="close"
            />
          </div>
          <div class="dialog-header-title">
            <slot name="header-icon" />
            <PbIcon
              v-if="icon"
              :icon="`fas fa-${icon}`"
              :style="`color: var(--color-${iconColor})`"
              size="lg"
            />
            <h4 class="pb">{{ title }}</h4>
          </div>
          <h5
            v-if="subtitle"
            class="dialog-header-subtitle pb-light"
          >
            {{ subtitle }}
          </h5>
          <slot name="header" />
        </div>

        <div class="dialog-content">
          <p v-if="text" class="pb">{{ text }}</p>
          <slot name="main" />
        </div>

        <div
          v-if="showFooter"
          class="dialog-footer"
        >
          <slot name="footer" />

          <div
            v-if="buttonText || buttonTextClose"
            class="dialog-footer-actions"
          >
            <PbButton
              v-if="buttonTextClose"
              color="gray-40"
              button-style="regular"
              class="close-button"
              style="margin: 0;"
              @click.native="close"
            >
              {{ buttonTextClose }}
            </PbButton>

            <PbButton
              v-if="buttonText"
              style="margin: 0;"
              :color="buttonColor"
              :button-style="buttonStyle"
              :loading="buttonLoading"
              :icon="buttonLoading"
              :disabled="buttonDisabled"
              @click.native="action"
            >
              {{ buttonText }}
            </PbButton>
          </div>
        </div>
      </div>
      <div
        class="dialog-overlay"
        @click="closeOutside"
      />
    </div>
  </transition>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbDialog',

  components: {
    PbButton,
    PbIcon,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    subtitle: {
      type: String,
      default: '',
    },

    text: {
      type: String,
      default: '',
    },

    icon: {
      type: String,
      default: '',
    },

    iconColor: {
      type: String,
      default: '',
    },

    show: {
      type: Boolean,
      required: true,
      default: false,
    },

    buttonDisabled: {
      type: Boolean,
      default: false,
    },

    buttonLoading: {
      type: Boolean,
      default: false,
    },

    buttonText: {
      type: String,
      default: '',
    },

    buttonTextClose: {
      type: String,
      default: '',
    },

    buttonColor: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },

    buttonStyle: {
      type: String,
      default: 'background',
    },

    fixedWidth: {
      type: String,
      default: '',
    },

    showHeader: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['close', 'action', 'close-outside'],

  computed: {
    showFooter() {
      return this.buttonText || this.buttonTextClose || this.$slots.footer;
    },
  },

  methods: {
    close() {
      this.$emit('close', this.type);
    },

    action() {
      this.$emit('action', this.type);
    },

    closeOutside() {
      this.$emit('close-outside', this.show);
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-actrive, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.pb-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity .3s ease;
  color: var(--color-gray-40);
  padding: 16px;

  .dialog-container {
    background: var(--color-white);
    border-radius: 16px;
    max-width: 100%;
    max-height: 100%;
    min-width: 200px;
    z-index: 1;
    display: flex;
    flex-direction: column;

    .dialog-header {
      padding: 16px 16px 0;
      position: relative;
      color: var(--color-gray-90);

      &-button-close {
        position: absolute;
        top: 4px;
        right: 4px;
        border-radius: 50%;
        transition: background-color .3s;

        &:hover {
          background-color: var(--color-hover);
        }
      }

      &-title {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      &-subtitle {
        margin-top: 8px!important;
      }
    }

    .dialog-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }

    .dialog-footer {
      padding: 0 16px 16px;
      display: flex;
      align-items: center;
      justify-content: end;

      &-actions {
        display: flex;
        justify-content: end;
        gap: 8px;

        .close-button {
          padding: 0 16px!important;
          margin-left: 8px!important;
          
          &:hover {
            background-color: var(--color-gray-40-light);
          }
        }
      }
    }
  }

  .dialog-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-overlay);
  }
}
</style>
