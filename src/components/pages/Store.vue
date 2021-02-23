<template>
  <main class="container">
    <div class="row">
      <div id="asideBarColumn" class="col-3">
        <aside>
          <div>123</div>
        </aside>
      </div>
      <div id="cardsContainerColumn" class="col-9">
        <div class="row">
          <div class="col">
            <div class="card" style="width: 18rem" v-for="item in response">
              <img
                class="card-img-top"
                src="https://picsum.photos/286/180"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">{{ item["0"] }}</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
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
</style>