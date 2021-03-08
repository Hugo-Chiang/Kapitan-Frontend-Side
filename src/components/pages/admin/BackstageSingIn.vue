<template>
  <main class="text-center">
    <form class="form-signin">
      <img class="mb-4" src="../../../assets/img/logo.png" />
      <h3 class="h3 mb-3 font-weight-normal">請登入管理系統</h3>
      <label for="inputEmail" class="sr-only">請輸入帳號</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="請輸入帳號"
        required
        autofocus
        v-model="signInData.account"
      />
      <label for="inputPassword" class="sr-only">請輸入密碼</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="請輸入密碼"
        required
        v-model="signInData.password"
      />
      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> 記住我 </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click.prevent="signIn"
      >
        登入
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      signInData: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    // 方法：（搭配導航守衛）將帳密傳予後端 API 進行登入，並透過後端回傳的 token 保持登入驗證狀態
    signIn() {
      const api = `${process.env.LOCAL_HOST_PATH}/API/AdminSignIn.php`;
      const vm = this;

      this.$http
        .post(api, JSON.stringify(this.signInData))
        .then((response) => {
          console.log(response);
          if (response.data.singInStatus) {
            const session = response.data.session;
            const expDate = new Date(response.data.expDate);
            document.cookie = `kapitanSession="${session}"; expires="${expDate}"`;
            vm.$router.push({ name: "管理系統：首頁" });
          }
        })
        .catch((response) => {
          console.log(response);
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
  background-color: #f5f5f5;
}

main {
  padding-top: 120px;
  height: 100vh;
  background-color: #f5f5f5;
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
</style>