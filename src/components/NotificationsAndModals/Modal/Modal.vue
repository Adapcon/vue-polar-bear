<template>
  <transition name="fade">
    <div class="pb-modal-component layer-modal" @click="cancel">
      <div class="modal-container" @click.stop>
        <div class="header">
          <div
            class="icon-position"
          >
            <PbIcon
              v-if="enabledButton"
              icon="fas fa-times fa-lg"
              class="icon"
              @click.native="cancel"
            />
          </div>
          <slot name="body" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { PbIcon } from '@pb';
export default {
  name: 'PbModal',
  components: {
    PbIcon,
  },
  props: {
    enabledButton: { type: Boolean, default: true },
  },
  mounted() {
    this.toggleClassToRemoveScroll('add');
  },
  destroyed() {
    this.toggleClassToRemoveScroll('remove');
  },
  methods: {
    toggleClassToRemoveScroll(action) {
      document.body.classList[action]('modal-open');
    },
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
.pb-modal-component {
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
  .modal-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--color-white);
    width: 60%;
    max-width: 95%;
    min-height: 350px;
    border-radius: 0px 20px 20px;
    transition: all 0.3s ease;
    margin: 0 auto;
    .header {
      padding: 15px 15px 20px 30px;
      h4 {
        padding-top: 25px;
        color: var(--color-gray-80) !important;
      }
      .icon-position {
        display: flex;
        justify-content: flex-end;
        padding: 5px;
        }
      .icon {
        color: var(--color-gray-80);
        cursor: pointer;
      }
    }
    .content {
      padding: 0 30px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-right: 30px;
    }
    @media (max-width: 1100px) {
      width: 75%;
    }
    @media (max-width: 1000px) {
      width: 80%;
    }
  }
}
</style>