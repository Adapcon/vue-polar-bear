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
        class="tab-content"
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
          />
        </div>
        <p
          :style="`color: var(--color-${!tabSettings.icon ? 'gray-20' : tabSettings.color})`"
          :class="state.editTab ? 'pb tab-title-editable' : 'pb tab-title' "
          @click="$emit('update:selected-tab', tab)"
        >
          <template v-if="selectedTab === tab">
            <b
              v-if="!state.editTab"
              class="pb"
              :style="`color: var(--color-${color})`"
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
        @click.native="addTabs()"
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
      return Object.keys(this.tabs).reduce((newFormattedTabs, key) => {
        const tab = this.tabs[key];

        if (typeof tab === 'string')
          newFormattedTabs[key] = { label: tab };
          
        newFormattedTabs[key] = tab;
        return newFormattedTabs;
      }, {});
    },
  },

  methods: {
    addTabs(value = 'Tab') {
      const newTabName = value || 'new tab';
      const valueKey = newTabName.replace(/-./g, x => x[1].toUpperCase());

      this.$set(this.updateTabs, valueKey, newTabName);
      this.$nextTick(() => {
        this.$emit('update:selected-tab', valueKey);
      });
    },

    deleteTab(tab) {
      this.$delete(this.updateTabs, tab);
    },

    addInputValue(event, tab) {
      this.deleteTab(tab);
      this.addTabs(event.target.value);
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
