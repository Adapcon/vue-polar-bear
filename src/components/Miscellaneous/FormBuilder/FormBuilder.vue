<template>
  <section class="form-builder-container">
    <PbForm
      v-model="formResponse"
      :entity-schema="state.entitySchema"
    />
  </section>
</template>

<script>
import PbForm from '../Form/Form.vue';

export default {
  name: 'PbFormBuilder',

  components: {
    PbForm,
  },

  props: {
    value: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      state: {
        entitySchema: {
          entitySchema: {
            type: 'object-keys',
            label: 'Campo no formulário',
            keyType: 'string',
            keyLabel: 'Novo Campo',
            contentObject: {
              type: 'object',
              label: 'O tal do campo novo',
              contentObject: {
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
                    'datetime',
                    'object',
                    'array',
                    'select',
                    'object-keys',
                    'custom-field',
                  ],
                  labelValue: [
                    'Texto html',
                    'Texto normal',
                    'Numero',
                    'verdadeiro/falso (boolean)',
                    'Texto grande (4 linhas)',
                    'Arquivo',
                    'Data e hora',
                    'Entidade',
                    'Lista',
                    'Seleção',
                    'Entidade chaveada',
                    'Campo customizado',
                  ],
                },
                label: {
                  type: 'string',
                  label: 'Nome do campo',
                },
                required: {
                  type: 'boolean',
                  label: 'Campo obrigatório?',
                },
                position: {
                  type: 'number',
                  label: 'Posição do campo',
                },
                tip: {
                  type: 'string',
                  label: 'Dica do campo',
                },
                dynamic: {
                  type: 'boolean',
                  label: 'Campo é controlado via sistema?',
                },
                columnVisible: {
                  type: 'boolean',
                  label: 'Campo é exibido nas consultas?',
                },
                occult: {
                  type: 'boolean',
                  label: 'Campo não sera exibido?',
                },
                placeholder: {
                  type: 'string',
                  label: 'Dica no campo',
                },
                hasThreeState: {
                  type: 'boolean',
                  label: '[verdadeiro/falso (boolean)] possui tres estados',
                },
                filterFileTypes: {
                  type: 'array',
                  label: '[Arquivo] tipos de arquivo',
                  contentArray: {
                    type: 'string',
                    label: 'tipo do arquivo',
                    tip: '.txt .pdf, usar o .(ponto)',
                  },
                },
                onlyDate: {
                  type: 'boolean',
                  label: '[Data e hora] exibir somente data',
                },
                contentObject: {
                  type: 'object',
                  label: '[Entidade] dados da entidade',
                  contentObject: {},
                  tip: 'Utilizar gerador para preencher este campo',
                },
                contentArray: {
                  type: 'object',
                  label: '[Lista] dados da entidade',
                  contentObject: {},
                  tip: 'Utilizar gerador para preencher este campo',
                },
                enabledValue: {
                  type: 'array',
                  label: '[Seleção] dados da seleção',
                  contentArray: {
                    type: 'string',
                    label: 'Valor do select',
                  },
                },
                labelValue: {
                  type: 'array',
                  label: '[Seleção] displays da seleção',
                  contentArray: {
                    type: 'string',
                    label: 'Valor do select',
                  },
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
                },
                keyLabel: {
                  type: 'string',
                  label: '[Entidade chaveada] Nome da chave do objeto',
                },
                slotName: {
                  type: 'string',
                  label: '[Campo customizado] Nome do objeto do slot',
                },
              },
            },
          },
        },
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
};
</script>

<style lang="scss" scoped>
.form-builder-container {
  width: 95%;
}
</style>
