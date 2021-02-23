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
            v-for="(project, index) in response"
            v-if="index < 9"
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
  </main>
</template>

<script>
export default {
  data() {
    return {
      response: [],
    };
  },
  created() {
    const api = "https://be-sp-0001-kapitan.herokuapp.com/api/store.php";
    const vm = this;

    console.log(this);

    this.$http.get(api).then((response) => {
      console.log(response.data);
      vm.response = response.data;
    });
  },
};
</script>

<style lang="scss">
#asideBarColumn,
#cardsContainerColumn {
  border: 1px solid blue;
}
.row {
  border: 1px solid green;
}
.col {
  border: 1px solid yellow;
}
</style>