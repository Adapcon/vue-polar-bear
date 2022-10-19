<template>
  <section class="table-pagination-container">
    <PbButton
      :disabled="disableReturnOnFirstPage"
      icon="fas fa-chevron-up"
      style="transform: rotate(-90deg);"
      @click.native="changePage('return')"
    />
    <div class="page-indexes">
      <div class="visualize-pages-index">
        <div
          v-if="pageOffset > 0"
          class="page-indexes"
        >
          <p
            class="pb"
            @click="goToFirstPage()"
          >
            1
          </p>
          <p class="pb"> ... </p>
        </div>

        <TransitionGroup
          name="slide"
          tag="div"
          class="page-indexes"
        >
          <div
            v-for="index of pageIndexes"
            :key="index"
            :class="currentIndex(index)"
          >
            <p
              class="pb"
              @click="changePage('', index)"
            >
              {{ index + 1 }}
            </p>
          </div>
        </TransitionGroup>
      </div>
    </div>
    <PbButton
      :disabled="disableNextOnLastPage"
      icon="fas fa-chevron-up"
      style="transform: rotate(90deg);"
      @click.native="changePage('next')"
    />
  </section>
</template>

<script>
import PbButton from '../../Buttons/Button/Button.vue';

export default {
  name: 'TablePagination',

  components: {
    PbButton,
  },

  props: {
    count: { type: Number, default: 16 },
    pageLimit: { type: Number, default: 5 },
    currentPage: { type: Number, default: 0 },
  },

  computed: {
    disableReturnOnFirstPage() {
      return this.currentPage === 0;
    },

    disableNextOnLastPage() {
      return this.currentPage === Math.ceil(this.count / this.pageLimit) - 1;
    },

    totalPages() {
      return Math.ceil(this.count / this.pageLimit);
    },

    pageOffset() {
      return Math.floor(this.currentPage / this.pageLimit) * this.pageLimit;
    },

    pageIndexes() {
      return new Array(this.totalPages)
        .fill(0)
        .map((_, index) => index)
        .slice(this.pageOffset, this.pageOffset + this.pageLimit);
    },
  },

  methods: {
    emitChangePage(page) {
      this.$emit('change-page', page);
    },

    currentIndex(index) {
      return this.currentPage === index ? 'current-page-indicator' : 'current-page';
    },

    changePage(setPagination = '', index = null) {
      let page = index ?? this.currentPage;
      if (setPagination === 'next') page++;
      else if (setPagination === 'return') page--;

      this.emitChangePage(page);
    },

    goToFirstPage() {
      this.emitChangePage(0);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-pagination-container {
    width: auto;
    display: flex;
    align-items: center;

  .current-page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;

    &-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: rgba(var(--color-primary-rgb), 0.16);
    }
  }

  .page-indexes {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-20);

    .visualize-pages-index {
      display: flex;
      // max-width: 97px;
      overflow: hidden;
      justify-content: flex-end;
      align-items: center;
    }

    p {
      padding: 0 12px;
      cursor: pointer;
    }
  }
}
</style>
