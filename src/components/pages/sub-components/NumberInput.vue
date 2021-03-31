<template>
  <div class="input-group" :data-id="uniqueKey" :key="uniqueKey">
    <!-- 減號按鈕開始 -->
    <div class="input-group-prepend">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click.prevent="
          number == min
            ? $emit('update:incomingValue', number)
            : $emit('update:incomingValue', --number)
        "
      >
        －
      </button>
      <!-- 減號按鈕結束 -->
    </div>
    <!-- 數目欄位開始 -->
    <input
      type="number"
      v-model="number"
      class="form-control text-center"
      placeholder=""
      aria-label=""
      aria-describedby="basic-addon1"
      @change="$emit('update:incomingValue', number)"
    />
    <!-- 數目欄位結束 -->
    <!-- 加號按鈕開始 -->
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click.prevent="
          number == max
            ? $emit('update:incomingValue', max)
            : $emit('update:incomingValue', ++number)
        "
      >
        ＋
      </button>
    </div>
    <!-- 加號按鈕結束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 0,
      min: 0,
      max: 0,
    };
  },
  props: ["uniqueKey", "incomingValue", "minAndMaxNum"],
  created() {},
  watch: {
    incomingValue() {
      this.number = this.incomingValue;
      this.min = this.minAndMaxNum.min;
      this.max = this.minAndMaxNum.max;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  width: 140px !important;
}
</style>