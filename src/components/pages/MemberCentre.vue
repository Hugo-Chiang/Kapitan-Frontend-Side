<template>
  <main id="member-centre" class="container mb-5">
    <!-- 麵包屑開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 麵包屑結束 -->
    <div class="row">
      <!-- 側邊欄位開始 -->
      <aside class="col-lg-3 mb-lg-0 col-12 mb-4">
        <div class="card">
          <div class="card-body">
            <div
              class="avatar-block d-flex justify-content-center align-items-center mx-auto my-3"
            >
              <div class="d-flex justify-content-center align-items-center">
                <img
                  :src="
                    memberInfo.avatarUrl == null
                      ? GlobalVariables.cloudUrlprefix +
                        GlobalVariables.cloudNoAvatarUrl
                      : GlobalVariables.cloudUrlprefix + memberInfo.avatarUrl
                  "
                  alt=""
                />
              </div>
            </div>
            <div class="text-center">
              <h6>
                {{ memberInfo.nickname || "尊敬的甲必丹會員" }}
              </h6>
            </div>
            <hr />
            <ul class="p-0">
              <li
                class="text-center mt-4 d-flex justify-content-center align-items-center"
                v-for="list in asideList"
                :key="list.name"
                :class="currentSubPage == list.name ? 'current-sub-page' : ''"
                @click="currentSubPage = list.name"
              >
                <div
                  class="icon-block d-flex justify-content-center align-items-center mr-1"
                >
                  <i :class="list.iconClass"></i>
                </div>
                {{ list.name }}
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <!-- 側邊欄位結束 -->
      <!-- 主要內容（切換）開始 -->
      <section class="col-lg-9 col-12">
        <div class="card">
          <!-- （切換）基本資料開始 -->
          <MemberInfoEditior
            v-if="currentSubPage == '基本資料'"
            :memberInfo="memberInfo.propsObj"
          ></MemberInfoEditior>
          <!-- （切換）基本資料結束 -->
          <!-- （切換）查詢訂單開始 -->
          <MemberOrdersSearching
            v-else-if="currentSubPage == '查詢訂單'"
            :memberID="memberInfo.ID"
          ></MemberOrdersSearching>
          <!-- （切換）查詢訂單開始 -->
          <!-- <MemberCommentsSearching
            v-else-if="currentSubPage == '我的評價'"
            :memberID="memberInfo.ID"
          ></MemberCommentsSearching> -->
          <div class="card-body welcome-sub-page" v-else>
            <h1>這是您的主頁面</h1>
          </div>
        </div>
      </section>
      <!-- 主要內容（切換）結束 -->
    </div>
  </main>
</template>

<script>
// 導入麵包屑元件
import Breadcrumb from "@/components/pages/sub-components/Breadcrumb";
//
import MemberInfoEditior from "@/components/pages/sub-components/MemberInfoEditior";
import MemberOrdersSearching from "@/components/pages/sub-components/MemberOrdersSearching";
import MemberCommentsSearching from "@/components/pages/sub-components/MemberCommentsSearching";

export default {
  data() {
    return {
      breadCrumbData: {
        pagesArr: ["首頁", "會員中心"],
        currentPage: 2,
      },
      memberInfo: {
        ID: "",
        nickname: "",
        avatarUrl: "",
        propsObj: {},
      },
      asideList: [
        { name: "基本資料", iconClass: ["far", "fa-user-circle"] },
        { name: "查詢訂單", iconClass: ["fas", "fa-tasks"] },
      ],
      currentSubPage: "",
    };
  },
  components: {
    Breadcrumb,
    MemberInfoEditior,
    MemberOrdersSearching,
    MemberCommentsSearching,
  },
  created() {
    this.queryMemberInfo();
  },
  methods: {
    // 方法：驗證登入 session 後，回傳會員資料
    queryMemberInfo() {
      const signInAuthenticationAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/SignInAuthentication.php`;
      const queryMemberInfoAPI = `${process.env.REMOTE_HOST_PATH}/API/Universal/QueryMemberInfo.php`;
      const session = this.GlobalFunctions.getKapitanSession("forestage");
      const vm = this;

      this.$http
        .post(signInAuthenticationAPI, session)
        .then((response) => {
          if (response.data.sessionCheck) {
            vm.memberInfo.ID = response.data.signInedID;
            return vm.$http.post(queryMemberInfoAPI, vm.memberInfo.ID);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response);
          vm.memberInfo.propsObj = response.data;
          vm.memberInfo.nickname = response.data["MEMBER_NICKNAME"];
          vm.memberInfo.avatarUrl = response.data["MEMBER_AVATAR_URL"];
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

#member-centre {
  padding: $main-container-pt 0;
  h1 {
    margin-top: 200px;
  }
  .avatar-block {
    width: 150px;
    height: 150px;
    border-radius: 150px;
    background-color: $deep-teal;
    div {
      width: 95%;
      height: 95%;
      border-radius: 95%;
      overflow: hidden;
      background-color: $sail;
      img {
        height: 100%;
        object-fit: cover;
        object-position: center center;
        &:hover {
          ::after {
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
      }
    }
  }
  ul {
    li {
      font-size: 18px;
      list-style: none;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .current-sub-page {
      font-weight: 500;
      color: $tiffany-blue;
    }
  }
}
</style>