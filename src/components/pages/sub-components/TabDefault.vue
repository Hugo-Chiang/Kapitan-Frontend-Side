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
    <router-link class="btn btn-primary" to="/Cart">放入購物車</router-link>
    <router-link class="btn btn-primary" to="/Cart">立即預約</router-link>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";

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
    };
  },
  components: {
    DatePicker: DatePicker,
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
  },
};
</script>