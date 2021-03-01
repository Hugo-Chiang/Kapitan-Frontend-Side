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
                >, <span class="date"> {{ project.bookingProjectDate }},</span>
                <NumberInput
                  ref="numberInput"
                  class="people"
                  :uniqueKey="project.bookingProjectId"
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
    updateCart() {
      let storageArr = JSON.parse(localStorage.getItem("savingProjects")) || [];
      let projectBlocks = document.querySelectorAll(".projectBlock");

      for (let i = 0; i < projectBlocks.length; i++) {
        let confirmProjectId = projectBlocks[i].querySelector(".id")
          .textContent;
        let confirmProjectDate = projectBlocks[i].querySelector(".date")
          .textContent;
        let confirmNumOfPeople = projectBlocks[i]
          .querySelector(".people")
          .querySelector("input").value;
        let confirmProject = {
          localstorageId: `${confirmProjectId}-${new Date(
            confirmProjectDate
          ).getTime()}`,
          bookingProjectId: confirmProjectId,
          bookingProjectDate: confirmProjectDate,
          bookingProjectNumOfPeople: confirmNumOfPeople,
        };

        console.log(confirmProject);

        this.confirmProjectsArr.push(confirmProject);
      }

      storageArr = this.confirmProjectsArr;
      localStorage.setItem("savingProjects", JSON.stringify(storageArr));

      this.$router.push({ name: "首頁" });
    },
  },
};
</script>

<style lang="sass" scoped>
</style>