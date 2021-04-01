<template>
  <section id="members-searching-page" class="position-relative">
    <!-- 查詢輸入表單區域開始 -->
    <div class="row">
      <div class="col-10">
        <div class="form-row">
          <!-- 會員編號開始 -->
          <div class="form-group col-3">
            <label for="member-id">會員編號</label>
            <input
              type="text"
              class="form-control"
              id="member-id"
              placeholder="MB0000001"
              v-model="queryData.memberID"
            />
          </div>
          <!-- 會員編號結束 -->
          <!-- 會員狀態開始 -->
          <div class="form-group col-3">
            <label for="member-status">會員狀態</label>
            <select
              id="member-status"
              class="form-control form-select-lg"
              v-model="queryData.memberStatus"
            >
              <option disabled selected value>－請選擇－</option>
              <option value="%%">全選</option>
              <option value="1">正常</option>
              <option value="2">警告</option>
              <option value="0">停權</option>
            </select>
          </div>
          <!-- 會員狀態結束 -->
          <!-- 會員帳號開始 -->
          <div class="form-group col-4">
            <label for="member-account">會員帳號</label>
            <input
              type="email"
              class="form-control"
              id="member-account"
              placeholder="Hello-World@email.com"
              v-model="queryData.memberAccount"
            />
          </div>
          <!-- 會員帳號結束 -->
        </div>
      </div>
      <div
        id="rechoose-mode-link"
        class="col-2 ml-auto d-flex justify-content-end"
      >
        <a href="" @click.prevent="$router.push('/Admin/Orders-Manager')"
          >重選模式
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <div class="form-row">
          <!-- 會員姓名開始 -->
          <div class="form-group col-3">
            <label for="memberer-name">會員姓名</label>
            <input
              type="text"
              class="form-control"
              id="memberer-name"
              placeholder="會員姓名"
              v-model="queryData.memberName"
            />
          </div>
          <!-- 會員姓名結束 -->
          <!-- 會員手機開始 -->
          <div class="form-group col-3">
            <label for="member-phone">會員手機</label>
            <input
              type="text"
              class="form-control"
              id="member-phone"
              placeholder="0900000000"
              v-model="queryData.memberPhone"
            />
          </div>
          <!-- 會員手機結束 -->
          <div class="form-group col-4"></div>
          <!-- 操作按鈕開始 -->
          <div class="form-group col-1 ml-3">
            <label for="">&nbsp;</label>
            <input
              type="button"
              class="btn btn-primary"
              value="進行查詢"
              @click.prevent="submitMembersQuery"
            />
          </div>
          <!-- 操作按鈕結束 -->
        </div>
      </div>
    </div>
    <!-- 查詢輸入表單區域結束 -->
    <!-- 查詢結果表格區開始 -->
    <div class="row">
      <div class="col-12">
        <h6 class="my-4">查詢結果：</h6>
        <table class="table table-striped query-resultsTable">
          <thead>
            <tr>
              <th class="text-center" scope="col">序號</th>
              <th class="text-center" scope="col">會員編號</th>
              <th class="text-center" scope="col">會員帳號</th>
              <th class="text-center" scope="col">會員姓名</th>
              <th class="text-center" scope="col">會員手機</th>
              <th class="text-center" scope="col">註冊日期</th>
              <th class="text-center" scope="col">會員狀態</th>
            </tr>
          </thead>
          <tbody v-for="(order, index) in currentPageContentArr" :key="index">
            <tr
              class="order-item"
              @click.prevent="
                checkMemberInfo(currentPageContentArr[index]['MEMBER_ID'])
              "
            >
              <th class="text-center" scope="row">
                {{ currentPageContentArrSerial[index] }}
              </th>
              <td>{{ currentPageContentArr[index]["MEMBER_ID"] }}</td>
              <td class="text-center">
                {{ currentPageContentArr[index]["MEMBER_ACCOUNT"] }}
              </td>
              <td class="text-center">
                {{ currentPageContentArr[index]["MEMBER_NAME"] || "未填寫" }}
              </td>
              <td class="text-center">
                {{ currentPageContentArr[index]["MEMBER_PHONE"] || "未填寫" }}
              </td>
              <td class="text-center">
                {{ currentPageContentArr[index]["MEMBER_REGISTERED_DATE"] }}
              </td>
              <td class="text-center">
                {{ currentPageContentArr[index]["MEMBER_STATUS"] }}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="text-danger mt-5 text-center"
          v-if="currentPageContentArr.length <= 0"
        >
          查無資料
        </div>
      </div>
    </div>
    <!-- 查詢結果表格區結束 -->
    <!-- 頁碼區開始 -->
    <div
      id="pagination-container"
      class="d-flex justify-content-center mt-4 position-absolute"
    >
      <Pagination
        v-show="currentPageContentArr.length > 0"
        :allContentArr="allMembersArr"
        :itemsNumPerPage="itemsNumPerPage"
        @emitCurrentContentAndSerial="getCurrentContentAndSerial"
      ></Pagination>
    </div>
    <!-- 頁碼區結束 -->
  </section>
</template>

<script>
// 導入頁碼元件
import Pagination from "@/components/pages/sub-components/Pagination";

export default {
  data() {
    return {
      queryData: {
        memberID: "",
        memberStatus: "",
        memberAccount: "",
        memberName: "",
        memberPhone: "",
      },
      allMembersArr: [],
      itemsNumPerPage: 5,
      currentPageContentArr: [],
      currentPageContentArrSerial: [],
    };
  },
  components: { Pagination },
  methods: {
    // 方法：向後端送出查詢表單，以拿回相關訂單進行頁面渲染
    submitMembersQuery() {
      const api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/QueryMembers.php`;
      const vm = this;

      this.$http
        .post(api, JSON.stringify(vm.queryData))
        .then((response) => {
          vm.allMembersArr = [];
          let responseArr = response.data;

          for (let i = 0; i < responseArr.length; i++) {
            let projectDuplicate = false;

            searching: for (let j = 0; j < vm.allMembersArr.length; j++) {
              if (
                responseArr[i]["MEMBER_ID"] == vm.allMembersArr[j]["MEMBER_ID"]
              ) {
                projectDuplicate = true;
                break searching;
              }
            }

            if (!projectDuplicate) {
              responseArr[i]["MEMBER_REGISTERED_DATE"] = new Date(
                responseArr[i]["MEMBER_REGISTERED_DATE"]
              ).Format("yyyy-MM-dd");
              vm.allMembersArr.push(responseArr[i]);
            }
          }

          console.log(vm.allMembersArr);

          vm.allMembersArr.sort((a, b) => {
            return a["SORT_INDEX"] - b["SORT_INDEX"];
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 方法：獲得頁碼元件傳回的當前頁面內容
    getCurrentContentAndSerial(arr, num) {
      this.currentPageContentArr = arr;
      this.currentPageContentArrSerial = num;
    },
    // 方法：點擊會員進行入詳情頁
    checkMemberInfo(managingMemberID) {
      localStorage.removeItem("managingMember");
      localStorage.setItem("managingMember", managingMemberID);
      this.$router.push({ name: "管理系統：編輯會員" });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  height: 700px;
  h5 {
    span {
      font-size: 12px;
      color: green;
    }
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
  #pagination-container {
    transform: translate3d(-50%, -50%, 0);
    left: 50%;
    bottom: 8%;
  }
}
</style>