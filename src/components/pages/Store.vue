<template>
  <main class="container py-5">
    <div class="row">
      <div id="asideBarColumn" class="col-2">
        <aside>
          <div>123</div>
        </aside>
      </div>
      <div id="cardsContainerColumn" class="col-10">
        <div class="row">
          <div
            class="col-4 my-4"
            v-for="(project, index) in currentPageContentArr"
          >
            <div class="card">
              <img
                class="card-img-top"
                src="https://picsum.photos/286/180"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">{{ project["PROJECTS_ID"] }}</h5>
                <p class="card-text">
                  {{ project["PROJECTS_NAME"] }} 是：Some quick example text to
                  build on the card title and make up the bulk of the card's
                  content.
                </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col d-flex justify-content-md-center"
        id="paginationContainer"
      >
        <Pagination
          :totalPagination="totalPagination"
          @emitPageNum="updateProjectsList"
        ></Pagination>
      </div>
    </div>
  </main>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  data() {
    return {
      allProjectsArr: [],
      totalPagination: 1,
      currentPageContentArr: [],
      currentPageNum: 1,
    };
  },
  methods: {
    updateProjectsList(newPageNum = 1) {
      if (newPageNum == 0) {
        alert("已經是第一頁了！");
      } else if (newPageNum > this.totalPagination) {
        alert("已經是最後一頁了！");
      } else {
        this.currentPageContentArr = [];

        let startIndex = (newPageNum - 1) * 9;

        for (let i = 0; i < 9; i++) {
          if (!!this.allProjectsArr[startIndex]) {
            this.currentPageContentArr.push(this.allProjectsArr[startIndex]);
            startIndex++;
          } else {
            return;
          }
        }
      }
    },
  },
  created() {
    const api = "https://be-sp-0001-kapitan.herokuapp.com/api/store.php";
    const vm = this;

    console.log(this);

    this.$http.get(api).then((response) => {
      console.log(response.data);
      vm.allProjectsArr = response.data;
      vm.totalPagination = Math.ceil(vm.allProjectsArr.length / 9);
      this.updateProjectsList();
    });
  },
  components: {
    Pagination: Pagination,
  },
};
</script>

<style lang="scss" scope>
aside {
  border: 1px solid grey;
}
</style>