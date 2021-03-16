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
    // 因應Heroku休眠機制，所做的後端喚醒行為，並不具備太多意義
    const api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/WakeUpBackend.php`;
    const vm = this;

    this.$http.get(api).then((response) => {
      console.log(response.data);
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid red;
  padding: 50px;
  height: 1000px;
  img {
    display: block;
    margin: auto;
  }
}
</style>