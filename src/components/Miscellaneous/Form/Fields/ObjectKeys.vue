<template>
  <section class="object-keys-container">
    <PbFieldset
      :title="entitySchema.keyLabel"
    >
      <div style="display: flex;">
        <PbTextInput
          v-if="entitySchema.keyType === 'text'"
          v-model="state.newKey"
          :placeholder="entitySchema.placeholder"
          :disabled="onlyShow || entitySchema.dynamic"
          :validator="entitySchema.validatorKey"
          style="width: 300px;"
        />
        <PbNumberInput
          v-if="entitySchema.keyType === 'number'"
          v-model="state.newKey"
          :placeholder="entitySchema.placeholder"
          :disabled="onlyShow || entitySchema.dynamic"
          :validator="entitySchema.validatorKey"
          style="width: 300px;"
        />
        <PbButton
          :disabled="onlyShow || entitySchema.dynamic || !state.newKey"
          icon="fas fa-plus"
          style="margin-left: 40px;"
          label="Adicionar"
          @click.native="addKey"
        />
      </div>
    </PbFieldset>
    <TransitionGroup
      name="list"
      tag="div"
    >
      <div
        v-for="(objectKeyValue, key) in objectKeysValue"
        :key="key"
        class="object-content"
      >
        <Form
          :ref="`form-${key}`"
          :value="{ key: objectKeyValue }"
          :entity-schema="{ key: {
            ...entitySchema.contentObject,
            label: `${entitySchema.contentObject.label}: ${key}`
          } }"
          :only-show="onlyShow || entitySchema.dynamic"
          @input.native="updateObjectKeys(key)"
        />
        <PbDoubleCheck
          :disabled="onlyShow || entitySchema.dynamic"
          confirm-text="Apagar?"
          icon="fas fa-trash"
          @confirmed="deleteKey(key)"
        />
      </div>
    </TransitionGroup>
  </section>
</template>

<script>
import Form from '../Form.vue';
import PbDoubleCheck from '../../../Buttons/DoubleCheck/DoubleCheck.vue';
import PbButton from '../../../Buttons/Button/Button.vue';
import PbTextInput from '../../../Inputs/TextInput/TextInput.vue';
import PbNumberInput from '../../../Inputs/NumberInput/NumberInput.vue';
import PbFieldset from '../../Fieldset/Fieldset.vue';

export default {
  name: 'ObjectKeysField',

  components: {
    Form,
    PbDoubleCheck,
    PbButton,
    PbTextInput,
    PbNumberInput,
    PbFieldset,
  },

  props: {
    entitySchema: { type: Object, default: () => ({}) },
    onlyShow: { type: Boolean, default: false },
    value: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      state: {
        newKey: '',
      },
    };
  },

  computed: {
    objectKeysValue() {
      return this.value || this.entitySchema.defaultValue || {};
    },
  },

  methods: {
    addKey() {
      if (!this.state.newKey) return;
      this.$set(this.objectKeysValue, this.state.newKey, this.entitySchema.contentObject.defaultValue);
      this.$emit('input', this.objectKeysValue);
      this.state.newKey = '';
    },

    updateObjectKeys(key) {
      const objectKeysForm = this.$refs[`form-${key}`][0];
      this.$set(this.objectKeysValue, key, objectKeysForm.formResponse.key);
      this.$emit('input', this.objectKeysValue);
    },

    deleteKey(key) {
      this.$delete(this.objectKeysValue, key);
      this.$emit('input', this.objectKeysValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.object-keys-container {
  padding-left: 20px;
  border-left: solid 1px var(--color-gray-10);
  border-radius: 0 10px;

  .object-content {
    display: flex;
    justify-content: space-between;
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
