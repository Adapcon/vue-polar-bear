<template>
  <div class="pb-find-container">
    <input
      v-model="valueInput"
      :class="{ 'pb-find-error' : hasError }"
      :disabled="disabled"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @keyup.enter="() => search(valueInput)"
    >
    <small v-show="!!errorMessage" class="pb error-message">
      {{ errorMessage }}
    </small>

    <div
      class="pb-find-icon-search"
      :class="disabled ? 'pb-find-disabled' : ''"
      @click="() => search(valueInput)"
    >
      <PbIcon icon="fas fa-search" />
    </div>

    <div
      class="pb-find-icon-range"
      :class="disabled ? 'pb-find-disabled' : ''"
    >
      <p class="pb">
        {{ currentRange }} de {{ range }}
      </p>

      <div style="display: flex; margin-left: 10px">
        <PbIcon icon="fas fa-chevron-up" @click.native="previousSet" />

        <PbIcon
          icon="fas fa-chevron-up"
          style="transform: rotate(180deg); margin-left: 7px"
          @click.native="nextSet"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

export default {
  name: 'PbFind',
  components: {
    PbIcon,
  },
  props: {
    value: { type: String, default: '' },
    hasError: { type: Boolean, default: false },
    errorMessage: { type: String, default: null },
    range: { type: Number, default: null },
    currentRange: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    valueInput: {
      get() {
        return this.value;
      },
      set(newInputValue) {
        this.$emit('input', newInputValue);
      },
    },
  },
  methods: {
    search(valueInput) {
      if (this.disabled) return;

      this.$emit('search', valueInput);
    },
    nextSet() {
      if (this.disabled) return;

      this.$emit('update:nextSet');
    },
    previousSet() {
      if (this.disabled) return;

      this.$emit('update:previousSet');
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-find-container {
  width: 100%;
  position: relative;

  input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    padding-left: 36px;
    background: none;
    outline: none;
    transition: all .3s ease;
    border: 1px solid var(--color-muted);

    &:focus {
      border: 1px solid var(--color-primary);
    }
  }

  .error-message {
    position: absolute;
    color: var(--color-danger);
  }

  .pb-find-icon-search,
  .pb-find-icon-range {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray-40);
    cursor: pointer;
    transition: all .3s ease;
  }

  .pb-find-icon-search {
    left: 14px;
  }
  .pb-find-icon-range {
    display: flex;
    align-items: center;
    right: 14px;
    margin: 0 10px;
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    svg:hover {
      transition: all .1s ease;
      color: var(--color-primary);
    }
  }

  input:focus ~ .pb-find-icon-search {
    color: var(--color-primary);
  }
}

.pb-find-disabled {
  cursor: not-allowed !important;
  opacity: 0.7;
}

.pb-find-error {
  border: 1.5px solid var(--color-danger) !important;
}
</style>
