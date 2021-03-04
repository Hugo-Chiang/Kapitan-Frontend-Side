<template>
  <!-- 結帳區域開始 -->
  <div class="row">
    <div class="col-12">
      <!-- 驗證套件 vee-validate 監看區域開始 -->
      <ValidationObserver v-slot="{ invalid }">
        <form action="" method="post">
          <!-- 進行結帳「第二步：填寫訂購資訊」章節開始 -->
          <section id="checkoutStep02" class="card mb-5">
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
              <!-- 填寫訂購人資訊開始 -->
              <div class="form-row">
                <div class="form-group col-md-2">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputMainName">訂購人姓名</label>
                    <input
                      type="text"
                      id="inputMainName"
                      name="訂購人姓名"
                      class="form-control"
                      :class="classes"
                      placeholder="訂購人姓名"
                      v-model="inputOrdererInfo.MCname"
                      @keyup="syncMemberContactInfo = false"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group col-md-2">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputMainPhoneNumber">訂購人手機號碼</label>
                    <input
                      type="number"
                      id="inputMainPhoneNumber"
                      name="訂購人手機號碼"
                      class="form-control"
                      :class="classes"
                      placeholder="範例：0933128872"
                      v-model="inputOrdererInfo.MCphone"
                      @keyup="syncMemberContactInfo = false"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group col-md-4">
                  <ValidationProvider
                    rules="required|email"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputMainEmail">訂購人電子信箱</label>
                    <input
                      type="email"
                      class="form-control"
                      :class="classes"
                      id="inputMainEmail"
                      name="訂購人電子信箱"
                      placeholder="範例：Hello-World@email.com"
                      v-model="inputOrdererInfo.MCemail"
                      @keyup="syncMemberContactInfo = false"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-2">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputSubName">緊急聯絡人姓名</label>
                    <input
                      type="text"
                      id="inputSubName"
                      name="緊急聯絡人姓名"
                      class="form-control"
                      :class="classes"
                      placeholder="緊急聯絡人姓名"
                      v-model="inputOrdererInfo.ECname"
                      @keyup="syncMemberContactInfo = false"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group col-md-2">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputSubPhoneNumber">緊急聯絡人手機號碼</label>
                    <input
                      type="number"
                      id="inputSubPhoneNumber"
                      name="緊急聯絡人手機號碼"
                      class="form-control"
                      :class="classes"
                      placeholder="範例：0933128872"
                      v-model="inputOrdererInfo.ECphone"
                      @keyup="syncMemberContactInfo = false"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group col-md-4">
                  <ValidationProvider
                    rules="required|email"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputSubEmail">緊急聯絡人電子信箱</label>
                    <input
                      type="email"
                      class="form-control"
                      :class="classes"
                      id="inputSubEmail"
                      name="緊急聯絡人電子信箱"
                      placeholder="範例：Hello-World@email.com"
                      v-model="inputOrdererInfo.ECemail"
                      @keyup="syncMemberContactInfo = false"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <!-- 填寫訂購人資訊結束 -->
              <hr />
              <!-- 填寫信用卡資料開始 -->
              <div class="form-row">
                <div class="form-group col-md-2">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputCardName">持卡人姓名</label>
                    <input
                      type="text"
                      id="inputCardName"
                      name="持卡人姓名"
                      class="form-control"
                      :class="classes"
                      placeholder="持卡人姓名"
                      v-model="creditCardData.name"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group col-md-4">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputCardNumber">信用卡卡號</label>
                    <input
                      type="text"
                      id="inputCardNumber"
                      name="信用卡卡號"
                      class="form-control"
                      :class="classes"
                      placeholder="0000-0000-0000-0000"
                      v-model="creditCardData.number"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-2">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputCardNumber">有效期</label>
                    <input
                      type="text"
                      id="inputCardNumber"
                      name="有效期"
                      class="form-control"
                      :class="classes"
                      placeholder="範例：08/25"
                      v-model="creditCardData.date"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group col-md-2">
                  <ValidationProvider
                    rules="required|length:3|regex:/\d{3}$/"
                    v-slot="{ errors, classes }"
                  >
                    <label for="inputCardCVV">安全碼（CVV）</label>
                    <input
                      type="text"
                      id="inputCardCVV"
                      name="安全碼（CVV）"
                      class="form-control"
                      :class="classes"
                      placeholder="卡片背面三碼"
                      v-model="creditCardData.cvv"
                      maxlength="3"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <!-- 填寫信用卡資料結束 -->
            </div>
          </section>
          <!-- 進行結帳「第二步：填寫訂購資訊」章節結束 -->
          <!-- 進行結帳「第三步：填寫聯絡資訊」章節開始 -->
          <section id="checkoutStep03" class="card">
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
                    class="form-check-input checkboxForProject"
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
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <label :for="'inputMainName' + (index + 1)"
                        >主要聯絡人姓名</label
                      >
                      <input
                        type="text"
                        :id="'inputMainName' + (index + 1)"
                        name="主要聯絡人姓名"
                        :key="'inputMainName' + (index + 1)"
                        class="form-control"
                        :class="classes"
                        placeholder="主要聯絡人姓名"
                        v-model="inputContantInfoArr[index].MCname"
                        @keyup="unsyncOrdererContactInfo(index)"
                      />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group col-md-2">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <label :for="'inputMainPhoneNumber' + (index + 1)"
                        >主要聯絡人手機號碼</label
                      >
                      <input
                        type="number"
                        :id="'inputMainPhoneNumber' + (index + 1)"
                        name="主要聯絡人手機號碼"
                        :key="'inputMainPhoneNumber' + (index + 1)"
                        class="form-control"
                        :class="classes"
                        placeholder="範例：0933128872"
                        v-model="inputContantInfoArr[index].MCphone"
                        @keyup="unsyncOrdererContactInfo(index)"
                      />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group col-md-4">
                    <ValidationProvider
                      rules="required|email"
                      v-slot="{ errors, classes }"
                    >
                      <label :for="'inputMainEmail' + (index + 1)"
                        >主要聯絡人電子信箱</label
                      >
                      <input
                        type="email"
                        class="form-control"
                        :class="classes"
                        :id="'inputMainEmail' + (index + 1)"
                        name="主要聯絡人電子信箱"
                        :key="'inputMainEmail' + (index + 1)"
                        placeholder="範例：Hello-World@email.com"
                        v-model="inputContantInfoArr[index].MCemail"
                        @keyup="unsyncOrdererContactInfo(index)"
                      />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-2">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <label :for="'inputSubName' + (index + 2)"
                        >緊急聯絡人姓名</label
                      >
                      <input
                        type="text"
                        :id="'inputSubName' + (index + 2)"
                        name="緊急聯絡人姓名"
                        :key="'inputSubName' + (index + 2)"
                        class="form-control"
                        :class="classes"
                        placeholder="緊急聯絡人姓名"
                        v-model="inputContantInfoArr[index].ECname"
                        @keyup="unsyncOrdererContactInfo(index)"
                      />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group col-md-2">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <label :for="'inputSubPhoneNumber' + (index + 2)"
                        >緊急聯絡人手機號碼</label
                      >
                      <input
                        type="number"
                        :id="'inputSubPhoneNumber' + (index + 2)"
                        name="緊急聯絡人手機號碼"
                        :key="'inputSubPhoneNumber' + (index + 2)"
                        class="form-control"
                        :class="classes"
                        placeholder="範例：0933128872"
                        v-model="inputContantInfoArr[index].ECphone"
                        @keyup="unsyncOrdererContactInfo(index)"
                      />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group col-md-4">
                    <ValidationProvider
                      rules="required|email"
                      v-slot="{ errors, classes }"
                    >
                      <label :for="'inputSubEmail' + (index + 2)"
                        >緊急聯絡人電子信箱</label
                      >
                      <input
                        type="email"
                        class="form-control"
                        :class="classes"
                        :id="'inputSubEmail' + (index + 2)"
                        name="緊急聯絡人電子信箱"
                        :key="'inputSubEmail' + (index + 2)"
                        placeholder="範例：Hello-World@email.com"
                        v-model="inputContantInfoArr[index].ECemail"
                        @keyup="unsyncOrdererContactInfo(index)"
                      />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <hr v-if="index < confirmProjectsArr.length - 1" />
              </div>
            </div>
          </section>
          <!-- 進行結帳「第三步：填寫聯絡資訊」章節結束 -->
          <input
            type="submit"
            value="立即結帳"
            class="btn btn-primary mt-5"
            :disabled="invalid"
            @click="checkOut"
          />
        </form>
      </ValidationObserver>
      <!-- 驗證套件 vee-validate 監看區域結束 -->
    </div>
  </div>
  <!-- 結帳區域結束 -->
</template>

<script>
export default {
  data() {
    return {
      syncMemberInfo: {},
      syncMemberContactInfo: false,
      inputOrdererInfo: {},
      syncOrdererContactInfoAll: false,
      syncOrdererContactInfoArr: [],
      inputContantInfoArr: [],
      creditCardData: {
        name: "",
        number: "",
        date: "",
        cvv: "",
      },
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

          vm.syncMemberInfo = {
            MCname: memberContactInfo.MEMBER_NAME || "",
            MCphone: memberContactInfo.MEMBER_PHONE || "",
            MCemail: memberContactInfo.MEMBER_ACCOUNT,
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
        this.$set(this.syncOrdererContactInfoArr, i, false);
        this.$set(this.inputContantInfoArr, i, {
          MCname: "",
          MCphone: "",
          MCemail: "",
          ECname: "",
          ECphone: "",
          ECemail: "",
        });
      }
    },
    // 方法：解除任一同步訂購資訊的 chexbox 時，同時解除「全部同步訂購資訊」的 chexbox
    unsyncOrdererContactInfo(index) {
      this.syncOrdererContactInfoArr[index] = false;
      this.syncOrdererContactInfoAll = false;
    },
    // 方法：結帳
    checkOut() {
      const api = `${process.env.LOCAL_HOST_PATH}/API/CheckOut.php`;
      const vm = this;
      let json = JSON.stringify({ text: "HelloWorld", number: "123" });

      console.log(json);

      this.$http
        .post(api, json)
        .then((response) => {
          console.log(response);
        })
        .catch((response) => {
          console.log(response);
          alert("伺服器異常，請稍後再試。造成您的不便，敬請見諒！");
        });
    },
  },
  watch: {
    // 監看（方法）：確認同步會員資訊時，複製會員資訊予「第二步：填寫訂購資訊」的輸入欄
    syncMemberContactInfo(watchingBoolean) {
      console.log(this.inputOrdererInfo);
      if (watchingBoolean) {
        this.inputOrdererInfo = { ...this.syncMemberInfo };
      } else {
        // 增進使用者體驗：取消同步會員資訊時，欄位內容完全沒有更改過才會清除
        let inputOrdererInfoStr = JSON.stringify(this.inputOrdererInfo);
        let syncMemberInfoStr = JSON.stringify(this.syncMemberInfo);

        if (inputOrdererInfoStr == syncMemberInfoStr)
          this.$set(this, "inputOrdererInfo", {
            MCname: "",
            MCphone: "",
            MCemail: "",
            ECname: "",
            ECphone: "",
            ECemail: "",
          });
      }
    },
    // 監看（方法）：選擇全部同步訂購資訊與否，將決定個別同步訂購資訊的 checkbox 勾選與否
    syncOrdererContactInfoAll(watchingBoolean) {
      let ifAllSelected = this.syncOrdererContactInfoArr.every(
        (boolean) => boolean == true
      );

      if (watchingBoolean && !ifAllSelected) {
        this.syncOrdererContactInfoArr = this.syncOrdererContactInfoArr.map(
          (boolean) => true
        );
      } else if (!watchingBoolean && ifAllSelected) {
        this.syncOrdererContactInfoArr = this.syncOrdererContactInfoArr.map(
          (boolean) => false
        );
      }
    },
    // 監看（方法）：確認同步訂購資訊時，複製訂購資訊予「第三步：填寫聯絡資訊」的個別輸入欄
    syncOrdererContactInfoArr(watchingArr) {
      const vm = this;

      watchingArr.forEach(function (boolean, index) {
        if (boolean) {
          vm.$set(vm.inputContantInfoArr, index, {
            ...vm.inputOrdererInfo,
          });
        } else {
          // 增進使用者體驗：取消同步訂購資訊時，欄位內容完全沒有更改過才會清除
          let inputContactInfoStr = JSON.stringify(
            vm.inputContantInfoArr[index]
          );
          let inputOrdererInfoStr = JSON.stringify(vm.inputOrdererInfo);

          if (inputContactInfoStr == inputOrdererInfoStr) {
            vm.$set(vm.inputContantInfoArr, index, {
              MCname: "",
              MCphone: "",
              MCemail: "",
              ECname: "",
              ECphone: "",
              ECemail: "",
            });
          }
        }
      });
    },
  },
};
</script>