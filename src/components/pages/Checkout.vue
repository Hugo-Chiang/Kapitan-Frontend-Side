<template>
  <!-- 結帳區域開始 -->
  <div class="row">
    <div class="col-12">
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
            :confirmProjectsArr="confirmProjectsArr"
            :requiredInputTtile="requiredInputTtile"
          ></FormContactInfo>
          <!-- 進行結帳「第三步：填寫聯絡資訊」章節結束 -->
          <input
            type="submit"
            value="立即結帳"
            class="btn btn-primary mt-5"
            :disabled="invalid"
            @click.prevent="checkOut"
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
// 導入訂購資訊表單元件
import FormOrderInfo from "@/components/pages/sub-components/FormOrderInfo";
// 導入聯絡資訊表單元件
import FormContactInfo from "@/components/pages/sub-components/FormContactInfo";

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
      aa: "",
    };
  },
  props: ["confirmProjectsArr"],
  components: {
    FormOrderInfo,
    FormContactInfo,
  },
  methods: {
    // 方法：進行結帳
    checkOut() {
      const api = `${process.env.LOCAL_HOST_PATH}/API/CheckOut.php`;
      const vm = this;
      let orderDetailsArr = [];
      let confirmProjectsArr = JSON.parse(
        localStorage.getItem("savingProjects")
      );

      confirmProjectsArr.forEach((project) => orderDetailsArr.push(project));

      orderDetailsArr.forEach((project, index, orderDetailsArr) => {
        let combineProject = { ...project, ...vm.inputContantInfoArr[index] };
        orderDetailsArr[index] = combineProject;
      });

      let json = JSON.stringify({
        memberID: "MB0000001",
        ordererContactInfo: this.inputOrdererInfo,
        orderDetails: orderDetailsArr,
      });

      this.$http
        .post(api, json)
        .then((response) => {
          console.log(response);
          this.aa = response.data;
          if (response.data.status == "訂購成功") {
            alert("讚讚～");
          } else if (response.data.status == "訂購失敗") {
            this.deleteInvalidProjects(response.data.invalidAProjects);
          }
        })
        .catch((response) => {
          console.log(response);
          alert("伺服器異常，請稍後再試。造成您的不便，敬請見諒！");
        });
    },
    // 方法： 刪除特定方案，用於後端發現有重複預訂的情況
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
    },
  },
};
</script>