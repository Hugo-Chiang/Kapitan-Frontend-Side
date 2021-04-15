<template>
  <main class="text-center">
    <form class="form-signin">
      <img
        class="mb-2"
        src="../../../assets/img/Kapitan-Logo-Vertical-Version-01.png"
      />
      <h4 class="h4 mt-1 mb-4">請登入管理系統</h4>
      <div
        class="input-area"
        :class="{ shaking: signInFailedFeedback.signInFailedAnime }"
      >
        <label for="input-email" class="sr-only" key="emailLabel"
          >請輸入帳號</label
        >
        <input
          type="email"
          id="input-email"
          class="form-control"
          :placeholder="signInForm.emailPlaceHolder"
          required
          autofocus
          v-model="loginData.account"
          key="input-email"
        />
        <label for="input-password" class="sr-only" key="passwordLabel"
          >請輸入密碼</label
        >
        <input
          type="password"
          id="input-password"
          class="form-control"
          :placeholder="signInForm.passwordPlaceHolder"
          required
          v-model="loginData.password"
          key="input-password"
        />
      </div>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="記住我" v-model="loginData.remeberMe" />
          記住我
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click.prevent="signIn"
      >
        <span>登入</span>
      </button>
      <div class="position-relative">
        <div
          id="signIn-failed-warning"
          class="position-absolute"
          v-if="signInFailedFeedback.signInFailedWarning"
        >
          帳號或密碼錯誤
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted">&copy; 2035 Kapitan</p>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      signInForm: {
        emailPlaceHolder: "請輸入帳號",
        passwordPlaceHolder: "請輸入密碼",
      },
      loginData: {
        account: "",
        password: "",
        rememberMe: false,
      },
      signInFailedFeedback: {
        signInFailedWarning: false,
        signInFailedAnime: false,
      },
    };
  },
  methods: {
    // 方法：（搭配導航守衛）將帳密傳予後端 API 進行登入，並透過後端回傳的 token 保持登入驗證狀態
    signIn() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/AdminSignIn.php`;
      const remeberMe = this.loginData.remeberMe;
      const vm = this;

      this.$http
        .post(api, JSON.stringify(this.loginData))
        .then((response) => {
          if (response.data.singInStatus) {
            const session = response.data.session;
            const expDate = new Date(response.data.expDate);

            document.cookie = `kapitanAdminSession="${session}"; expires="${
              remeberMe ? expDate : ""
            }"`;
            vm.$router.push({ name: "管理系統：首頁" });
          } else {
            vm.loginData.account = "";
            vm.loginData.password = "";
            vm.signInFailedFeedback.signInFailedWarning = true;
            vm.signInFailedFeedback.signInFailedAnime = true;
            setTimeout(() => {
              vm.signInFailedFeedback.signInFailedAnime = false;
            }, 1200);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/bootstrap.min.css";

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

main {
  padding-top: 120px;
  height: 100vh;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

img {
  width: 150px;
}

#signIn-failed-warning {
  transform: translate(-50%, 15%);
  left: 50%;
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
</style>