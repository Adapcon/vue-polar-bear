<template>
  <div
    ref="dropzone"
    class="drag-an-drop-container"
    @drop="handleDrop"
    @dragenter.prevent
    @dragover.prevent
  >
    <div
      v-for="(item, index) in data"
      :key="index"
      ref="items"
      class="item"
    >
      <div
        v-if="draggingIntoPosition === index"
        class="placeholder"
      />
      <template v-else>
        <p
          v-if="showIndex"
          class="pb index"
        >
          #{{ index + 1 }}
        </p>
        <slot
          :index="index"
          :item="item"
          name="item"
        />
        <div
          key="handle"
          class="handle-container"
          draggable="true"
          @drag="handleDrag($event, index)"
          @dragend="handleDragEnd"
          @dragstart="handleDragStart($event, index)"
        >
          <div class="handle-ripple" />
          <PbIcon
            class="handle-icon"
            icon="fas fa-grip-vertical fa-lg"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

export default {
  name: 'PbDragAndDrop',

  components: {
    PbIcon,
  },

  props: {
    /**
     * The plain array of items.
     */
    data: {
      type: Array,
      required: true,
    },
    /**
     * Controls whether an index should be shown at the left of each item.
     */
    showIndex: {
      type: Boolean,
      default: true,
    },
  },

  emits: [
    /**
     * Event for handling changes to the order of
     * the list. Receives the newly-sorted array,
      */
    'update:data',
  ],

  data() {
    return {
      draggingIntoPosition: null,
    };
  },

  methods: {
    handleDragStart(event, itemIndex) {
      const dt = event.dataTransfer;
      const itemElement = this.$refs.items[itemIndex];
      // the handle icon is responsible for listening to drag events, but
      // we will display the entire item element as the drag image instead
      dt.setDragImage(
        itemElement,
        // center at the handle
        itemElement.clientWidth - 5,
        itemElement.clientHeight / 2,
      );
      dt.effect = 'move';
      dt.setData('application/item', itemIndex);
    },

    handleDrag(event) {
      const dropzoneElement = this.$refs.dropzone;
      const dropzoneRect = dropzoneElement.getBoundingClientRect();
      // mouse's vertical position relative to the top of the dropzone
      const draggingPosition = event.pageY - dropzoneRect.y - window.scrollY;
      // calculate where the element should be inserted.
      // there might be faster ways to do this
      const itemBoundaries = this.$refs.items.map(itemElement => {
        const itemRect = itemElement.getBoundingClientRect();
        return itemRect.y - dropzoneRect.y + 30;
      });
      const insertPosition = itemBoundaries
        .findIndex(boundary => draggingPosition <= boundary);
      this.draggingIntoPosition = insertPosition >= 0
        ? insertPosition
        : itemBoundaries.length - 1;
    },

    handleDrop(event) {
      const dt = event.dataTransfer;
      const draggedItem = Number(dt.getData('application/item'));
      const newItems = [...this.data];
      newItems.splice(draggedItem, 1);
      newItems.splice(this.draggingIntoPosition, 0, this.data[draggedItem]);
      this.$emit('update:data', newItems);
    },

    handleDragEnd() {
      this.draggingIntoPosition = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.drag-an-drop-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    gap: 5px;
    box-sizing: border-box;
  }

  .placeholder {
    height: 35px;
    width: 100%;
    background-color: var(--color-gray-5);
    border: 1px dotted var(--color-gray-10);
  }

  .index {
    font-size: 11px !important;
    color: var(--color-gray-10);
  }

  .handle-container {
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .handle-container:hover > .handle-ripple {
    opacity: 1;
  }

  .handle-ripple {
    width: 25px;
    height: 25px;
    border-radius: 20px;
    background-color: rgba(34, 34, 34, 0.1);
    opacity: 0;
    transition: opacity 0.3s;
    position: absolute;
  }

  .handle-icon {
    font-size: 14px;
    color: var(--color-gray-10);
    margin: 0;
  }
}
</style>
