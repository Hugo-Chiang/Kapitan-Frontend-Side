<template>
  <main class="container">
    <section id="castArea" class="row">
      <div class="col-12 my-5">
        <h2>您的購物車</h2>
        <hr />
        <div id="orderDetailsContainer" class="">
          <div class="card">
            <div class="card-header">Featured</div>
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
              </div>
              <hr />
              <button class="btn btn-primary" @click.prevent="updateCart">
                進行結帳
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="recommendArea" class="row"></section>
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
      this.$router.push({ name: "結帳" });
    },
  },
};
</script>

<style lang="sass" scoped>
</style>