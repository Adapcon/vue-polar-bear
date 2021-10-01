<template>
  <transition name="fade">
    <div class="pb-modal-component layer-modal">
      <div class="modal-container">
        <div class="header">
          <h4 class="pb">{{ title }}</h4>
          <PbIcon
            icon="fas fa-times fa-lg"
            class="icon"
            @click.native="cancel"
          />
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="footer">
          <div class="actions">
            <p class="pb-md" @click="cancel">Cancelar</p>
            <p class="pb-md-strong" @click="confirm">Salvar</p>
          </div>
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
    title: { type: String, default: '', required: true },
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
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-muted);

      h4 {
        padding-top: 25px;
        color: var(--color-gray-80) !important;
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
      justify-content: flex-end;
      margin-bottom: 30px;
      padding-right: 30px;

      .actions {
        display: flex;
        justify-content: space-around;
        width: 120px;

        p {
          cursor: pointer;
        }

        p:nth-child(1) {
          color: var(--color-muted);
        }

        p:nth-child(2) {
          color: var(--color-success);
        }
      }
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
