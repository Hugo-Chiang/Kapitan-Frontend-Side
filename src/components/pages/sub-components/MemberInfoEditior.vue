<template>
  <div class="card-body">
    <h4>基本資料</h4>
    <ValidationObserver v-slot="{ invalid }">
      <!-- 會員編輯區開始 -->
      <div class="row">
        <div class="col-12">
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
        <!-- 操作按鈕開始 -->
        <div class="col-4 ml-auto">
          <div
            class="action-buttons-block mr-4 ml-auto mt-4 px-3 d-flex justify-content-around align-items-center"
          >
            <input
              type="button"
              class="btn btn-primary"
              :class="{ 'invalid-btn': invalid }"
              value="修改完成"
              :disabled="invalid"
              @click.prevent="uploadImgAndUpdateData"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
            />
            <a
              class="d-inline-block"
              href=""
              @click.prevent="$router.push({ name: '管理系統：查詢會員' })"
              >不儲存關閉</a
            >
          </div>
        </div>
        <!-- 操作按鈕結束 -->
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
      editDetails: {
        memberAccount: "",
        memberPassword: "",
        reSetPassword: "",
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