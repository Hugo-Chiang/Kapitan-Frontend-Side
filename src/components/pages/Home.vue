<template>
  <div class="container">
    <img src="http://pic.pimg.tw/k640640/1403285068-3601410781.jpg" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    window.scrollTo(0, 0);

    // 因應Heroku休眠機制，所做的後端喚醒行為，並不具備太多意義
    const api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/WakeUpBackend.php`;

    this.$http.get(api).then((response) => {
      console.log(response.data);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

.container {
  border: 1px solid red;
  height: 1000px;
  padding: $desktop-nav-bar-height + $main-container-pt 0 $main-container-pt;
  img {
    display: block;
    margin: auto;
  }
}
</style>