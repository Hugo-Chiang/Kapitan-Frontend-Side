<template>
  <div class="input-group" :data-id="uniqueKey" :key="uniqueKey">
    <!-- 減號按鈕開始 -->
    <div class="input-group-prepend">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click.prevent="
          number == 1
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
        @click.prevent="$emit('update:incomingValue', ++number)"
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
      number: Number(this.incomingValue) || 1,
    };
  },
  props: ["uniqueKey", "incomingValue"],
  watch: {
    number() {
      if (this.number == "") this.number = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  width: 160px;
}
</style>