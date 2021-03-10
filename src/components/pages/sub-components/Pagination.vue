<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" v-if="totalPagination > 1">
        <a
          class="page-link"
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
        <a class="page-link" @click.prevent="selectPage(index + 1)">{{
          index + 1
        }}</a>
      </li>
      <li class="page-item" v-if="totalPagination > 1">
        <a
          class="page-link"
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
  props: ["allContentArr", "itemsNumPerPage"],
  data() {
    return {
      totalPagination: 1,
      currentPageNum: 1,
      currentPageContentArr: [],
    };
  },
  created() {
    // 根據總內容陣列渲染頁碼樣式及回傳當前頁面內容
    if (this.allContentArr.length <= 0) {
      this.totalPagination = 1;
    } else {
      this.totalPagination = Math.ceil(
        this.allContentArr.length / this.itemsNumPerPage
      );
    }

    this.selectPage(1);
  },
  methods: {
    // 方法：根據新選頁碼更新頁碼表樣式，並回傳所選頁碼所含內容（陣列）
    selectPage(newPageNum) {
      this.currentPageNum = newPageNum;
      this.updateContentByPage(this.currentPageNum);
      this.$emit("emitCurrentPageContentArr", this.currentPageContentArr);

      if (this.currentPageNum == 0) {
        this.currentPageNum = 1;
      } else if (this.currentPageNum > this.totalPagination) {
        this.currentPageNum = this.totalPagination;
      }
    },
    // 方法：根據所在頁碼渲染內容
    updateContentByPage(newPageNum = 1) {
      if (newPageNum == 0) {
        alert("已經是第一頁了！");
      } else if (newPageNum > this.totalPagination) {
        alert("已經是最後一頁了！");
      } else {
        this.currentPageContentArr = [];

        let startIndex = (newPageNum - 1) * this.itemsNumPerPage;

        for (let i = 0; i < this.itemsNumPerPage; i++) {
          if (!!this.allContentArr[startIndex]) {
            this.currentPageContentArr.push(this.allContentArr[startIndex]);
            startIndex++;
          } else {
            return;
          }
        }
      }
    },
  },
  watch: {
    // 監看（方法）：若傳入的總內容陣列有變，則重新渲染頁碼樣式及回傳當前頁面內容
    allContentArr() {
      if (this.allContentArr.length <= 0) {
        this.totalPagination = 1;
      } else {
        this.totalPagination = Math.ceil(
          this.allContentArr.length / this.itemsNumPerPage
        );
      }

      this.selectPage(1);
    },
  },
};
</script>