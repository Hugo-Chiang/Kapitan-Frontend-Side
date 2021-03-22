<template>
  <section id="order-details-page" class="position-relative">
    <!-- 麵包屑元件開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 麵包屑元件結束 -->
    <h6 class="mt-2 mb-4 mr-4 d-inline-block">
      正在編輯：{{ managingOrder.managingOrderID }} 號訂單
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
            <div class="form-group col-md-2">
              <label :for="requiredInputTitle.orderStatus">{{
                requiredInputTitle.orderStatus
              }}</label>
              <select
                :id="requiredInputTitle.orderStatus"
                class="form-control form-select-lg"
                v-model="editDetails.orderStatus"
              >
                <option value="2">已完成</option>
                <option value="1">進行中</option>
                <option value="0">已取消</option>
              </select>
            </div>
            <!-- 訂單狀態結束 -->
            <!-- 所屬會員ID開始 -->
            <div class="form-group col-md-3">
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
            <div class="form-group col-md-5">
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
            <div class="form-group col-md-3">
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
            <div class="form-group col-md-3">
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
            <div class="form-group col-md-3">
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
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 訂購人姓名結束 -->
            <!-- 訂購人電話開始 -->
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
                  v-model="editDetails.MCphone"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 訂購人電話結束 -->
            <!-- 訂購人電子信箱開始 -->
            <div class="form-group col-md-4">
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
            <div class="form-group col-md-3">
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
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 緊急聯絡人姓名結束 -->
            <!-- 緊急聯絡人電話開始 -->
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
                  v-model="editDetails.ECphone"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 緊急聯絡人電話結束 -->
            <!-- 緊急聯絡人電子信箱開始 -->
            <div class="form-group col-md-4">
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
        <div class="col-5 ml-auto">
          <!-- 操作按鈕開始 -->
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
              @click.prevent="$router.push({ name: '管理系統：訂單細項' })"
              >編輯細項</a
            >
            <a
              class="d-inline-block"
              href=""
              @click.prevent="$router.push({ name: '管理系統：訂單管理' })"
              >不儲存關閉</a
            >
          </div>
          <!-- 操作按鈕結束 -->
        </div>
      </div>
      <!-- 訂單編輯區結束 -->
    </ValidationObserver>
  </section>
</template>

<script>
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
import Pagination from "@/components/pages/sub-components/Pagination";
import OrderDetailsForm from "@/components/pages/admin/sub-components/OrderDetailsForm";

export default {
  data() {
    return {
      inCreatingMode: false,
      managingOrder: {},
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
            const session = this.callBy.getKapitanSession();

            let sendingObj = {
              session: session,
              orderID: this.callBy.managingOrder.managingOrderID,
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
    this.initializeEditor();
    this.managingOrder = JSON.parse(localStorage.getItem("managingOrder"));
    this.queryOrderContent();
  },
  beforeDestroy() {
    // localStorage.removeItem("managingOrder");
  },
  components: { Breadcrumb, Pagination, OrderDetailsForm },
  methods: {
    // 方法：
    initializeEditor() {
      // 於原型下創立時間格式化方法，以利資料庫與 input 間銜接順利
      Date.prototype.Format = function (fmt) {
        let o = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          S: this.getMilliseconds(),
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (let k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
    },
    // 方法：
    queryOrderContent() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryOrderData.php`;
      const vm = this;

      this.$http
        .post(api, vm.managingOrder.managingOrderID)
        .then((response) => {
          console.log(response.data);
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
        })
        .catch((respponse) => {
          console.log(respponse);
        });
    },
    // 方法：
    updateOrderData() {
      this.$eventBus.$emit("emitModalData", this.modalData);

      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/UpdateOrderData.php`;
      const vm = this;
      const session = vm.getKapitanSession();

      let sendingObj = {
        session: session,
        orderID: vm.managingOrder.managingOrderID,
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
    // 方法：
    deleteOrder() {
      this.$eventBus.$emit("emitModalData", this.modalData);

      this.modalData.situation.event = "刪除訂單";
      this.modalData.situation.message = `確定要刪除 ${this.managingOrder.managingOrderID} 訂單嗎？`;
      this.modalData.situation.buttonType = "yesNo";
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
};
</script>

<style lang="scss" scoped>
#order-details-page {
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
</style>