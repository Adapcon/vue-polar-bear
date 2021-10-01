<template>
  <section class="breadcrumb-container">
    <PbIcon
      v-if="reduced"
      icon="fas fa-arrow-up fa-rotate-270 fa-lg"
      style="color: var(--color-gray-10) !important; margin-right: 10px;"
      @click.native="goBack"
    />

    <template v-if="!reduced">
      <div v-for="(path, index) in paths" :key="`${path.label}-${index}`">
        <div
          v-if="hasMultiplePaths"
          class="breadcrumb-wrapper"
        >
          <PbIcon v-if="index" icon="fas fa-chevron-up fa-rotate-90" />

          <div
            class="row-path"
            :class="{
              'last-path': isLast(index),
              'row-disabled': !checkPath(path)
            }"
            @click="clickPath(path)"
          >
            <p class="pb">
              {{ getLabel(path) }}
            </p>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <PbDropdown hide-collapse-icon side="left" :text="lastPathLabel">
        <div class="dropdown-hidden-paths">
          <div v-for="(path, index) of hiddenPaths" :key="`path-${index}`" class="path">
            <PbIcon icon="fas fa-chevron-up fa-rotate-90" style="margin-right: 10px;" />

            <p class="pb">
              {{ path }}
            </p>
          </div>
        </div>
      </PbDropdown>
    </template>
  </section>
</template>

<script>
import PbDropdown from '@pb/MenusAndToolbars/Dropdown/Dropdown.vue';
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

export default {
  name: 'PbBreadcrumb',

  components: {
    PbDropdown,
    PbIcon,
  },

  props: {
    paths: { type: Array, required: true },
    reduced: { type: Boolean, default: false },
  },

  computed: {
    hasMultiplePaths() {
      if (this.paths.length === 1) return false;
      return true;
    },

    lastPathLabel() {
      const paths = this.paths[this.paths.length - 1] || {};

      return paths.label || '';
    },

    hiddenPaths() {
      const paths = [...this.paths];

      paths.pop();

      return paths.map(path => path.label);
    },
  },

  methods: {
    clickPath({ label, path }) {
      if (path) this.$emit('update:clickPath', { label, path });
    },

    goBack() {
      this.$emit('update:backPath');
    },

    isLast(index) {
      return index === (this.paths.length - 1);
    },

    checkPath({ path }) {
      return !!path;
    },

    getLabel({ label }) {
      return label.charAt(0).toUpperCase() + label.slice(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  color: var(--color-gray-10);

  .breadcrumb-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    .row-path {
      cursor: pointer;
      margin: 0px 12px;

      &.row-disabled {
        cursor: not-allowed;
      }

      &.last-path {
        p {
          color: var(--color-gray-80);
          font-weight: 800 !important;
        }
      }
    }
  }

  .dropdown-hidden-paths {
    min-width: 100px;
    margin: 10px 20px;

    .path {
      display: flex;
      align-items: center;

      p {
        color: var(--color-gray-80) !important;
        cursor: pointer;

        &:hover {
          font-weight: bold !important;
        }
      }
    }
  }
}
</style>
