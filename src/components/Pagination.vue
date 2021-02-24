<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" v-if="totalPagination > 1">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="selectPage(currentPageNum - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        v-for="(page, index) in totalPagination"
        :key="index + 1"
        class="page-item"
        :class="index + 1 == currentPageNum ? 'active' : ''"
      >
        <a class="page-link" href="#" @click.prevent="selectPage(index + 1)">{{
          index + 1
        }}</a>
      </li>
      <li class="page-item" v-if="totalPagination > 1">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="selectPage(currentPageNum + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["totalPagination"],
  data() {
    return {
      currentPageNum: 1,
    };
  },
  methods: {
    selectPage(newPageNum) {
      this.currentPageNum = newPageNum;
      this.$emit("emitPageNum", this.currentPageNum);

      if (this.currentPageNum == 0) {
        this.currentPageNum = 1;
      } else if (this.currentPageNum > this.totalPagination) {
        this.currentPageNum = this.totalPagination;
      }
    },
  },
};
</script>

<style lang="scss" scope>
</style>