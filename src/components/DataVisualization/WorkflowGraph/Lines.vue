<template>
  <section class="lines-container">
    <svg width="70px">
      <template v-for="(content, indexName) in cardObject">
        <template v-if="content.callWith">
          <svg
            v-for="(idName, index) in content.callWith"
            :id="`line-${indexName}-${idName}`"
            :key="`${content.title}-${idName}-${index}`"
          >
            <path
              v-if="needCurvedLine(indexName, idName)"
              fill="none"
              stroke="gray"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              :style="getY(indexName) === 0 ? `display: none;` : ''"
              :d="`
                M 0 ${getY(indexName)}
                H 30
                ${getTopRoundedCorners(indexName, idName)}
                V ${getVerticalValue(indexName, idName)}
                ${getBottomRoundedCorners(indexName, idName)}
                H 75
              `"
            />
            <line
              v-else
              x1="0"
              :y1="getY(indexName)"
              x2="70"
              :y2="getY(idName)"
              stroke="gray"
              stroke-width="1"
              :style="getY(indexName) === 0 ? `display: none;` : ''"
            />0
          </svg>
        </template>
      </template>
    </svg>
  </section>
</template>

<script>
export default {
  name: 'Lines',
  props: {
    cardObject: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      state: {
        discount: 0,
      },
    };
  },

  created() {
    this.state.discount = 0;
    this.state.discount = this.getY('workflow-content', false);
  },

  methods: {
    getVerticalValue(indexName, idName) {
      return this.isInvertedCurvedLine(indexName, idName) ? this.getY(idName) + 3 : this.getY(idName) - 6;
    },

    needCurvedLine(idCard, idLine) {
      return (
        this.getY(idLine) - this.getY(idCard) > 1
        || this.getY(idCard) - this.getY(idLine) > 1
      );
    },

    isInvertedCurvedLine(idCard, idLine) {
      return this.getY(idCard) - this.getY(idLine) > 1;
    },

    getTopRoundedCorners(idCard, idLine) {
      const yPos = this.getY(idCard);
      const isInverted = this.isInvertedCurvedLine(idCard, idLine);

      return `C 35 ${yPos} 35 ${isInverted ? yPos - 2 : yPos + 4} 35 ${isInverted ? yPos - 4 : yPos + 4}`;
    },

    getBottomRoundedCorners(idCard, idLine) {
      const yPos = this.getY(idLine);
      const isInverted = this.isInvertedCurvedLine(idCard, idLine);

      return `C 35 ${isInverted ? yPos + 1 : yPos - 2} 38.3333 ${yPos} 40 ${yPos}`;
    },

    getY(idName, heightCalculation = true) {
      const element = document.getElementById(idName);
      if (!element) return 0;
      const distance = element.getBoundingClientRect();
      const balloonMid = heightCalculation ? distance.height / 20 : 0;
      const positionCalculation = distance.y - this.state.discount + balloonMid;
      return positionCalculation;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
