<template>
  <section class="array-container">
    <PbButton
      :disabled="onlyShow || entitySchema.dynamic"
      icon="fas fa-plus"
      class="more-button"
      @click.native="addArrayIndex"
    />
    <TransitionGroup
      name="list"
      tag="div"
    >
      <div
        v-for="(arrayEntity, arrayIndex) in arrayValue"
        :key="arrayIndex"
        class="array-content pb-row"
      >
        <p class="pb pb-col-1"># {{ arrayIndex+1 }}</p>
        <Form
          :ref="`form-${arrayIndex}`"
          :value="{ contentArray: arrayEntity }"
          :entity-schema="{ contentArray: entitySchema.contentArray }"
          :only-show="onlyShow || entitySchema.dynamic"
          class="pb-col-10"
          @input.native="updateArrayValue(arrayIndex)"
        />
        <PbDoubleCheck
          :disabled="onlyShow || entitySchema.dynamic"
          confirm-text="Apagar?"
          icon="fas fa-trash"
          class="pb-col-1"
          @confirmed="deleteArrayIndex(arrayIndex)"
        />
      </div>
    </TransitionGroup>
  </section>
</template>

<script>
import PbDoubleCheck from '../../../Buttons/DoubleCheck/DoubleCheck.vue';
import PbButton from '../../../Buttons/Button/Button.vue';

export default {
  name: 'ArrayField',

  components: {
    Form: () => import('../Form.vue'),
    PbDoubleCheck,
    PbButton,
  },

  props: {
    entitySchema: { type: Object, default: () => ({}) },
    onlyShow: { type: Boolean, default: false },
    value: {
      type: Array,
      default: () => {},
    },
  },

  computed: {
    arrayValue() {
      return this.value || this.entitySchema.defaultValue || [];
    },
  },

  methods: {
    addArrayIndex() {
      if (!this.validateRequired()) return;
      this.arrayValue.push(this.entitySchema.contentArray.defaultValue);
      this.$emit('input', this.arrayValue);
    },

    updateArrayValue(arrayIndex) {
      const newArrayValue = this.$refs[`form-${arrayIndex}`][0];
      this.arrayValue[arrayIndex] = newArrayValue.formResponse.contentArray;
      this.$emit('input', this.arrayValue);
    },

    deleteArrayIndex(arrayIndex) {
      this.arrayValue.splice(arrayIndex, 1);
      this.$emit('input', this.arrayValue);
    },

    validateRequired() {
      let isValid = true;
      this.arrayValue.forEach((arrayEntity, arrayIndex) => {
        const reference = this.$refs[`form-${arrayIndex}`][0];
        if (reference.validateRequired && isValid)
          isValid = reference.validateRequired();
      });
      return isValid;
    },
  },
};
</script>

<style lang="scss" scoped>
.array-container {
  padding-left: 20px;
  border-left: solid 1px var(--color-gray-10);
  border-radius: 0 10px;

  .more-button {
    margin-left: calc(100% - 40px);
    margin-top: -15%;
  }

  .array-content {
    border: solid 1px var(--color-gray-90);
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
  }

  .list-move, /* apply transition to moving elements */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
