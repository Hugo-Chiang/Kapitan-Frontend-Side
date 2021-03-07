<template>
  <div
    class="modal fade"
    id="checkOutModel"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">提示訊息</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p v-html="situation.message"></p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click.prevent="reactionBySituation"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["situation", "deleteInvalidProjects"],
  created() {},
  methods: {
    reactionBySituation() {
      switch (this.situation.event) {
        case "伺服器異常":
          setTimeout(() => this.$router.push({ name: "首頁" }), 1000);
          break;
        case "訂購成功":
          setTimeout(() => this.$router.push({ name: "首頁" }), 1000);
          break;
        case "重複訂購":
          this.deleteInvalidProjects(this.situation.data);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>