<template>
  <main class="container">
    <div class="row">
      <div class="col-12">
        <!-- 登入註冊卡片開始 -->
        <div class="backgroud d-flex justify-content-center">
          <div id="login-card" class="card">
            <ValidationObserver v-slot="{ invalid }">
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
                <!-- 登入註冊切換欄開始 -->
                <ul class="list-group flex-row justify-content-center mb-3">
                  <li
                    class="list-group-item"
                    :class="{ 'selected-item': signInMode }"
                    @click="signInMode = true"
                  >
                    <span v-if="signInMode">正在</span>
                    <span v-else>轉為</span>登入
                  </li>
                  <li
                    class="list-group-item"
                    :class="{ 'selected-item': !signInMode }"
                    @click="signInMode = false"
                  >
                    <span v-if="!signInMode">正在</span>
                    <span v-else>轉為</span>註冊
                  </li>
                </ul>
                <!-- 登入註冊切換欄結束 -->
                <!-- 輸入帳號開始 -->
                <div class="form-group">
                  <ValidationProvider
                    :rules="{ required: true }"
                    v-slot="{ errors, classes }"
                  >
                    <label for="">輸入帳號</label>
                    <input
                      type="email"
                      class="form-control"
                      :class="[
                        classes,
                        {
                          'is-invalid': loginData.repeatRegister,
                          shaking:
                            loginData.signInFailedFeedback.signInFailedAnime,
                        },
                      ]"
                      id="帳號"
                      ref="帳號"
                      placeholder="Hello-World@email.com"
                      v-model="loginData.input.account"
                      @blur="queryMemberAccount"
                    />
                    <span
                      class="invalid-feedback"
                      :class="
                        loginData.repeatRegister ? 'd-inline-block' : 'd-none'
                      "
                      >此帳號已註冊過</span
                    >
                    <span
                      class="invalid-feedback"
                      v-show="!loginData.repeatRegister"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                </div>
                <!-- 輸入帳號結束 -->
                <!-- 輸入密碼開始 -->
                <div class="form-group position-relative">
                  <ValidationProvider
                    :rules="{
                      required: true,
                      regex: !signInMode
                        ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
                        : false,
                    }"
                    v-slot="{ errors, classes }"
                  >
                    <label for="密碼">輸入密碼</label>
                    <span
                      id="password-remark-trigger"
                      @mouseenter="loginData.showRemark = true"
                      @mouseleave="loginData.showRemark = false"
                      >［?］</span
                    >
                    <span
                      id="password-remark"
                      class="position-absolute"
                      v-show="loginData.showRemark"
                      >8到16位字符，至少1個大寫字母、1個小寫字母、1個數字。</span
                    >
                    <input
                      type="password"
                      class="form-control"
                      :class="[
                        classes,
                        {
                          shaking:
                            loginData.signInFailedFeedback.signInFailedAnime,
                        },
                      ]"
                      id="密碼"
                      placeholder="問號處可得格式提示"
                      v-model="loginData.input.password"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <!-- 輸入密碼結束 -->
                <!-- 輸入確認密碼開始 -->
                <div class="form-froup mb-3">
                  <ValidationProvider
                    v-if="!signInMode"
                    :rules="{
                      required: true,
                      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                    }"
                    v-slot="{ errors, classes }"
                  >
                    <label for="確認密碼">確認密碼</label>
                    <input
                      type="password"
                      class="form-control"
                      :class="[
                        classes,
                        { 'is-invalid': loginData.passwordsUnequal },
                      ]"
                      id="確認密碼"
                      placeholder="請再輸入一次密碼"
                      v-model="loginData.input.passwordChecked"
                      @blur="comparisePassword"
                    />
                    <span
                      class="invalid-feedback"
                      :class="
                        loginData.passwordsUnequal ? 'd-inline-block' : 'd-none'
                      "
                      >確認密碼不相等輸入密碼</span
                    >
                    <span
                      class="invalid-feedback"
                      v-show="!loginData.passwordsUnequal"
                      >{{ errors[0] }}</span
                    >
                  </ValidationProvider>
                </div>
                <!-- 輸入確認密碼結束 -->
                <!-- 動作區域開始 -->
                <div
                  class="action-block d-flex flex-column justify-content-center align-items-center"
                >
                  <div v-if="signInMode" class="checkbox">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="remember-me-checkbox"
                    />
                    <label class="form-check-label" for="remember-me-checkbox"
                      >記住我</label
                    >
                  </div>
                  <button
                    id="action-button"
                    class="btn btn-primary mt-3 mb-3"
                    :class="{ 'invalid-btn': invalid }"
                    :disabled="
                      invalid ||
                      loginData.repeatRegister ||
                      loginData.passwordsUnequal
                    "
                    @click.prevent="signInOrRegister"
                  >
                    <span v-if="signInMode">登入</span>
                    <span v-else>註冊</span>
                  </button>
                  <div
                    id="sign-in-failed-warning"
                    class="mb-2"
                    v-if="
                      signInMode &&
                      loginData.signInFailedFeedback.signInFailedWarning
                    "
                  >
                    帳號或密碼錯誤
                  </div>
                  <a href="#" v-if="signInMode" class="card-link">忘記密碼？</a>
                </div>
                <!-- 動作區域結束 -->
              </div>
            </ValidationObserver>
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
      signInMode: true,
      loginData: {
        showRemark: false,
        repeatRegister: false,
        passwordsUnequal: false,
        input: {
          account: "",
          password: "",
          passwordChecked: "",
        },
        signInFailedFeedback: {
          signInFailedWarning: false,
          signInFailedAnime: false,
        },
      },
    };
  },
  methods: {
    // 方法：
    queryMemberAccount() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryMemberAccount.php`;
      const vm = this;
      let memberAccount = vm.loginData.input.account;
      this.loginData.repeatRegister = false;

      if (!this.signInMode) {
        this.$http
          .post(api, memberAccount)
          .then((response) => {
            // console.log(response.data);
            if (response.data["MEMBER_ACCOUNT"]) {
              vm.loginData.repeatRegister = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 方法：
    comparisePassword() {
      let password = this.loginData.input.password;
      let passwordChecked = this.loginData.input.passwordChecked;
      this.loginData.passwordsUnequal = false;

      if (password != passwordChecked) {
        this.loginData.passwordsUnequal = true;
      }
    },
    // 方法：
    signInOrRegister() {
      const signInAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/SignIn.php`;
      const bb = `${process.env.REMOTE_HOST_PATH}/API/Forestage/SignIn.php`;
      const vm = this;
      let api = "";

      if (this.signInMode) {
        api = signInAPI;
      } else {
      }

      this.$http
        .post(api, JSON.stringify(this.loginData.input))
        .then((response) => {
          if (response.data.singInStatus) {
            const session = response.data.session;
            const expDate = new Date(response.data.expDate);
            document.cookie = `kapitanMembersSession="${session}"; expires="${expDate}"`;
            vm.$router.push(localStorage.getItem("ForestageBlockBefore"));
          } else {
            vm.loginData.input.account = "";
            vm.loginData.input.password = "";
            vm.loginData.signInFailedFeedback.signInFailedWarning = true;
            vm.loginData.signInFailedFeedback.signInFailedAnime = true;
            setTimeout(() => {
              vm.loginData.signInFailedFeedback.signInFailedAnime = false;
            }, 1200);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    signInMode() {
      this.loginData.repeatRegister = false;
      this.loginData.passwordsUnequal = false;
      this.loginData.signInFailedFeedback.signInFailedWarning = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

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
      border: 0.5px solid $bootstrap-border-color;
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
    #password-remark-trigger,
    #password-remark {
      font-size: 12px;
    }
    #password-remark {
      color: darkred;
      display: inline-block;
      width: 180px;
      top: -10px;
    }
    #action-button {
      width: 105px;
      height: 35px;
      padding: 0;
    }
    #sign-in-failed-warning {
      color: red;
    }

    @keyframes shaking {
      10%,
      90% {
        transform: translate3d(-1px, 0, 0);
      }
      20%,
      80% {
        transform: translate3d(2px, 0, 0);
      }
      30%,
      50%,
      70% {
        transform: translate3d(-4px, 0, 0);
      }
      40%,
      60% {
        transform: translate3d(4px, 0, 0);
      }
    }

    .shaking {
      animation: shaking 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>