<template>
  <div
    class="summary-display-item"
    :class="{
      'horizontal': horizontal,
      'active': clickable && (active || isHovered),
      'clickable': clickable,
    }"
    @click="clickable && $emit('click')"
    @mouseenter="() => { isHovered = true }"
    @mouseleave="() => { isHovered = false }"
  >
    <component
      :is="small ? 'h3' : 'h2'"
      v-if="title !== ''"
      :title="title"
      class="pb summary-title"
      :class="{
        'active': clickable && (active || isHovered),
      }"
    >
      {{ title }}
    </component>

    <h3
      v-if="caption"
      :title="caption"
      class="pb caption"
      :class="{
        'active': clickable && (active || isHovered),
      }"
    >
      {{ caption }}
    </h3>

    <p
      v-if="description"
      :title="description"
      class="pb"
      style="color: var(--color-gray-20)"
    >
      {{ description }}
    </p>
  </div>
</template>

<script>
// SUGG: Accept color control of component through props
export default {
  name: 'PbSummaryDisplayItem',
  props: {
    title: {
      type: [String, Number],
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    /** The caption color change to the primary color */
    highlight: {
      type: Boolean,
      default: false,
    },
    /** The left-border, title and caption change to the primary color */
    active: {
      type: Boolean,
      default: false,
    },
    /** The title get smaller */
    small: {
      type: Boolean,
      default: false,
    },
    /** Adds a clickable style */
    clickable: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isHovered: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.summary-display-item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.1s ease;
  border:0;

  .caption, .summary-title {
    color: var(--color-primary) !important;
  }

  &.clickable {
    cursor: pointer;
    user-select: none;
    border-left: 5px solid var(--color-gray-10);
    padding-left: 20px;

    .caption, .summary-title {
      color: var(--color-gray-20) !important;
    }

    &.active {
      border-color: var(--color-primary) !important;
      transition: all 0.3s ease;

      .caption, .summary-title {
        color: var(--color-primary) !important;
      }
    }
  }

  .active {
    color: var(--color-primary) !important;
    transition: all 0.3s ease;
  }

  &.horizontal {
    border: 0;

    &.clickable {
      border-top: 5px solid var(--color-gray-10);

      .summary-title {
        padding-top: 20px;
      }
    }

    .summary-title {

      &.active {
        border-color: var(--color-primary) !important;
        transition: all 0.3s ease;

        .caption, .summary-title {
          color: var(--color-primary) !important;
        }
      }
    }
  }
}
</style>
