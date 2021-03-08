<template>
  <!-- 結帳區域開始 -->
  <div class="row">
    <div class="col-12">
      <!-- 提示視窗元件開始 -->
      <Modal
        :situation="situation"
        :deleteInvalidProjects="deleteInvalidProjects"
      ></Modal>
      <!-- 提示視窗元件結束 -->
      <!-- 驗證套件 vee-validate 監看區域開始 -->
      <ValidationObserver v-slot="{ invalid }">
        <form action="" method="post">
          <!-- 進行結帳「第二步：填寫訂購資訊」章節開始 -->
          <FormOrderInfo
            :confirmProjectsArr="confirmProjectsArr"
            :requiredInputTtile="requiredInputTtile"
          ></FormOrderInfo>
          <!-- 進行結帳「第二步：填寫訂購資訊」章節結束 -->
          <!-- 進行結帳「第三步：填寫聯絡資訊」章節開始 -->
          <FormContactInfo
            ref="formContactInfo"
            :confirmProjectsArr="confirmProjectsArr"
            :requiredInputTtile="requiredInputTtile"
            @getCheckOutData="checkOut"
          ></FormContactInfo>
          <!-- 進行結帳「第三步：填寫聯絡資訊」章節結束 -->
          <input
            type="submit"
            value="立即結帳"
            class="btn btn-primary mt-5"
            :disabled="invalid"
            @click.prevent="$refs.formContactInfo.emitCheckOutData"
            data-toggle="modal"
            data-target="#checkOutModel"
            data-backdrop="static"
          />
        </form>
      </ValidationObserver>
      <!-- 驗證套件 vee-validate 監看區域結束 -->
      <div class="my-5">
        {{ aa }}
      </div>
    </div>
  </div>
  <!-- 結帳區域結束 -->
</template>

<script>
// 導入訂購與聯絡資訊表單元件
import FormOrderInfo from "@/components/pages/sub-components/FormOrderInfo";
import FormContactInfo from "@/components/pages/sub-components/FormContactInfo";
// 導入提示視窗元件
import Modal from "@/components/pages/sub-components/Modal";

export default {
  data() {
    return {
      requiredInputTtile: {
        MCname: "主要聯絡人姓名",
        MCphone: "主要聯絡人手機號碼",
        MCemail: "主要聯絡人電子信箱",
        ECname: "緊急聯絡人姓名",
        ECphone: "緊急聯絡人手機號碼",
        ECemail: "緊急聯絡人電子信箱",
      },
      situation: {
        event: "",
        message: "",
        data: {},
      },
      aa: "",
    };
  },
  props: ["confirmProjectsArr"],
  components: {
    FormOrderInfo,
    FormContactInfo,
    Modal,
  },
  methods: {
    // 方法：進行結帳，透過 Ajax 與後端溝通，獲悉訂購成敗
    checkOut(inputOrdererInfo, inputContantInfoArr) {
      const api = `${process.env.LOCAL_HOST_PATH}/API/CheckOut.php`;
      let orderDetailsArr = [];
      let confirmProjectsArr = JSON.parse(
        localStorage.getItem("savingProjects")
      );
      confirmProjectsArr.forEach((project) => orderDetailsArr.push(project));
      orderDetailsArr.forEach((project, index, orderDetailsArr) => {
        let combineProject = { ...project, ...inputContantInfoArr[index] };
        orderDetailsArr[index] = combineProject;
      });
      let json = JSON.stringify({
        memberID: "MB0000001",
        ordererContactInfo: inputOrdererInfo,
        orderDetails: orderDetailsArr,
      });

      this.$http
        .post(api, json)
        .then((response) => {
          console.log(response);
          this.aa = response.data;
          if (response.data.status == "訂購成功") {
            this.situation.event = "訂購成功";
            this.situation.message = response.data.message;
            localStorage.removeItem("savingProjects");
          } else if (response.data.status == "重複訂購") {
            this.situation.event = "重複訂購";
            this.situation.message = response.data.message;
            this.situation.data = response.data.invalidAProjects;
          }
        })
        .catch((response) => {
          console.log(response);
          this.situation.event = "伺服器異常";
          this.situation.message =
            "伺服器異常，請稍後再試。系統現將引導您回到首頁。<br>造成您的不便，敬請見諒！";
          this.situation.data = response;
        });
    },
    // 方法： 刪除特定或全部方案，用於後端發現有重複預訂的情況
    deleteInvalidProjects(invalidProjectsArr) {
      invalidProjectsArr.forEach((invalidProject) => {
        this.confirmProjectsArr.forEach((originalProject, originalIndex) => {
          let combineID =
            invalidProject.FK_PROJECT_ID_for_BK +
            "-" +
            invalidProject.BOOKING_DATE;
          if (combineID == originalProject.localstorageID) {
            this.confirmProjectsArr.splice(originalIndex, 1);
          }
        });
      });

      if (this.confirmProjectsArr.length > 0) {
        localStorage.setItem(
          "savingProjects",
          JSON.stringify(this.confirmProjectsArr)
        );
      } else {
        localStorage.removeItem("savingProjects");
      }
    },
  },
};
</script>