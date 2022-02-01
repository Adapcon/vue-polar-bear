<template>
  <section class="workflow-container">
    <div
      id="workflow-content"
      class="workflow-content"
    >
      <div
        v-for="(cardObject, cardIndex) in cards"
        :key="cardIndex"
        style="display: flex"
      >
        <div>
          <Balloon
            v-for="(content, indexName) in cardObject"
            :key="indexName"
            :content="content"
            :index-name="indexName"
            @on-mounted="
              () => {
                state.reload = true;
              }
            "
          >
            <slot :name="indexName" />
          </Balloon>
        </div>
        <Lines
          v-if="state.reload"
          :card-object="cardObject"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Balloon from './Balloon.vue';
import Lines from './Lines.vue';

export default {
  name: 'PbWorkflowGraph',

  components: {
    Balloon,
    Lines,
  },

  props: {
    cards: { type: Array, default: () => [] },
  },

  data() {
    return {
      state: {
        reload: false,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.workflow-container {
  .workflow-content {
    display: flex;
    background-color: var(--color-gray-90);
    padding: 20px;
  }
}
</style>
