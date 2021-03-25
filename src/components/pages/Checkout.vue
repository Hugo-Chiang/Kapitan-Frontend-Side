<template>
  <!-- 結帳區域開始 -->
  <div class="row">
    <div class="col-12">
      <!-- 提示視窗元件開始 -->
      <!-- <Modal ref="modal" :modalData="modalData"></Modal> -->
      <!-- 提示視窗元件結束 -->
      <form>
        <!-- 進行結帳「第二步：填寫訂購資訊」章節開始 -->
        <FormOrderInfo
          :confirmProjectsArr="confirmProjectsArr"
          :requiredInputTitle="requiredInputTitle"
        ></FormOrderInfo>
        <!-- 進行結帳「第二步：填寫訂購資訊」章節結束 -->
        <!-- 進行結帳「第三步：填寫聯絡資訊」章節開始 -->
        <FormContactInfo
          ref="formContactInfo"
          :confirmProjectsArr="confirmProjectsArr"
          :requiredInputTitle="requiredInputTitle"
          :currentPage="currentPage"
          @getCheckOutData="checkOut"
        ></FormContactInfo>
        <!-- 進行結帳「第三步：填寫聯絡資訊」章節結束 -->
      </form>
    </div>
  </div>
  <!-- 結帳區域結束 -->
</template>

<script>
// 導入訂購與聯絡資訊表單元件
import FormOrderInfo from "@/components/pages/sub-components/FormOrderInfo";
import FormContactInfo from "@/components/pages/sub-components/FormContactInfo";

export default {
  data() {
    return {
      requiredInputTitle: {
        MCname: "主要聯絡人姓名",
        MCphone: "主要聯絡人手機",
        MCemail: "主要聯絡人電郵",
        ECname: "緊急聯絡人姓名",
        ECphone: "緊急聯絡人手機",
        ECemail: "緊急聯絡人電郵",
      },
      // 提示視窗資料
      modalData: {
        callBy: null,
        propsMethods: {
          deleteInvalidProjects: null,
        },
        situation: {
          event: "",
          message: "",
          buttonType: "checked",
          data: {},
        },
        emitValue: null,
        // 反應（方法）：根據不同情境做出應對
        correspond() {
          switch (this.situation.event) {
            case "伺服器異常":
              setTimeout(
                () => this.callBy.$router.push({ name: "首頁" }),
                1000
              );
              break;
            case "訂購成功":
              setTimeout(
                () => this.callBy.$router.push({ name: "首頁" }),
                1000
              );
              break;
            case "重複訂購":
              this.propsMethods.deleteInvalidProjects(this.situation.data);
              break;
          }
        },
      },
    };
  },
  props: ["confirmProjectsArr", "currentPage"],
  components: {
    FormOrderInfo,
    FormContactInfo,
  },
  created() {
    this.$eventBus.$on("emitModalValue", (value) => {
      this.modalData.emitValue = value;
    });
  },
  methods: {
    // 方法：進行結帳，透過 Ajax 與後端溝通，獲悉訂購成敗
    checkOut(inputOrdererInfo, inputContantInfoArr) {
      this.$eventBus.$emit("emitModalData", this.modalData);

      const api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/Checkout.php`;
      const vm = this;
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
          if (response.data.status == "訂購成功") {
            vm.modalData.callBy = vm;
            vm.modalData.propsMethods.deleteInvalidProjects =
              vm.deleteInvalidProjects;
            vm.modalData.situation.event = "訂購成功";
            vm.modalData.situation.message = response.data.message;
            localStorage.removeItem("savingProjects");
          } else if (response.data.status == "重複訂購") {
            vm.modalData.callBy = vm;
            vm.modalData.propsMethods.deleteInvalidProjects =
              vm.deleteInvalidProjects;
            vm.modalData.situation.event = "重複訂購";
            vm.modalData.situation.message = response.data.message;
            vm.modalData.situation.data = response.data.invalidAProjects;
          }
        })
        .catch((response) => {
          console.log(response);
          vm.modalData.callBy = vm;
          vm.modalData.situation.event = "伺服器異常";
          vm.modalData.situation.message =
            "伺服器異常，請稍後再試。系統現將引導您回到首頁。<br>造成您的不便，敬請見諒！";
          vm.modalData.situation.data = response;
          console.log(vm.modalData);
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