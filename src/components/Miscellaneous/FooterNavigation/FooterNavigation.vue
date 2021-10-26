<template>
  <div class="liveshop-footer-navigation layer-overlay">
    <div class="liveshop-footer-navigation-actions">
      <div class="step" style="margin-left: 30px;">
        <div
          v-if="showFirstBackButton && numberOfCurrentView === 0"
          class="action-arrow"
          @click="setView('previous')"
        >
          <p class="pb">{{ firstBackButtonLabel }}</p>
        </div>

        <div
          v-if="numberOfCurrentView !== 0"
          class="action-arrow"
          @click="setView('previous')"
        >
          <PbIcon
            class="navigation-icon"
            icon="fas fa-arrow-up fa-rotate-270"
          />
          <p class="pb">Voltar</p>
        </div>
      </div>

      <div class="step" style="margin-right: 30px;">
        <div
          v-if="numberOfCurrentView !== views.length - 1"
          key="arrow"
          class="action-arrow"
          @click="setView('next')"
        >
          <p class="pb">Avançar</p>
          <PbIcon class="navigation-icon" icon="fas fa-arrow-up fa-rotate-90" />
        </div>
        <div
          v-else
          key="button"
          class="action-button"
        >
          <PbButton
            :label="finalButtonLabel"
            button-style="background"
            color="primary"
            :disabled="finalButtonDisabled"
            @click.native="setView('next')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PbIcon } from '@pb';

export default {
  name: 'PbFooterNavigation',

  components: {
    PbIcon,
    PbButton: () => import('@pb/Buttons/Button/Button'),
  },

  props: {
    views: {
      type: Array,
      default: () => ([]),
      validator: views => views.length > 1,
    },
    finalButtonLabel: { type: String, default: 'Fechar' },
    finalButtonDisabled: { type: Boolean, default: false },
    showFirstBackButton: { type: Boolean, default: false },
    firstBackButtonLabel: { type: String, default: 'Cancelar' },
  },

  data() {
    return {
      state: {
        currentView: null,
      },
    };
  },

  computed: {
    numberOfCurrentView() {
      return this.views.indexOf(this.state.currentView);
    },
  },

  created() {
    [this.state.currentView] = this.views;
    this.$emit('changeView', this.state.currentView);
  },

  methods: {
    setView(action) {
      // Any tip to refactor it?
      if (action === 'next') {
        this.state.currentView = this.views.length > this.numberOfCurrentView + 1
          ? this.views[this.numberOfCurrentView + 1]
          : this.views[this.numberOfCurrentView];
      } else {
        this.state.currentView = this.showFirstBackButton && this.numberOfCurrentView - 1 >= 0
          ? this.views[this.numberOfCurrentView - 1]
          : this.views[this.numberOfCurrentView];
      }

      this.$emit('changeView', this.state.currentView);
    },
  },
};
</script>

<style lang="scss" scoped>
.liveshop-footer-navigation {
  height: 80px;
  width: 100vw;
  bottom: 0;
  position: fixed;
  background-color: var(--color-background-dark);

  .liveshop-footer-navigation-actions {
    display: flex;
    justify-content: space-between;
    color: var(--color-white);
    width: 100%;
    height: 100%;
    align-items: center;

    .step {
      .action-arrow {
        cursor: pointer;

        p {
          display: inline !important;
        }
      }
    }
  }
}
</style>
