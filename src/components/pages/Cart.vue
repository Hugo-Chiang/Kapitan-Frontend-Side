<template>
  <main class="container">
    <div class="row mt-5">
      <div class="col-12">
        <h2 v-if="$router.currentRoute.name == '購物車'">您的購物車</h2>
        <h2 v-else>進行結帳</h2>
        <hr />
      </div>
    </div>
    <section id="cartArea" class="row mb-5">
      <div id="orderDetailsContainer" class="col-9">
        <div class="card">
          <div class="card-header">
            <h5>已選方案</h5>
          </div>
          <div class="card-body">
            <div
              class="projectBlock"
              v-for="project in confirmProjectsArr"
              :data-id="project.bookingProjectId"
            >
              <span class="id">{{ project.bookingProjectId }}</span
              >, <span class="date">{{ project.bookingProjectDate }}</span
              >,
              <NumberInput
                ref="numberInput"
                class="people"
                :uniqueKey="project.bookingProjectId"
                :setDefaultValue="project.bookingProjectNumOfPeople"
                @emitNumber="updateCart"
              ></NumberInput>
              <a href="">刪除</a>
            </div>
            <hr v-if="$router.currentRoute.name == '購物車'" />
            <button
              class="btn btn-primary"
              @click.prevent="updateCart"
              v-if="$router.currentRoute.name == '購物車'"
            >
              進行結帳
            </button>
          </div>
        </div>
      </div>
      <div id="orderAmountCardContainer" class="col-3">
        <div class="card text-center" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </section>
    <router-view></router-view>
    <section id="recommendArea" class="row mb-5"></section>
  </main>
</template>

<script>
import NumberInput from "@/components/pages/sub-components/NumberInput";

export default {
  data() {
    return {
      confirmProjectsArr: [],
    };
  },
  components: { NumberInput },
  created() {
    this.confirmProjectsArr = JSON.parse(
      localStorage.getItem("savingProjects")
    );
  },
  methods: {
    // 方法：更新購物車，覆寫 localStorage，並帶往結帳頁
    updateCart() {
      let newConfirmProjectsArr = [];
      let projectBlocks = document.querySelectorAll(".projectBlock");

      for (let i = 0; i < projectBlocks.length; i++) {
        let confirmProjectId = projectBlocks[i]
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
          localstorageId: `${confirmProjectId}-${confirmProjectDate}`,
          bookingProjectId: confirmProjectId,
          bookingProjectDate: confirmProjectDate,
          bookingProjectNumOfPeople: confirmNumOfPeople,
        };
        newConfirmProjectsArr.push(confirmProject);
      }

      localStorage.removeItem("savingProjects");
      localStorage.setItem(
        "savingProjects",
        JSON.stringify(newConfirmProjectsArr)
      );

      // console.log(this.$router.currentRoute);

      this.$router.push({ name: "結帳" });
    },
  },
};
</script>

<style lang="sass" scoped>
</style>