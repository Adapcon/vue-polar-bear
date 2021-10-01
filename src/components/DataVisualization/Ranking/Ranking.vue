<template>
  <section class="list-container">
    <div
      v-for="(item, index) in data"
      :key="`item-${index}`"
      class="ranking-item"
    >
      <div class="ranking-col">
        <p v-if="showIndex" class="pb">
          <b class="pb">
            {{ index + 1 }}.
          </b>
        </p>

        <div class="ranking-description">
          <p class="pb">
            <b class="pb">{{ item.title }}</b>
          </p>

          <small v-if="item.description" class="pb">
            {{ item.description }}
          </small>
        </div>
      </div>

      <div class="ranking-value">
        <p class="pb">
          <b class="pb">{{ item.value }}</b>
        </p>

        <small v-if="item.valueLabel" class="pb">
          {{ item.valueLabel }}
        </small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PbList',

  props: {
    showIndex: { type: Boolean, default: true },
    data: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  position: relative;
  text-align: left !important;

  .ranking-item {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;

    .ranking-col {
      display: flex;
      align-items: center;
      max-width: 70%;
      position: relative;

      .ranking-description {
        max-width: 100%;
        margin: 0 20px;
        color: var(--color-gray-20);
        text-transform: uppercase;

        p, small {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          @media screen and (max-width: 980px) {
            max-width: 180px;
          }
        }
      }

      p { color: var(--color-gray-60) }

    }

    .ranking-value {
      text-align: right;

      small {
        color: var(--color-gray-20);
      }
    }
  }
}
</style>
