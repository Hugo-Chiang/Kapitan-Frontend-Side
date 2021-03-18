<template>
  <section id="project-details-page" class="position-relative">
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <h6 class="mt-2 mb-4 mr-4 d-inline-block">
      正在編輯：{{ managingProjectID }} 方案
    </h6>
    <ValidationObserver v-slot="{ invalid }">
      <div class="row">
        <div class="col-12">
          <div class="form-row">
            <div class="form-group col-md-2">
              <label for="project-status">方案狀態</label>
              <select
                id="project-status"
                class="form-control form-select-lg"
                v-model="editDetails.projectStatus"
              >
                <option value="1">上線中</option>
                <option value="0">已下線</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="project-name">方案名稱</label>
              <input
                type="text"
                class="form-control"
                id="project-name"
                placeholder="請輸入全名，可包含符號"
                v-model="editDetails.projectName"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="project-price-per-person">人均價格</label>
              <input
                type="text"
                class="form-control"
                id="project-price-per-person"
                placeholder="例：1000"
                v-model="editDetails.projectPricePerPerson"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="project-min-num-of-people">最低人數</label>
              <input
                type="text"
                class="form-control"
                id="project-min-num-of-people"
                placeholder="例：3"
                v-model="editDetails.projectMinNumOfPeople"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-row">
                <div class="form-group col-md-2">
                  <label for="project-category">所屬分類</label>
                  <select
                    id="project-category"
                    class="form-control form-select-lg"
                    v-model="editDetails.projectCategory"
                  >
                    <option disabled selected value>－請選擇－</option>
                    <option value="%%">全選</option>
                  </select>
                </div>
                <div class="form-group col-md-2">
                  <label for="project-departure-location">會合地點</label>
                  <input
                    type="text"
                    class="form-control"
                    id="project-departure-location"
                    placeholder="請輸入全名"
                    v-model="editDetails.projectDepartureLocation"
                  />
                </div>
                <div class="form-group col-md-4">
                  <form @submit.prevent="upload">
                    <label for="project-avatar">方案大頭貼</label>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/png, image/jpeg"
                      @change="handleFileChange($event)"
                    />
                    <button type="submit">Upload</button>
                  </form>
                </div>
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
            :editorToolbar="vueEditorData.ToolbarConfig"
            v-if="vueEditorData.inEditing == '方案摘要'"
            v-model="editDetails.projectSummary"
          ></VueEditor>
          <VueEditor
            :editorToolbar="vueEditorData.ToolbarConfig"
            v-else
            v-model="editDetails.projectDescription"
          ></VueEditor>
          <!-- VueEditor 文本編輯器結束 -->
        </div>
        <div class="col-3">
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
        </div>
      </div>
    </ValidationObserver>
  </section>
</template>

<script>
import axios from "axios";
// 導入麵包屑元件
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
// 導入 cloudinary-vue 雲端圖庫元件
import { CldContext, CldImage } from "cloudinary-vue";
// 導入 vue2-editor 文本編輯器元件
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      managingProjectID: {},
      breadCrumbData: {
        pagesArr: ["管理系統：方案管理", "管理系統：編輯項目"],
        currentPage: 2,
      },
      editDetails: {
        projectStatus: "",
        projectName: "",
        projectSummary: "",
        projectDescription: "",
        projectPricePerPerson: 0,
        projectMinNumOfPeople: 0,
        projectCategory: "",
        projectDepartureLocation: "",
        projectDepartureLocationDescription: "",
      },
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
      vueCloudinaryData: {
        cloudname: process.env.CLOUD_NAME,
        cloudGeneralURL: process.env.CLOUD_GENERAL_FIELD_URL,
      },
      cloudName: "hugo-chiang",
      preset: "yavti8fs",
      file: "",
      filesSelected: "",
      url: "",
      publicId: "",
    };
  },
  created() {
    console.log(window);
    this.managingProjectID = localStorage.getItem("managingProject");
    this.queryProjectDetails();
  },
  beforeDestroy() {
    localStorage.removeItem("managingOrder");
  },
  components: {
    Breadcrumb,
    VueEditor,
    CldContext,
    CldImage,
  },
  methods: {
    // 方法：
    queryProjectDetails() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryProjectDetails.php`;
      const vm = this;

      this.$http
        .post(api, vm.managingProjectID)
        .then((response) => {
          console.log(response.data);

          vm.editDetails.projectStatus = response.data["PROJECT_STATUS"];
          vm.editDetails.projectName = response.data["PROJECT_NAME"];
          vm.editDetails.projectSummary = response.data["PROJECT_SUMMARY"];
          vm.editDetails.projectDescription =
            response.data["PROJECT_DESCRIPITION"];
          vm.editDetails.projectPricePerPerson =
            response.data["PROJECT_ORIGINAL_PRICE_PER_PERSON"];
          vm.editDetails.projectMinNumOfPeople =
            response.data["PROJECT_MIN_NUM_OF_PEOPLE"];
          vm.editDetails.projectCategory = response.data["CATEGORY_ID"];
          vm.editDetails.projectDepartureLocation =
            response.data["LOCATION_NAME"];
          vm.editDetails.projectDepartureLocationDescription =
            response.data["LOCATION_DESCRIPTION"];

          console.log(vm.editDetails);
        })
        .catch((respponse) => {
          console.log(respponse);
        });
    },
    // 方法：
    handleFileChange: function (event) {
      console.log("handlefilechange", event.target.files);
      //returns an array of files even though multiple not used
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
    },
    // function to handle form submit
    upload: function (event) {
      //no need to look at selected files if there is no cloudname or preset
      if (this.preset.length < 1 || this.cloudName.length < 1) {
        this.errors.push("You must enter a cloud name and preset to upload");
        return;
      }
      // clear errors
      else {
        this.errors = [];
      }
      console.log("upload", this.file.name);
      let reader = new FileReader();

      // attach listener to be called when data from file
      // is available
      reader.addEventListener(
        "load",
        function () {
          console.log("file reader listener");
          let fd = new FormData();
          fd.append("upload_preset", this.preset);
          fd.append("tags", this.tags); // Optional - add tag for image admin in Cloudinary
          fd.append("file", reader.result);

          let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;

          let requestObj = {
            url: cloudinaryUploadURL,
            method: "POST",
            data: fd,
            onUploadProgress: function (progressEvent) {
              console.log("progress", progressEvent);
              this.progress = Math.round(
                (progressEvent.loaded * 100.0) / progressEvent.total
              );
              console.log(this.progress);
            }.bind(this),
          };
          //show progress bar at beginning of post
          this.showProgress = true;
          axios(requestObj)
            .then((response) => {
              this.results = response.data;
              console.log(this.results);
              console.log("public_id", this.results.public_id);
            })
            .catch((error) => {
              this.errors.push(error);
              console.log(this.error);
            })
            .finally(() => {
              setTimeout(
                function () {
                  this.showProgress = false;
                }.bind(this),
                1000
              );
            });
        }.bind(this),
        false
      );
      // call for file read if there is a file
      if (this.file && this.file.name) {
        reader.readAsDataURL(this.file);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/all.scss";

#project-details-page {
  height: 600px;
  .breadcrumb {
    padding: 0;
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
    content: "選擇檔案";
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
</style>