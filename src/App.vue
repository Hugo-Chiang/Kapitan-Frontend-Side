<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <router-view to="/store"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const api = "https://be-sp-0001-kapitan.herokuapp.com/api/store.php";
    const vm = this;

    console.log(this);

    this.$http.get(api).then((response) => {
      console.log(response.data);
    });
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
