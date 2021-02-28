<template>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">第一頁籤。</p>
    <div>
      <date-picker
        v-model="bookingDate"
        valueType="format"
        :lang="lang"
        :disabled-date="checkBookedDate"
      ></date-picker>
    </div>
    <NumberInput ref="numberInput" @emitNumber="saveInCart"></NumberInput>
    <button
      class="btn btn-primary"
      @click.prevent="$refs.numberInput.confirmPurchaseData"
    >
      放入購物車
    </button>
    <button class="btn btn-primary" @click.prevent="bookingNow">
      立即預約
    </button>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import NumberInput from "@/components/pages/sub-components/NumberInput";

export default {
  data() {
    return {
      bookingDate: null,
      bookedDate: ["2021-02-25", "2021-03-01"],
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
          // MMM
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
          // dddd
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
      confirmId: this.projectId,
    };
  },
  props: ["projectId"],
  components: {
    DatePicker,
    NumberInput,
  },
  methods: {
    checkBookedDate(date) {
      let bookedDateArr = this.bookedDate.map((x) =>
        new Date(x).toLocaleDateString()
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
    saveInCart(number) {
      let confirmDate = document.querySelector('input[name="date"]').value;

      if (confirmDate == "") {
        alert("請輸入預約日期！");
      } else {
        let confirmNumOfPeople = number;

        this.confirmProject = {
          bookingProjectID: this.confirmId,
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
      }
    },
    bookingNow() {
      let confirmDate = document.querySelector('input[name="date"]').value;

      this.$refs.numberInput.confirmPurchaseData();
      if (confirmDate != "") this.$router.push({ name: "購物車" });
    },
  },
};
</script>