<template>
  <main class="container">
    <div class="row mt-5">
      <div class="col-12">
        <h2 v-if="currentPage == '購物車'">您的購物車</h2>
        <h2 v-else>進行結帳</h2>
        <hr />
      </div>
    </div>
    <!-- 購物車區域開始 -->
    <section id="cartArea" class="row mb-5">
      <!-- 訂單列表部分開始 -->
      <div id="orderDetailsContainer" class="col-9">
        <div class="card">
          <div class="card-header">
            <h5 v-if="currentPage == '購物車'">已選方案</h5>
            <h5 v-else>第一步：確認方案內容</h5>
            <button @click.prevent="clearCart" v-if="currentPage == '購物車'">
              清空購物車
            </button>
          </div>
          <div class="card-body">
            <div
              class="projectBlock"
              v-for="(project, index) in confirmProjectsArr"
              :data-id="
                project.bookingProjectID + '-' + project.bookingProjectDate
              "
              :key="index"
            >
              <span class="id">{{ project.bookingProjectID }}</span
              >, <span class="date">{{ project.bookingProjectDate }}</span
              >,<span class="people2" v-if="currentPage != '購物車'">{{
                project.bookingProjectNumOfPeople
              }}</span>
              <NumberInput
                ref="numberInput"
                class="people"
                :uniqueKey="project.bookingProjectID"
                :setDefaultValue="project.bookingProjectNumOfPeople"
                @emitNumber="updateCart"
                v-if="currentPage == '購物車'"
              ></NumberInput>
              <a
                href=""
                @click.prevent="deleteSingleProject"
                v-if="currentPage == '購物車'"
                >刪除</a
              >
              <hr v-if="index < confirmProjectsArr.length - 1" />
            </div>
            <div v-if="confirmProjectsArr.length == 0">請選擇方案～</div>
          </div>
        </div>
      </div>
      <!-- 訂單列表部分結束 -->
      <!-- 訂單總額部分開始 -->
      <div id="orderAmountCardContainer" class="col-3">
        <div class="card text-center" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <button
              class="btn btn-primary"
              @click.prevent="updateCart"
              v-if="currentPage == '購物車' && confirmProjectsArr.length > 0"
            >
              進行結帳
            </button>
          </div>
        </div>
      </div>
      <!-- 訂單總額部分結束 -->
    </section>
    <!-- 購物車區域結束 -->
    <!-- 結帳區域開始 -->
    <router-view :confirmProjectsArr="confirmProjectsArr"></router-view>
    <!-- 結帳區域結束 -->
    <section id="recommendArea" class="row mb-5"></section>
  </main>
</template>

<script>
import NumberInput from "@/components/pages/sub-components/NumberInput";

export default {
  data() {
    return {
      confirmProjectsArr: JSON.parse(localStorage.getItem("savingProjects")),
    };
  },
  components: { NumberInput },
  created() {
    this.confirmProjectsArr = this.confirmProjectsArr || [];
  },
  methods: {
    // 方法：更新購物車，覆寫 localStorage，並帶往結帳頁
    updateCart() {
      let newConfirmProjectsArr = [];
      let projectBlocks = document.querySelectorAll(".projectBlock");

      for (let i = 0; i < projectBlocks.length; i++) {
        let confirmProjectID = projectBlocks[i]
          .querySelector(".id")
          .textContent.trim();
        let confirmProjectDate = projectBlocks[i]
          .querySelector(".date")
          .textContent.trim();
        let confirmNumOfPeople = projectBlocks[i]
          .querySelector(".people")
          .querySelector("input")
          .value.trim();
        let confirmProject = {
          localstorageID: `${confirmProjectID}-${confirmProjectDate}`,
          bookingProjectID: confirmProjectID,
          bookingProjectDate: confirmProjectDate,
          bookingProjectNumOfPeople: confirmNumOfPeople,
        };
        newConfirmProjectsArr.push(confirmProject);
      }

      localStorage.setItem(
        "savingProjects",
        JSON.stringify(newConfirmProjectsArr)
      );

      this.$router.push("/Cart/Checkout");
    },
    // 方法：刪除單一方案，覆寫 localStorage
    deleteSingleProject(e) {
      let storageArr = JSON.parse(localStorage.getItem("savingProjects"));
      let deleteProjectElement = e.target.closest("div.projectBlock");
      let deleteStorageID = deleteProjectElement.dataset.ID;
      let deleteStorageIndex = storageArr.findIndex(
        (project) => project.localstorageID == deleteStorageID
      );

      storageArr.splice(deleteStorageIndex, 1);

      this.confirmProjectsArr = storageArr;
      localStorage.setItem("savingProjects", JSON.stringify(storageArr));
    },
    // 方法：清空購物車和 localStorage
    clearCart() {
      localStorage.removeItem("savingProjects");
      this.confirmProjectsArr = [];
    },
  },
  computed: {
    // 方法：藉由動態路由自動回傳所在頁面名稱
    currentPage() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="sass" scoped>
</style>