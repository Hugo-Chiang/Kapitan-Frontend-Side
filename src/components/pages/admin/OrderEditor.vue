<template>
  <section id="order-editor-page" class="position-relative">
    <!-- 麵包屑元件開始 -->
    <Breadcrumb
      v-if="!inCreatingMode"
      :breadCrumbData="breadCrumbData"
    ></Breadcrumb>
    <!-- 麵包屑元件結束 -->
    <h6 class="mt-2 mb-4 mr-4 d-inline-block">
      正在<span v-if="inCreatingMode">新增</span><span v-else>編輯</span>：{{
        managingOrder
      }}
      號訂單
      <span v-if="!inCreatingMode" class="delete-project-btn ml-1">
        <a
          href=""
          @click.prevent="deleteOrder"
          data-toggle="modal"
          data-target="#modal"
          data-backdrop="static"
          >刪除訂單</a
        >
      </span>
    </h6>
    <ValidationObserver v-slot="{ invalid }">
      <!-- 訂單編輯區開始 -->
      <div class="row">
        <div class="col-10">
          <div class="form-row">
            <!-- 訂單狀態開始 -->
            <div class="form-group col-3">
              <label :for="requiredInputTitle.orderStatus">{{
                requiredInputTitle.orderStatus
              }}</label>
              <select
                :id="requiredInputTitle.orderStatus"
                class="form-control form-select-lg"
                v-model="editDetails.orderStatus"
                :disabled="adminLevel > 2"
              >
                <option value="2">已完成</option>
                <option value="1">進行中</option>
                <option value="0">已取消</option>
                <option value="-1">僅供測試</option>
              </select>
            </div>
            <!-- 訂單狀態結束 -->
            <!-- 所屬會員ID開始 -->
            <div class="form-group col-3">
              <ValidationProvider
                :rules="{ required: true, regex: /^MB\d{7}$/, length: 9 }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.memberID">{{
                  requiredInputTitle.memberID
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.memberID"
                  placeholder="MB0000001"
                  v-model="editDetails.memberID"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 所屬會員ID結束 -->
            <!-- 訂單日期開始 -->
            <div class="form-group col-5">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.orderDate">{{
                  requiredInputTitle.orderDate
                }}</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.orderDate"
                  v-model="editDetails.orderDate"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 訂單日期結束 -->
          </div>
          <div class="form-row">
            <!-- 訂單未折扣總計開始 -->
            <div class="form-group col-3">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.orderTotalConsumption">{{
                  requiredInputTitle.orderTotalConsumption
                }}</label>
                <input
                  type="number"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.orderTotalConsumption"
                  placeholder="例：30000"
                  v-model="editDetails.orderTotalConsumption"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 訂單未折扣總計結束 -->
            <!-- 訂單應折扣總額開始 -->
            <div class="form-group col-3">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.orderTotalDiscount">{{
                  requiredInputTitle.orderTotalDiscount
                }}</label>
                <input
                  type="number"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.orderTotalDiscount"
                  placeholder="例：399"
                  v-model="editDetails.orderTotalDiscount"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 訂單應折扣總額結束 -->
          </div>
          <div class="form-row">
            <!-- 訂購人姓名開始 -->
            <div class="form-group col-3">
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
                  v-model="editDetails.MCname"
                  :placeholder="requiredInputTitle.MCname"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 訂購人姓名結束 -->
            <!-- 訂購人電話開始 -->
            <div class="form-group col-3">
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
                  v-model="editDetails.MCphone"
                  placeholder="0933128872"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 訂購人電話結束 -->
            <!-- 訂購人電子信箱開始 -->
            <div class="form-group col-4">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.MCemail">{{
                  requiredInputTitle.MCemail
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.MCemail"
                  v-model="editDetails.MCemail"
                  placeholder="Hello-World@email.com"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 訂購人電子信箱結束 -->
          </div>
          <div class="form-row">
            <!-- 緊急聯絡人姓名開始 -->
            <div class="form-group col-3">
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
                  v-model="editDetails.ECname"
                  :placeholder="requiredInputTitle.ECname"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 緊急聯絡人姓名結束 -->
            <!-- 緊急聯絡人電話開始 -->
            <div class="form-group col-3">
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
                  v-model="editDetails.ECphone"
                  placeholder="0933128872"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 緊急聯絡人電話結束 -->
            <!-- 緊急聯絡人電子信箱開始 -->
            <div class="form-group col-4">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.ECemail">{{
                  requiredInputTitle.ECemail
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.ECemail"
                  v-model="editDetails.ECemail"
                  placeholder="Hello-World@email.com"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 緊急聯絡人電子信箱結束 -->
          </div>
        </div>
      </div>
      <div class="row">
        <!-- 操作按鈕開始 -->
        <div class="col-5 mt-4">
          <input
            type="button"
            class="btn btn-info mr-2"
            v-if="!inCreatingMode"
            value="編輯細項"
            @click.prevent="$router.push({ name: '管理系統：編輯細項' })"
          />
          <input
            type="button"
            class="btn btn-info"
            v-if="!inCreatingMode"
            value="新增細項"
            @click.prevent="$router.push({ name: '管理系統：新增細項' })"
          />
        </div>
        <div class="col-4 ml-auto">
          <div
            class="action-buttons-block mr-4 ml-auto mt-4 px-3 d-flex justify-content-around align-items-center"
          >
            <input
              type="button"
              class="btn btn-primary"
              :class="{ 'invalid-btn': invalid }"
              :value="inCreatingMode ? '新增完成' : '修改完成'"
              :disabled="invalid"
              @click.prevent="updateOrderData"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
            />
            <a
              class="d-inline-block"
              href=""
              @click.prevent="$router.push({ name: '管理系統：訂單管理' })"
              >不儲存關閉</a
            >
          </div>
        </div>
        <!-- 操作按鈕結束 -->
      </div>
      <!-- 訂單編輯區結束 -->
    </ValidationObserver>
  </section>
</template>

<script>
// 導入麵包屑元件
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
// 導入頁碼元件
import Pagination from "@/components/pages/sub-components/Pagination";

export default {
  data() {
    return {
      adminLevel: null,
      inCreatingMode: null,
      managingOrder: "",
      breadCrumbData: {
        pagesArr: ["管理系統：查詢訂單", "管理系統：編輯訂單"],
        currentPage: 2,
      },
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

          // 刪除方案詢問經確認後進行刪除，成敗與否都將倒回管理頁
          if (this.situation.event.indexOf("刪除訂單") != -1) {
            const deleteOrderAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/DeleteOrder.php`;
            const session = this.callBy.GlobalFunctions.getKapitanSession(
              "backstage"
            );

            let sendingObj = {
              session: session,
              orderID: this.callBy.managingOrder,
            };

            if (this.emitValue == 1) {
              this.situation.buttonType = "checked";

              this.callBy.$http
                .post(deleteOrderAPI, JSON.stringify(sendingObj))
                .then((response) => {
                  this.situation.event = "刪除訂單成功";
                  this.situation.message = response.data;
                })
                .catch((error) => {
                  this.situation.event = "刪除訂單失敗";
                  this.situation.message = error.data;
                });
            } else if (this.emitValue == "checked") {
              setTimeout(
                () =>
                  this.callBy.$router.push({
                    name: "管理系統：訂單管理",
                  }),
                1500
              );
            }
          }
        },
      },
      requiredInputTitle: {
        orderStatus: "訂單狀態",
        orderDate: "訂單日期",
        orderTotalConsumption: "未折扣總計",
        orderTotalDiscount: "應折扣總額",
        MCname: "訂購人姓名",
        MCphone: "訂購人手機號碼",
        MCemail: "訂購人電子信箱",
        ECname: "緊急聯絡人姓名",
        ECphone: "緊急聯絡人手機號碼",
        ECemail: "緊急聯絡人電子信箱",
        memberID: "所屬會員ID",
      },
      editDetails: {
        orderStatus: "",
        orderDate: "",
        orderTotalConsumption: "",
        orderTotalDiscount: "",
        MCname: "",
        MCphone: "",
        MCemail: "",
        ECname: "",
        ECphone: "",
        ECemail: "",
        memberID: "",
      },
    };
  },
  created() {
    this.modalData.callBy = this;
    this.$eventBus.$on("emitModalValue", (value) => {
      this.modalData.emitValue = value;
    });
    this.initializeeditor();
  },
  props: ["currentManager", "currentPath"],
  components: { Breadcrumb, Pagination },
  methods: {
    // 方法：初始化編輯器內容，以便呈現新增或編輯模式的差異功能
    initializeeditor() {
      if (this.currentPath.indexOf("Order-Creation") == -1)
        this.inCreatingMode = false;
      else this.inCreatingMode = true;

      const queryAdminAuthAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/AdminSignInAuthentication.php`;
      const queryCreatingIDAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryCreatingID.php`;
      const queryOrderDataAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryOrderData.php`;
      const session = this.GlobalFunctions.getKapitanSession("backstage");
      const vm = this;

      vm.editDetails.orderStatus = "";
      vm.editDetails.orderDate = new Date().Format("yyyy-MM-ddThh:mm");
      vm.editDetails.orderTotalConsumption = 0;
      vm.editDetails.orderTotalDiscount = 0;
      vm.editDetails.MCname = "";
      vm.editDetails.MCphone = "";
      vm.editDetails.MCemail = "";
      vm.editDetails.ECname = "";
      vm.editDetails.ECphone = "";
      vm.editDetails.ECemail = "";
      vm.editDetails.memberID = "";

      this.$http
        .post(queryAdminAuthAPI, session)
        .then((response) => {
          vm.adminLevel = response.data.adminLevel;

          if (this.inCreatingMode) {
            if (vm.adminLevel > 2) vm.editDetails.orderStatus = -1;
            else vm.editDetails.orderStatus = 1;
            return vm.$http.post(queryCreatingIDAPI, this.currentManager);
          } else {
            vm.managingOrder = localStorage.getItem("managingOrder");
            return vm.$http.post(queryOrderDataAPI, vm.managingOrder);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          if (this.inCreatingMode) {
            vm.managingOrder = response.data;
            localStorage.setItem("managingOrder", vm.managingOrder);
          } else {
            vm.editDetails.orderStatus = response.data["ORDER_STATUS"];
            vm.editDetails.orderDate = new Date(
              response.data["ORDER_DATE"]
            ).Format("yyyy-MM-ddThh:mm");
            vm.editDetails.orderTotalConsumption =
              response.data["ORDER_TOTAL_CONSUMPTION"];
            vm.editDetails.orderTotalDiscount =
              response.data["ORDER_TOTAL_DISCOUNT"];
            vm.editDetails.MCname = response.data["ORDER_MC_NAME"];
            vm.editDetails.MCphone = response.data["ORDER_MC_PHONE"];
            vm.editDetails.MCemail = response.data["ORDER_MC_EMAIL"];
            vm.editDetails.ECname = response.data["ORDER_EC_NAME"];
            vm.editDetails.ECphone = response.data["ORDER_EC_PHONE"];
            vm.editDetails.ECemail = response.data["ORDER_EC_EMAIL"];
            vm.editDetails.memberID = response.data["FK_MEMBER_ID_for_OD"];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 方法：更新訂單資料
    updateOrderData() {
      this.$eventBus.$emit("emitModalData", this.modalData);

      const createNewOrderAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/InsertNewOrder.php`;
      const updateOrderDataAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/UpdateOrderData.php`;
      const vm = this;
      const session = vm.GlobalFunctions.getKapitanSession("backstage");

      let api = "";

      if (this.inCreatingMode) api = createNewOrderAPI;
      else api = updateOrderDataAPI;

      let sendingObj = {
        session: session,
        orderID: vm.managingOrder,
        editedDetails: vm.editDetails,
      };

      this.$http
        .post(api, JSON.stringify(sendingObj))
        .then((response) => {
          vm.modalData.situation.event = "資料庫寫入成功。";
          vm.modalData.situation.message = response.data;
        })
        .catch((error) => {
          vm.modalData.situation.event = "資料庫寫入失敗。";
          vm.modalData.situation.message = error.data;
        });
    },
    // 方法：向提示視窗送出刪除訂單事件
    deleteOrder() {
      this.$eventBus.$emit("emitModalData", this.modalData);

      this.modalData.situation.event = "刪除訂單";
      this.modalData.situation.message = `確定要刪除 ${this.managingOrder} 訂單嗎？`;
      this.modalData.situation.buttonType = "yesNo";
    },
  },
};
</script>

<style lang="scss" scoped>
#order-editor-page {
  height: 600px;
  .breadcrumb {
    padding: 0;
  }
  h6 {
    font-weight: 600;
    .delete-project-btn {
      font-size: 13px;
      a {
        color: darkred;
      }
    }
  }
}
.action-buttons-block {
  a {
    font-size: 14px;
    color: black;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>