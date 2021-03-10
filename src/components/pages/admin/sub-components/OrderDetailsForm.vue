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
                v-model="editDetails.MCname"
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
                v-model="editDetails.MCphone"
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
                v-model="editDetails.MCemail"
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
                v-model="editDetails.ECname"
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
                v-model="editDetails.ECphone"
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
                v-model="editDetails.ECemail"
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
                v-model="editDetails.projectID"
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
                v-model="editDetails.bookingDate"
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
        MCname: "",
        MCphone: "",
        MCemail: "",
        ECname: "",
        ECphone: "",
        ECemail: "",
        bookingDate: "",
      },
    };
  },
  props: ["currentPageContentArr", "inEditingIndex"],
  methods: {
    // 方法：透過語法糖同步父層的編輯項目索引
    updateOrderDetails() {
      this.$emit("update:inEditingIndex", -1);
    },
  },
  watch: {
    // 監看（方法）：若本頁內容有變，便將新內容傳入 data
    currentPageContentArr() {
      this.currentPageContentArr = this.currentPageContentArr;
    },
    // 監看（方法）：若欲編輯項目（索引）有變，便將新內容傳入 data
    inEditingIndex() {
      this.inEditingIndex = this.inEditingIndex;

      let currentArr = this.currentPageContentArr;
      let currentIndex = this.inEditingIndex;

      this.editDetails.MCname = currentArr[currentIndex].ORDER_DETAIL_MC_NAME;
      this.editDetails.MCphone = currentArr[currentIndex].ORDER_DETAIL_MC_PHONE;
      this.editDetails.MCemail = currentArr[currentIndex].ORDER_DETAIL_MC_EMAIL;
      this.editDetails.ECname = currentArr[currentIndex].ORDER_DETAIL_EC_NAME;
      this.editDetails.ECphone = currentArr[currentIndex].ORDER_DETAIL_EC_PHONE;
      this.editDetails.ECemail = currentArr[currentIndex].ORDER_DETAIL_EC_EMAIL;
      this.editDetails.projectID = currentArr[currentIndex].PROJECT_ID;
      this.editDetails.bookingDate = currentArr[currentIndex].BOOKING_DATE;
    },
  },
};
</script>