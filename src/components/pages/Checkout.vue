<template>
  <!-- 結帳區域開始 -->
  <div id="checkout-sub-page" class="row">
    <div class="col-12">
      <form>
        <!-- 進行結帳「第二步：填寫訂購資訊」章節開始 -->
        <FormOrderInfo
          :confirmProjectsArr="confirmProjectsArr"
          :requiredInputTitle="requiredInputTitle"
          :syncMemberInfo="syncMemberInfo"
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
      memberData: {
        memberID: "",
        memberAccount: "",
      },
      syncMemberInfo: {},
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
    window.scrollTo(0, 0);

    this.modalData.callBy = this;
    this.$eventBus.$on("emitModalValue", (value) => {
      this.modalData.emitValue = value;
    });

    // created 階段即詢問會員資訊，以利使用者進行同步填寫
    this.queryMemberContactInfo();
  },
  methods: {
    // 方法：向後端詢問登入會員的連絡資訊，以利其同步稍後填寫
    queryMemberContactInfo() {
      const signInAuthenticationAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/SignInAuthentication.php`;
      const queryMemberInfoAPI = `${process.env.REMOTE_HOST_PATH}/API/Universal/QueryMemberInfo.php`;
      const session = this.GlobalFunctions.getKapitanSession("forestage");
      const vm = this;

      this.$http
        .post(signInAuthenticationAPI, session)
        .then((response) => {
          if (response.data.sessionCheck) {
            vm.memberData.memberID = response.data.signInedID;
            return vm.$http.post(queryMemberInfoAPI, vm.memberData.memberID);
          }
        })
        .catch((error) => {
          vm.modalData.situation.event = "伺服器異常";
          vm.modalData.situation.message =
            "伺服器異常，請稍後再試。造成您的不便，敬請見諒！";
          vm.modalData.situation.data = error;
          console.log(error);
        })
        .then((response) => {
          let memberContactInfo = response.data;

          vm.syncMemberInfo = {
            MCname: memberContactInfo.MEMBER_NAME || "",
            MCphone: memberContactInfo.MEMBER_PHONE || "",
            MCemail: memberContactInfo.MEMBER_ACCOUNT,
            ECname: memberContactInfo.MEMBER_EC_NAME || "",
            ECphone: memberContactInfo.MEMBER_EC_PHONE || "",
            ECemail: memberContactInfo.MEMBER_EC_EMAIL || "",
          };
        })
        .catch((error) => {
          vm.modalData.situation.event = "伺服器異常";
          vm.modalData.situation.message =
            "伺服器異常，請稍後再試。造成您的不便，敬請見諒！";
          vm.modalData.situation.data = error;
          console.log(error);
        });
    },
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
        memberID: vm.memberData.memberID,
        memberAccount: vm.memberData.memberAccount,
        ordererContactInfo: inputOrdererInfo,
        orderDetails: orderDetailsArr,
      });

      this.$http
        .post(api, json)
        .then((response) => {
          console.log(response);
          if (response.data.status == "訂購成功") {
            vm.modalData.propsMethods.deleteInvalidProjects =
              vm.deleteInvalidProjects;
            vm.modalData.situation.event = "訂購成功";
            vm.modalData.situation.message = response.data.message;

            // 模擬發送購買憑證信
            let smtp = vm.GlobalVariables.Email;
            let certificateArr = response.data.certificateArr;
            let emailContent = `<p>這是一封前端作品的訂單完成模擬信。</p><p>在這個情境中，您會收到企業發送給您的訂購憑證：<ul>`;

            for (let i = 0; i < certificateArr.length; i++) {
              let str = `
                  <li>
                    ${certificateArr[i].orderDetailID}：${certificateArr[i].certificate}
                    <div style="width: 200px;">
                        <img src='http://bwipjs-api.metafloor.com/?bcid=code128&text=${certificateArr[i].certificate}'
                            style="width: 100%;">
                    </div>
                  </li>`;

              emailContent = emailContent + str;
            }

            emailContent =
              emailContent +
              `<ul></p><p>您將依據這個憑證與（碼頭）工作人員相認。</p><p>祝您今天一切順利！</p>`;

            smtp.send({
              SecureToken: "5597a7e9-ef70-4269-a166-3747579e805d",
              To: response.data.noticeEmails,
              From: "Kapitan@service.com",
              Subject: `甲必丹遊艇城│訂單【${response.data.orderID}】訂購成功！`,
              Body: emailContent,
            });

            localStorage.removeItem("savingProjects");
            vm.$eventBus.$emit("emitCartUpdate", 0);
          } else if (response.data.status == "重複訂購") {
            vm.modalData.propsMethods.deleteInvalidProjects =
              vm.deleteInvalidProjects;
            vm.modalData.situation.event = "重複訂購";
            vm.modalData.situation.message = response.data.message;
            vm.modalData.situation.data = response.data.invalidProjects;
          }
        })
        .catch((error) => {
          vm.modalData.situation.event = "伺服器異常";
          vm.modalData.situation.message =
            "伺服器異常，請稍後再試。系統現將引導您回到首頁。<br>造成您的不便，敬請見諒！";
          vm.modalData.situation.data = error;
          console.log(error);
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

        this.$eventBus.$emit("emitCartUpdate", this.confirmProjectsArr.length);
      } else {
        localStorage.removeItem("savingProjects");
        this.$eventBus.$emit("emitCartUpdate", 0);
      }
    },
  },
};
</script>