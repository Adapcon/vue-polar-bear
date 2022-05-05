<template>
  <div
    class="tabs-header"
    :class="{
      'tabs-vertical': verticalTabs
    }"
    :style="style"
  >
    <div
      v-for="(tabSettings, tab) in formattedTabs"
      :key="tab"
      :class="{ 'disabled': tabSettings.disabled }"
      :style="verticalTabs ? `margin-bottom: 14px !important;` : ''"
    >
      <nav
        :key="tab"
        :class="tabSettings.disabled === true ? 'tab-content-disable' : 'tab-content'"
        :style="`color: var(--color-${colorTab(tab)})`"
      >
        <div>
          <PbHint
            position="top-right"
            :hint-text="tabSettings.label"
            :disabled="!abbreviatedText"
          >
            <div
              :class="state.editTab ? 'pb tab-title-editable' : 'pb tab-title'"
              @click="tabSettings.disabled ? '' : $emit('update:selected-tab', tab)"
            >
              <div v-if="isSelectedTab(tab)">
                <div
                  style="display: flex; flex-direction: row;"
                  :style="`
                    ${tabSettings.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;'}
                    ${`color: var(--color-${colorTab(tab)});`}
                  `"
                  class="selected-tab"
                >
                  <div
                    v-if="tabSettings.icon"
                    :class="{ 'icon': !showOnlyIcon }"
                  >
                    <PbIcon
                      :icon="`${tabSettings.icon} fa`"
                    />
                  </div>
                  <div
                    v-if="!showOnlyIcon"
                    :class="{ 'abbreviatedText': abbreviatedText }"
                  >
                    <b
                      v-if="!state.editTab"
                      class="pb selected-tab"
                      :style="`color: var(--color-${color});`"
                    >
                      {{ tabSettings.label }}
                    </b>
                    <input
                      v-if="state.editTab"
                      v-focus
                      :value="tabSettings.label"
                      class="input"
                      :style="{'backgroundColor': colorOpacityPrimary}"
                      @blur="event => {addInputValue(event, tab)}"
                      @keyup.enter="event => {addInputValue(event, tab)}"
                    >
                  </div>
                </div>
                <p
                  class="line"
                  style="margin: 8px 0 0 0; height: 2px; background-color: var(--color-primary)"
                />
              </div>
              <div v-else>
                <div
                  style="display: flex; flex-direction: row;"
                  :style="`
                    ${tabSettings.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;'}
                    ${tabSettings.color ? `color: var(--color-${tabSettings.color}); ` : ''}
                  `"
                  :class="{
                    'unselected-tab': !isSelectedTab(tab) && !tabSettings.disabled
                  }"
                >
                  <div
                    v-if="!isSelectedTab(tab) && tabSettings.icon"
                    :class="{ 'icon': !showOnlyIcon }"
                  >
                    <PbIcon
                      :icon="`${tabSettings.icon} fa`"
                      @click="tabSettings.disabled ? '' : $emit('update:selected-tab', tab)"
                    />
                  </div>
                  <div
                    v-if="!showOnlyIcon"
                    :class="{ 'abbreviatedText': abbreviatedText }"
                  >
                    <b
                      class="pb"
                    >
                      {{ tabSettings.label }}
                    </b>
                  </div>
                </div>
                <p
                  class="line"
                  style="margin: 8px 0 0 0; height: 2px;"
                />
              </div>
            </div>
          </PbHint>
        </div>

        <div>
          <PbButton
            v-if="state.editTab"
            :color="isSelectedTab(tab) ? 'primary' : 'gray-10'"
            button-style="regular"
            icon="fas fa-trash"
            @click.native="deleteTab(tab)"
          />
        </div>
      </nav>
    </div>
    <div
      v-if="editableTab"
      class="edit-buttons"
    >
      <PbButton
        color="primary"
        button-style="regular"
        icon="fas fa-plus"
        style="margin-right: 20px;"
        @click.native="addTabs"
      />
      <PbButton
        v-if="hiddenEditButton"
        color="primary"
        button-style="regular"
        :icon="state.editTab === true ? 'fas fa-check' : 'fas fa-pen'"
        @click.native="checkEdit"
      />
      <PbButton
        v-if="state.editTab && hiddenEditButton"
        color="primary"
        button-style="regular"
        style="margin-left: 20px;"
        icon="fas fa-times"
        @click.native="closeEdit"
      />
    </div>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';
import PbButton from '../../Buttons/Button/Button.vue';
import PbIcon from '../../Miscellaneous/Icon/Icon';
import PbHint from '../../Miscellaneous/Hint/Hint.vue';

export default {
  name: 'PbTabs',
  components: {
    PbButton,
    PbIcon,
    PbHint,
  },

  directives: {
    focus: {
      inserted(input) {
        input.focus();
      },
    },
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
    abbreviatedText: { type: Boolean, default: false },
    editableTab: { type: Boolean, default: false },
    verticalTabs: { type: Boolean, default: false },
    showOnlyIcon: { type: Boolean, default: false },
    newTabSettings: { type: Function, default: () => ({ key: `${Date.now()}`, label: 'Nova aba' }) },
  },

  data() {
    return {
      state: {
        tabsValue: {},
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
        if (this.showOnlyIcon && !tab.icon)
          return acc;

        newFormattedTabs[key] = tab;

        if (typeof tab === 'string')
          newFormattedTabs[key] = { label: tab };

        return newFormattedTabs;
      }, {});
    },

    hiddenEditButton() {
      return Object.keys(this.tabs).length > 0;
    },
  },

  methods: {
    colorTab(tab) {
      return this.isSelectedTab(tab) ? 'primary' : this.tabs[tab]?.color;
    },

    isSelectedTab(tab) {
      return this.selectedTab === tab;
    },

    checkEdit() {
      this.state.tabsValue = this.formattedTabs;
      this.state.editTab = !this.state.editTab;
    },
    closeEdit() {
      Object.keys(this.state.tabsValue).forEach(a => {
        this.addInputValue({ target: { value: this.state.tabsValue[a].label } }, a);
      });
      this.state.editTab = !this.state.editTab;
    },

    addTabs() {
      const { key, label } = this.newTabSettings();
      this.$set(this.updateTabs, key, label);
      this.$emit('on-tab-created', key, label);
      this.$nextTick(() => {
        this.$emit('update:selected-tab', key);
      });
    },

    deleteTab(tab) {
      this.$delete(this.updateTabs, tab);
      this.$emit('on-tab-delete', tab);
    },

    addInputValue(event, tab) {
      const newTabName = event.target.value;

      if (!newTabName) return;
      const valueKey = tab;

      this.$set(this.updateTabs, valueKey, newTabName);
      this.$emit('on-tab-edited', valueKey, newTabName);
    },
  },
};
</script>

<style lang="scss" scoped>
.disabled {
  cursor: not-allowed !important;
}

.abbreviatedText {
  max-width: 100px !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.line {
  transition: .5s ease-in;
}

.unselected-tab:hover {
  color: var(--color-primary) !important;
  transition: .3s ease-in;
  > div {
    > svg {
      color: var(--color-primary) !important;
      transition: .3s ease-in;
    }
  }
}

.selected-tab {
  color: var(--color-primary) !important;
  transition: .3s ease-in;
  > div {
    > svg {
      color: var(--color-primary) !important;
      transition: .3s ease-in;
    }
  }
}

.tabs-header {
  width: 100%;
  display: flex;
  color: var(--color-gray-20);
  flex-wrap: wrap;

  .tab-content {
    display: flex;

    .icon {
      padding: 0 5px 0  0 ;
    }
  }

  .tab-content-disable {
    cursor: not-allowed;
    opacity: 0.5;
    display: flex;

    .icon {
      cursor: not-allowed;
      padding: 0 5px 0  0 ;
    }
  }

  .tab-title {
    margin-right: 24px !important;
    user-select: none;
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
