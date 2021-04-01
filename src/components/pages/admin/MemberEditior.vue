<template>
  <section id="member-editior-page" class="position-relative">
    <!-- 麵包屑元件開始 -->
    <Breadcrumb
      v-if="!inCreatingMode"
      :breadCrumbData="breadCrumbData"
    ></Breadcrumb>
    <!-- 麵包屑元件結束 -->
    <h6 class="mt-2 mb-4 mr-4 d-inline-block">
      正在<span v-if="inCreatingMode">新增</span><span v-else>編輯</span>：{{
        managingMember
      }}
      號會員
      <span v-if="!inCreatingMode" class="delete-project-btn ml-1">
        <a
          href=""
          @click.prevent="deleteMember"
          data-toggle="modal"
          data-target="#modal"
          data-backdrop="static"
          >刪除會員</a
        >
      </span>
    </h6>
    <ValidationObserver v-slot="{ invalid }">
      <!-- 會員編輯區開始 -->
      <div class="row">
        <div class="col-8">
          <div class="form-row">
            <!-- 會員狀態開始 -->
            <div class="form-group col-2">
              <label :for="requiredInputTitle.memberStatus">{{
                requiredInputTitle.memberStatus
              }}</label>
              <select
                :id="requiredInputTitle.memberStatus"
                class="form-control form-select-lg"
                v-model="editDetails.memberStatus"
              >
                <option value="1">正常</option>
                <option value="2">警告</option>
                <option value="0">停權</option>
              </select>
            </div>
            <!-- 會員狀態結束 -->
            <!-- 註冊日期開始 -->
            <div class="form-group col-6">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.memberRegDate">{{
                  requiredInputTitle.memberRegDate
                }}</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.memberRegDate"
                  v-model="editDetails.memberRegDate"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 註冊日期結束 -->
          </div>
          <div class="form-row">
            <!-- 會員帳號開始 -->
            <div class="form-group col-5">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.memberAccount">{{
                  requiredInputTitle.memberAccount
                }}</label>
                <input
                  type="email"
                  class="form-control"
                  :class="[classes, { 'is-invalid': repeatRegister }]"
                  :id="requiredInputTitle.memberAccount"
                  v-model="editDetails.memberAccount"
                  placeholder="Hello-World@email.com"
                  @blur="queryMemberAccount"
                />
                <span
                  class="invalid-feedback"
                  :class="repeatRegister ? 'd-inline-block' : 'd-none'"
                  >此帳號已註冊過</span
                >
                <span class="invalid-feedback" v-show="!repeatRegister">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 會員帳號結束 -->
            <!-- 會員密碼開始 -->
            <div class="form-group col-5">
              <ValidationProvider
                :rules="{
                  required: inCreatingMode ? true : false,
                  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                }"
                v-slot="{ errors, classes }"
              >
                <label
                  :for="
                    inCreatingMode
                      ? requiredInputTitle.memberPassword
                      : requiredInputTitle.reSetPassword
                  "
                  >{{
                    inCreatingMode
                      ? requiredInputTitle.memberPassword
                      : requiredInputTitle.reSetPassword
                  }}</label
                ><span
                  id="password-remark-trigger"
                  @mouseenter="showRemark = true"
                  @mouseleave="showRemark = false"
                  >［?］</span
                ><span
                  id="password-remark"
                  class="position-absolute"
                  v-show="showRemark"
                  >8到16位字符，至少1個大寫字母、1個小寫字母、1個數字。</span
                >
                <input
                  v-if="inCreatingMode"
                  type="password"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.memberPassword"
                  placeholder="問號處可得格式提示"
                  v-model="editDetails.memberPassword"
                />
                <input
                  v-else
                  type="password"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.reSetPassword"
                  placeholder="問號處可得格式提示"
                  v-model="editDetails.reSetPassword"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <!-- 會員密碼結束 -->
          </div>
          <div class="form-row">
            <!-- 會員姓名開始 -->
            <div class="form-group col-4">
              <label :for="requiredInputTitle.MCname">{{
                requiredInputTitle.MCname
              }}</label>
              <input
                type="text"
                class="form-control"
                :id="requiredInputTitle.MCname"
                v-model="editDetails.MCname"
                :placeholder="requiredInputTitle.MCname"
              />
            </div>
            <!-- 會員姓名結束 -->
            <!-- 會員電話開始 -->
            <div class="form-group col-3">
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
            <!-- 會員大頭貼開始 -->
            <div class="form-group col-5">
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
            <!-- 緊急聯絡人姓名開始 -->
            <div class="form-group col-4">
              <label :for="requiredInputTitle.ECname">{{
                requiredInputTitle.ECname
              }}</label>
              <input
                type="text"
                class="form-control"
                :id="requiredInputTitle.ECname"
                v-model="editDetails.ECname"
                :placeholder="requiredInputTitle.ECname"
              />
            </div>
            <!-- 緊急聯絡人姓名結束 -->
            <!-- 緊急聯絡人電話開始 -->
            <div class="form-group col-3">
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
            <div class="form-group col-5">
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
        <div
          v-if="!inCreatingMode"
          id="member-avatar-area"
          class="col-4 position-relative d-flex flex-column align-items-center"
        >
          <h5>會員大頭貼</h5>
          <div
            class="avatar-preview-block my-2 d-flex justify-content-center align-items-center"
            @click="triggerFileInput"
          >
            <div class="d-flex justify-content-center align-items-center">
              <img
                :src="
                  editDetails.memberAvatarURL == null
                    ? GlobalVariables.cloudUrlprefix +
                      GlobalVariables.cloudNoAvatarUrl
                    : GlobalVariables.cloudUrlprefix +
                      editDetails.memberAvatarURL
                "
                alt=""
              />
            </div>
          </div>
          <!-- <h6>重點紀錄</h6>
          <div class="records"></div> -->
        </div>
      </div>
      <div class="row">
        <!-- 操作按鈕開始 -->
        <div class="col-4 ml-auto">
          <div
            class="action-buttons-block mr-4 ml-auto mt-4 px-4 d-flex justify-content-around align-items-center"
          >
            <input
              type="button"
              class="btn btn-primary"
              :class="{ 'invalid-btn': invalid }"
              :value="inCreatingMode ? '新增完成' : '修改完成'"
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
  </section>
</template>

<script>
// 導入麵包屑元件
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
// 導入 axios 元件
import axios from "axios";

export default {
  data() {
    return {
      inCreatingMode: null,
      managingMember: "",
      repeatRegister: false,
      showRemark: false,
      breadCrumbData: {
        pagesArr: ["管理系統：查詢會員", "管理系統：編輯會員"],
        currentPage: 2,
      },
      modalData: {
        callBy: null,
        situation: {
          event: "",
          message: "",
          buttonType: "checked",
          data: {},
        },
        emitValue: null,
        // 反應（方法）：根據不同情境做出應對
        correspond() {
          // 遭遇失敗情境將導回管理頁
          if (this.situation.event.indexOf("失敗") != -1) {
            setTimeout(
              () => this.callBy.$router.push({ name: "管理系統：會員管理" }),
              1000
            );
          }

          // 刪除會員詢問經確認後進行刪除，成敗與否都將倒回管理頁
          if (this.situation.event.indexOf("刪除會員") != -1) {
            const deleteMemberAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/DeleteMember.php`;
            const session = this.callBy.GlobalFunctions.getKapitanSession(
              "backstage"
            );

            let sendingObj = {
              session: session,
              memberID: this.callBy.managingMember,
            };

            if (this.emitValue == 1) {
              this.situation.buttonType = "checked";

              this.callBy.$http
                .post(deleteMemberAPI, JSON.stringify(sendingObj))
                .then((response) => {
                  this.situation.event = "刪除會員成功";
                  this.situation.message = response.data;
                })
                .catch((error) => {
                  this.situation.event = "刪除會員失敗";
                  this.situation.message = error.data;
                });
            } else if (this.emitValue == "checked") {
              setTimeout(
                () =>
                  this.callBy.$router.push({
                    name: "管理系統：會員管理",
                  }),
                1500
              );
            }
          }

          // 執行資料庫寫入後，成敗與否都將初始化編輯器和提示訊息
          if (this.situation.event.indexOf("資料庫寫入") != -1) {
            this.callBy.initializeEditor();
            this.situation.event = "";
            this.situation.message = "";
          }
        },
      },
      requiredInputTitle: {
        memberRegDate: "註冊日期",
        memberStatus: "會員狀態",
        memberAccount: "會員帳號",
        memberPassword: "會員密碼",
        reSetPassword: "重設會員密碼",
        MCname: "會員姓名",
        MCphone: "會員手機",
        memberAvatarURL: "會員大頭貼",
        ECname: "緊急聯絡人姓名",
        ECphone: "緊急聯絡人手機",
        ECemail: "緊急聯絡人電郵",
      },
      editDetails: {
        memberRegDate: "",
        memberStatus: "",
        memberAccount: "",
        memberPassword: "",
        reSetPassword: "",
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
  created() {
    this.modalData.callBy = this;
    this.$eventBus.$on("emitModalValue", (value) => {
      this.modalData.emitValue = value;
    });
    this.initializeEditor();
  },
  props: ["currentManager", "currentPath"],
  components: { Breadcrumb },
  methods: {
    // 方法：初始化編輯器內容，以便呈現新增或編輯模式的差異功能
    initializeEditor() {
      if (this.currentPath.indexOf("Member-Creation") == -1)
        this.inCreatingMode = false;
      else this.inCreatingMode = true;

      const queryCreatingIDAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryCreatingID.php`;
      const queryMemberInfoAPI = `${process.env.REMOTE_HOST_PATH}/API/Universal/QueryMemberInfo.php`;
      const vm = this;

      vm.editDetails.memberStatus = 1;
      vm.editDetails.memberRegDate = new Date().Format("yyyy-MM-ddThh:mm");
      vm.editDetails.memberAccount = "";
      vm.editDetails.memberPassword = "";
      vm.editDetails.reSetPassword = "";
      vm.editDetails.MCname = "";
      vm.editDetails.MCphone = "";
      vm.editDetails.memberAvatarURL = "";
      vm.editDetails.ECname = "";
      vm.editDetails.ECphone = "";
      vm.editDetails.ECemail = "";

      if (this.inCreatingMode) {
        this.$http
          .post(queryCreatingIDAPI, this.currentManager)
          .then((response) => {
            console.log(response);
            vm.managingMember = response.data;
            localStorage.setItem("managingMember", vm.managingMember);
          });
      } else {
        vm.managingMember = localStorage.getItem("managingMember");

        this.$http
          .post(queryMemberInfoAPI, vm.managingMember)
          .then((response) => {
            vm.editDetails.memberStatus = response.data["MEMBER_STATUS"];
            vm.editDetails.memberRegDate = new Date(
              response.data["MEMBER_REGISTERED_DATE"]
            ).Format("yyyy-MM-ddThh:mm");
            vm.editDetails.memberAccount = response.data["MEMBER_ACCOUNT"];
            vm.editDetails.memberPassword = response.data["MEMBER_PASSWORD"];
            vm.editDetails.MCname = response.data["MEMBER_NAME"];
            vm.editDetails.MCphone = response.data["MEMBER_PHONE"];
            vm.editDetails.memberAvatarURL = response.data["MEMBER_AVATAR_URL"];
            vm.editDetails.ECname = response.data["MEMBER_EC_NAME"];
            vm.editDetails.ECphone = response.data["MEMBER_EC_PHONE"];
            vm.editDetails.ECemail = response.data["MEMBER_EC_EMAIL"];
          })
          .catch((respponse) => {
            console.log(respponse);
          });
      }
    },
    // 方法：根據會員帳號向後端詢問會員資訊
    queryMemberAccount() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryMemberAccount.php`;
      const vm = this;
      let memberAccount = vm.editDetails.memberAccount;
      vm.repeatRegister = false;

      this.$http
        .post(api, memberAccount)
        .then((response) => {
          console.log(response.data);
          let responseAccount = response.data["MEMBER_ACCOUNT"];
          let responseID = response.data["MEMBER_ID"];
          console.log(responseID);

          if (this.inCreatingMode) {
            if (memberAccount == responseAccount) vm.repeatRegister = true;
          } else {
            if (
              memberAccount == responseAccount &&
              vm.managingMember != responseID
            )
              vm.repeatRegister = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 方法：觸發大頭貼 input
    triggerFileInput() {
      let fileInput = document.querySelectorAll(".custom-file-input")[0];
      fileInput.click();
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
    // 方法：新增或更新會員資訊的複合函式
    updateMemberInfo() {
      this.$eventBus.$emit("emitModalData", this.modalData);

      const createNewMemberAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/InsertNewMember.php`;
      const updateMemberInfoAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/UpdateMemberInfo.php`;
      const vm = this;
      const session = vm.GlobalFunctions.getKapitanSession("backstage");

      let api = "";

      if (this.inCreatingMode) {
        api = createNewMemberAPI;
      } else {
        api = updateMemberInfoAPI;
        if (vm.editDetails.reSetPassword != "") {
          vm.editDetails.memberPassword = vm.editDetails.reSetPassword;
        }
      }

      let sendingObj = {
        session: session,
        memberID: vm.managingMember,
        editedDetails: vm.editDetails,
      };

      this.$http
        .post(api, JSON.stringify(sendingObj))
        .then((response) => {
          vm.modalData.situation.event = "資料庫寫入成功。";
          vm.modalData.situation.message += response.data;
          this.vueCloudinaryData.filesData.avatar = "";
        })
        .catch((error) => {
          vm.modalData.situation.event = "資料庫寫入失敗。";
          vm.modalData.situation.message += error.data;
          this.vueCloudinaryData.filesData.avatar = "";
        });
    },
    // 方法：向提示視窗送出刪除會員事件
    deleteMember() {
      this.$eventBus.$emit("emitModalData", this.modalData);

      this.modalData.situation.event = "刪除會員";
      this.modalData.situation.message = `確定要刪除會員 ${this.managingMember} 嗎？`;
      this.modalData.situation.buttonType = "yesNo";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/all.scss";

#member-editior-page {
  height: 600px;
  .breadcrumb {
    padding: 0;
  }
  h6 {
    font-weight: 600;
    .delete-project-btn {
      font-size: 13px;
      a {
        color: darkred;
      }
    }
  }
}
#password-remark-trigger,
#password-remark {
  font-size: 12px;
}
#password-remark {
  color: darkred;
  display: inline-block;
  width: 180px;
  top: -10px;
}
.custom-file-label {
  &::after {
    content: "開啟";
  }
}
#member-avatar-area {
  top: -30px;
  .avatar-preview-block {
    width: 150px;
    height: 150px;
    border-radius: 150px;
    background-color: #1c4e80;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
      &::after {
        content: "點擊更換大頭貼";
        width: 120px;
        height: 30px;
        background-color: black;
        color: $sail;
        opacity: 1;
        position: absolute;
        text-align: center;
        line-height: 30px;
      }
    }
    div {
      width: 90%;
      height: 90%;
      border-radius: 90%;
      overflow: hidden;
      background-color: #f1f1f1;
      img {
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
  }
}
.action-buttons-block {
  a {
    font-size: 14px;
    color: black;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>