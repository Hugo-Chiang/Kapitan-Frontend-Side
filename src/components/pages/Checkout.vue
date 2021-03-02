<template>
  <!-- 結帳區域開始 -->
  <section class="row">
    <div class="col-12">
      <form action="" method="post">
        <div class="card mb-5">
          <div class="card-header">
            <h5>第二步：填寫訂購資訊</h5>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
                v-model="syncMemberContactInfo"
              />
              <label class="form-check-label" for="inlineCheckbox1"
                >同登入會員資訊</label
              >
            </div>
          </div>
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-2">
                <label for="inputMainName">訂購人姓名</label>
                <input
                  type="text"
                  id="inputMainName"
                  class="form-control"
                  placeholder="訂購人姓名"
                  v-model="inputOrdererInformation.ordererName"
                  @keyup="syncMemberContactInfo = false"
                />
              </div>
              <div class="form-group col-md-2">
                <label for="inputMainPhoneNumber">訂購人手機號碼</label>
                <input
                  type="number"
                  id="inputMainPhoneNumber"
                  class="form-control"
                  placeholder="範例：0933128872"
                  v-model="inputOrdererInformation.ordererPhone"
                  @keyup="syncMemberContactInfo = false"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputMainEmail">訂購人電子信箱</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputMainEmail"
                  placeholder="範例：Hello-World@email.com"
                  v-model="inputOrdererInformation.ordererEmail"
                  @keyup="syncMemberContactInfo = false"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-2">
                <label for="inputSubName">緊急聯絡人姓名</label>
                <input
                  type="text"
                  id="inputSubName"
                  class="form-control"
                  placeholder="緊急聯絡人姓名"
                  v-model="inputOrdererInformation.ECname"
                  @keyup="syncMemberContactInfo = false"
                />
              </div>
              <div class="form-group col-md-2">
                <label for="inputSubPhoneNumber">緊急聯絡人手機號碼</label>
                <input
                  type="number"
                  id="inputSubPhoneNumber"
                  class="form-control"
                  placeholder="範例：0933128872"
                  v-model="inputOrdererInformation.ECphone"
                  @keyup="syncMemberContactInfo = false"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputSubEmail">緊急聯絡人電子信箱</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputSubEmail"
                  placeholder="範例：Hello-World@email.com"
                  v-model="inputOrdererInformation.ECemail"
                  @keyup="syncMemberContactInfo = false"
                />
              </div>
            </div>
            <hr />
            <div class="form-row">
              <div class="form-group col-md-2">
                <label for="inputCardName">持卡人姓名</label>
                <input
                  type="text"
                  id="inputCardName"
                  class="form-control"
                  placeholder="持卡人姓名"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputCardNumber">信用卡卡號</label>
                <input
                  type="text"
                  id="inputCardNumber"
                  class="form-control"
                  placeholder="0000-0000-0000-0000"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-2">
                <label for="inputCardNumber">有效期</label>
                <input
                  type="text"
                  id="inputCardNumber"
                  class="form-control"
                  placeholder="範例：08/25"
                />
              </div>
              <div class="form-group col-md-2">
                <label for="inputCardCVV">安全碼（CVV）</label>
                <input
                  type="number"
                  id="inputCardCVV"
                  class="form-control"
                  placeholder="卡片背面三碼"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h5>第三步：填寫聯絡資訊</h5>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="inlineCheckbox2"
                value="option1"
                v-model="syncOrdererContactInfoAll"
              />
              <label class="form-check-label" for="inlineCheckbox2"
                >同訂購人資訊（全部）</label
              >
            </div>
          </div>
          <div class="card-body">
            <div
              class="projectBlockInStepThree"
              v-for="(project, index) in confirmProjectsArr"
              :data-id="
                project.bookingProjectId + '-' + project.bookingProjectDate
              "
              :key="index"
            >
              <span class="id">{{ project.bookingProjectId }}</span
              >, <span class="date">{{ project.bookingProjectDate }}</span
              >,<span class="people2">{{
                project.bookingProjectNumOfPeople
              }}</span>

              <div class="col">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="'inlineCheckbox' + (index + 3)"
                  :key="'inlineCheckbox' + (index + 3)"
                  v-model="syncOrdererContactInfoArr[index]"
                  value="option1"
                />
                <label
                  class="form-check-label"
                  :for="'inlineCheckbox' + (index + 3)"
                  >同訂購資訊（個案）</label
                >
              </div>

              <div class="form-row">
                <div class="form-group col-md-2">
                  <label :for="'inputMainName' + (index + 1)"
                    >主要聯絡人姓名</label
                  >
                  <input
                    type="text"
                    :id="'inputMainName' + (index + 1)"
                    :key="'inputMainName' + (index + 1)"
                    class="form-control"
                    placeholder="主要聯絡人姓名"
                    v-model="inputContantInfoArr[index].ordererName"
                    @keyup="syncOrdererContactInfoArr[index] = false"
                  />
                </div>
                <div class="form-group col-md-2">
                  <label :for="'inputMainPhoneNumber' + (index + 1)"
                    >主要聯絡人手機號碼</label
                  >
                  <input
                    type="number"
                    :id="'inputMainPhoneNumber' + (index + 1)"
                    :key="'inputMainPhoneNumber' + (index + 1)"
                    class="form-control"
                    placeholder="範例：0933128872"
                    v-model="inputContantInfoArr[index].ordererPhone"
                    @keyup="syncOrdererContactInfoArr[index] = false"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label :for="'inputMainEmail' + (index + 1)"
                    >訂購人電子信箱</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    :id="'inputMainEmail' + (index + 1)"
                    :key="'inputMainEmail' + (index + 1)"
                    placeholder="範例：Hello-World@email.com"
                    v-model="inputContantInfoArr[index].ordererEmail"
                    @keyup="syncOrdererContactInfoArr[index] = false"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-2">
                  <label :for="'inputSubName' + (index + 2)"
                    >緊急聯絡人姓名</label
                  >
                  <input
                    type="text"
                    :id="'inputSubName' + (index + 2)"
                    :key="'inputSubName' + (index + 2)"
                    class="form-control"
                    placeholder="緊急聯絡人姓名"
                    v-model="inputContantInfoArr[index].ECname"
                    @keyup="syncOrdererContactInfoArr[index] = false"
                  />
                </div>
                <div class="form-group col-md-2">
                  <label :for="'inputSubPhoneNumber' + (index + 2)"
                    >緊急聯絡人手機號碼</label
                  >
                  <input
                    type="number"
                    :id="'inputSubPhoneNumber' + (index + 2)"
                    :key="'inputSubPhoneNumber' + (index + 2)"
                    class="form-control"
                    placeholder="範例：0933128872"
                    v-model="inputContantInfoArr[index].ECphone"
                    @keyup="syncOrdererContactInfoArr[index] = false"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label :for="'inputSubEmail' + (index + 2)"
                    >緊急聯絡人電子信箱</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    :id="'inputSubEmail' + (index + 2)"
                    :key="'inputSubEmail' + (index + 2)"
                    placeholder="範例：Hello-World@email.com"
                    v-model="inputContantInfoArr[index].ECemail"
                    @keyup="syncOrdererContactInfoArr[index] = false"
                  />
                </div>
              </div>
              <hr v-if="index < confirmProjectsArr.length - 1" />
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="立即結帳"
          class="btn btn-primary mt-5"
          @click.prevent="checkOut"
        />
      </form>
    </div>
  </section>
  <!-- 結帳區域結束 -->
</template>

<script>
export default {
  data() {
    return {
      syncMemberInformation: {},
      syncMemberContactInfo: false,
      inputOrdererInformation: {},
      syncOrdererContactInfoAll: false,
      syncOrdererContactInfoArr: [],
      inputContantInfoArr: [],
    };
  },
  props: ["confirmProjectsArr"],
  created() {
    this.queryMemberContactInfo();
    this.establishSyncOrdererContactInfoArr();
  },
  methods: {
    // 方法：向後端詢問登入會員的連絡資訊，以利其同步稍後填寫
    queryMemberContactInfo() {
      const api = `${process.env.LOCAL_HOST_PATH}/API/QueryMemberContactInfo.php`;
      const vm = this;

      this.$http
        .get(api)
        .then((response) => {
          let memberContactInfo = response.data[0];

          vm.syncMemberInformation = {
            ordererName: memberContactInfo.MEMBER_NAME || "",
            ordererPhone: memberContactInfo.MEMBER_PHONE || "",
            ordererEmail: memberContactInfo.MEMBER_ACCOUNT,
            ECname: memberContactInfo.MEMBER_EC_NAME || "",
            ECphone: memberContactInfo.MEMBER_EC_PHONE || "",
            ECemail: memberContactInfo.MEMBER_EC_EMAIL || "",
          };
        })
        .catch((response) => {
          console.log("伺服器異常，請稍後再試。造成您的不便，敬請見諒！");
          console.log(response);
        });
    },
    // 方法：建立「第三步：填寫聯絡資訊」同步訂購資訊用的工具陣列
    establishSyncOrdererContactInfoArr() {
      let projectsNum = JSON.parse(localStorage.getItem("savingProjects"))
        .length;

      for (let i = 0; i < projectsNum; i++) {
        this.syncOrdererContactInfoArr.push(false);
        this.inputContantInfoArr.push({});
      }
    },
    // getOrdererContactInfo() {
    //   let ordererName = document.querySelector("#inputMainName").value;
    //   let ordererPhone = document.querySelector("#inputMainPhoneNumber").value;
    //   let ordererEmail = document.querySelector("#inputMainEmail").value;
    //   let ECname = document.querySelector("#inputSubName").value;
    //   let ECphone = document.querySelector("#inputSubPhoneNumber").value;
    //   let ECemail = document.querySelector("#inputSubEmail").value;

    //   return ordererInformation;
    // },
    // 方法：結帳
    checkOut() {
      // const api = `${process.env.LOCAL_HOST_PATH}/API/CheckOut.php`;
      // const vm = this;
      // this.$http
      //   .post(api, JSON.stringify({ text: HelloWorld }))
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((response) => {
      //     console.log(response);
      //     alert("伺服器異常，請稍後再試。造成您的不便，敬請見諒！");
      //   });
    },
  },
  watch: {
    // 監看（方法）：確認同步會員資訊時，複製會員資訊予「第二步：填寫訂購資訊」的輸入欄
    syncMemberContactInfo(watchingBoolean) {
      if (watchingBoolean) {
        this.inputOrdererInformation = { ...this.syncMemberInformation };
      } else {
        // 增進使用者體驗：取消同步會員資訊時，欄位內容完全沒有更改過才會清除
        let inputOrdererInfoStr = JSON.stringify(this.inputOrdererInformation);
        let syncMemberInfoStr = JSON.stringify(this.syncMemberInformation);

        if (inputOrdererInfoStr == syncMemberInfoStr)
          this.inputOrdererInformation = {};
      }
    },
    syncOrdererContactInfoAll(watchingBoolean) {
      if (watchingBoolean) {
        for (let i = 0; i < this.syncOrdererContactInfoArr.length; i++) {
          this.syncOrdererContactInfoArr[i] = true;
        }
      } else {
        for (let i = 0; i < this.syncOrdererContactInfoArr.length; i++) {
          this.syncOrdererContactInfoArr[i] = false;
        }
      }
    },
    // 監看（方法）：確認同步訂購資訊時，複製訂購資訊予「第三步：填寫聯絡資訊」的個別輸入欄
    syncOrdererContactInfoArr(watchingArr) {
      const vm = this;

      watchingArr.forEach(function (boolean, index) {
        if (boolean) {
          vm.inputContantInfoArr[index] = { ...vm.inputOrdererInformation };
        } else {
          // 增進使用者體驗：取消同步訂購資訊時，欄位內容完全沒有更改過才會清除
          let inputContactInfoStr = JSON.stringify(
            vm.inputContantInfoArr[index]
          );
          let inputOrdererInfoStr = JSON.stringify(vm.inputOrdererInformation);
          if (inputContactInfoStr == inputOrdererInfoStr) {
            vm.inputContantInfoArr[index] = {};
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>