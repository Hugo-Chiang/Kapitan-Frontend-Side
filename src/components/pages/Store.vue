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
            :key="index"
          >
            <div class="card" :data-id="project['PROJECT_ID']">
              <img
                class="card-img-top"
                src="https://picsum.photos/286/180"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">
                  {{ project["PROJECT_ID"] }}
                </h5>
                <p class="card-text">
                  {{ project["PROJECT_NAME"] }} 是：Some quick example text to
                  build on the card title and make up the bulk of the card's
                  content.
                </p>
                <router-link
                  :to="{
                    name: '方案',
                    params: {
                      selectedProjectID:
                        currentPageContentArr[index]['PROJECT_ID'],
                    },
                  }"
                  class="btn btn-primary"
                  >Go somewhere</router-link
                >
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
          v-show="currentPageContentArr.length > 0"
          :allContentArr="allProjectsArr"
          :itemsNumPerPage="itemsNumPerPage"
          @emitCurrentPageContentArr="getCurrentPageContentArr"
        ></Pagination>
      </div>
    </div>
  </main>
</template>

<script>
import Pagination from "@/components/pages/sub-components/Pagination";

export default {
  data() {
    return {
      allProjectsArr: [],
      currentPageContentArr: [],
      itemsNumPerPage: 9,
      currentPageNum: 1,
    };
  },
  components: {
    Pagination: Pagination,
  },
  created() {
    // const api = `${process.env.REMOTE_HOST_PATH}/API/Store.php`;
    const api = `${process.env.LOCAL_HOST_PATH}/API/Forestage/Store.php`;
    const vm = this;

    this.$http.get(api).then((response) => {
      vm.allProjectsArr = response.data;
    });
  },
  methods: {
    getCurrentPageContentArr(arr) {
      this.currentPageContentArr = arr;
    },
  },
};
</script>

<style lang="scss" scope>
aside {
  border: 1px solid grey;
}
</style>