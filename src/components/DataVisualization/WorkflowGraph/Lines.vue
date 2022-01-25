<template>
  <section class="lines-content">
    <svg width="70px">
      <template
        v-for="(content, indexName) in cardObject"
      >
        <template v-if="content.callWith">
          <line
            v-for="idName in content.callWith"
            :key="idName"
            x1="0"
            :y1="getY(indexName)"
            x2="70"
            :y2="getY(idName)"
            stroke="gray"
          />
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
    getY(idName, heightCalculation = true) {
      const element = document.getElementById(idName);
      if (!element)
        return 0;
      const distance = element.getBoundingClientRect();
      const balloonMid = (heightCalculation ? distance.height / 10 : 0);
      const positionCalculation = distance.y - this.state.discount + balloonMid;
      return positionCalculation;
    },
  },
};
</script>

<style lang="scss" scoped>
    
</style>
