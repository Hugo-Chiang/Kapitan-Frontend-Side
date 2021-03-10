<template>
  <section id="checkoutStep02" class="card mb-5">
    <div class="card-header">
      <h5>
        <!-- 標題處藏有供演示用的自動填入信用卡資料方法 -->
        第二步：<span @click="autofilledCreditCardData">填寫</span>訂購資訊
      </h5>
      <div class="form-check form-check-inline">
        <!-- 訂購人資訊同步會員資訊 checkbox 開始 -->
        <input
          class="form-check-input"
          type="checkbox"
          id="inlineCheckbox1"
          value="option1"
          v-model="syncMemberContactInfo"
        />
        <label class="form-check-label" for="inlineCheckbox1"
          >同登入會員資訊</label
        >
        <!-- 訂購人資訊同步會員資訊 checkbox 結束 -->
      </div>
    </div>
    <div class="card-body">
      <!-- 填寫訂購人資訊開始 -->
      <div class="form-row ordererContactInfoInputBlock">
        <div class="form-group col-md-2">
          <ValidationProvider
            :rules="{ required: true }"
            v-slot="{ errors, classes }"
          >
            <label for="inputMainName">訂購人姓名</label>
            <input
              type="text"
              id="inputMainName"
              name="訂購人姓名"
              class="form-control"
              :class="classes"
              placeholder="訂購人姓名"
              v-model="inputOrdererInfo.MCname"
              @blur="$eventBus.$emit('emitInputOrdererInfo', inputOrdererInfo)"
              @keyup="syncMemberContactInfo = false"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-2">
          <ValidationProvider
            :rules="{ required: true, length: 10, regex: /^09\d{8}$/ }"
            v-slot="{ errors, classes }"
          >
            <label for="inputMainPhoneNumber">訂購人手機號碼</label>
            <input
              type="text"
              maxlength="10"
              id="inputMainPhoneNumber"
              name="訂購人手機號碼"
              class="form-control"
              :class="classes"
              placeholder="例：0933128872"
              v-model="inputOrdererInfo.MCphone"
              @blur="$eventBus.$emit('emitInputOrdererInfo', inputOrdererInfo)"
              @keyup="syncMemberContactInfo = false"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-4">
          <ValidationProvider
            :rules="{ required: true, email: true }"
            v-slot="{ errors, classes }"
          >
            <label for="inputMainEmail">訂購人電子信箱</label>
            <input
              type="email"
              class="form-control"
              :class="classes"
              id="inputMainEmail"
              name="訂購人電子信箱"
              placeholder="例：Hello-World@email.com"
              v-model="inputOrdererInfo.MCemail"
              @blur="$eventBus.$emit('emitInputOrdererInfo', inputOrdererInfo)"
              @keyup="syncMemberContactInfo = false"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <div class="form-row ordererContactInfoInputBlock">
        <div class="form-group col-md-2">
          <ValidationProvider
            :rules="{ required: true }"
            v-slot="{ errors, classes }"
          >
            <label for="inputSubName">{{ requiredInputTitle.ECname }}</label>
            <input
              type="text"
              id="inputSubName"
              :name="requiredInputTitle.ECname"
              class="form-control"
              :class="classes"
              :placeholder="requiredInputTitle.ECname"
              v-model="inputOrdererInfo.ECname"
              @blur="$eventBus.$emit('emitInputOrdererInfo', inputOrdererInfo)"
              @keyup="syncMemberContactInfo = false"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-2">
          <ValidationProvider
            :rules="{ required: true, length: 10, regex: /^09\d{8}$/ }"
            v-slot="{ errors, classes }"
          >
            <label for="inputSubPhoneNumber">{{
              requiredInputTitle.ECphone
            }}</label>
            <input
              type="text"
              maxlength="10"
              id="inputSubPhoneNumber"
              :name="requiredInputTitle.ECphone"
              class="form-control"
              :class="classes"
              placeholder="例：0933128872"
              v-model="inputOrdererInfo.ECphone"
              @blur="$eventBus.$emit('emitInputOrdererInfo', inputOrdererInfo)"
              @keyup="syncMemberContactInfo = false"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-4">
          <ValidationProvider
            :rules="{ required: true, email: true }"
            v-slot="{ errors, classes }"
          >
            <label for="inputSubEmail">{{ requiredInputTitle.ECemail }}</label>
            <input
              type="email"
              class="form-control"
              :class="classes"
              id="inputSubEmail"
              :name="requiredInputTitle.ECemail"
              placeholder="例：Hello-World@email.com"
              v-model="inputOrdererInfo.ECemail"
              @blur="$eventBus.$emit('emitInputOrdererInfo', inputOrdererInfo)"
              @keyup="syncMemberContactInfo = false"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <!-- 填寫訂購人資訊結束 -->
      <hr />
      <!-- 填寫信用卡資料開始 -->
      <div class="form-row">
        <div class="form-group col-md-2">
          <ValidationProvider
            :rules="{ required: true }"
            v-slot="{ errors, classes }"
          >
            <label for="inputCardName">持卡人姓名</label>
            <input
              type="text"
              id="inputCardName"
              name="持卡人姓名"
              class="form-control"
              :class="classes"
              placeholder="持卡人姓名"
              v-model="creditCardData.name"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-4">
          <ValidationProvider
            :rules="{ required: true }"
            v-slot="{ errors, classes }"
          >
            <label for="inputCardNumber">信用卡卡號</label>
            <input
              type="text"
              maxlength="19"
              id="inputCardNumber"
              name="信用卡卡號"
              class="form-control"
              :class="classes"
              placeholder="0000 0000 0000 0000"
              v-model="creditCardData.number"
              @input="formatCreditCardNum"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-2">
          <ValidationProvider
            :rules="{
              required: true,
            }"
            v-slot="{ errors, classes }"
          >
            <label for="inputCardNumber">有效期</label>
            <input
              type="text"
              id="inputCardNumber"
              name="有效期"
              class="form-control"
              :class="classes"
              placeholder="例：08/2025"
              v-model="creditCardData.date"
              @input="formatCreditCardExpDate"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-2">
          <ValidationProvider
            :rules="{ required: true, length: 3, regex: /\d{3}$/ }"
            v-slot="{ errors, classes }"
          >
            <label for="inputCardCVV">安全碼（CVV）</label>
            <input
              type="text"
              id="inputCardCVV"
              name="安全碼（CVV）"
              class="form-control"
              :class="classes"
              placeholder="卡片背面三碼"
              v-model="creditCardData.cvv"
              maxlength="3"
              @input="formatCreditCardCVV"
            />
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <!-- 填寫信用卡資料結束 -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      syncMemberInfo: {},
      syncMemberContactInfo: false,
      inputOrdererInfo: {},
      creditCardData: {
        name: "",
        number: "",
        date: "",
        cvv: "",
      },
    };
  },
  props: ["confirmProjectsArr", "requiredInputTitle"],
  created() {
    this.queryMemberContactInfo();
  },
  methods: {
    // 方法：向後端詢問登入會員的連絡資訊，以利其同步稍後填寫
    queryMemberContactInfo() {
      const api = `${process.env.LOCAL_HOST_PATH}/API/Forestage/QueryMemberContactInfo.php`;
      const vm = this;

      this.$http
        .get(api)
        .then((response) => {
          let memberContactInfo = response.data[0];

          vm.syncMemberInfo = {
            MCname: memberContactInfo.MEMBER_NAME || "",
            MCphone: memberContactInfo.MEMBER_PHONE || "",
            MCemail: memberContactInfo.MEMBER_ACCOUNT,
            ECname: memberContactInfo.MEMBER_EC_NAME || "",
            ECphone: memberContactInfo.MEMBER_EC_PHONE || "",
            ECemail: memberContactInfo.MEMBER_EC_EMAIL || "",
          };
        })
        .catch((response) => {
          console.log("伺服器異常，請稍後再試。造成您的不便，敬請見諒！");
          console.log(response);
        });
    },
    // 方法：（演示用）自動填入信用卡資訊
    autofilledCreditCardData() {
      this.creditCardData = {
        name: "測試者",
        number: "1234 2234 3234 4234",
        date: "04/2028",
        cvv: "168",
      };
    },
    // 方法：使信用卡卡號格式標準化，每 4 碼以空格區間彼此
    formatCreditCardNum() {
      let removeSpaceAndChar = this.creditCardData.number
        .replace(/\s+/g, "")
        .replace(/[^0-9]/gi, "");
      let limitLength = removeSpaceAndChar.match(/\d{4,16}/g);
      let fourToSixteenNumbers = (limitLength && limitLength[0]) || "";
      let creditCardNumArr = [];

      for (let i = 0; i < fourToSixteenNumbers.length; i += 4) {
        creditCardNumArr.push(fourToSixteenNumbers.substring(i, i + 4));
      }

      if (creditCardNumArr.length > 0) {
        this.creditCardData.number = creditCardNumArr.join(" ");
      } else {
        this.creditCardData.number = removeSpaceAndChar;
      }
    },
    // 方法：使信用卡有效期格式標準化，採 MM／YY 呈現
    formatCreditCardExpDate() {
      let removeSpaceAndChar = this.creditCardData.date
        .replace(/\s+/g, "")
        .replace(/[^0-9]/gi, "");
      let limitLength = removeSpaceAndChar.match(/\d{2,6}/g);
      console.log(limitLength);
      let twoToSixNumbers = (limitLength && limitLength[0]) || "";
      let creditCardExpDateArr = [];

      creditCardExpDateArr.push(twoToSixNumbers.substring(0, 2));
      creditCardExpDateArr.push(twoToSixNumbers.substring(2));

      console.log(creditCardExpDateArr);

      if (creditCardExpDateArr.length > 0) {
        if (creditCardExpDateArr[0] != "" && creditCardExpDateArr[1] != "") {
          this.creditCardData.date = creditCardExpDateArr.join("/");
        }
      } else {
        this.creditCardData.date = removeSpaceAndChar;
        console.log(this.creditCardData.date);
      }
    },
    // 方法：限制信用卡安全碼輸入的內容，需趨向 3 個整數
    formatCreditCardCVV() {
      this.creditCardData.cvv = this.creditCardData.cvv
        .replace(/\s+/g, "")
        .replace(/[^0-9]/gi, "");
    },
  },
  watch: {
    // 監看（方法）：確認同步會員資訊時，複製會員資訊予「第二步：填寫訂購資訊」的輸入欄
    syncMemberContactInfo(watchingBoolean) {
      if (watchingBoolean) {
        this.inputOrdererInfo = { ...this.syncMemberInfo };
      } else {
        // 增進使用者體驗：取消同步會員資訊時，欄位內容完全沒有更改過才會清除
        let inputOrdererInfoStr = JSON.stringify(this.inputOrdererInfo);
        let syncMemberInfoStr = JSON.stringify(this.syncMemberInfo);
        if (inputOrdererInfoStr == syncMemberInfoStr)
          this.$set(this, "inputOrdererInfo", {
            MCname: "",
            MCphone: "",
            MCemail: "",
            ECname: "",
            ECphone: "",
            ECemail: "",
          });
      }

      // 模擬 blur 事件以觸發表單驗證
      let ordererContactInfoInputBlocks = document.querySelectorAll(
        ".ordererContactInfoInputBlock"
      );
      let inputsArr = [];

      ordererContactInfoInputBlocks.forEach((block) =>
        block
          .querySelectorAll("input")
          .forEach((input) => inputsArr.push(input))
      );
      inputsArr.forEach((input) => input.dispatchEvent(new Event("blur")));
    },
  },
};
</script>