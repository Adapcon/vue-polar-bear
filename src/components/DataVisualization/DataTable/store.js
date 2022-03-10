import Vue from 'vue';

export const dataTableController = Vue.observable({
  showEntityDrawer: false,
  entitySelected: {},
  entityIndex: null,
});
