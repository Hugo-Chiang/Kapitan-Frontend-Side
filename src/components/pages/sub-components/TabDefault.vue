<template>
  <div class="card-body container text-center">
    <h4 class="card-title my-3">請選擇您偏好的日期與人數</h4>
    <div class="row">
      <div
        class="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center mx-auto"
      >
        <!-- 選擇日期欄位開始 -->
        <h6 class="mt-4">
          已選擇日期： <span>{{ bookingData.bookingDate || "尚未填寫" }}</span>
        </h6>
        <div class="d-flex justify-content-center">
          <date-picker
            v-model="bookingData.bookingDate"
            valueType="format"
            :lang="lang"
            :disabled-date="checkBookedDate"
          ></date-picker>
        </div>
        <!-- 選擇日期欄位結束 -->
        <!-- 選擇人數欄位開始 -->
        <h6 class="mt-4">
          已選擇人數： {{ bookingData.bookingNumOfPeople }} 人
        </h6>
        <div class="d-flex justify-content-center">
          <NumberInput
            ref="numberInput"
            :incomingValue.sync="bookingData.bookingNumOfPeople"
            :minAndMaxNum="minAndMaxNum"
          ></NumberInput>
        </div>
        <!-- 選擇人數欄位結束 -->
        <!-- 金額統計與下單按鈕區開始 -->
        <h5 id="project-final-price-line" class="mt-5 mb-4">
          方案總計：
          <span id="project-final-price">
            {{
              (bookingData.bookingNumOfPeople *
                selectedProject.selectedProjectContent.projectPricePerPerson)
                | currency
            }}</span
          >
          元
        </h5>
        <div
          id="project-purchase-buttons"
          class="mb-4 d-flex justify-content-between"
        >
          <button
            id="save-in-cart-btn"
            class="btn"
            @click.prevent="saveInCart"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
          >
            放入購物車
          </button>
          <button
            id="booking-now-btn"
            class="btn"
            @click.prevent="bookingNow"
            :data-toggle="this.bookingData.bookingDate == null ? 'modal' : ''"
            data-target="#modal"
            data-backdrop="static"
          >
            立即預約
          </button>
        </div>
        <!-- 金額統計與下單按鈕區結束 -->
      </div>
    </div>
  </div>
</template>

<script>
// 導入 vue2-datepicker 月曆套件
import DatePicker from "vue2-datepicker";
// 導入數字調控元件
import NumberInput from "@/components/pages/sub-components/NumberInput";

export default {
  data() {
    return {
      bookingData: {
        bookingNumOfPeople: 1,
        bookingDate: null,
      },
      minAndMaxNum: {
        min: 1,
        max: 1,
      },
      // 提示視窗資料
      modalData: {
        callBy: null,
        situation: {
          event: "",
          message: "",
          buttonType: "checked",
          data: {},
        },
        emitValue: null,
        correspond() {},
      },
      // 將 vue2-datepicker 月曆套件中文化
      lang: {
        formatLocale: {
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          monthsShort: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          weekdaysShort: [
            "週日",
            "週一",
            "週二",
            "週三",
            "週四",
            "週五",
            "週六",
          ],
          weekdaysMin: ["日", "一", "二", "三", "四", "五", "六"],
        },
      },
      confirmProject: {},
      confirmID: this.projectID,
    };
  },
  props: ["selectedProject"],
  components: {
    DatePicker,
    NumberInput,
  },
  methods: {
    // 方法：回傳後端反饋的已預約日期，使月曆套件的相對應日期不可選
    checkBookedDate(date) {
      let bookedDateArr = this.selectedProject.selectedProjectBookedDate.map(
        (x) => new Date(x).toLocaleDateString()
      );
      let timeNow = new Date();
      let todayMidnight = new Date(
        timeNow.getFullYear(),
        timeNow.getMonth(),
        timeNow.getDate()
      );

      return (
        date < todayMidnight ||
        bookedDateArr.find(
          (bookedDate) => bookedDate == date.toLocaleDateString()
        )
      );
    },
    // 方法：將已知的訂購資訊存入購物車，並寫入 localStorage
    saveInCart() {
      this.$eventBus.$emit("emitModalData", this.modalData);

      let confirmDate = this.bookingData.bookingDate;

      if (confirmDate == null) {
        this.modalData.situation.event = "未輸入預約日期";
        this.modalData.situation.message = "請輸入預約日期！";
      } else {
        let confirmNumOfPeople = this.bookingData.bookingNumOfPeople;

        this.confirmProject = {
          localstorageID: `${this.selectedProject.selectedProjectID}-${confirmDate}`,
          bookingProjectID: this.selectedProject.selectedProjectID,
          bookingProjectName: this.selectedProject.selectedProjectContent
            .projectName,
          bookingProjectAvatarUrl:
            this.selectedProject.selectedProjectContent.projectAvatarUrl || "",
          bookingProjectPricePerPerson: this.selectedProject
            .selectedProjectContent.projectPricePerPerson,
          bookingProjectDate: confirmDate,
          bookingProjectNumOfPeople: confirmNumOfPeople,
        };

        let storageArr =
          JSON.parse(localStorage.getItem("savingProjects")) || [];
        let storageChecking = false;

        for (let i = 0; i < storageArr.length; i++) {
          if (
            this.confirmProject.bookingProjectID ==
              storageArr[i].bookingProjectID &&
            this.confirmProject.bookingProjectDate ==
              storageArr[i].bookingProjectDate
          ) {
            storageArr[i] = this.confirmProject;
            storageChecking = true;
          }
        }

        if (!storageChecking) storageArr.push(this.confirmProject);

        localStorage.setItem("savingProjects", JSON.stringify(storageArr));

        let cartItemsNum = JSON.parse(localStorage.getItem("savingProjects"))
          .length;
        this.$eventBus.$emit("emitCartUpdate", cartItemsNum);

        this.modalData.situation.event = "方案放入購物車";
        this.modalData.situation.message = "方案已放入購物車囉！";
      }
    },
    // 方法：將已知的訂購資訊存入購物車，寫入 localStorage 並立即跳轉至購物車頁面
    bookingNow() {
      this.saveInCart();
      let confirmDate = this.bookingData.bookingDate;
      if (confirmDate != null) this.$router.push({ name: "購物車" });
    },
  },
  watch: {
    // 監看（方法）：props 進來的方案內容有變時（即 Ajax 訪問完畢後），重新渲染選擇人數
    selectedProject: {
      handler(newObj) {
        this.bookingData.bookingNumOfPeople =
          newObj.selectedProjectContent.projectMinNumOfPeople;
        this.minAndMaxNum.min =
          newObj.selectedProjectContent.projectMinNumOfPeople;
        this.minAndMaxNum.max =
          newObj.selectedProjectContent.projectMaxNumOfPeople;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/all.scss";

#project-final-price-line {
  // font-size: 18px;
  #project-final-price {
    font-size: 28px;
    color: darkred;
  }
}
#project-purchase-buttons {
  width: 220px;
  #save-in-cart-btn {
    background-color: #308fb7;
    color: $sail;
  }
  #booking-now-btn {
    background-color: $action-now;
    color: $sail;
  }
}
</style>