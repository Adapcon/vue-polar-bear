<template>
  <transition name="fade">
    <div v-if="show" class="pb-confirm-component layer-modal">
      <div class="confirm-container">
        <PbIcon
          :icon="icon"
          :style="`color: var(--color-${iconColor})`"
          class="fa-5x"
        />
        <h3 class="pb" style="margin-top: 20px !important">{{ title }}</h3>
        <p v-if="text" class="pb">{{ text }}</p>
        <div v-if="$slots.default" class="confirm-slot">
          <slot />
        </div>
        <div class="confirm-actions">
          <PbButton
            :color="cancelButtonColor"
            button-style="background"
            :disabled="disableActions"
            @click.native="cancel"
          >
            <small class="pb">
              <b class="pb">
                {{ cancelButtonText.toUpperCase() }}
              </b>
            </small>
          </PbButton>

          <PbButton
            :color="confirmButtonColor"
            button-style="background"
            :disabled="disableActions"
            @click.native="confirm"
          >
            <small class="pb">
              <b class="pb">
                {{ confirmButtonText.toUpperCase() }}
              </b>
            </small>
          </PbButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbConfirmModal',
  components: {
    PbButton,
    PbIcon,
  },
  props: {
    title: { type: String, default: '', required: true },
    text: { type: String, default: '' },
    show: { type: Boolean, required: true, default: false },
    icon: { type: String, default: 'fas fa-exclamation-circle' },
    iconColor: { type: String, default: 'info', validator: color => validateColor(color) },
    confirmButtonText: { type: String, default: 'Confirmar' },
    confirmButtonColor: { type: String, default: 'secondary', validator: color => validateColor(color) },
    disableActions: { type: Boolean, default: false },
    cancelButtonText: { type: String, default: 'Sair' },
    cancelButtonColor: { type: String, default: 'secondary', validator: color => validateColor(color) },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-confirm-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;
  color: var(--color-gray-20);
  .confirm-actions {
    margin-top: 25px;
  }

  .confirm-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--color-white);
    width: 40%;
    max-width: 95%;
    min-height: 350px;
    padding: 2em;
    border-radius: 0px 40px 40px;
    transition: all 0.3s ease;
    margin: 0 auto;

    @media (max-width: 1400px) {
      width: 630px; /* 45% */
    }
    @media (max-width: 1100px) {
      width: 700px; /* ~64% */
    }
    @media (max-width: 1000px) {
      width: 750px; /* 75% */
    }

    h2 {
      margin: 20px 0 10px 0 !important;
      color: inherit !important;
      text-align: center;
    }

    p {
      text-align: center;
    }
    .confirm-slot {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
  }
}
</style>
