<template>
  <!-- 頁腳開始 -->
  <footer class=".container-fluid">
    <div class="container">
      <div class="row px-5">
        <div class="col-5">
          <!-- 聯絡資訊清單開始 -->
          <ul class="contact-info-list mt-3 ml-2">
            <!-- 聯絡資訊項目開始 -->
            <li v-for="(info, key) in contactInfo" :key="key">
              <div
                class="d-inline-block"
                @click="contactInfo[key].onClickEvent"
              >
                <div
                  class="contact-icon-block d-inline-flex justify-content-center align-items-center mb-4 mr-2"
                >
                  <i
                    class="contact-icon"
                    :class="contactInfo[key].iconClass"
                  ></i>
                </div>
                <div
                  class="contact-text-block d-inline-flex"
                  @click="contactInfo[key].onClickEvent"
                >
                  {{ contactInfo[key].text }}
                </div>
              </div>
            </li>
            <!-- 聯絡資訊項目結束 -->
          </ul>
          <!-- 聯絡資訊清單結束 -->
        </div>
        <div class="col-7">
          <!-- 企業格言開始 -->
          <div class="about-kapitan mb-5">
            <h5>甲必丹的使命</h5>
            <p>
              「我希望來到這裡的每個人，能以最優雅的姿態、最愉快的體驗，繼承先祖們的冒險精神。感受深藏在我們基因中的『甲必丹』情懷。」
              ── 甲必丹執行長 · 鄭賢之
            </p>
          </div>
          <!-- 企業格言結束 -->
          <div class="row">
            <!-- 社群連結開始 -->
            <div class="col-6">
              <h6 class="mb-3">在社群網站上追蹤甲必丹</h6>
              <ul class="community-link-list d-flex flex-row">
                <li
                  class="mr-4 d-flex justify-content-center align-items-center"
                  v-for="(communityLink, key) in communityLinks"
                  :key="key"
                  @click="linkTo(communityLinks[key].link)"
                >
                  <i :class="communityLinks[key].iconClass"></i>
                </li>
              </ul>
            </div>
            <!-- 社群連結結束 -->
            <!-- 訂閱電子報開始 -->
            <div class="col-6">
              <h6 class="mb-3">或訂閱我們的電子報</h6>
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="請輸入電子信箱..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn" type="button">訂閱</button>
                </div>
              </div>
            </div>
            <!-- 訂閱電子報結束 -->
          </div>
        </div>
      </div>
      <hr />
      <div class="row px-4">
        <!-- 版權宣言開始 -->
        <div class="col-8 d-flex align-items-center">
          <h6
            class="fake-copy-right"
            @mouseenter="showFakeCopyRightDescription = true"
            @mouseleave="showFakeCopyRightDescription = false"
          >
            © 2035 Kapitan. all rights reserved.
            <span
              class="fake-copy-right-des text-warning"
              v-show="showFakeCopyRightDescription"
              >（練習作品而已，絕大多數圖文來自網路）</span
            >
          </h6>
        </div>
        <!-- 版權宣言結束 -->
        <div class="col-1"></div>
        <!-- 額外連結開始 -->
        <div class="col-3">
          <ul class="mass-links-list d-flex flex-row justify-content-end">
            <li
              class="position-relative"
              @mouseenter="showFakePrivacyPolicy = true"
              @mouseleave="showFakePrivacyPolicy = false"
            >
              隱私權政策
              <div
                v-if="showFakePrivacyPolicy"
                class="reminder-bubble position-absolute d-flex justify-content-center align-items-center"
              >
                僅做樣式，無效果
              </div>
            </li>
            <li
              class="ml-3"
              @click="linkTo('https://www.104.com.tw/jobs/main/')"
            >
              加入甲必丹
            </li>
          </ul>
        </div>
        <!-- 額外連結結束 -->
      </div>
    </div>
  </footer>
  <!-- 頁腳結束 -->
</template>

<script>
export default {
  data() {
    return {
      contactInfo: {
        address: {
          iconClass: ["fas", "fa-map-marker-alt"],
          text: "251 新北市淡水區觀海路201號",
          onClickEvent: function () {
            window.location.href = "https://goo.gl/maps/HDg6TVKTjm6FDMmh8";
          },
        },
        email: {
          iconClass: ["fas", "fa-envelope"],
          text: "service@Kapitan.com",
          onClickEvent: function () {
            window.open("mailto:service@Kapitan.com");
          },
        },
        phone: {
          iconClass: ["fas", "fa-phone-alt"],
          text: "（886）2-3345-6789",
          onClickEvent: function () {
            window.open("tel:+886233456789");
          },
        },
      },
      communityLinks: {
        facebook: {
          iconClass: ["fab", "fa-facebook-f"],
          link: "https://www.facebook.com/",
        },
        twitter: {
          iconClass: ["fab", "fa-twitter"],
          link: "https://twitter.com/",
        },
        instagram: {
          iconClass: ["fab", "fa-instagram"],
          link: "https://www.instagram.com/",
        },
        linkedinIn: {
          iconClass: ["fab", "fa-linkedin-in"],
          link: "https://www.linkedin.com/",
        },
      },
      showFakeCopyRightDescription: false,
      showFakePrivacyPolicy: false,
    };
  },
  methods: {
    // 方法：根據傳入網址前往該地
    linkTo(link) {
      window.location.href = link;
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/all.scss";

* {
  color: $kapitan-white;
  list-style: none;
}

ul {
  padding: 0;
}

.btn {
  color: $kapitan-white;
  // background-color: $kapitan-logo;
  background-color: $berry;
  &:hover {
    color: $scuba-blue;
  }
}

footer {
  width: 100%;
  height: 380px;
  padding: 60px 0px;
  background-color: $deep-teal;
  .contact-info-list {
    li {
      list-style: none;
      .contact-icon-block {
        width: 45px;
        height: 45px;
        border-radius: 45px;
        // background-color: $kapitan-logo;
        background-color: $berry;
        cursor: pointer;
        .contact-icon {
          width: 80%;
        }
      }
      .contact-text-block {
        color: orange;
        font-size: 18px;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
  .community-link-list {
    padding: 0%;
    li {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background-color: $midnight;
      font-size: 20px;
      cursor: pointer;
      .fa-instagram {
        font-size: 25px;
      }
    }
  }
  .fake-copy-right-des {
    font-size: 12px;
  }
  .mass-links-list {
    li {
      cursor: pointer;
      .reminder-bubble {
        width: 120px;
        height: 30px;
        background-color: $scuba-blue;
        border-radius: 8px;
        transform: translate3d(-50%, -50%, 0);
        top: -90%;
        left: 50%;
        font-size: 12px;
        color: $midnight;
        &::after {
          content: "";
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 10px 10px 0 10px;
          border-color: $scuba-blue transparent transparent;
          z-index: 1;
          position: absolute;
          transform: translate3d(-50%, -50%, 0);
          top: 100%;
          left: 50%;
        }
      }
    }
  }
}
</style>