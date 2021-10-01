<template>
  <div class="pb-infinite-scroll-container">
    <slot />

    <div ref="target" />
  </div>
</template>

<script>
export default {
  name: 'PbInfiniteScroll',
  props: {
    /** Margin that will be used to trigger event, event will be trigger when the root reaches the target's margin */
    margin: { type: String, default: '0px' },
  },
  data() {
    return {
      state: {
        intersection: '',
      },
    };
  },
  mounted() {
    this.state.intersection = new IntersectionObserver(([entry]) => {
      if ((entry && entry.isIntersecting && entry.intersectionRatio))
        return this.$emit('enter-intersection');
      return this.$emit('leave-intersection');
    }, {
      rootMargin: this.margin,
    });

    this.state.intersection.observe(this.$refs.target);
  },
  destroyed() {
    this.state.intersection.disconnect();
  },
};
</script>
