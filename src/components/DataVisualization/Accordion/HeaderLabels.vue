<template>
  <div class="header-labels-container">
    <div
      v-for="(label, indexLabel) in labels"
      :key="indexLabel"
      class="label"
    >
      <h6 class="pb title">
        {{ label.title }}
      </h6>
      <h6 class="pb">
        {{ label.value }}
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderLabels',

  props: {
    labels: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.header-labels-container {
  display: flex;
  flex: 1;
  gap: 24px;

  .label {
    flex: 1;

    h6 {
      color: var(--color-gray-40);
      font-weight: 400 !important;
    }

    .title {
      text-transform: uppercase;
      font-size: 12px !important;
      font-weight: 700 !important;
    }
  }
}
</style>
