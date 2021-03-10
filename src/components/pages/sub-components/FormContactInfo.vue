<template>
  <section id="checkoutStep03" class="card">
    <div class="card-header">
      <h5>第三步：填寫聯絡資訊</h5>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="inlineCheckbox2"
          value="option1"
          v-model="syncOrdererContactInfoAll"
        />
        <label class="form-check-label" for="inlineCheckbox2"
          >同訂購人資訊（全部）</label
        >
      </div>
    </div>
    <div class="card-body">
      <div
        class="projectBlockInCheckOutStep03"
        v-for="(project, index) in confirmProjectsArr"
        :data-id="project.bookingProjectID + '-' + project.bookingProjectDate"
        :key="index"
      >
        <span class="id">{{ project.bookingProjectID }}</span
        >, <span class="date">{{ project.bookingProjectDate }}</span
        >,<span class="people2">{{ project.bookingProjectNumOfPeople }}</span>

        <div class="col">
          <input
            class="form-check-input checkboxForProject"
            type="checkbox"
            :id="'inlineCheckbox' + (index + 3)"
            :key="'inlineCheckbox' + (index + 3)"
            v-model="syncOrdererContactInfoArr[index]"
            value="option1"
            @change="simulateBlurEvt(index)"
          />
          <label class="form-check-label" :for="'inlineCheckbox' + (index + 3)"
            >同訂購資訊（個案）</label
          >
        </div>

        <div
          class="form-row contactInfoInputBlock"
          :id="'contactInfoInputBlock' + index"
        >
          <div class="form-group col-md-2">
            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="'inputMainName' + (index + 1)">{{
                requiredInputTitle.MCname
              }}</label>
              <input
                type="text"
                :id="'inputMainName' + (index + 1)"
                :name="requiredInputTitle.MCname"
                :key="'inputMainName' + (index + 1)"
                class="form-control"
                :class="classes"
                :placeholder="requiredInputTitle.MCname"
                v-model="inputContantInfoArr[index].MCname"
                @keyup="unsyncOrdererContactInfo(index)"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-md-2">
            <ValidationProvider
              :rules="{ required: true, regex: /^09\d{8}$/ }"
              v-slot="{ errors, classes }"
            >
              <label :for="'inputMainPhoneNumber' + (index + 1)">{{
                requiredInputTitle.MCphone
              }}</label>
              <input
                type="text"
                maxlength="10"
                :id="'inputMainPhoneNumber' + (index + 1)"
                :name="requiredInputTitle.MCphone"
                :key="'inputMainPhoneNumber' + (index + 1)"
                class="form-control"
                :class="classes"
                placeholder="例：0933128872"
                v-model="inputContantInfoArr[index].MCphone"
                @keyup="unsyncOrdererContactInfo(index)"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-md-4">
            <ValidationProvider
              :rules="{ required: true, email: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="'inputMainEmail' + (index + 1)">{{
                requiredInputTitle.MCemail
              }}</label>
              <input
                type="email"
                class="form-control"
                :class="classes"
                :id="'inputMainEmail' + (index + 1)"
                :name="requiredInputTitle.ECemeal"
                :key="'inputMainEmail' + (index + 1)"
                placeholder="例：Hello-World@email.com"
                v-model="inputContantInfoArr[index].MCemail"
                @keyup="unsyncOrdererContactInfo(index)"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div
          class="form-row contactInfoInputBlock"
          :id="'contactInfoInputBlock' + (index + 1)"
        >
          <div class="form-group col-md-2">
            <ValidationProvider
              :rules="{ required: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="'inputSubName' + (index + 2)">{{
                requiredInputTitle.ECname
              }}</label>
              <input
                type="text"
                :id="'inputSubName' + (index + 2)"
                :name="requiredInputTitle.ECname"
                :key="'inputSubName' + (index + 2)"
                class="form-control"
                :class="classes"
                :placeholder="requiredInputTitle.ECname"
                v-model="inputContantInfoArr[index].ECname"
                @keyup="unsyncOrdererContactInfo(index)"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-md-2">
            <ValidationProvider
              :rules="{ required: true, regex: /^09\d{8}$/ }"
              v-slot="{ errors, classes }"
            >
              <label :for="'inputSubPhoneNumber' + (index + 2)">{{
                requiredInputTitle.ECphone
              }}</label>
              <input
                type="text"
                maxlength="10"
                :id="'inputSubPhoneNumber' + (index + 2)"
                :name="requiredInputTitle.ECphone"
                :key="'inputSubPhoneNumber' + (index + 2)"
                class="form-control"
                :class="classes"
                placeholder="例：0933128872"
                v-model="inputContantInfoArr[index].ECphone"
                @keyup="unsyncOrdererContactInfo(index)"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-md-4">
            <ValidationProvider
              :rules="{ required: true, email: true }"
              v-slot="{ errors, classes }"
            >
              <label :for="'inputSubEmail' + (index + 2)">{{
                requiredInputTitle.ECemail
              }}</label>
              <input
                type="email"
                class="form-control"
                :class="classes"
                :id="'inputSubEmail' + (index + 2)"
                :name="requiredInputTitle.ECemail"
                :key="'inputSubEmail' + (index + 2)"
                placeholder="例：Hello-World@email.com"
                v-model="inputContantInfoArr[index].ECemail"
                @keyup="unsyncOrdererContactInfo(index)"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <hr v-if="index < confirmProjectsArr.length - 1" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      inputOrdererInfo: {
        MCname: "",
        MCphone: "",
        MCemail: "",
        ECname: "",
        ECphone: "",
        ECemail: "",
      },
      syncOrdererContactInfoAll: false,
      syncOrdererContactInfoArr: [],
      inputContantInfoArr: [],
    };
  },
  props: ["confirmProjectsArr", "requiredInputTitle"],
  created() {
    this.establishSyncOrdererContactInfoArr();
    this.$eventBus.$on("emitInputOrdererInfo", (infoObj) => {
      this.inputOrdererInfo = infoObj;
    });
  },
  methods: {
    // 方法：建立「第三步：填寫聯絡資訊」同步訂購資訊用的工具陣列
    establishSyncOrdererContactInfoArr() {
      let projectsNum = JSON.parse(localStorage.getItem("savingProjects"))
        .length;

      for (let i = 0; i < projectsNum; i++) {
        this.$set(this.syncOrdererContactInfoArr, i, false);
        this.$set(this.inputContantInfoArr, i, {
          MCname: "",
          MCphone: "",
          MCemail: "",
          ECname: "",
          ECphone: "",
          ECemail: "",
        });
      }
    },
    // 方法：解除任一同步訂購資訊的 chexbox 時，同時解除「全部同步訂購資訊」的 chexbox
    unsyncOrdererContactInfo(index) {
      this.syncOrdererContactInfoArr[index] = false;
      this.syncOrdererContactInfoAll = false;
    },
    // 方法：個別方案模擬 blur 事件以觸發表單驗證
    simulateBlurEvt(index) {
      let targetProject = document.querySelectorAll(
        ".projectBlockInCheckOutStep03"
      )[index];
      console.log(targetProject);
      let targetInputs = targetProject.querySelectorAll("input");

      targetInputs.forEach((input) => input.dispatchEvent(new Event("blur")));
    },
    // 方法：透過參數 emit 結帳所需資料予父層結帳方法
    emitCheckOutData() {
      this.$emit(
        "getCheckOutData",
        this.inputOrdererInfo,
        this.inputContantInfoArr
      );
    },
  },
  watch: {
    // 監看（方法）：選擇全部同步訂購資訊與否，將決定個別同步訂購資訊的 checkbox 勾選與否
    syncOrdererContactInfoAll(watchingBoolean) {
      const vm = this;
      let ifAllSelected = this.syncOrdererContactInfoArr.every(
        (boolean) => boolean == true
      );

      if (watchingBoolean && !ifAllSelected) {
        this.syncOrdererContactInfoArr = this.syncOrdererContactInfoArr.map(
          (boolean) => true
        );
      } else if (!watchingBoolean && ifAllSelected) {
        this.syncOrdererContactInfoArr = this.syncOrdererContactInfoArr.map(
          (boolean) => false
        );
      }

      // 模擬 blur 事件以觸發表單驗證
      let Projects = document.querySelectorAll(".projectBlockInCheckOutStep03");
      Projects.forEach((project, index) => vm.simulateBlurEvt(index));
    },
    // 監看（方法）：確認同步訂購資訊時，複製訂購資訊予「第三步：填寫聯絡資訊」的個別輸入欄
    syncOrdererContactInfoArr(watchingArr) {
      const vm = this;

      watchingArr.forEach(function (boolean, index) {
        if (boolean) {
          vm.$set(vm.inputContantInfoArr, index, {
            ...vm.inputOrdererInfo,
          });
        } else {
          // 增進使用者體驗：取消同步訂購資訊時，欄位內容完全沒有更改過才會清除
          let inputContactInfoStr = JSON.stringify(
            vm.inputContantInfoArr[index]
          );
          let inputOrdererInfoStr = JSON.stringify(vm.inputOrdererInfo);

          if (inputContactInfoStr == inputOrdererInfoStr) {
            vm.$set(vm.inputContantInfoArr, index, {
              MCname: "",
              MCphone: "",
              MCemail: "",
              ECname: "",
              ECphone: "",
              ECemail: "",
            });
          }
        }
      });
    },
  },
};
</script>