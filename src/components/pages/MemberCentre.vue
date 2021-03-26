<template>
  <main id="member-centre" class="container">
    <!-- 麵包屑開始 -->
    <Breadcrumb :breadCrumbData="breadCrumbData"></Breadcrumb>
    <!-- 麵包屑結束 -->
    <div class="row">
      <aside class="col-3">
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
              <h6>要啟程了嗎？</h6>
              <h6>甲必丹<span>阿撒部嚕嚕嚕嚕</span></h6>
            </div>
            <hr />
            <ul class="p-0">
              <li
                class="text-center mb-3"
                v-for="list in asideList"
                :key="list"
                @click="currentSubPage = list"
              >
                {{ list }}
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <section class="col-9">
        <div class="card">
          <MemberInfoEditior
            v-if="currentSubPage == '基本資料'"
            :memberID="memberInfo.ID"
          ></MemberInfoEditior>
          <MemberOrdersSearching
            v-else-if="currentSubPage == '查詢訂單'"
            :memberID="memberInfo.ID"
          ></MemberOrdersSearching>
          <MemberCommentsSearching
            v-else-if="currentSubPage == '我的評價'"
            :memberID="memberInfo.ID"
          ></MemberCommentsSearching>
          <div class="card-body" v-else></div>
        </div>
      </section>
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
        name: "",
        avatarUrl: "",
      },
      asideList: ["基本資料", "查詢訂單", "我的評價"],
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
    // 方法：
    queryMemberInfo() {
      const memberID = this.GlobalFunctions.verifySignInedMember.call(this);
      console.log(memberID);
      const api = `${process.env.REMOTE_HOST_PATH}/API/Universal/QueryMemberInfo.php`;
      const vm = this;

      this.$http
        .post(api, memberID)
        .then((response) => {
          // console.log(response.data);
          vm.memberInfo.avatarUrl = response.data["MEMBER_AVATAR_URL"];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

div {
  border: 1px solid $bootstrap-border-color;
}

#member-centre {
  height: 1200px;
  padding-top: $main-container-pt;
  h1 {
    margin-top: 200px;
  }
  .avatar-block {
    width: 150px;
    height: 150px;
    border-radius: 150px;
    background-color: $deep-teal;
    div {
      width: 90%;
      height: 90%;
      border-radius: 90%;
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
      list-style: none;
    }
  }
}
</style>