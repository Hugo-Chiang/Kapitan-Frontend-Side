<template>
  <main id="member-centre" class="container">
    <div class="row">
      <div class="col-3">
        <aside></aside>
      </div>
      <div class="col-9">
        <h1>{{ memberID }}</h1>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      memberID: this.GlobalFunctions.verifySignInedMember.call(this),
      asideList: ["基本資料", "查詢訂單", "我的評價"],
    };
  },
  created() {
    this.memberID = localStorage.getItem("kapitanSignedInID");
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#member-centre {
  height: 1200px;
  h1 {
    margin-top: 200px;
  }
}
</style>