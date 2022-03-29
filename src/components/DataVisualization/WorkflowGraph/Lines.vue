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
              :d="`
                M 0 ${getY(indexName)}
                H 30
                ${getTopRoundedCorners(indexName, idName)}
                V ${isInvertedCurvedLine(indexName, idName) ? getY(idName) : getY(idName) - 6}
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
            />
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
      return this.isInvertedCurvedLine(idCard, idLine)
        ? 'C 39 120 40 114.3667 40 111'
        : 'C 35 27 35 29.5 35 31';
    },

    getBottomRoundedCorners(idCard, idLine) {
      const y = this.getY(idLine);
      const isInverted = this.isInvertedCurvedLine(idCard, idLine);

      return isInverted
        ? `C 40 ${y - 4} 47.33 ${y - 6} 51 ${y - 6}`
        : `C 35 ${y - 2} 38.3333 ${y} 40 ${y}`;
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
