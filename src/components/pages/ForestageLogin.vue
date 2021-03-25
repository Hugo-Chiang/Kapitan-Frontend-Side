<template>
  <main class="container">
    <div class="row">
      <div class="col-12">
        <!-- 登入註冊卡片開始 -->
        <div class="backgroud d-flex justify-content-center">
          <div id="login-card" class="card">
            <div class="card-body">
              <div
                id="login-logo-block"
                class="d-flex justify-content-center my-3"
              >
                <img
                  id="login-logo"
                  src="../../assets/img/Kapitan-Logo-Vertical-Version-01.png"
                  alt=""
                />
              </div>
              <ul class="list-group flex-row justify-content-center mb-3">
                <li
                  class="list-group-item"
                  :class="{ 'selected-item': loginData.signInMode }"
                  @click="loginData.signInMode = true"
                >
                  <span v-if="loginData.signInMode">正在</span>
                  <span v-else>轉為</span>登入
                </li>
                <li
                  class="list-group-item"
                  :class="{ 'selected-item': !loginData.signInMode }"
                  @click="loginData.signInMode = false"
                >
                  <span v-if="!loginData.signInMode">正在</span>
                  <span v-else>轉為</span>註冊
                </li>
              </ul>
              <div class="form-group">
                <label for="input-email">帳號</label>
                <input
                  type="email"
                  class="form-control"
                  id="input-email"
                  placeholder="Hello-World@email.com"
                />
              </div>
              <div class="form-group">
                <label for="input-password">密碼</label>
                <input
                  type="password"
                  class="form-control"
                  id="input-password"
                  placeholder="問號處可得格式提示"
                />
              </div>
              <div
                class="action-block d-flex flex-column justify-content-center align-items-center"
              >
                <div class="checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1"
                    >記住我</label
                  >
                </div>
                <button type="submit" class="btn btn-primary mt-3 mb-3">
                  <span v-if="loginData.signInMode">登入</span>
                  <span v-else>註冊</span>
                </button>
                <a href="#" class="card-link">忘記密碼？</a>
              </div>
            </div>
          </div>
        </div>
        <!-- 登入註冊卡片結束 -->
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        signInMode: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/all.scss";

.backgroud {
  height: 800px;
  padding-top: 80px;
  #login-card {
    width: 320px;
    height: 640px;
    #login-logo {
      width: 100px;
    }
    .list-group-item {
      width: 50%;
      height: 40px;
      line-height: 40px;
      padding: 0;
      text-align: center;
      border: 0.5px solid rgba(0, 0, 0, 0.125);
      border-radius: 0;
      &:hover {
        cursor: pointer;
      }
      &:first-child {
        border-right: none;
      }
    }
    .selected-item {
      background-color: $deep-teal;
      color: $sail;
    }
  }
}
</style>