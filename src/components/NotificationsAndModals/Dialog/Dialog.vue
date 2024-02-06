<template>
  <transition name="fade">
    <div
      v-if="show"
      class="pb-dialog layer-modal"
    >
      <div
        class="dialog-container"
        style="max-width: 500px"
      >
        <div style="margin-bottom: 8px;">
          <div class="close-button-container">
            <PbButton
              class="close-button"
              icon="fas fa-times"
              @click.native="close"
            />
          </div>
          <div class="header">
            <slot name="icon-header" />
            <h4
              class="pb title-color"
            >
              {{ title }}
            </h4>
          </div>
          <h5
            style="color: var(--color-gray-90);"
            class="pb-light subtitle-color"
          >
            {{ subtitle }}
          </h5>
        </div>
        <div style="padding: 16px 0 16px 0">
          <slot name="main" />
        </div>
        <div class="dialog-actions">
          <div>
            <slot name="footer" />
          </div>
          <div>
            <PbButton
              color="gray-40"
              button-style="regular"
              style="margin-right: 24px;"
              @click.native="close"
            >
              Fechar
            </PbButton>
            <PbButton
              :color="buttonColor"
              :button-style="buttonStyle"
              :loading="buttonLoading"
              :disabled="buttonDisabled"
              @click.native="action"
            >
              {{ buttonText }}
            </PbButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbDialog',
  components: {
    PbButton,
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
      default: 'OK',
    },

    buttonColor: {
      type: String,
      default: 'secondary',
      validator: color => validateColor(color),
    },
    buttonStyle: {
      type: String,
      default: 'background',
    },
  },
  emits: ['close', 'action'],

  methods: {
    close() {
      this.$emit('close', this.type);
    },
    action() {
      this.$emit('action', this.type);
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  transition: opacity .3s ease;
  color: var(--color-gray-20);

  .close-button-container {
    display: flex;
    justify-content: flex-end;
    .close-button {
      top: -16px;
      right: -16px;
    }
  }

  .dialog-actions {
    display: flex;
    justify-content: space-between;
  }

  .dialog-container {
    display: flex;
    flex-direction: column;
    background: var(--color-white);
    width: 40%;
    max-width: 95%;
    border-radius: 16px;
    padding: 16px;
    transition: all .3s ease;
    margin: 0 auto;

    .subtitle-color {
      color: var(--color-gray-90);
    }

    .header {
      display: flex;
      align-items: center;
      margin-top: calc(24px - 76px);

      .title-color {
        color: var(--color-gray-90);
      }
    }

    @media(max-width: 1400px) { width: 630px; /* 45% */ }
    @media(max-width: 1100px) { width: 700px; /* ~64% */ }
    @media(max-width: 1000px) { width: 750px; /* 75% */ }
  }
}
</style>
