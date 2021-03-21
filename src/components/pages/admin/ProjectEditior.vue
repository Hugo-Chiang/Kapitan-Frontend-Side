<template>
  <section id="project-details-page">
    <!-- 麵包屑元件開始 -->
    <Breadcrumb
      v-if="!inCreatingMode"
      :breadCrumbData="breadCrumbData"
    ></Breadcrumb>
    <!-- 麵包屑元件結束 -->
    <div class="d-flex justify-content-between">
      <h6 class="mt-2 mb-4 d-inline-block">
        正在<span v-if="inCreatingMode">新增</span><span v-else>編輯</span>：{{
          managingProjectID
        }}
        方案
        <span v-if="!inCreatingMode" class="delete-project-btn ml-1">
          <a
            href=""
            @click.prevent="deleteProject"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
            >刪除專案</a
          >
        </span>
      </h6>
      <div
        class="d-inline-block"
        v-if="inCreatingMode || breadCrumbData.currentPage != 2"
      >
        <div id="rechoose-mode-link" class="d-flex justify-content-end">
          <a href="" @click.prevent="$router.push('/Admin/Projects-Manager')"
            >重選模式
            <i class="fas fa-sign-out-alt"></i>
          </a>
        </div>
      </div>
    </div>
    <ValidationObserver v-slot="{ invalid }">
      <div class="row">
        <div class="col-12">
          <div class="form-row">
            <div class="form-group col-md-2">
              <label :for="requiredInputTitle.projectStatus">{{
                requiredInputTitle.projectStatus
              }}</label>
              <select
                :id="requiredInputTitle.projectStatus"
                class="form-control form-select-lg"
                v-model="editDetails.projectStatus"
              >
                <option value="1">上線中</option>
                <option value="0">已下線</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.projectName">{{
                  requiredInputTitle.projectName
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.projectName"
                  placeholder="請輸入全名，可包含符號"
                  v-model="editDetails.projectName"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <div class="form-group col-md-2">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.projectPricePerPerson">{{
                  requiredInputTitle.projectPricePerPerson
                }}</label>
                <input
                  type="number"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.projectPricePerPerson"
                  placeholder="例：1000"
                  v-model="editDetails.projectPricePerPerson"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
            <div class="form-group col-md-2">
              <ValidationProvider
                :rules="{ required: true }"
                v-slot="{ errors, classes }"
              >
                <label :for="requiredInputTitle.projectMinNumOfPeople">{{
                  requiredInputTitle.projectMinNumOfPeople
                }}</label>
                <input
                  type="number"
                  class="form-control"
                  :class="classes"
                  :id="requiredInputTitle.projectMinNumOfPeople"
                  placeholder="例：3"
                  v-model="editDetails.projectMinNumOfPeople"
                />
                <span class="invalid-feedback">{{
                  errors[0]
                }}</span></ValidationProvider
              >
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-2">
              <label :for="requiredInputTitle.projectCategory">{{
                requiredInputTitle.projectCategory
              }}</label>
              <select
                :id="requiredInputTitle.projectCategory"
                class="form-control form-select-lg"
                v-model="editDetails.projectCategory"
              >
                <option
                  v-for="category in renderData['categoryList']"
                  :key="category['CATEGORY_NAME']"
                  :value="category['CATEGORY_ID']"
                >
                  {{ category["CATEGORY_NAME"] }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label :for="requiredInputTitle.projectDepartureLocation">{{
                requiredInputTitle.projectDepartureLocation
              }}</label>
              <select
                :id="requiredInputTitle.projectDepartureLocation"
                class="form-control form-select-lg"
                v-model="editDetails.projectDepartureLocation"
              >
                <option
                  v-for="location in renderData['departureLocationList']"
                  :key="location['LOCATION_NAME']"
                  :value="location['LOCATION_ID']"
                >
                  {{ location["LOCATION_NAME"] }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <label
                :for="requiredInputTitle.projectAvatarPublicID"
                class="form-label"
                >{{ requiredInputTitle.projectAvatarPublicID }}</label
              >
              <div class="custom-file">
                <input
                  :id="requiredInputTitle.projectAvatarPublicID"
                  class="custom-file-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  @change="handleFileChange($event)"
                />
                <label
                  class="custom-file-label"
                  :for="requiredInputTitle.projectAvatarPublicID"
                  >{{
                    vueCloudinaryData.filesData.avatar.name || "請選擇檔案"
                  }}</label
                >
              </div>
            </div>
            <div class="form-group col-md-3">
              <label
                :for="requiredInputTitle.projectCarouselImgs"
                class="form-label"
                >{{ requiredInputTitle.projectCarouselImgs }}</label
              >
              <div class="custom-file">
                <input
                  :id="requiredInputTitle.projectCarouselImgs"
                  class="custom-file-input"
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  @change="handleFileChange($event)"
                />
                <label
                  class="custom-file-label"
                  :for="requiredInputTitle.projectCarouselImgs"
                  >{{
                    `已選擇 ${vueCloudinaryData.filesData.carouselImgs.length} 個檔案`
                  }}</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-2">
          <h6>方案文本編輯器</h6>
        </div>
      </div>
      <div class="row mt-2">
        <!-- VueEditor 文本編輯器開始 -->
        <div class="col-9">
          <!-- VueEditor 文本編輯器開始 -->
          <VueEditor
            ref="vueEditor"
            :editorToolbar="vueEditorData.ToolbarConfig"
            v-if="vueEditorData.inEditing == '方案摘要'"
            v-model="editDetails.projectSummary"
            :use-custom-image-handler="true"
            @image-added="uploadContentImg"
          ></VueEditor>
          <VueEditor
            ref="vueEditor"
            :editorToolbar="vueEditorData.ToolbarConfig"
            v-else
            v-model="editDetails.projectDescription"
            :use-custom-image-handler="true"
            @image-added="uploadContentImg"
          ></VueEditor>
          <!-- VueEditor 文本編輯器結束 -->
        </div>
        <div class="col-3 d-flex flex-column">
          <h6>正在編輯：</h6>
          <ul class="editingHTMLlist pl-2 mt-3">
            <li
              class="mb-2 d-flex justify-content-start align-items-center"
              v-for="target in vueEditorData.vModelTargets"
              :key="target"
              @click="vueEditorData.inEditing = target"
            >
              <div class="in-editing-arrow d-flex align-items-center mr-1">
                <div
                  class="w-100 h-100 align-items-center"
                  :class="
                    vueEditorData.inEditing == target ? 'd-flex' : 'd-none'
                  "
                >
                  <i class="fas fa-arrow-alt-circle-right"></i>
                </div>
              </div>
              {{ target }}
            </li>
          </ul>
          <!-- 操作按鈕開始 -->
          <div
            class="action-buttons-block w-100 mt-5 px-2 d-flex justify-content-between align-items-center"
          >
            <input
              type="button"
              class="btn btn-primary"
              :class="{ 'invalid-btn': invalid }"
              :value="inCreatingMode ? '新增完成' : '修改完成'"
              :disabled="invalid"
              @click.prevent="uploadAvatarAndUpdateData"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
            />
            <a
              class="d-inline-block"
              href=""
              @click.prevent="$router.push('/Admin/Projects-Manager')"
              >不儲存關閉</a
            >
          </div>
          <!-- 操作按鈕結束 -->
        </div>
      </div>
    </ValidationObserver>
  </section>
</template>

<script>
// 導入麵包屑元件
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
// 導入 axios 元件
import axios from "axios";
// 導入 vue2-editor 文本編輯器元件
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      inCreatingMode: null,
      breadCrumbData: {
        pagesArr: ["管理系統：查詢方案", "管理系統：編輯方案"],
        currentPage: 2,
      },
      modalData: {
        callBy: { vm: null },
        situation: {
          event: "",
          message: "",
          buttonType: "gotIt",
          data: {},
        },
        emitValue: null,
        reaction: function () {
          if (this.situation.event.indexOf("失敗") != -1)
            setTimeout(
              () => this.callBy.vm.$router.push({ name: "管理系統：方案管理" }),
              1000
            );
        },
      },
      requiredInputTitle: {
        projectStatus: "方案狀態",
        projectName: "方案名稱",
        projectPricePerPerson: "人均價格",
        projectMinNumOfPeople: "最低人數",
        projectCategory: "所屬分類",
        projectDepartureLocation: "會合地點",
        projectAvatarPublicID: "方案大頭貼",
        projectCarouselImgs: "方案輪播圖",
      },
      renderData: {
        categoryList: [],
        departureLocationList: [],
      },
      managingProjectID: {},
      editDetails: {
        projectStatus: "",
        projectName: "",
        projectAvatarPublicID: "",
        projectCarouselImgs: [],
        projectSummary: "",
        projectDescription: "",
        projectPricePerPerson: 0,
        projectMinNumOfPeople: 0,
        projectCategory: "",
        projectDepartureLocation: "",
        projectDepartureLocationDescription: "",
      },
      // vue2-editor 文本編輯器的配置或應用資料
      vueEditorData: {
        ToolbarConfig: [
          [{ header: [false, 1, 2, 3, 4, 5, 6] }],
          ["bold"],
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
          ["clean"],
        ],
        vModelTargets: ["方案摘要", "方案內容"],
        inEditing: "方案摘要",
      },
      // cloudinary-vue 雲端圖庫元件的配置或應用資料
      vueCloudinaryData: {
        filesData: {
          avatar: "",
          carouselImgs: [],
        },
        preset: {
          projectAvatar: "FE-SP-0001-Kapitan-Projects-Avatar",
          projectContent: "FE-SP-0001-Kapitan-Projects-Content",
          projectCarousel: "FE-SP-0001-Kapitan-Projects-Carousel",
        },
        uploadStatus: "",
      },
    };
  },
  props: ["currentManager", "currentPath"],
  created() {
    this.modalData.callBy.vm = this;
    this.$eventBus.$on("emitModalValue", (value) => {
      this.modalData.emitValue = value;
    });
    this.initializeEditor();
  },
  beforeDestroy() {
    // localStorage.removeItem("managingProject");
  },
  components: {
    Breadcrumb,
    VueEditor,
  },
  methods: {
    // 方法：初始化編輯器內容，以便呈現新增或編輯模式的差異功能
    initializeEditor() {
      const categoryListAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryCategoryList.php`;
      const departureLocationListAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryDepartureLocationList.php`;
      const vm = this;

      vm.editDetails.projectName = "";
      vm.editDetails.projectPricePerPerson = 0;
      vm.editDetails.projectMinNumOfPeople = 0;
      vm.vueCloudinaryData.filesData.avatar = "";
      vm.vueCloudinaryData.filesData.carouselImgs = [];
      vm.editDetails.projectStatus = "0";
      vm.editDetails.projectCategory = "CG0001";
      vm.editDetails.projectDepartureLocation = "LC0001";

      this.$http.get(categoryListAPI).then((response) => {
        vm.renderData.categoryList = response.data;
      });
      this.$http.get(departureLocationListAPI).then((response) => {
        vm.renderData.departureLocationList = response.data;
      });

      if (this.currentPath.indexOf("Project-Creation") == -1)
        this.inCreatingMode = false;
      else this.inCreatingMode = true;

      if (this.inCreatingMode) {
        const queryCreatingIDAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryCreatingID.php`;
        this.$http
          .post(queryCreatingIDAPI, this.currentManager)
          .then((response) => {
            vm.managingProjectID = response.data;
          });
      } else {
        this.managingProjectID = localStorage.getItem("managingProject");
        this.queryProjectDetails();
      }
    },
    // 方法：向後端查詢欲編輯項目的內容，以利進行雙向綁定編修
    queryProjectDetails() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryProjectDetails.php`;
      const vm = this;

      this.$http
        .post(api, vm.managingProjectID)
        .then((response) => {
          console.log(response.data);

          vm.editDetails.projectStatus = response.data["PROJECT_STATUS"];
          vm.editDetails.projectName = response.data["PROJECT_NAME"];
          vm.editDetails.projectAvatarPublicID =
            response.data["PROJECT_AVATAR_URL"];
          vm.editDetails.projectSummary = response.data["PROJECT_SUMMARY"];
          vm.editDetails.projectDescription =
            response.data["PROJECT_DESCRIPITION"];
          vm.editDetails.projectPricePerPerson =
            response.data["PROJECT_ORIGINAL_PRICE_PER_PERSON"];
          vm.editDetails.projectMinNumOfPeople =
            response.data["PROJECT_MIN_NUM_OF_PEOPLE"];
          vm.editDetails.projectCategory = response.data["CATEGORY_ID"];
          vm.editDetails.projectDepartureLocation =
            response.data["LOCATION_ID"];
          vm.editDetails.projectDepartureLocationDescription =
            response.data["LOCATION_DESCRIPTION"];

          console.log(vm.editDetails);
        })
        .catch((respponse) => {
          console.log(respponse);
        });
    },
    // 方法：紀錄觀察上傳檔案的內容
    handleFileChange: function (e) {
      if (e.target.id == "方案大頭貼") {
        this.vueCloudinaryData.filesData.avatar = e.target.files[0];
        console.log("上傳檔案更換：", this.vueCloudinaryData.filesData.avatar);
      } else if (e.target.id == "方案輪播圖") {
        this.vueCloudinaryData.filesData.carouselImgs = [];
        for (let i = 0; i < e.target.files.length; i++) {
          this.vueCloudinaryData.filesData.carouselImgs.push(e.target.files[i]);
        }
        console.log(
          "上傳檔案更換：",
          this.vueCloudinaryData.filesData.carouselImgs
        );
      }
    },
    // 方法：透過 axios 將圖檔上傳至指定的 Cloudinary 位置（並旋即啟動更新資料庫的方法）
    uploadAvatarAndUpdateData() {
      this.$eventBus.$emit("emitModalData", this.modalData);
      vm.modalData.situation.buttonType = "gotIt";

      const cloudinaryUploadAPI = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`;
      const vm = this;

      // 判定是否有選擇圖檔，決定是否要執行上傳雲端的動作（抑或是跳至下一步）
      let avatarFile = this.vueCloudinaryData.filesData.avatar;
      let carouselFiles = this.vueCloudinaryData.filesData.carouselImgs;

      if (avatarFile == "" && !avatarFile.name && carouselFiles.length <= 0) {
        this.updateProjectDetails();
      } else {
        let totalUploadObj = this.vueCloudinaryData.filesData.carouselImgs;

        if (avatarFile != "") {
          let toolArr = [];
          for (let prop in totalUploadObj) {
            toolArr.push(totalUploadObj[prop]);
          }
          toolArr.unshift(avatarFile);
          totalUploadObj = Object.assign({}, toolArr);
        }

        let objSize = Object.keys(totalUploadObj).length;
        let objIndex = 1;

        for (let prop in totalUploadObj) {
          let fileReader = new FileReader();

          fileReader.addEventListener(
            "load",
            function () {
              let preset = "";
              if (avatarFile != "" && prop == 0) {
                preset = vm.vueCloudinaryData.preset.projectAvatar;
              } else {
                preset = vm.vueCloudinaryData.preset.projectCarousel;
              }

              let formData = new FormData();
              formData.append("upload_preset", preset);
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
                  vm.modalData.situation.message = `<p>正在上傳第 ${objIndex} 張圖片，總共有 ${objSize} 張圖片。<p>第 ${objIndex} 張圖片的上傳進度：${vm.progress}％`;
                },
              };

              axios(requestObj)
                .then((response) => {
                  console.log(response.data);
                  if (avatarFile != "" && objIndex == 1) {
                    vm.editDetails.projectAvatarPublicID =
                      response.data.public_id;
                  } else {
                    vm.editDetails.projectCarouselImgs.push(
                      response.data.public_id
                    );
                  }

                  if (objIndex == objSize) {
                    vm.modalData.situation.event = "圖片上傳成功。";
                    vm.modalData.situation.message = `<p>${objIndex} 張圖片全部上傳成功！</p>`;
                    vm.updateProjectDetails();
                  } else {
                    vm.modalData.situation.message = `第 ${objIndex} 張圖片上傳成功`;
                  }

                  objIndex++;
                })
                .catch((error) => {
                  console.log(error);
                  vm.modalData.situation.event = "圖片上傳失敗。";
                  vm.modalData.situation.message = `圖片上傳失敗！請稍後再試。`;
                });
            },
            false
          );

          fileReader.readAsDataURL(totalUploadObj[prop]);
        }
      }
    },
    // 方法：將方案更新數據寫入資料庫
    updateProjectDetails() {
      const updateProjectDetailsAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/UpdatepProjectDetails.php`;
      const createProjectDetailsAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/InsertNewProject.php`;
      const vm = this;
      const session = vm.getKapitanSession();

      let sendingObj = {
        session: session,
        projectID: vm.managingProjectID,
        editedDetails: vm.editDetails,
      };
      let api = "";

      if (this.inCreatingMode) api = createProjectDetailsAPI;
      else api = updateProjectDetailsAPI;

      vm.$http
        .post(api, JSON.stringify(sendingObj))
        .then((response) => {
          vm.modalData.situation.event += "資料庫寫入成功。";
          vm.modalData.situation.message += response.data;
        })
        .catch((error) => {
          vm.modalData.situation.event += "資料庫寫入失敗。";
          vm.modalData.situation.message += error.data;
        })
        .then(() => {
          vm.initializeEditor();
        });
    },
    // 方法：刪除方案
    deleteProject() {
      this.$eventBus.$emit("emitModalData", this.modalData);
      const deleteProjectAPI = `${process.env.REMOTE_HOST_PATH}/API/Backstage/DeleteProject.php`;
      const vm = this;
      const session = vm.getKapitanSession();

      this.modalData.situation.event = "準備刪除方案";
      this.modalData.situation.message = `確定要刪除 ${this.managingProjectID} 專案嗎？`;
      this.modalData.situation.buttonType = "yesNo";

      vm.$forceUpdate();

      let sendingObj = {
        session: session,
        projectID: vm.managingProjectID,
      };

      if (this.returnModalEmitValue == 1) {
        vm.$http
          .post(deleteProjectAPI, JSON.stringify(sendingObj))
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 方法：自定義 vue2-editor 文本編輯器的圖片上傳方式，改為 Cloudinary 的上傳方式
    uploadContentImg(file, editor, cursorLocation) {
      const cloudinaryUploadAPI = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`;
      const vm = this;

      console.log("圖檔上傳器已啟動");

      let formData = new FormData();
      formData.append(
        "upload_preset",
        vm.vueCloudinaryData.preset.projectAvatar
      );
      formData.append("file", file);

      let requestObj = {
        url: cloudinaryUploadAPI,
        method: "POST",
        data: formData,
        onUploadProgress: function (progressEvent) {
          console.log("正在處理：", progressEvent);
          vm.progress = Math.round(
            (progressEvent.loaded * 100.0) / progressEvent.total
          );
          console.log(`進度：${vm.progress}％`);
        },
      };

      axios(requestObj)
        .then((response) => {
          console.log("上傳成功！");
          console.log(response);
          let url = response.data.secure_url;
          editor.insertEmbed(cursorLocation, "image", url);
        })
        .catch((error) => {
          console.log("上傳失敗！");
          console.log(error);
        });
    },
    // 方法：抓取存在 cookie 中的 session
    getKapitanSession() {
      let cookie = document.cookie;
      let strArr = cookie.split("");
      let equalSymbolIndex = strArr.indexOf("=");
      let cookieLen = cookie.length;
      let namePulsSymbolLen = equalSymbolIndex + 2;
      let sessionLen = cookieLen - namePulsSymbolLen - 1;
      let session = cookie.substr(namePulsSymbolLen, sessionLen);

      return session;
    },
  },
  computed: {
    returnModalEmitValue() {
      return this.modalData.emitValue;
    },
  },
  // watch: {
  //   modalData: {
  //     handler(newObj) {
  //       console.log(newObj);
  //     },
  //     deep: true,
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/all.scss";

.invalid-btn {
  cursor: not-allowed;
}
#project-details-page {
  height: 600px;
  .breadcrumb {
    padding: 0;
  }
  #rechoose-mode-link {
    a {
      color: black;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .query-resultsTable {
    tr {
      th {
        font-size: 14px;
      }
      td {
        font-size: 12px;
      }
    }
    .order-item {
      cursor: pointer;
    }
  }
}
.custom-file-label {
  &::after {
    content: "開啟";
  }
}
.quillWrapper {
  position: relative;
  height: 200px;
  .ql-toolbar {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #fff;
  }
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
.editingHTMLlist {
  li {
    font-weight: 500;
    list-style: none;
    cursor: pointer;
    .in-editing-arrow {
      width: 20px;
      height: 20px;
    }
  }
}
.action-buttons-block {
  a {
    font-size: 14px;
    color: black;
    &:hover {
      color: red;
    }
  }
}
</style>