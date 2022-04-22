<template>
  <section class="form-builder-container">
    <div class="form-builder-header">
      <div class="form-builder-title">
        <h3 class="pb">Campos Dinâmicos</h3>
        <p
          class="pb"
          style="color: var(--color-gray-20);"
        >
          Crie formulários dinâmicos
        </p>
      </div>
      <div class="form-builder-new-field">
        <PbButton
          button-style="regular"
          icon="fas-fa-plus"
          @click.native="newItem()"
        >
          Novo Campo
        </PbButton>
      </div>
    </div>

    <div class="form-builder-created-fields">
      <div
        v-for="(field, index) in formResponse"
        :key="index"
        class="form-builder-created-field"
      >
        <div class="field-container">
          <small
            class="pb"
            style="color: var(--color-gray-40);"
          >{{
            index
          }}</small>

          <div class="field-buttons">
            <PbButton
              style="height: 10px;"
              button-style="icon"
              icon="fas-fa-trash fa-xs"
              @click.native="openConfirmModal(index)"
            />

            <PbButton
              style="height: 10px;"
              button-style="icon"
              icon="fas-fa-pen fa-xs"
              @click.native="editItem(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <FormDrawer
      v-model="state.newField"
      :drawer-status.sync="state.drawerStatus"
      @include-field="includeField()"
    />

    <PbConfirm
      :title="state.confirm.title"
      :text="state.confirm.text"
      :icon="state.confirm.icon"
      :confirm-button-text="state.confirm.confirmButtonText"
      :confirm-button-color="state.confirm.confirmButtonColor"
      :cancel-button-text="state.confirm.cancelButtonText"
      :show="state.confirm.show"
      @confirm="confirmAction(state.confirm.index)"
      @cancel="cancelAction()"
    />
  </section>
</template>

<script>
import PbButton from '../../Buttons/Button/Button.vue';
import PbConfirm from '../../NotificationsAndModals/Confirm/Confirm.vue';
import FormDrawer from './FormDrawer.vue';

export default {
  name: 'PbFormBuilder',

  components: {
    PbConfirm,
    PbButton,
    FormDrawer,
  },

  props: {
    value: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      state: {
        confirm: {
          show: false,
          index: null,
          title: 'Você tem certeza que deseja excluir?',
          text: 'Os campo será removido para sempre!',
          icon: 'fas fa-exclamation-circle',
          confirmButtonText: 'Confirmar',
          confirmButtonColor: 'danger',
          cancelButtonText: 'Cancelar',
        },
        drawerStatus: false,
        newField: {},
      },
    };
  },

  computed: {
    formResponse: {
      get() {
        return this.value || {};
      },
      set(newFormResponse) {
        this.$emit('input', newFormResponse);
      },
    },
  },

  methods: {
    includeField() {
      this.formResponse = {
        ...this.formResponse,
        [this.state.newField.name]: { ...this.state.newField },
      };

      this.state.newField = {};
      this.closeDrawer();
    },

    openDrawer() {
      this.state.drawerStatus = true;
    },

    closeDrawer() {
      this.state.drawerStatus = false;
    },

    newItem() {
      this.state.newField = {};
      this.openDrawer();
    },

    editItem(index) {
      this.state.newField = { ...this.formResponse[index] };
      this.openDrawer();
    },

    removeItem(index) {
      this.$delete(this.formResponse, index);
    },

    confirmAction(index) {
      this.removeItem(index);
      this.state.confirm.show = false;
    },

    cancelAction() {
      this.state.confirm.show = false;
    },

    openConfirmModal(index) {
      this.state.confirm.index = index;
      this.state.confirm.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-builder-container {
  padding: 16px;

  .form-builder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .form-builder-title {
    }

    .form-builder-new-field {
    }
  }

  .form-builder-created-fields {
    display: flex;
    flex-direction: column;

    .form-builder-created-field {
      display: flex;
      justify-content: space-between;
      margin: 16px 0 16px 0;

      background: var(--color-gray);
      box-shadow: 0px 4px 7px -1px rgba(82, 89, 91, 0.14);
      border-radius: 8px;
      padding: 12px;

      .field-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .field-buttons {
        }
      }
    }
  }
}
</style>
