<template>
  <div class="order-details-form" v-if="inEditingIndex >= 0">
    <h6 class="my-3">
      正在編輯：{{ currentPageContentArr[inEditingIndex].ORDER_DETAIL_ID }}
    </h6>
    <!-- 驗證套件 vee-validate 監看區域開始 -->
    <ValidationObserver v-slot="{ invalid }">
      <form>
        <div class="form-row">
          <!-- 主要聯絡人姓名 input 開始 -->
          <div class="form-group col-md-2">
            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="requiredInputTitle.MCname">{{
                requiredInputTitle.MCname
              }}</label>
              <input
                type="text"
                class="form-control"
                :class="classes"
                :id="requiredInputTitle.MCname"
                placeholder="聯絡人姓名"
                v-model="
                  currentPageContentArr[inEditingIndex].ORDER_DETAIL_MC_NAME
                "
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- 主要聯絡人姓名 input 結束 -->
          <!-- 主要聯絡人手機 input 開始 -->
          <div class="form-group col-md-3">
            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="requiredInputTitle.MCphone">{{
                requiredInputTitle.MCphone
              }}</label>
              <input
                type="text"
                class="form-control"
                :class="classes"
                :id="requiredInputTitle.MCphone"
                placeholder="例：0933128872"
                v-model="
                  currentPageContentArr[inEditingIndex].ORDER_DETAIL_MC_PHONE
                "
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- 主要聯絡人手機 input 結束 -->
          <!-- 主要聯絡人電子信箱 input 開始 -->
          <div class="form-group col-md-4">
            <ValidationProvider
              :rules="{ required: true, email: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="requiredInputTitle.MCemail">{{
                requiredInputTitle.MCemail
              }}</label>
              <input
                type="email"
                class="form-control"
                :class="classes"
                :id="requiredInputTitle.MCemail"
                placeholder="例：Hello-World@email.com"
                v-model="
                  currentPageContentArr[inEditingIndex].ORDER_DETAIL_MC_EMAIL
                "
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- 主要聯絡人電子信箱 input 結束 -->
        </div>
        <div class="form-row">
          <!-- 緊急聯絡人姓名 input 開始 -->
          <div class="form-group col-md-2">
            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="requiredInputTitle.ECname">{{
                requiredInputTitle.ECname
              }}</label>
              <input
                type="text"
                class="form-control"
                :class="classes"
                :id="requiredInputTitle.ECname"
                placeholder="聯絡人姓名"
                v-model="
                  currentPageContentArr[inEditingIndex].ORDER_DETAIL_EC_NAME
                "
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- 緊急聯絡人姓名 input 結束 -->
          <!-- 緊急聯絡人手機 input 開始 -->
          <div class="form-group col-md-3">
            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="requiredInputTitle.ECphone">{{
                requiredInputTitle.ECphone
              }}</label>
              <input
                type="text"
                class="form-control"
                :class="classes"
                :id="requiredInputTitle.ECphone"
                placeholder="例：0933128872"
                v-model="
                  currentPageContentArr[inEditingIndex].ORDER_DETAIL_EC_PHONE
                "
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- 緊急聯絡人手機 input 結束 -->
          <!-- 緊急聯絡人電子信箱 input 開始 -->
          <div class="form-group col-md-4">
            <ValidationProvider
              :rules="{ required: true, email: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="requiredInputTitle.ECemail">{{
                requiredInputTitle.ECemail
              }}</label>
              <input
                type="email"
                class="form-control"
                :class="classes"
                :id="requiredInputTitle.ECemail"
                placeholder="例：Hello-World@email.com"
                v-model="
                  currentPageContentArr[inEditingIndex].ORDER_DETAIL_EC_EMAIL
                "
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- 緊急聯絡人電子信箱 input 結束 -->
        </div>
        <div class="form-row">
          <!-- 方案編號 input 開始 -->
          <div class="form-group col-md-3">
            <ValidationProvider
              :rules="{ required: true, regex: /^PJ\d{7}/, length: 9 }"
              v-slot="{ errors, classes }"
            >
              <label :for="requiredInputTitle.projectID">{{
                requiredInputTitle.projectID
              }}</label>
              <input
                type="text"
                class="form-control"
                :class="classes"
                :id="requiredInputTitle.projectID"
                placeholder="例：PJ0000001"
                v-model="currentPageContentArr[inEditingIndex].PROJECT_ID"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- 方案編號 input 結束 -->
          <!-- 預約時間 input 開始 -->
          <div class="form-group col-md-3">
            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="requiredInputTitle.bookingDate">{{
                requiredInputTitle.bookingDate
              }}</label>
              <input
                type="date"
                class="form-control"
                :class="classes"
                :id="requiredInputTitle.bookingDate"
                v-model="currentPageContentArr[inEditingIndex].BOOKING_DATE"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- 預約時間 input 結束 -->
          <div class="form-group col-md-2"></div>
          <!-- 操作按鈕開始 -->
          <div class="form-group col-md-1">
            <label for="">&nbsp;</label>
            <input
              type="button"
              class="btn btn-primary"
              value="修改完成"
              :disabled="invalid"
              @click="updateOrderDetails"
            />
          </div>
          <div class="form-group col-md-1 ml-4">
            <label for="">&nbsp;</label>
            <input
              type="button"
              class="btn btn-danger"
              value="不儲存關閉"
              @click.prevent="$emit('update:inEditingIndex', -1)"
            />
          </div>
          <!-- 操作按鈕結束 -->
        </div>
      </form>
    </ValidationObserver>
    <!-- 驗證套件 vee-validate 監看區域結束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      requiredInputTitle: {
        MCname: "主要聯絡人姓名",
        MCphone: "主要聯絡人手機號碼",
        MCemail: "主要聯絡人電子信箱",
        ECname: "緊急聯絡人姓名",
        ECphone: "緊急聯絡人手機號碼",
        ECemail: "緊急聯絡人電子信箱",
        projectID: "方案編號",
        bookingDate: "預約日期",
      },
      editDetails: {
        orderDetailID: "",
        MCname: "",
        MCphone: "",
        MCemail: "",
        ECname: "",
        ECphone: "",
        ECemail: "",
        projectID: "",
        bookingDate: "",
      },
    };
  },
  props: ["currentPageContentArr", "inEditingIndex"],
  methods: {
    // 方法：將訂單項目更新數據寫入資料庫，並同步父層相關資料
    updateOrderDetails() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/UpdateOrderDetails.php`;
      // const api = `${process.env.LOCAL_HOST_PATH}/API/Backstage/UpdateOrderDetails.php`;
      const vm = this;
      const session = vm.getKapitanSession();
      let currentArr = this.currentPageContentArr;
      let currentIndex = this.inEditingIndex;

      vm.editDetails.orderDetailID = currentArr[currentIndex].ORDER_DETAIL_ID;
      vm.editDetails.MCname = currentArr[currentIndex].ORDER_DETAIL_MC_NAME;
      vm.editDetails.MCphone = currentArr[currentIndex].ORDER_DETAIL_MC_PHONE;
      vm.editDetails.MCemail = currentArr[currentIndex].ORDER_DETAIL_MC_EMAIL;
      vm.editDetails.ECname = currentArr[currentIndex].ORDER_DETAIL_EC_NAME;
      vm.editDetails.ECphone = currentArr[currentIndex].ORDER_DETAIL_EC_PHONE;
      vm.editDetails.ECemail = currentArr[currentIndex].ORDER_DETAIL_EC_EMAIL;
      vm.editDetails.projectID = currentArr[currentIndex].PROJECT_ID;
      vm.editDetails.bookingDate = currentArr[currentIndex].BOOKING_DATE;

      let sendingObj = {
        session: session,
        editedDetails: vm.editDetails,
      };

      vm.$http
        .post(api, JSON.stringify(sendingObj))
        .then((response) => {
          console.log(response);
        })
        .catch((respponse) => {
          console.log(respponse);
        });

      vm.$emit("update:currentPageContentArr", vm.currentPageContentArr);
      vm.$emit("update:inEditingIndex", -1);
    },
    // 方法：抓取存在 cookie 中的 session
    getKapitanSession() {
      let cookie = document.cookie;
      let strArr = cookie.split("");
      let equalSymbolIndex = strArr.indexOf("=");
      let cookieLen = cookie.length;
      let namePulsSymbolLen = equalSymbolIndex + 2;
      let sessionLen = cookieLen - namePulsSymbolLen - 1;
      let session = cookie.substr(namePulsSymbolLen, sessionLen);

      return session;
    },
  },
  watch: {
    // 監看（方法）：若本頁內容有變，便將新內容傳入 data
    currentPageContentArr() {
      this.currentPageContentArr = this.currentPageContentArr;
    },
    // 監看（方法）：若欲編輯項目索引有變，便將新內容傳入 data
    inEditingIndex() {
      this.inEditingIndex = this.inEditingIndex;
    },
  },
};
</script>