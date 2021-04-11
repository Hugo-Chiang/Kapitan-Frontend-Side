<template>
  <div
    id="order-details-form-sub-page"
    v-if="inCreatingMode || returneIndex >= 0"
  >
    <h6 class="my-3" v-if="!inCreatingMode">
      正在編輯：{{ returneContentArr[returneIndex]["ORDER_DETAIL_ID"] }}
      訂單細項
      <span class="delete-project-btn ml-1">
        <a
          href=""
          @click.prevent="deleteOrderDetail"
          data-toggle="modal"
          data-target="#modal"
          data-backdrop="static"
          >刪除細項</a
        >
      </span>
    </h6>
    <div class="row">
      <div class="col-12">
        <!-- 驗證套件 vee-validate 監看區域開始 -->
        <ValidationObserver v-slot="{ invalid }">
          <div class="form-row">
            <!-- 主要聯絡人姓名 input 開始 -->
            <div class="form-group col-2">
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
                    returneContentArr[returneIndex]['ORDER_DETAIL_MC_NAME']
                  "
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 主要聯絡人姓名 input 結束 -->
            <!-- 主要聯絡人手機 input 開始 -->
            <div class="form-group col-2">
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
                  placeholder="0900000000"
                  v-model="
                    returneContentArr[returneIndex]['ORDER_DETAIL_MC_PHONE']
                  "
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 主要聯絡人手機 input 結束 -->
            <!-- 主要聯絡人電郵 input 開始 -->
            <div class="form-group" :class="inCreatingMode ? 'col-3' : 'col-4'">
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
                  placeholder="Hello-World@email.com"
                  v-model="
                    returneContentArr[returneIndex]['ORDER_DETAIL_MC_EMAIL']
                  "
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 主要聯絡人電郵 select 結束 -->
            <!-- 細項狀態 input 開始 -->
            <div class="form-group col-2">
              <label :for="requiredInputTitle.orderDetailStatus">{{
                requiredInputTitle.orderDetailStatus
              }}</label>
              <select
                :id="requiredInputTitle.orderDetailStatus"
                class="form-control form-select-lg"
                v-model="returneContentArr[returneIndex]['ORDER_DETAIL_STATUS']"
                :disabled="adminLevel > 2"
              >
                <option value="2">已完成</option>
                <option value="1">進行中</option>
                <option value="0">已取消</option>
                <option value="-1">僅供測試</option>
              </select>
            </div>
            <!-- 細項狀態 select 結束 -->
            <!-- 細項金額 input 開始 -->
            <div class="form-group col-2">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.orderDetailAmount">{{
                  requiredInputTitle.orderDetailAmount
                }}</label>
                <input
                  type="number"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.orderDetailAmount"
                  placeholder="例：3000"
                  v-model="
                    returneContentArr[returneIndex]['ORDER_DETAIL_AMOUNT']
                  "
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 細項金額 input 結束 -->
          </div>
          <div class="form-row">
            <!-- 緊急聯絡人姓名 input 開始 -->
            <div class="form-group col-2">
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
                    returneContentArr[returneIndex]['ORDER_DETAIL_EC_NAME']
                  "
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 緊急聯絡人姓名 input 結束 -->
            <!-- 緊急聯絡人手機 input 開始 -->
            <div class="form-group col-2">
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
                  placeholder="0900000000"
                  v-model="
                    returneContentArr[returneIndex]['ORDER_DETAIL_EC_PHONE']
                  "
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 緊急聯絡人手機 input 結束 -->
            <!-- 緊急聯絡人電郵 input 開始 -->
            <div class="form-group" :class="inCreatingMode ? 'col-3' : 'col-4'">
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
                  placeholder="Hello-World@email.com"
                  v-model="
                    returneContentArr[returneIndex]['ORDER_DETAIL_EC_EMAIL']
                  "
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 緊急聯絡人電郵 input 結束 -->
            <!-- 訂單編號 input 開始 -->
            <div class="form-group col-3">
              <ValidationProvider
                :rules="{ required: true, regex: /^OD\d{7}/, length: 9 }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.newOrderID">{{
                  requiredInputTitle.newOrderID
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.newOrderID"
                  :disabled="inCreatingMode"
                  placeholder="OD0000001"
                  v-model="
                    returneContentArr[returneIndex]['FK_ORDER_ID_for_ODD']
                  "
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 訂單編號 input 結束 -->
          </div>
          <div class="form-row">
            <!-- 方案編號 input 開始 -->
            <div class="form-group" :class="inCreatingMode ? 'col-3' : 'col-2'">
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
                  placeholder="PJ0000001"
                  v-model="returneContentArr[returneIndex]['PROJECT_ID']"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 方案編號 input 結束 -->
            <!-- 預約人數 input 開始 -->
            <div class="form-group col-2">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.bookingNumOfPeople">{{
                  requiredInputTitle.bookingNumOfPeople
                }}</label>
                <input
                  type="number"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.bookingNumOfPeople"
                  placeholder="例：3"
                  v-model="
                    returneContentArr[returneIndex]['BOOKING_NUM_OF_PEOPLE']
                  "
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 預約人數 input 結束 -->
            <!-- 預約時間 input 開始 -->
            <div class="form-group col-3">
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
                  v-model="returneContentArr[returneIndex]['BOOKING_DATE']"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 預約時間 input 結束 -->
            <div v-if="inCreatingMode" class="col-4"></div>
            <!-- 操作按鈕開始 -->
            <div class="form-group button-block col-3 ml-auto mr-1">
              <input
                type="button"
                class="btn btn-primary mt-4"
                :class="{ 'invalid-btn': invalid }"
                :value="inCreatingMode ? '進行新增' : '修改完成'"
                :disabled="invalid"
                @click="updateOrderDetails"
                data-toggle="modal"
                data-target="#modal"
                data-backdrop="static"
              />
              <a
                class="d-inline-block position-relative"
                href=""
                @click.prevent="
                  inCreatingMode
                    ? $router.push({ name: '管理系統：編輯訂單' })
                    : $emit('update:inEditingIndex', -1)
                "
                >不儲存關閉</a
              >
            </div>
            <!-- 操作按鈕結束 -->
          </div>
        </ValidationObserver>
        <!-- 驗證套件 vee-validate 監看區域結束 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminLevel: null,
      modalData: {
        callBy: null,
        situation: {
          event: "",
          message: "",
          buttonType: "checked",
          data: {},
        },
        emitValue: null,
        // 反應（方法）：根據不同情境做出應對
        correspond() {
          // 遭遇失敗情境將導回管理頁
          if (this.situation.event.indexOf("失敗") != -1) {
            setTimeout(
              () => this.callBy.$router.push({ name: "管理系統：方案管理" }),
              1000
            );
          }

          if (this.callBy.inCreatingMode) {
            // 在非新增模式執行資料庫寫入後，成敗與否都將清空表單
            if (this.situation.event.indexOf("資料庫寫入") != -1) {
              this.callBy.creatDetails = [
                {
                  ORDER_DETAIL_ID: "",
                  ORDER_DETAIL_STATUS: 1,
                  ORDER_DETAIL_AMOUNT: "",
                  ORDER_DETAIL_MC_NAME: "",
                  ORDER_DETAIL_MC_PHONE: "",
                  ORDER_DETAIL_MC_EMAIL: "",
                  ORDER_DETAIL_EC_NAME: "",
                  ORDER_DETAIL_EC_PHONE: "",
                  ORDER_DETAIL_EC_EMAIL: "",
                  PROJECT_ID: "",
                  BOOKING_DATE: "",
                  FK_ORDER_ID_for_ODD: "",
                },
              ];
            }
          } else {
            // 在非新增模式執行資料庫寫入後，成敗與否都將關閉編輯細項
            if (this.situation.event.indexOf("資料庫寫入") != -1) {
              // 若有進行轉單，則於畫面上移除該細項
              if (this.situation.message.indexOf("完成") != -1) {
                let originalOrderID = localStorage.getItem("managingOrder");
                let editedOrderID = this.callBy.currentPageContentArr[
                  this.callBy.inEditingIndex
                ]["FK_ORDER_ID_for_ODD"];

                if (originalOrderID != editedOrderID) {
                  let deleteIndex = this.callBy.inEditingIndex;
                  this.callBy.currentPageContentArr.splice(deleteIndex, 1);
                }
              }

              // 若有任何資料輸入錯誤，將請求父層重新渲染，使表單恢復原狀
              if (this.situation.message.indexOf("不存在") != -1) {
                this.callBy.$emit("emitRerenderRequest");
              }

              this.callBy.$emit(
                "update:currentPageContentArr",
                this.callBy.currentPageContentArr
              );
              this.callBy.$emit("update:inEditingIndex", -1);
            }

            // 刪除訂單細項詢問經確認後進行刪除，成敗與否都將關閉編輯細項
            if (this.situation.event.indexOf("刪除訂單細項") != -1) {
              const deleteOrderDetailAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/DeleteOrderDetail.php`;
              const session = this.callBy.GlobalFunctions.getKapitanSession(
                "backstage"
              );

              let sendingObj = {
                session: session,
                orderDetailID: this.callBy.currentPageContentArr[
                  this.callBy.inEditingIndex
                ]["ORDER_DETAIL_ID"],
              };

              if (this.emitValue == 1) {
                this.situation.buttonType = "checked";

                this.callBy.$http
                  .post(deleteOrderDetailAPI, JSON.stringify(sendingObj))
                  .then((response) => {
                    this.situation.event = "刪除訂單細項成功";
                    this.situation.message = response.data;
                  })
                  .catch((error) => {
                    this.situation.event = "刪除訂單細項失敗";
                    this.situation.message = error.data;
                  });
              } else if (this.emitValue == "checked") {
                let deleteIndex = this.callBy.inEditingIndex;
                this.callBy.$emit(
                  "update:currentPageContentArr",
                  this.callBy.currentPageContentArr
                );
                this.callBy.$emit("update:inEditingIndex", -1);
                this.callBy.currentPageContentArr.splice(deleteIndex, 1);
              }
            }
          }
        },
      },
      requiredInputTitle: {
        orderDetailStatus: "細項狀態",
        orderDetailAmount: "細項金額",
        MCname: "主要聯絡人姓名",
        MCphone: "主要聯絡人手機",
        MCemail: "主要聯絡人電郵",
        ECname: "緊急聯絡人姓名",
        ECphone: "緊急聯絡人手機",
        ECemail: "緊急聯絡人電郵",
        projectID: "方案編號",
        bookingNumOfPeople: "預約人數",
        bookingDate: "預約日期",
        newOrderID: "所屬訂單",
      },
      creatDetails: [
        {
          ORDER_DETAIL_ID: "",
          ORDER_DETAIL_STATUS: 1,
          ORDER_DETAIL_AMOUNT: "",
          ORDER_DETAIL_MC_NAME: "",
          ORDER_DETAIL_MC_PHONE: "",
          ORDER_DETAIL_MC_EMAIL: "",
          ORDER_DETAIL_EC_NAME: "",
          ORDER_DETAIL_EC_PHONE: "",
          ORDER_DETAIL_EC_EMAIL: "",
          PROJECT_ID: "",
          BOOKING_DATE: "",
          FK_ORDER_ID_for_ODD: this.managingOrder,
        },
      ],
    };
  },
  props: [
    "inCreatingMode",
    "managingOrder",
    "currentPageContentArr",
    "inEditingIndex",
  ],
  created() {
    this.initializeEditor();
  },
  methods: {
    // 方法：初始化編輯器內容，以便呈現新增或編輯模式的差異功能
    initializeEditor() {
      this.modalData.callBy = this;
      this.$eventBus.$on("emitModalValue", (value) => {
        this.modalData.emitValue = value;
      });

      const queryAdminAuthAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/AdminSignInAuthentication.php`;
      const session = this.GlobalFunctions.getKapitanSession("backstage");
      const vm = this;

      this.$http
        .post(queryAdminAuthAPI, session)
        .then((response) => {
          vm.adminLevel = response.data.adminLevel;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 方法：將訂單項目更新數據寫入資料庫，並同步父層相關資料
    updateOrderDetails() {
      this.$eventBus.$emit("emitModalData", this.modalData);

      const insertNewOrderDetailsAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/InsertNewOrderDetails.php`;
      const updateOrderDetailsAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/UpdateOrderDetails.php`;
      const vm = this;
      const session = vm.GlobalFunctions.getKapitanSession("backstage");
      let currentArr = this.currentPageContentArr;
      let currentIndex = this.inEditingIndex;
      let api = "";
      let editDetails = {};
      let sendingObj = {};

      if (this.inCreatingMode) {
        sendingObj = {
          session: session,
          creatDetails: this.creatDetails,
        };
        api = insertNewOrderDetailsAPI;
      } else {
        editDetails.orderDetailID = currentArr[currentIndex]["ORDER_DETAIL_ID"];
        editDetails.orderDetailStatus =
          currentArr[currentIndex]["ORDER_DETAIL_STATUS"];
        editDetails.orderDetailAmount =
          currentArr[currentIndex]["ORDER_DETAIL_AMOUNT"];
        editDetails.MCname = currentArr[currentIndex]["ORDER_DETAIL_MC_NAME"];
        editDetails.MCphone = currentArr[currentIndex]["ORDER_DETAIL_MC_PHONE"];
        editDetails.MCemail = currentArr[currentIndex]["ORDER_DETAIL_MC_EMAIL"];
        editDetails.ECname = currentArr[currentIndex]["ORDER_DETAIL_EC_NAME"];
        editDetails.ECphone = currentArr[currentIndex]["ORDER_DETAIL_EC_PHONE"];
        editDetails.ECemail = currentArr[currentIndex]["ORDER_DETAIL_EC_EMAIL"];
        editDetails.projectID = currentArr[currentIndex]["PROJECT_ID"];
        editDetails.bookingNumOfPeople =
          currentArr[currentIndex]["BOOKING_NUM_OF_PEOPLE"];
        editDetails.bookingDate = currentArr[currentIndex]["BOOKING_DATE"];
        editDetails.newOrderID =
          currentArr[currentIndex]["FK_ORDER_ID_for_ODD"];

        sendingObj = {
          session: session,
          editedDetails: editDetails,
        };
        api = updateOrderDetailsAPI;
      }

      vm.$http
        .post(api, JSON.stringify(sendingObj))
        .then((response) => {
          console.log(response);
          vm.modalData.situation.event = "資料庫寫入成功。";
          vm.modalData.situation.message = response.data;
        })
        .catch((error) => {
          vm.modalData.situation.event = "資料庫寫入失敗。";
          vm.modalData.situation.message = error.data;
        });
    },
    // 方法：
    deleteOrderDetail() {
      this.$eventBus.$emit("emitModalData", this.modalData);

      this.modalData.situation.event = "刪除訂單細項";
      this.modalData.situation.message = `確定要刪除 ${
        this.currentPageContentArr[this.inEditingIndex]["ORDER_DETAIL_ID"]
      } 訂單細項嗎？`;
      this.modalData.situation.buttonType = "yesNo";
    },
  },
  computed: {
    returneContentArr() {
      if (!this.inCreatingMode) {
        return this.currentPageContentArr;
      } else {
        return this.creatDetails;
      }
    },
    returneIndex() {
      if (!this.inCreatingMode) {
        return this.inEditingIndex;
      } else {
        return 0;
      }
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

<style lang="scss" scoped>
@import "../../../../assets/scss/all.scss";

h6 {
  font-weight: 600;
  .delete-project-btn {
    font-size: 13px;
    a {
      color: darkred;
    }
  }
}
.button-block {
  a {
    font-size: 14px;
    transform: translate3d(-50%, -50%, 0);
    left: 20%;
    top: 35%;
    color: black;
  }
}
</style>