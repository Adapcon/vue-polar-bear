<template>
  <div class="empty-state-container">
    <img
      src="./EmptyFolder.svg"
      alt="Empty Folder"
    >
    <p class="text-info pb">{{ textInfo }}</p>
  </div>
</template>

<script>
export default {
  name: 'PbEmptyState',
  props: {
    textInfo: {
      type: String,
      default: 'Sem dados no momento',
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-state-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .text-info {
      margin-top: 30px !important;
      color: var(--color-gray-40)
  }
}
</style>
