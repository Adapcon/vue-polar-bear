<template>
  <div class="pb-data-table-container">
   <div class="row">
      <PbSearchInput class="col-4"></PbSearchInput>
      <PbDateInput class="col-3"></PbDateInput>
      <div class="col-2"> 'Pb Sort?'</div>
   </div>
   <TableController></TableController>
  </div>
</template>

<script>
import PbSearchInput from '@pb/FiltersAndSearch/SearchInput/SearchInput.vue';
import PbDateInput from '@pb/Inputs/DateInput/DateInput.vue';
import TableController from './TableController.vue'

export default {
  name: 'PbDataTable',

  props: {
  },

  components: {
    PbSearchInput,
    PbDateInput,
    TableController,
  },

  data() {
    return {
      state: {
      },
    };
  },

  computed: {
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped>
.pb-data-table-container {
  
}
</style>
