<template>
  <div class="card-body">
    <h4 class="mb-4">基本資料</h4>
    <ValidationObserver v-slot="{ invalid }">
      <!-- 會員編輯區開始 -->
      <!-- 修改密碼開始 -->
      <div class="row">
        <div class="col-12">
          <h5 class="mb-4">
            ▐ 重設密碼
            <span
              id="password-remark-trigger"
              @mouseenter="reSetPassword.showRemark = true"
              @mouseleave="reSetPassword.showRemark = false"
              >［?］</span
            >
            <span
              id="password-remark"
              class="position-absolute"
              v-show="reSetPassword.showRemark"
              >8到16位字符，至少1個大寫字母、1個小寫字母、1個數字。</span
            >
          </h5>
          <div class="form-row">
            <!-- 輸入原密碼開始 -->
            <div class="form-group col-3">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label for="輸入原密碼">輸入原密碼</label>
                <input
                  type="password"
                  class="form-control"
                  :class="[classes]"
                  id="輸入原密碼"
                  placeholder="輸入原密碼"
                  v-model="reSetPassword.originalPassword"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 輸入原密碼結束 -->
          </div>
          <div class="form-row">
            <!-- 輸入新密碼開始 -->
            <div class="form-group col-3">
              <ValidationProvider
                :rules="{
                  required: true,
                  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                }"
                v-slot="{ errors, classes }"
              >
                <label for="輸入新密碼">輸入新密碼</label>
                <input
                  type="password"
                  class="form-control"
                  :class="[classes]"
                  id="輸入新密碼"
                  placeholder="輸入新密碼"
                  v-model="reSetPassword.newPassword"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- 輸入新密碼結束 -->
            <!-- 確認新密碼開始 -->
            <div class="form-froup col-3">
              <ValidationProvider
                :rules="{
                  required: true,
                  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                }"
                v-slot="{ errors, classes }"
              >
                <label for="確認新密碼">確認新密碼</label>
                <input
                  type="password"
                  class="form-control"
                  :class="[
                    classes,
                    { 'is-invalid': reSetPassword.passwordsUnequal },
                  ]"
                  id="確認新密碼"
                  placeholder="請再輸入一次密碼"
                  v-model="reSetPassword.passwordChecked"
                  @blur="comparisePassword"
                />
                <span
                  class="invalid-feedback"
                  :class="
                    reSetPassword.passwordsUnequal ? 'd-inline-block' : 'd-none'
                  "
                  >確認新密碼不相等輸入新密碼</span
                >
                <span
                  class="invalid-feedback"
                  v-show="!reSetPassword.passwordsUnequal"
                  >{{ errors[0] }}</span
                >
              </ValidationProvider>
            </div>
            <!-- 確認新密碼結束 -->
            <!-- 修改密碼操作按鈕開始 -->
            <div class="form-froup col-3">
              <label for="修改密碼">&nbsp;</label>
              <input
                type="button"
                id="修改密碼"
                class="btn btn-primary d-block"
                :class="{ 'invalid-btn': invalid }"
                value="修改密碼"
                :disabled="invalid"
                @click.prevent="uploadImgAndUpdateData"
                data-toggle="modal"
                data-target="#modal"
                data-backdrop="static"
              />
            </div>
            <!-- 修改密碼操作按鈕結束 -->
          </div>
        </div>
      </div>
      <!-- 修改密碼結束 -->
      <hr />
      <div class="row">
        <div class="col-12">
          <h5 class="mt-2 mb-4">▐ 編輯個資</h5>
          <div class="form-row">
            <!-- 會員暱稱開始 -->
            <div class="form-group col-2">
              <label :for="requiredInputTitle.nickName">{{
                requiredInputTitle.nickName
              }}</label>
              <input
                type="text"
                class="form-control"
                :id="requiredInputTitle.nickName"
                v-model="editDetails.nickName"
                :placeholder="'您的' + requiredInputTitle.nickName"
              />
            </div>
            <!-- 會員暱稱結束 -->
            <!-- 會員大頭貼開始 -->
            <div class="form-group col-3">
              <label
                :for="requiredInputTitle.memberAvatarURL"
                class="form-label"
                >{{ requiredInputTitle.memberAvatarURL }}</label
              >
              <div class="custom-file">
                <input
                  :id="requiredInputTitle.memberAvatarURL"
                  class="custom-file-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  @change="handleFileChange($event)"
                />
                <label
                  class="custom-file-label"
                  :for="requiredInputTitle.memberAvatarURL"
                  >{{
                    vueCloudinaryData.filesData.avatar.name || "請選擇檔案"
                  }}</label
                >
              </div>
            </div>
            <!-- 會員大頭貼結束 -->
          </div>
          <div class="form-row">
            <!-- 會員姓名開始 -->
            <div class="form-group col-2">
              <label :for="requiredInputTitle.MCname">{{
                requiredInputTitle.MCname
              }}</label>
              <input
                type="text"
                class="form-control"
                :id="requiredInputTitle.MCname"
                v-model="editDetails.MCname"
                :placeholder="'您的' + requiredInputTitle.MCname"
              />
            </div>
            <!-- 會員姓名結束 -->
            <!-- 會員電話開始 -->
            <div class="form-group col-2">
              <label :for="requiredInputTitle.MCphone">{{
                requiredInputTitle.MCphone
              }}</label>
              <input
                type="text"
                class="form-control"
                :id="requiredInputTitle.MCphone"
                v-model="editDetails.MCphone"
                placeholder="0900000000"
              />
            </div>
            <!-- 會員電話結束 -->
          </div>
          <div class="form-row">
            <!-- 緊急聯絡人姓名開始 -->
            <div class="form-group col-2">
              <label :for="requiredInputTitle.ECname">{{
                requiredInputTitle.ECname
              }}</label>
              <input
                type="text"
                class="form-control"
                :id="requiredInputTitle.ECname"
                v-model="editDetails.ECname"
                placeholder="聯絡人姓名"
              />
            </div>
            <!-- 緊急聯絡人姓名結束 -->
            <!-- 緊急聯絡人電話開始 -->
            <div class="form-group col-2">
              <label :for="requiredInputTitle.ECphone">{{
                requiredInputTitle.ECphone
              }}</label>
              <input
                type="text"
                class="form-control"
                :id="requiredInputTitle.ECphone"
                v-model="editDetails.ECphone"
                placeholder="0900000000"
              />
            </div>
            <!-- 緊急聯絡人電話結束 -->
            <!-- 緊急聯絡人電郵開始 -->
            <div class="form-group col-4">
              <label :for="requiredInputTitle.ECemail">{{
                requiredInputTitle.ECemail
              }}</label>
              <input
                type="text"
                class="form-control"
                :id="requiredInputTitle.ECemail"
                v-model="editDetails.ECemail"
                placeholder="Hello-World@email.com"
              />
            </div>
            <!-- 緊急聯絡人電郵結束 -->
          </div>
        </div>
      </div>
      <div class="row">
        <!-- 修改個資操作按鈕開始 -->
        <div class="form-froup col-4 ml-auto">
          <div
            class="action-buttons-block mr-4 ml-auto mt-4 px-3 d-flex justify-content-around align-items-center"
          >
            <input
              type="button"
              class="btn btn-primary"
              :class="{ 'invalid-btn': invalid }"
              value="修改個資"
              :disabled="invalid"
              @click.prevent="uploadImgAndUpdateData"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
            />
            <a
              class="d-inline-block"
              href=""
              @click.prevent="currentSubPage = ''"
              >不儲存關閉</a
            >
          </div>
        </div>
        <!-- 修改個資操作按鈕結束 -->
      </div>
      <!-- 會員編輯區結束 -->
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requiredInputTitle: {
        memberAccount: "帳號",
        memberPassword: "密碼",
        nickName: "暱稱",
        MCname: "姓名",
        MCphone: "手機",
        memberAvatarURL: "大頭貼",
        ECname: "緊急聯絡人姓名",
        ECphone: "緊急聯絡人手機",
        ECemail: "緊急聯絡人電郵",
      },
      reSetPassword: {
        originalPassword: "",
        newPassword: "",
        passwordChecked: "",
        showRemark: false,
        passwordsUnequal: false,
      },
      editDetails: {
        memberAccount: "",
        nickName: "",
        MCname: "",
        MCphone: "",
        memberAvatarURL: "",
        ECname: "",
        ECphone: "",
        ECemail: "",
      },
      // cloudinary-vue 雲端圖庫元件的配置或應用資料
      vueCloudinaryData: {
        filesData: {
          avatar: "",
        },
        uploadStatus: "",
      },
    };
  },
  props: ["memberInfo"],
  created() {
    this.initializeEditor();
  },
  methods: {
    // 方法：
    initializeEditor() {
      this.editDetails.memberAccount = this.memberInfo["MEMBER_ACCOUNT"];
      this.editDetails.nickName = this.memberInfo["MEMBER_NICKNAME"];
      this.editDetails.MCname = this.memberInfo["MEMBER_NAME"];
      this.editDetails.MCphone = this.memberInfo["MEMBER_PHONE"];
      this.editDetails.memberAvatarURL = this.memberInfo["MEMBER_AVATAR_URL"];
      this.editDetails.ECname = this.memberInfo["MEMBER_EC_NAME"];
      this.editDetails.ECphone = this.memberInfo["MEMBER_EC_PHONE"];
      this.editDetails.ECemail = this.memberInfo["MEMBER_EC_EMAIL"];
    },
    // 方法：紀錄觀察上傳檔案的內容
    handleFileChange: function (e) {
      this.vueCloudinaryData.filesData.avatar = e.target.files[0];
      console.log("上傳檔案更換：", this.vueCloudinaryData.filesData.avatar);
    },
    // 方法：透過 axios 將圖檔上傳至指定的 Cloudinary 位置（並旋即啟動更新資料庫的方法）
    uploadImgAndUpdateData() {
      this.$eventBus.$emit("emitModalData", this.modalData);
      this.modalData.situation.buttonType = "checked";

      const cloudinaryUploadAPI = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`;
      const vm = this;

      // 判定是否有選擇圖檔，決定是否要執行上傳雲端的動作（抑或是跳至下一步）
      let avatarFile = this.vueCloudinaryData.filesData.avatar;

      if (avatarFile == "" && !avatarFile.name) {
        this.updateMemberInfo();
      } else {
        let fileReader = new FileReader();

        fileReader.addEventListener(
          "load",
          function () {
            let formData = new FormData();
            formData.append(
              "upload_preset",
              vm.GlobalVariables.membersAvatarPreset
            );
            formData.append("file", fileReader.result);

            let requestObj = {
              url: cloudinaryUploadAPI,
              method: "POST",
              data: formData,
              onUploadProgress: function (progressEvent) {
                vm.modalData.situation.message = `<p>開始處理上傳事件<p>`;
                vm.progress = Math.round(
                  (progressEvent.loaded * 100.0) / progressEvent.total
                );
                vm.modalData.situation.message = `<p>上傳進度：${vm.progress}％`;
              },
            };

            axios(requestObj)
              .then((response) => {
                console.log(response.data);
                vm.modalData.situation.event = "會員大頭貼上傳成功。";
                vm.modalData.situation.message = `<p>會員大頭貼上傳成功！</p>`;
                vm.editDetails.memberAvatarURL = response.data.public_id;
                vm.updateMemberInfo();
              })
              .catch((error) => {
                console.log(error);
                vm.modalData.situation.event = "會員大頭貼上傳失敗。";
                vm.modalData.situation.message = `會員大頭貼上傳失敗！請稍後再試。`;
              });
          },
          false
        );

        console.log(avatarFile);

        fileReader.readAsDataURL(avatarFile);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>