<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" v-if="totalPagination > 1">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(page, index) in totalPagination"
        :key="index + 1"
      >
        <a class="page-link" href="#" @click.prevent="selectPage(index + 1)">{{
          index + 1
        }}</a>
      </li>
      <li class="page-item" v-if="totalPagination > 1">
        <a class="page-link" href="#" aria-label="Next">
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
    },
  },
};
</script>

<style lang="scss" scope>
</style>