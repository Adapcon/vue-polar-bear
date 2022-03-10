<template>
  <section class="entity-controller-container">
    <PbDrawer
      width-mode="desktop"
      :visible="dataTableController.showEntityDrawer"
      @close="close"
    >
      <template #header>
        <h3 class="pb">
          {{ title }}
        </h3>
      </template>
      <template #main>
        <PbForm
          v-model="dataTableController.entitySelected"
          :entity-schema="entitySchema"
        />
      </template>
      <template #footer>
        <div class="footer">
          <PbButton
            button-style="background"
            :label="dataTableController.indexEntity ? 'Salvar': 'Criar'"
            @click.native="confirmedEntity"
          />
        </div>
      </template>
    </PbDrawer>
  </section>
</template>

<script>
import PbForm from '../../Miscellaneous/Form/Form.vue';
import PbDrawer from '../../MenusAndToolbars/Drawer/Drawer.vue';
import { dataTableController } from './store';
import PbButton from '../../Buttons/Button/Button.vue';

export default {
  name: 'EntityController',

  components: {
    PbForm,
    PbDrawer,
    PbButton,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    entitySchema: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      dataTableController,
    };
  },

  methods: {
    close() {
      dataTableController.showEntityDrawer = false;
    },

    confirmedEntity() {
      if (dataTableController.indexEntity !== null)
        this.$emit('update-entity', dataTableController.indexEntity, dataTableController.entitySelected);
      else this.$emit('create-entity', dataTableController.entitySelected);

      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.entity-controller-container {
  .footer {
    display: flex;
    justify-content: right;
  }
}
</style>
