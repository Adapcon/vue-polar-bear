<template>
  <section class="form-drawer-container">
    <PbDrawer
      width-mode="desktop"
      :visible="isOpen"
      @close="closeDrawer()"
    >
      <template #header>
        <div
          class="form-drawer-header-title"
        >
          <h3 class="pb">Novo Campo</h3>
        </div>
      </template>
      <template #main>
        <div class="form-drawer-main-content pb-scroll-primary">
          <PbForm
            v-if="!state.loading.form"
            ref="form-steps"
            v-model="formResponse"
            :entity-schema="state.entitySchemaSteps[state.steps.selectedStep]"
          />
        </div>
      </template>
      <template #footer>
        <div class="form-drawer-footer">
          <div class="form-drawer-footer-buttons">
            <PbButton
              :button-style="hasPreviousStep ? 'regular' : 'background'"
              :icon="hasPreviousStep ? 'fas fa-arrow-up fa-rotate-270' : ''"
              :disable="!hasPreviousStep"
              @click.native="() => hasPreviousStep ? previousStep() : closeDrawer()"
            >
              {{ backStepLabel }}
            </PbButton>

            <PbButton
              :button-style="hasNextStep ? 'regular' : 'background'"
              icon-position="right"
              :icon="hasNextStep ? 'fas fa-arrow-up fa-rotate-90' : ''"
              :disable="!hasNextStep"
              @click.native="() => hasNextStep ? nextStep() : includeField()"
            >
              {{ nextStepLabel }}
            </PbButton>
          </div>
        </div>
      </template>
    </PbDrawer>
  </section>
</template>

<script>
import PbButton from '../../Buttons/Button/Button.vue';
import PbDrawer from '../../MenusAndToolbars/Drawer/Drawer.vue';
import PbForm from '../Form/Form.vue';

export default {
  name: 'PbFormDrawer',
  components: {
    PbForm,
    PbButton,
    PbDrawer,
  },

  props: {
    value: { type: Object, default: () => ({}) },
    drawerStatus: { type: Boolean, default: false },
  },

  data() {
    return {
      state: {
        loading: {
          form: false,
        },
        steps: {
          selectedStep: 0,
          totalSteps: 2,
        },
        entitySchemaSteps: [
          {
            type: {
              type: 'select',
              label: 'Tipo do campo',
              required: true,
              enabledValue: [
                'html',
                'string',
                'number',
                'boolean',
                'text',
                'file',
                'date-time',
                // 'object',
                // 'array',
                'select',
                // 'object-keys',
                // 'custom-field',
              ],
              labelValue: [
                'Texto html',
                'Texto normal',
                'Numero',
                'verdadeiro/falso (boolean)',
                'Texto grande (4 linhas)',
                'Arquivo',
                'Data e hora',
                // 'Entidade',
                // 'Lista',
                'Seleção',
                // 'Entidade chaveada',
                // 'Campo customizado',
              ],
            },
            name: {
              type: 'string',
              label: 'Chave do campo',
              required: true,
              tip: 'Chaves de campos são valores únicos. A chave do campo não pode ser alterada.',
            },
            label: {
              type: 'string',
              label: 'Nome do campo',
              required: true,
            },
            position: {
              type: 'number',
              label: 'Posição no formulário',
              required: false,
              tip: 'Campos com posição definida são ordenados pelo valor da posição. Campos podem ter a mesma posição.',
            },
            required: {
              type: 'boolean',
              label: 'Campo obrigatório?',
            },
            placeholder: {
              type: 'string',
              label: 'Dica no campo',
            },
          },
          {
            contentFile: {
              type: 'array',
              label: '[Arquivo] tipos de arquivo',
              contentArray: {
                type: 'string',
                label: 'tipo do arquivo',
                tip: '.txt .pdf, usar o .(ponto)',
              },
              showIf: [{
                field: 'type',
                value: 'file',
              }],
            },
            contentObject: {
              type: 'object',
              label: '[Entidade] dados da entidade',
              contentObject: {
                type: 'string',
                label: 'Valor da entidade',
              },
              tip: 'Utilizar gerador para preencher este campo',
              showIf: [{
                field: 'type',
                value: 'object',
              },
              {
                field: 'type',
                value: 'object-keys',
              }],
            },
            contentArray: {
              type: 'object',
              label: '[Lista] dados da entidade',
              contentObject: {

              },
              tip: 'Utilizar gerador para preencher este campo',
              showIf: [{
                field: 'type',
                value: 'array',
              }],
            },
            enabledValue: {
              type: 'array',
              label: '[Seleção] dados da seleção',
              contentArray: {
                type: 'string',
                label: 'Valor do select',
              },
              showIf: [{
                field: 'type',
                value: 'select',
              }],
            },
            labelValue: {
              type: 'array',
              label: '[Seleção] displays da seleção',
              contentArray: {
                type: 'string',
                label: 'Valor do select',
              },
              showIf: [{
                field: 'type',
                value: 'select',
              }],
            },
            keyType: {
              type: 'select',
              label: '[Entidade chaveada] tipo da chave',
              enabledValue: [
                'string',
                'number',
              ],
              labelValue: [
                'Texto',
                'Numero',
              ],
              showIf: [{
                field: 'type',
                value: 'object-keys',
              }],
            },
            keyLabel: {
              type: 'string',
              label: '[Entidade chaveada] Nome da chave do objeto',
              showIf: [{
                field: 'type',
                value: 'object-keys',
              }],
            },
            onlyDate: {
              type: 'boolean',
              label: '[Data e hora] exibir somente data',
              showIf: [{
                field: 'type',
                value: 'date-time',
              }],
            },
          },
        ],
        enabledValue: [
          'file',
          'date-time',
          'object',
          'array',
          'select',
          'object-keys',
        ],
      },
    };
  },

  computed: {
    isOpen: {
      get() {
        return this.drawerStatus;
      },

      set(value) {
        this.$emit('update:drawerStatus', value);
      },
    },

    formResponse: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      },
    },

    hasNextStep() {
      return this.state.steps.selectedStep < this.state.steps.totalSteps - 1 && this.hasDataOnNextStep();
    },

    hasPreviousStep() {
      return this.state.steps.selectedStep > 0;
    },

    backStepLabel() {
      return this.hasPreviousStep ? 'Voltar' : 'Cancelar';
    },

    nextStepLabel() {
      return this.hasNextStep ? 'Próximo' : 'Confirmar';
    },
  },

  watch: {
    isOpen(value) {
      if (value)
        this.state.steps.selectedStep = 0;
    },
  },

  methods: {
    hasDataOnNextStep() {
      return this.state.enabledValue.includes(this.formResponse.type);
    },

    closeDrawer() {
      this.isOpen = false;
    },

    nextStep() {
      if (!this.currentStepIsValid()) return;
      if (this.state.steps.selectedStep < this.state.steps.totalSteps - 1)
        this.state.steps.selectedStep += 1;
      this.loadForm();
    },

    previousStep() {
      if (this.state.steps.selectedStep > 0 && this.state.steps.selectedStep <= this.state.steps.totalSteps - 1)
        this.state.steps.selectedStep -= 1;
      this.loadForm();
    },

    currentStepIsValid() {
      const stepRef = this.$refs['form-steps'];
      return stepRef.validateRequired();
    },

    includeField() {
      this.$emit('include-field');
    },

    loadForm() {
      this.state.loading.form = true;
      setTimeout(() => {
        this.state.loading.form = false;
      }, 15);
    },
  },
};
</script>

<style lang="scss" scoped>
  .form-drawer-container {

    .form-drawer-header-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .form-drawer-main-content {
      overflow: auto;
      max-height: 60vh;
    }

    .form-drawer-footer {

      .form-drawer-footer-buttons {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
