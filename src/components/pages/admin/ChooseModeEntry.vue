<template>
  <section>
    <div
      v-if="$route.path == '/Admin/' + returnCurrentManager"
      class="query-mode-entry container d-flex flex-column align-items-center"
    >
      <div class="d-flex justify-content-center align-items-center">
        <h3>請問您想進行什麼作業？</h3>
      </div>
      <div
        class="action-btn-area d-flex justify-content-between align-items-center"
      >
        <div
          class="create-btn d-flex flex-column align-items-center"
          @click.prevent="$router.push(returnCreatePath)"
        >
          <i class="fas fa-plus-circle"></i>
          <h5 class="mt-3">新增</h5>
        </div>
        <div
          class="edit-btn d-flex flex-column align-items-center"
          @click.prevent="$router.push(returnEditPath)"
        >
          <i class="fas fa-pen-square"></i>
          <h5 class="mt-3">編輯</h5>
        </div>
      </div>
    </div>
    <router-view
      :currentManager="returnCurrentManager"
      :currentPath="returnCurrentPath"
    ></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentManager: "",
      createPath: "",
      editPath: "",
    };
  },
  created() {
    this.findOutCurrentManager();
  },
  methods: {
    findOutCurrentManager() {
      let adminPath = "/Admin/";
      let startIndex = this.$route.path.indexOf(adminPath);
      let strLen = adminPath.length;
      this.currentManager = this.$route.path.substr(startIndex + strLen);
      if (this.currentManager.indexOf("/") != -1) {
        let endIndex = this.currentManager.indexOf("/");
        this.currentManager = this.currentManager.substr(0, endIndex);
      }
    },
  },
  computed: {
    returnCreatePath() {
      switch (this.currentManager) {
        case "Orders-Manager":
          return (this.createPath = "");
        case "Projects-Manager":
          return (this.createPath = "/Admin/Projects-Manager/Project-Creation");
        case "Members-Manager":
          return (this.createPath = "");
      }
    },
    returnEditPath() {
      switch (this.currentManager) {
        case "Orders-Manager":
          return (this.editPath = "/Admin/Orders-Manager/Order-Searching");
        case "Projects-Manager":
          return (this.editPath = "/Admin/Projects-Manager/Project-Searching");
        case "Members-Manager":
          return (this.editPath = "");
      }
    },
    returnCurrentManager() {
      this.findOutCurrentManager();
      return this.currentManager;
    },
    returnCurrentPath() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.query-mode-entry {
  height: 600px;
  padding-top: 100px;
  .action-btn-area {
    width: 400px;
    font-size: 140px;
    margin-top: 50px;
    div {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>