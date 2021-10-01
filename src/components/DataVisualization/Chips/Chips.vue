<template>
  <ul v-if="chips.length" class="chips-wrapper">
    <li
      v-for="(chip, index) of chips"
      :key="`${chip.title}||${index}`"
      :style="chipsStyleHandler"
      @click="removeChip(index)"
    >
      <small class="pb">
        <b>{{ chip.title }}</b>
      </small>

      <PbIcon icon="fas fa-times fa-xs" style="margin-left: 10px" />
    </li>

    <li v-if="showClearButton" :style="clearButtonStyleHandler" @click="clearChips()">
      <small class="pb">
        <b>Limpar Todos</b>
      </small>

      <PbIcon icon="fas fa-trash fa-xs" style="margin-left: 10px" />
    </li>
  </ul>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

const styleValidator = style => ['background', 'outline'].includes(style);

export default {
  name: 'PbChips',
  components: { PbIcon },

  props: {
    chips: {
      type: Array,
      default: () => [],
      required: true,
    },

    chipsStyle: {
      type: String,
      default: 'background',
      validator: style => styleValidator(style),
    },

    showClearButton: {
      type: Boolean,
      default: true,
    },

    clearButtonStyle: {
      type: String,
      default: 'outline',
      validator: style => styleValidator(style),
    },

    color: {
      type: String,
      default: 'secondary',
      validator: color => ['primary', 'secondary', 'white'].includes(color),
    },
  },

  computed: {
    chipsStyleHandler() {
      return this.getStyle(this.chipsStyle);
    },

    clearButtonStyleHandler() {
      return this.getStyle(this.clearButtonStyle);
    },
  },

  methods: {
    removeChip(index) {
      const newChips = this.copyChips();
      const removedChips = newChips.splice(index, 1);

      this.emitNewChipsArray(newChips);
      this.emitRemovedChips(removedChips);
    },

    clearChips() {
      const newChips = this.copyChips();
      const removedChips = newChips.splice(0);

      this.emitNewChipsArray(newChips);
      this.emitRemovedChips(removedChips);
    },

    copyChips() {
      return [...this.chips];
    },

    emitNewChipsArray(newChips) {
      this.$emit('update:chips', newChips);
    },

    emitRemovedChips(removedChips) {
      this.$emit('update:removed-chips', removedChips);
    },

    getStyle(style) {
      switch (style) {
        case 'outline':
          return {
            color: `var(--color-${this.color})`,
            background: 'none',
            border: '1px solid',
            'border-color': `var(--color-${this.color})`,
          };

        case 'background':
          return {
            background: `var(--color-${this.color})`,
            border: 'none',
            color: this.color === 'white'
              ? 'var(--color-primary)'
              : 'var(--color-white)',
          };

        default:
          return {};
      }
    },
  },

};
</script>

<style lang="scss" scoped>
  .chips-wrapper {
    list-style: none;
    user-select: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    position: relative;

    li {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      margin: 4px;
      padding: 2px 14px;
      border-radius: 40px;
      cursor: pointer;
      max-width: 100%;

      small {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

    }
  }
</style>
