<template>
  <div
    class="toast-notification-body-wrapper layer-always-on-top"
  >
    <transition name="slide-fade">
      <div
        v-if="state.showToast"
        class="toast-notification-body"
      >
        <span class="toast-notification-content" :style="`background: var(--color-${backgroundColor})`">
          <p
            class="pb"
            :style="`color: var(--color-${textColor}) !important`"
          >
            {{ message }}
          </p>
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'ToastNotification',

  props: {
    duration: {
      type: Number,
      default: 1000,
      validator: value => value > 0,
    },

    backgroundColor: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },

    textColor: {
      type: String,
      default: 'white',
      validator: color => validateColor(color),
    },

    message: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      state: {
        showToast: false,
        timeout: null,
      },
    };
  },

  beforeUnmount() {
    if (this.state.showToast || this.state.timeout)
      this.clearShowToast();
  },

  methods: {
    toggle() {
      if (this.state.showToast)
        return;

      this.state.showToast = true;

      this.state.timeout = setTimeout(() => {
        this.clearShowToast();
      }, this.duration);
    },

    clearShowToast() {
      this.state.showToast = false;

      if (this.state.timeout)
        clearTimeout(this.state.timeout);
    },
  },
};

</script>

<style lang="scss" scoped>
.toast-notification-body-wrapper {
  width: 100%;
  position: fixed;
  top: 6%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }

  .toast-notification-content {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    border-radius: 90px;
  }
}
</style>
