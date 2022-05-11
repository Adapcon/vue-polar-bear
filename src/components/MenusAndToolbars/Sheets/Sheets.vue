<template>
  <section class="sheets-container">
    <PbButton
      :color="buttonColor"
      :button-style="buttonStyle"
      :icon="buttonIcon"
      @click.native="toggleSheets"
    />

    <div class="sheets">
      <div
        class="glass layer-always-on-top"
        :class="{ open: state.showSheets }"
        @click="toggleSheets"
      />
      <div
        class="sheets-body layer-always-on-top"
        :class="{ open: state.showSheets }"
      >
        <div
          v-for="sheet in sheets"
          :key="sheet.value"
          class="sheets-item"
          :class="{ active: sheet.value === state.selectedSheet }"
          @click="selectOption(sheet.value)"
        >
          <PbIcon
            v-if="sheet.icon"
            class="icon"
            :icon="sheet.icon"
          />
          <p
            v-if="sheet.label"
            class="pb-strong"
          >
            {{ sheet.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

export default {
  name: 'PbSheets',

  components: {
    PbButton,
    PbIcon,
  },

  props: {
    sheets: { type: Array, default: () => ([]), required: true },
    buttonIcon: { type: String, default: 'fas fa-ellipsis-v' },
    buttonColor: { type: String, default: 'primary' },
    buttonStyle: { type: String, default: 'regular' },
  },

  data() {
    return {
      state: {
        selectedSheet: null,
        showSheets: false,
      },
    };
  },

  methods: {
    toggleSheets() {
      this.state.showSheets = !this.state.showSheets;
    },

    selectOption(value) {
      this.state.selectedSheet = value;
      this.$emit('selectSheet', value);

      this.toggleSheets();
    },
  },
};
</script>

<style lang="scss" scoped>
.sheets-container {
  .sheets {
    .glass {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--color-overlay);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;

      &.open {
        pointer-events: initial;
        opacity: 1;
      }
    }

    .sheets-body {
      color: var(--color-gray-90) !important;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      transform: translateY(100%);
      transition: opacity 0.3s ease, transform 0.3s ease;
      background: var(--color-white);
      display: flex;
      flex-direction: column;
      overflow: hidden;

      &.open {
        opacity: 1;
        transform: translateY(0);
      }

      padding: 8px 0;

      .sheets-item {
        height: 51px;
        padding-left: 18px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .icon {
          margin-right: 10px;
        }
      }
      .active {
        background-color: var(--color-gray) !important;
      }
    }
  }
}
</style>
