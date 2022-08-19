<template>
  <div class="pb pb-filter-list-container pb-row">
    <div
      class="header pb-col-12"
      :style="`color: ${getHeaderColor}`"
      @click="toggleCollapse"
    >
      <div class="pb-row header-container">
        <div class="pb-col-4">
          <p class="pb title">
            <b>{{ title }}</b>
          </p>
        </div>
        <div id="icons" class="pb-col-6 pb-col-sm-3">
          <div
            class="counter"
            :style="
              state.checkedValues.length !== 0
                ? ' background: rgba(var(--color-primary-rgb), 0.08)'
                : ''
            "
          >
            <small
              class="pb"
              :style="
                state.checkedValues.length !== 0
                  ? 'color: var(--color-primary);'
                  : ''
              "
            >
              {{ state.checkedValues.length }}
            </small>
          </div>
          <div class="icon-container">
            <PbCollapseIcon
              :is-icon-up="!state.collapsed"
              :color="getHeaderColor"
              class="icon"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="pb-col-12">
      <PbSearchInput
        v-if="allowSearch && !state.collapsed && showSearch"
        v-model="state.search.searchValue"
        style="color: var(--color-gray-20);"
        @search="searchOption()"
      />
    </div>

    <ul
      v-show="!state.collapsed"
      :class="`options pb-scroll-${color}`"
      :style="optionsSize"
    >
      <li
        v-for="(option, index) in optionsList"
        :key="`${index}||${option.title}`"
        class="pb"
        :style="
          state.checkedValues.includes(option.title)
            ? `color: ${getHeaderColor}`
            : 'color: var(--color-gray-80)'
        "
        @click="
          multiSelector
            ? multipleSelector(option.title)
            : selector(option.title)
        "
      >
        <div class="option-title">
          <p class="pb-md">
            {{ option.title }}
          </p>
        </div>
      </li>
    </ul>
    <div>
      <PbChips
        v-if="!state.collapsed"
        v-show="multiSelector"
        :chips.sync="chips"
        color="primary"
        @update:chips="updateChips"
      />
    </div>
  </div>
</template>

<script>
import PbCollapseIcon from "@pb/Miscellaneous/CollapseIcon/CollapseIcon.vue";
import PbSearchInput from "@pb/FiltersAndSearch/SearchInput/SearchInput.vue";
import { validateColor } from "@pb/utils/validator";
import PbChips from "../../DataVisualization/Chips/Chips.vue";

export default {
  name: "PbFilterList",

  components: {
    PbCollapseIcon,
    PbSearchInput,
    PbChips,
  },

  props: {
    labels: { type: String, required: true },
    title: { type: String, default: "" },
    options: { type: Array, default: () => [] },
    displaySize: { type: Number, default: 5 },
    collapsed: { type: Boolean, default: false },
    multiSelector: { type: Boolean, default: false },
    allowSearch: { type: Boolean, default: true },
    color: {
      type: String,
      default: "primary",
      validator: (color) => validateColor(color),
    },
  },

  data() {
    return {
      state: {
        label: false,
        collapsed: false,
        search: {
          visible: false,
          searchValue: "",
        },
        labels: [],
        checkedValues: [],
      },
    };
  },

  computed: {
    chips() {
      const chips = this.state.checkedValues.map((title) => ({ title }));

      return chips;
    },
    optionsSize() {
      return {
        height: `${
          28.25 *
          (this.options.length < this.displaySize
            ? this.options.length
            : this.displaySize)
        }px`,
        overflow: this.options.length <= this.displaySize ? "hidden" : "auto",
      };
    },

    showSearch() {
      return this.optionsList.length <= 10;
    },

    optionsList() {
      if (!this.state.search.searchValue) return this.options;

      const filterExpression = this.state.search.searchValue.replace(
        /\s/g,
        ".*"
      );

      return this.options.filter((option) =>
        option.title.match(new RegExp(filterExpression, "gi"))
      );
    },

    getSearchIconColor() {
      return this.state.search.visible
        ? "var(--color-primary)"
        : "var(--color-gray-20)";
    },

    getHeaderColor() {
      if (this.isColorWhite) {
        return !this.state.collapsed
          ? "var(--color-primary)"
          : `var(--color-${this.color})`;
      }

      return !this.state.collapsed
        ? `var(--color-${this.color})`
        : "var(--color-gray-20)";
    },

    isColorWhite() {
      return this.color === "white";
    },
  },

  watch: {
    collapsed(newValue) {
      this.collapseOptions(newValue);
    },
  },

  created() {
    this.collapseOptions(this.collapsed);
  },

  methods: {
    updateChips(value) {
      this.state.checkedValues = value.map((chip) => chip.title);
    },
    multipleSelector(value) {
      if (this.state.checkedValues.includes(value)) {
        const index = this.state.checkedValues.indexOf(value);

        return this.state.checkedValues.splice(index, 1);
      }
      this.state.checkedValues = [...this.state.checkedValues, value];

      this.$emit(value);
    },

    selector(value) {
      this.state.checkedValues = [];

      this.state.checkedValues = [...this.state.checkedValues, value];
    },

    toggleCollapse() {
      this.collapseOptions(!this.state.collapsed);
      this.$emit("collapsed", this.state.collapsed);
    },

    collapseOptions(status) {
      this.state.collapsed = status;

      if (this.state.collapsed === true) {
        this.state.search.visible = false;
        this.state.search.searchValue = "";
      }
    },

    openSearchOption() {
      this.state.search.visible = !this.state.search.visible;
      this.collapseOptions(false);

      if (this.state.search.visible === false)
        this.state.search.searchValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-filter-list-container {
  padding: 0 16px;
  width: 100%;
  border-radius: 8px;
  background-color: var(--color-gray);
  color: var(--color-primary) !important;

  .header {
    border-radius: 50px;
    height: 20px;
    padding: 16px 0;

    .header-container {
      justify-content: space-between;
      cursor: pointer;

      .title {
        text-transform: uppercase;
      }

      #icons {
        display: flex;
        justify-content: end;

        .counter {
          width: 26px;
          height: 20px;
          margin-right: 20px;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(var(--color-gray-40-rgb), 0.08);

          small {
            color: var(--color-gray-40);
          }
        }
        .icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            width: 16px;
            height: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .options {
    display: flex;
    list-style: none;
    flex-direction: column;
    position: relative;
    margin-right: 8px;
    margin: 12px 8px 16px 0;

    .option-title {
      height: auto;
      padding: 8px;
      display: flex;
      align-items: center;

      p {
        margin: 0;
      }
    }

    li {
      cursor: pointer;
    }
  }
}
</style>
