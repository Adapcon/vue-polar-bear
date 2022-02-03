<template>
  <section class="balloon-container">
    <div
      :id="indexName"
      :ref="indexName"
      :class="content.color ? 'balloon' : 'balloon-default'"
      :style="`background-color: var(--color-${content.color});`"
    >
      <slot>
        <div class="balloon-content">
          <PbIcon :icon="`${content.icon} fa-sm`" />
          <p
            class="pb"
            style="padding-left: 12px;"
          >
            {{ content.title }}
          </p>
        </div>
      </slot>
    </div>
  </section>
</template>

<script>
import PbIcon from '../../Miscellaneous/Icon/Icon';

export default {
  name: 'Balloon',
  
  components: {
    PbIcon,
  },

  props: {
    content: { type: Object, default: () => ({}) },
    indexName: { type: String, default: '' },
  },

  mounted() {
    this.$nextTick(() => {
      this.$emit('on-mounted');
    });
  },

};
</script>

<style lang="scss" scoped>
    .balloon-container {
        .balloon {
            padding: 5px 20px;
            margin: 5px 0px;
            height: 35px;
            border-radius: 10px;
            text-align: center;
            color: white;

            .balloon-content {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 5px 5px;
            }
        }

        .balloon-default {
            border-radius: 10px;
            border: 1px solid var(--color-gray);
             padding: 5px 20px;
            margin: 5px 0px;
            height: 35px;
            text-align: center;
            color: white;
        }
    }
</style>
