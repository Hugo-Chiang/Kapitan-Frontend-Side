<template>
  <div
    class="row py-md-0 py-3 d-flex align-items-center"
    :class="[
      { 'has-project-divier': index > 0 ? true : false },
      currentPage == '購物車'
        ? 'project-row-in-cart'
        : 'project-row-in-checkout',
    ]"
  >
    <!-- 方案頭貼、標題與日期開始 -->
    <router-link
      class="router-link d-flex flex-row align-items-center col-md-2 mb-md-0 col-4 mb-2"
      :to="{
        name: '方案',
        params: {
          selectedProjectID: listItem.bookingProjectID,
        },
      }"
    >
      <div class="project-avatar-block d-flex justify-content-center">
        <img
          :src="
            GlobalVariables.cloudUrlprefix +
            (list[index].bookingProjectAvatarUrl == ''
              ? GlobalVariables.cloudNoImgUrl
              : list[index].bookingProjectAvatarUrl)
          "
          alt=""
          class="project-avatar"
        />
      </div>
    </router-link>
    <router-link
      class="router-link d-flex align-items-md-center flex-md-row mb-md-0 col-8 flex-column mb-2"
      :class="currentPage == '購物車' ? ['col-md-4'] : ['pr-5', 'col-md-9']"
      :to="{
        name: '方案',
        params: {
          selectedProjectID: listItem.bookingProjectID,
        },
      }"
    >
      <h6 class="project-name m-0">
        {{ list[index].bookingProjectName }}
        <h6 class="project-name-booking-date mt-1 mb-0">
          預約日期：<span>{{ list[index].bookingProjectDate }}</span>
        </h6>
      </h6>
      <div
        v-if="currentPage != '購物車'"
        class="d-flex align-items-center ml-md-auto ml-0 mt-md-0 mt-2"
      >
        <h5 class="project-final-price m-0">
          {{
            (list[index].bookingProjectNumOfPeople *
              list[index].bookingProjectPricePerPerson)
              | currency
              | dollarSign
          }}
        </h5>
        <h6 class="mb-0 ml-5">
          共 {{ listItem.bookingProjectNumOfPeople }} 人
        </h6>
      </div>
    </router-link>
    <!-- 方案頭貼、標題與日期結束 -->
    <!-- 選擇人數欄位開始 -->
    <div
      class="col-md-3 order-md-2 col-sm-6 my-sm-0 col-7 my-3 order-3 d-flex flex-md-column flex-row align-items-center"
      v-if="currentPage == '購物車'"
    >
      <h6 class="adjust-num-title my-md-2 mr-md-0 mr-1 mb-0">人數</h6>
      <NumberInput
        ref="numberInput"
        class="w-100"
        :uniqueKey="listItem.bookingProjectID"
        :incomingValue.sync="listItem.bookingProjectNumOfPeople"
      ></NumberInput>
    </div>
    <!-- 選擇人數欄位結束 -->
    <!-- 金額統計開始 -->
    <div
      class="col-md-2 order-md-3 col-sm-3 col-4 order-2 d-flex flex-column align-items-center"
    >
      <h5 v-if="currentPage == '購物車'" class="project-final-price mb-0">
        {{
          (list[index].bookingProjectNumOfPeople *
            list[index].bookingProjectPricePerPerson)
            | currency
            | dollarSign
        }}
      </h5>
    </div>
    <!-- 金額統計結束 -->
    <!-- 刪除單項方案開始 -->
    <div class="col-md-1 col-sm-1 my-sm-0 order-4 col-12 my-3 d-flex">
      <a
        class="delete-single-project-icon d-inline-block mx-auto"
        href=""
        @click.prevent="deleteSingleProject"
        v-if="currentPage == '購物車'"
        ><i class="fas fa-trash-alt"></i
      ></a>
    </div>
    <!-- 刪除單項方案結束 -->
  </div>
</template>

<script>
// 導入數字調控元件
import NumberInput from "@/components/pages/sub-components/NumberInput";

export default {
  data() {
    return {};
  },
  props: ["list", "index", "listItem", "currentPage"],
  components: { NumberInput },
  methods: {
    // 方法：刪除單一方案，覆寫 localStorage
    deleteSingleProject(e) {
      let storageArr = JSON.parse(localStorage.getItem("savingProjects"));
      let deleteProjectElement = e.target.closest("div.project-row-in-cart");
      let deleteStorageID = deleteProjectElement.dataset.id;
      let deleteStorageIndex = null;

      for (let i = 0; i < storageArr.length; i++) {
        if (deleteStorageID == storageArr[i].localstorageID) {
          deleteStorageIndex = i;
        }
      }

      if (deleteStorageIndex != -1) {
        storageArr.splice(deleteStorageIndex, 1);
        localStorage.setItem("savingProjects", JSON.stringify(storageArr));
        this.list.splice(deleteStorageIndex, 1);
      }

      let storageArrLen = 0;
      storageArr == null
        ? (storageArrLen = 0)
        : (storageArrLen = storageArr.length);

      this.$eventBus.$emit("emitCartUpdate", storageArrLen);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/all.scss";

.project-row-in-cart {
  height: 150px;
  @include media-breakpoint-down(md) {
    height: 250px;
  }
}
.project-row-in-checkout {
  height: 150px;
  @include media-breakpoint-down(md) {
    height: 150px;
  }
}
.router-link {
  color: black;
  .project-avatar-block {
    width: 135px;
    height: 80px;
    overflow: hidden;
    .project-avatar {
      height: 100%;
    }
  }
  .project-name {
    font-weight: 600;
    color: $deep-teal;
    @include media-breakpoint-down(md) {
      font-size: 15px;
    }
  }
  .project-name-booking-date {
    font-size: 14px;
    @include media-breakpoint-down(md) {
      font-size: 13px;
    }
  }
}
.adjust-num-title {
  font-size: 14px;
}
.project-final-price {
  color: darkred;
  @include media-breakpoint-down(md) {
    font-size: 16px;
  }
}
.delete-single-project-icon {
  color: black;
}
.project-divider {
  height: 30px;
}
</style>