<template>
  <section class="file-container">
    <div
      v-if="fileValue.url"
      key="file"
      style="display: flex; justify-content: space-between;"
    >
      <img
        v-if="isImage"
        key="application-img"
        :src="fileValue.url"
      >
      <iframe
        v-else
        key="application-pdf"
        :src="`https://docs.google.com/gview?url=${fileValue.url}&embedded=true`"
        frameborder="0"
      />
      <PbDoubleCheck
        :disabled="onlyShow || entitySchema.dynamic"
        confirm-text="Apagar?"
        icon="fas fa-trash"
        @confirmed="fileValue = {}"
      />
    </div>
    <PbUpload
      v-else
      key="upload"
      :disabled="onlyShow || entitySchema.dynamic"
      :is-loading="state.loading"
      @change="uploadHandler"
    />
  </section>
</template>

<script>
import PbUpload from '../../Upload/Upload.vue';
import PbDoubleCheck from '../../../Buttons/DoubleCheck/DoubleCheck.vue';

export default {
  name: 'FileField',

  components: {
    PbUpload,
    PbDoubleCheck,
  },

  props: {
    entitySchema: { type: Object, default: () => ({}) },
    onlyShow: { type: Boolean, default: false },
    value: {
      type: Object,
      default: () => ({}),
    },
    uploadFile: {
      type: Function,
      default: parameters => {
        throw new Error('uploadFile function is not defined', parameters);
      },
    },
  },

  data() {
    return {
      state: {
        loading: false,
      },
    };
  },

  computed: {
    fileValue: {
      get() {
        return this.value || this.entitySchema.defaultValue || {};
      },
      set(newFileValue) {
        this.$emit('input', newFileValue);
      },
    },

    isImage() {
      return this.fileValue.fileDetails?.type?.includes('image');
    },
  },

  methods: {
    async uploadHandler(files) {
      if (this.state.loading) return;
      this.state.loading = true;

      try {
        const [file] = files;
        if (this.entitySchema.contentFile)
          this.validateFile(file, this.entitySchema.contentFile);

        const fileDetails = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          lastModifiedDate: file.lastModifiedDate,
          webkitRelativePath: file.webkitRelativePath,
        };

        const { link } = await this.uploadFile({ file, filename: file.name });

        this.fileValue = {
          url: link,
          fileDetails,
          name: `${this.entitySchema.field} - ${file.name}`,
        };
      } catch (err) {
        console.error('Error to upload file: ', err);
      } finally {
        this.state.loading = false;
      }
    },

    validateFile: (file, validExtensions) => {
      if (!file) throw new Error(`Arquivo(${file.name}) não informado!`);

      const extension = file.name.match(/\.[0-9a-zA-Z]+$/i);
      const fileExtension = extension ? extension[0].toLowerCase() : '';

      if (!validExtensions.some(fileType => fileType === fileExtension))
        throw new Error(`Extensão inválida do Arquivo(${file.name})!`);
    },
  },
};
</script>

<style lang="scss" scoped>
.html-container{
}
</style>
