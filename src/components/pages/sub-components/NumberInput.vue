<template>
  <div class="input-group my-3" :data-id="uniqueKey" :key="uniqueKey">
    <div class="input-group-prepend">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click.prevent="number == 1 ? number : number--"
      >
        －
      </button>
    </div>
    <input
      type="number"
      :value="number"
      class="form-control col-1"
      placeholder=""
      aria-label=""
      aria-describedby="basic-addon1"
    />
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click.prevent="number++"
      >
        ＋
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: this.setDefaultValue || 1,
    };
  },
  props: ["uniqueKey", "setDefaultValue"],
  methods: {
    confirmPurchaseData() {
      this.$emit("emitNumber", Number(this.number));
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  text-align: center;
}
</style>