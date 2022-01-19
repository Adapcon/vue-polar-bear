<template>
  <section class="sheets-container">
    <PbButton
      v-if="enabledToggleButton"
      color="primary"
      button-style="regular"
      icon="fas fa-ellipsis-v"
      @click.native="toggleSheets"
    />
    <div
      v-if="state.showSheets"
      class="sheets layer-always-on-top fullscreen"
      @click="state.showSheets = !state.showSheets"
    >
      <div class="grid-buttons-container-mobile" @click.stop>
        <div 
          v-for="(icon, label) in sheets" 
          :key="label" 
          style="padding: 16px;"
        >
          <PbButton
            color="gray-90"
            button-style="regular"
            :disabled="icon.disable"
            :icon="icon.icon"
            @click.native="selectOption(label)"
          >
            {{ icon.title }}
          </PbButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';

  export default {
    name: "PbSheets",

    props: {
      sheets: { type: Object, default: () => ({}) },
      enabledToggleButton: { type: Boolean, default: false },
    },

    components: {
      PbButton,
    },

    data() {
      return {
        state: {
          showSheets: false,
        },
      };
    },

    methods: {
      toggleSheets() {
        this.state.showSheets = !this.state.showSheets;
      },

      selectOption(label) {
        this.$emit('option-selected', label)
      },
    },
  };
</script>

<style lang="scss" scoped>
.sheets-container {
  .sheets {
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  position: fixed;

    .grid-buttons-container-mobile {
      background-color: var(--color-white);
      padding: 10px;
      display: flex;
      width: 100vw;
      flex-direction: column;
    }
  }
}
</style>
