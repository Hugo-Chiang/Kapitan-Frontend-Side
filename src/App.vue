<template>
  <div id="app">
    <!-- 提示視窗元件開始 -->
    <Modal :modalData="modalData"></Modal>
    <!-- 提示視窗元件結束 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 導入提示視窗元件
import Modal from "@/components/pages/sub-components/Modal";

export default {
  name: "App",
  data() {
    return {
      modalData: {
        callBy: { path: "", vm: null },
        methods: {
          deleteInvalidProjects: null,
        },
        situation: {
          event: "",
          message: "",
          data: {},
        },
        reaction: function () {},
      },
    };
  },
  components: { Modal },
  created() {
    this.$eventBus.$on("emitModalData", (infoObj) => {
      this.modalData = infoObj;
    });
  },
};
</script>

<style lang="scss">
@import "./assets/all.scss";

// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>