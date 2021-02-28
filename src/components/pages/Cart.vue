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
              <div v-for="project in confirmProjectsArr">
                {{ project.bookingProjectID }} ,
                {{ project.bookingProjectDate }},
                <NumberInput></NumberInput>
              </div>
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
};
</script>

<style lang="sass" scoped>
</style>