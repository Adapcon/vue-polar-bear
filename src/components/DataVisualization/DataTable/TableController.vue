<template>
  <div class="data-table-container">
    <PbTableHeader></PbTableHeader>
    <PbTableBody></PbTableBody>
  </div>
</template>

<script>
import PbTableHeader from './tableHeader.vue';
import PbTableBody from './tableHeader.vue';

export default {
  name: 'DataTable',

  props: {
  },

  components: {PbTableHeader,
PbTableBody,
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
.data-table-container {
  
}
</style>
