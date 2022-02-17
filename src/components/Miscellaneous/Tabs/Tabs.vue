<template>
  <div
    class="tabs-header"
    :class="{
      'tabs-vertical': verticalTabs
    }"
    :style="style"
  >
    <template v-for="(tabSettings, tab) in formattedTabs">
      <div
        :key="tab"
        :class="tabSettings.disabled === true ? 'tab-content-disable' : 'tab-content'"
        :style="verticalTabs ? `margin-bottom: ${selectedTab === tab ? 9 : 21}px !important;` : ''"
      >
        <div
          v-if="selectedTab !== tab"
          class="icon"
        >
          <PbIcon
            v-if="tabSettings.icon"
            :icon="`${tabSettings.icon} fa-xs`"
            :style="`color: var(--color-${tabSettings.color})`"
            @click="tabSettings.disabled ? '' : $emit('update:selected-tab', tab)"
          />
        </div>
        <p
          :style="tabSettings.disabled ? 'cursor: not-allowed !important;' : `color: var(--color-${tabSettings.color});`"
          :class="state.editTab ? 'pb tab-title-editable' : 'pb tab-title'"
          @click="tabSettings.disabled ? '' : $emit('update:selected-tab', tab)"
        >
          <template v-if="selectedTab === tab">
            <PbIcon
              v-if="tabSettings.icon"
              :icon="`${tabSettings.icon} fa-xs`"
              :style="`color: var(--color-${color});`"
            />
            <b
              v-if="!state.editTab"
              class="pb"
              :style="`color: var(--color-${color});`"
            >
              {{ tabSettings.label }}
            </b>
            <input
              v-if="state.editTab"
              class="input"
              :style="{'backgroundColor': colorOpacityPrimary}"
              :placeholder="tabSettings.label"
              @blur="event => {addInputValue(event, tab)}"
              @keyup.enter="event => {addInputValue(event, tab)}"
            >
            <hr
              :style="`margin: 10px 0 0 0; border: 1px solid var(--color-${color})`"
            >
          </template>
          <template v-else>{{ tabSettings.label }}</template>
        </p>
        <div>
          <PbButton
            v-if="state.editTab"
            :color="selectedTab === tab ? 'primary' : 'gray-10'"
            button-style="regular"
            icon="fas fa-times"
            @click.native="deleteTab(tab)"
          />
        </div>
      </div>
    </template>
    <div
      v-if="editableTab"
      class="edit-buttons"
    >
      <PbButton
        color="primary"
        button-style="regular"
        icon="fas fa-plus"
        @click.native="addTabs"
      />
      <PbButton
        color="primary"
        button-style="regular"
        icon="fas fa-pen"
        @click.native="state.editTab = !state.editTab"
      />
    </div>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';
import PbButton from '../../Buttons/Button/Button.vue';
import PbIcon from '../../Miscellaneous/Icon/Icon';

export default {
  name: 'PbTabs',
  components: {
    PbButton,
    PbIcon,
  },

  props: {
    tabs: { type: Object, default: () => ({}) },
    selectedTab: { type: String, default: '' },
    color: {
      type: String,
      default: 'primary',
      validator: validateColor,
    },
    hideBorder: { type: Boolean, default: false },
    editableTab: { type: Boolean, default: false },
    verticalTabs: { type: Boolean, default: false },
    newTabSettings: { type: Function, default: () => ({ key: Date.now(), label: 'Nova aba' }) },
  },

  data() {
    return {
      state: {
        editTab: false,
      },
    };
  },

  computed: {
    style() {
      if (this.hideBorder) return;

      return 'border-bottom: 1px solid';
    },

    updateTabs: {
      get() {
        return this.tabs;
      },

      set(newValue) {
        this.$emit('update:tabs', newValue);
      },
    },

    colorOpacityPrimary() {
      const color = window.getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
      return `${color}30`;
    },

    formattedTabs() {
      return Object.keys(this.tabs).reduce((acc, key) => {
        const newFormattedTabs = acc;

        const tab = this.tabs[key];
        newFormattedTabs[key] = tab;

        if (typeof tab === 'string')
          newFormattedTabs[key] = { label: tab };

        return newFormattedTabs;
      }, {});
    },
  },

  methods: {
    addTabs() {
      const { key, label } = this.newTabSettings();

      this.$set(this.updateTabs, key, label);
      this.$emit('on-tab-created', key, label);
    },

    deleteTab(tab) {
      this.$delete(this.updateTabs, tab);
      this.$emit('on-tab-delete', tab);
    },

    addInputValue(event, tab) {
      const newTabName = event.target.value || 'Aba editada!';
      const valueKey = tab;

      this.$set(this.updateTabs, valueKey, newTabName);
      this.$emit('on-tab-edited', valueKey, newTabName);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-header {
  width: 100%;
  display: flex;
  color: var(--color-gray-20);
  flex-wrap: wrap;

  .tab-content {
    display: flex;

    .icon {
      padding: 1px 5px 0  0 ;
    }
  }

  .tab-content-disable {
    cursor: not-allowed;
    opacity: 0.5;
    display: flex;

    .icon {
      cursor: not-allowed;
      padding: 1px 5px 0  0 ;
    }
  }

  .tab-title {
    margin-right: 21px !important;
    user-select: none;
    cursor: pointer;
  }

  .tab-title-editable {
    cursor: pointer;

    .input {
      border: none;
      width: 80px;
    }

    .input:focus {
      outline: none;
    }
  }

  .edit-buttons {
    width: 8px;
    display: flex;
    padding-bottom: 10px;
  }
}

.tabs-vertical {
  flex-direction: column;
  align-items: flex-start;
}
</style>
