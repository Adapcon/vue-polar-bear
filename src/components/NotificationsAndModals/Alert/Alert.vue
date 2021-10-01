<template>
  <transition name="fade">
    <div
      v-if="show"
      class="pb-alert-component layer-modal"
    >
      <div class="alert-container" :style="`max-width: ${maxWidth}`">
        <PbIcon
          :icon="configurationType.icon"
          :style="`color: var(--color-${configurationType.color});`"
          :class="configurationType.fa"
        />
        <h2 class="pb ">{{ title || configurationType.title }}</h2>
        <hr>
        <p v-if="text" class="pb">{{ text }}</p>
        <slot />
        <div class="alert-actions">
          <PbButton
            :color="buttonColor"
            button-style="background"
            @click.native="close"
          >
            {{ buttonText }}
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
import configuration from './configuration';

export default {
  name: 'PbAlert',
  components: {
    PbButton,
    PbIcon,
  },
  props: {
    text: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    show: {
      type: Boolean,
      required: true,
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

    maxWidth: {
      type: String,
      default: 'none',
    },

    type: {
      type: String,
      default: 'warning',
      validator: type => [
        'info',
        'error',
        'warning',
        'success',
      ].includes(type),
    },
  },
  computed: {
    configurationType() {
      return configuration[this.type];
    },
  },
  methods: {
    close() {
      this.$emit('close', this.type);
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-alert-component {
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

  .alert-actions {
    margin-top: 25px;
  }

  .alert-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--color-white);
    width: 40%;
    max-width: 95%;
    min-height: 350px;
    border-radius: 0px 40px 40px;
    padding: 0 40px;
    transition: all .3s ease;
    margin: 0 auto;

    @media(max-width: 1400px) { width: 630px; /* 45% */ }
    @media(max-width: 1100px) { width: 700px; /* ~64% */ }
    @media(max-width: 1000px) { width: 750px; /* 75% */ }

    h2 {
      margin: 20px 0 10px 0 !important;
      color: inherit !important;
    }

    p {
      text-align: center;
    }
  }
}
</style>
