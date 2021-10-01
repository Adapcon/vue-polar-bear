<template>
  <v-server-table
    ref="pbServerTable"
    class="pb-server-table"
    :columns="config.columns"
    :options="config.options"
    v-on="$listeners"
    @loading="request"
    @loaded="response"
  >
    <template v-for="(_, name) of $scopedSlots" v-slot:[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>

    <template v-slot:prependBody>
      <tr v-if="loading" style="position: absolute; padding: 0; width: 100%; heigth: 0; border: 0; margin-top: -2px">
        <PbLoadingBar />
      </tr>
    </template>

    <template v-slot:afterFilterWrapper>
      <slot name="afterFilterWrapper" />
    </template>
  </v-server-table>
</template>

<script>
import Vue from 'vue';
import { ServerTable } from 'vue-tables-2';
import PbLoadingBar from '@pb/Loadings/LoadingBar/LoadingBar.vue';
import { merge } from '@pb/utils/merge';

Vue.use(ServerTable);
export default {
  name: 'PbServerTable',
  components: {
    PbLoadingBar,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      state: {
        columns: [],
        options: {
          texts: {
            count: 'Mostrando {from} a {to} de {count} Registros|{count} registros|Um registro',
            first: 'Primeiro',
            last: 'Último',
            filter: '',
            filterPlaceholder: 'Pesquisar...',
            limit: 'Por página:',
            page: 'Página:',
            noResults: 'Nenhum registro encontrado',
            noRequest: 'Selecione pelo menos um filtro para buscar resultados',
            filterBy: 'Filtrar por {column}',
            loading: '',
            defaultOption: 'Selecione {column}',
            columns: 'Colunas',
          },
        },
        control: {
          requestPending: [],
        },
      },
    };
  },
  computed: {
    loading() {
      if (this.state.control.requestPending.length) return true;
      return false;
    },
    config() {
      const config = {
        options: merge({ items: [this.state.options, this.options], omit: ['requestFunction'] }),
        columns: this.columns,
      };
      config.options.requestFunction = this.compositionRequestFunction;

      return config;
    },
  },
  mounted() {},
  methods: {
    request(request) {
      this.state.control.requestPending.push(request);
      if (this.state.control.requestPending.length === 1) this.$emit('isLoading', true);
    },
    response() {
      this.state.control.requestPending.shift();
      if (this.state.control.requestPending.length === 0) this.$emit('isLoading', false);
    },
    compositionRequestFunction(data) {
      return this.options.requestFunction(data).catch(() => {
        this.state.control.requestPending.shift();
        // !TODO Nova feature Voltar para a ultima pagina que teve sucesso.
        this.$refs.pbServerTable.setPage(1);
        // !TODO Nova feature Colocar notificação de erro;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-server-table {
  position: relative;
}
</style>
