<template>
  <!-- 頁腳開始 -->
  <footer class="container-fluid position-relative">
    <div class="container">
      <div id="footer-row-01" class="row d-lg-block px-5">
        <!-- 聯絡資訊清單開始 -->
        <div
          id="footer-contact-info"
          class="float-lg-left col-lg-5 h-lg-100 col-md-6"
        >
          <ul class="contact-info-list mt-2 ml-2">
            <!-- 聯絡資訊項目開始 -->
            <li v-for="(info, key) in contactInfo" :key="key" class="mb-4">
              <div
                class="d-inline-flex align-items-center"
                @click="contactInfo[key].onClickEvent"
              >
                <div
                  class="contact-icon-block d-inline-flex justify-content-center align-items-center mr-3"
                >
                  <i
                    class="contact-icon"
                    :class="contactInfo[key].iconClass"
                  ></i>
                </div>
                <div
                  v-html="contactInfo[key].innerHTML"
                  class="contact-text-block d-inline-flex"
                  @click="contactInfo[key].onClickEvent"
                ></div>
              </div>
            </li>
            <!-- 聯絡資訊項目結束 -->
          </ul>
        </div>
        <!-- 聯絡資訊清單結束 -->
        <!-- 企業格言開始 -->
        <div
          id="footer-Kapitans-mission"
          class="float-lg-left h-lg-50 pt-lg-1 col-lg-7 col-md-6 my-md-0 my-3"
        >
          <h5>甲必丹的使命</h5>
          <p>
            「來到這裡的每個人，都能以最優雅的姿態、最愉快的體驗，繼承先祖們的冒險精神。感受深藏在我們基因中的『甲必丹』情懷。」
            ── 甲必丹執行長 · 鄭賢之
          </p>
        </div>
        <!-- 企業格言結束 -->
        <!-- 社群連結與訂閱電子報開始 -->
        <div
          id="footer-row-for-community-and-edm"
          class="float-lg-left h-lg-50 col-lg-7 col-md-12 mt-sm-4"
        >
          <div class="row">
            <!-- 社群連結開始 -->
            <div
              id="footer-community-links"
              class="col-sm-6 col-xs-12 mb-md-0 mb-3"
            >
              <h6 class="mb-3">在社群網站上追蹤甲必丹</h6>
              <ul class="community-link-list d-flex flex-row">
                <li
                  class="d-flex justify-content-center align-items-center"
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
            <div id="footer-subscribe-edm" class="col-sm-6 col-xs-12">
              <h6 class="mb-3">或訂閱我們的電子報</h6>
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="請輸入電子信箱..."
                  v-model="subscribeEMAIL"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button
                    class="btn"
                    type="button"
                    @click.prevent="subscribeEDM"
                  >
                    訂閱
                  </button>
                </div>
              </div>
            </div>
            <!-- 訂閱電子報結束 -->
          </div>
        </div>
        <!-- 社群連結與訂閱電子報結束 -->
      </div>
    </div>
    <div class="container">
      <hr />
      <div class="row px-sm-4">
        <!-- 版權宣言開始 -->
        <div class="col-sm-6 col-12 d-flex align-items-center">
          <h6
            class="fake-copy-right"
            @mouseenter="showFakeCopyRightDescription = true"
            @mouseleave="showFakeCopyRightDescription = false"
          >
            &copy; 2035 Kapitan. all rights reserved.
            <span
              class="fake-copy-right-des text-warning"
              v-show="showFakeCopyRightDescription"
              >（練習作品而已，絕大多數圖文來自網路）</span
            >
          </h6>
        </div>
        <!-- 版權宣言結束 -->
        <!-- 額外連結開始 -->
        <div class="ml-sm-auto ml-3 my-sm-0 my-1">
          <ul
            class="mass-links-list d-flex flex-row align-items-center justify-content-end"
          >
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
          innerHTML: "251 新北市淡水區觀海路201號",
          onClickEvent: function () {
            window.location.href = "https://goo.gl/maps/HDg6TVKTjm6FDMmh8";
          },
        },
        email: {
          iconClass: ["fas", "fa-envelope"],
          innerHTML: "service@Kapitan.com",
          onClickEvent: function () {
            window.open("mailto:service@Kapitan.com");
          },
        },
        phone: {
          iconClass: ["fas", "fa-phone-alt"],
          innerHTML: "（886）2-3345-6789",
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
      subscribeEMAIL: "",
      showFakeCopyRightDescription: false,
      showFakePrivacyPolicy: false,
    };
  },
  methods: {
    // 方法：根據傳入網址前往該地
    linkTo(link) {
      window.location.href = link;
    },
    // 方法：根據使用者輸入的電郵地址，透過 SMTP 模擬電子報訂閱情境
    subscribeEDM() {
      let smtp = this.GlobalVariables.Email;

      smtp.send({
        SecureToken: "5597a7e9-ef70-4269-a166-3747579e805d",
        To: this.subscribeEMAIL,
        From: "Kapitan@service.com",
        Subject: "感謝您訂閱甲必丹電子報！",
        Body:
          "這是一封前端作品的電子報訂閱模擬信。一般情況下，您的電郵地址會被寫入企業資料庫，成為發送名單，直到您取消為止。",
      });
      // .then((message) => alert(message));
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/scss/all.scss";

* {
  color: $sail;
  list-style: none;
}
footer {
  width: 100%;
  padding: 60px 0px 10px;
  background-color: $deep-teal;
  z-index: 15;
  ul {
    padding: 0;
  }
  h5 {
    @include media-breakpoint-down(sm) {
      font-size: 18px;
    }
  }
  h6 {
    @include media-breakpoint-down(sm) {
      font-size: 16px;
    }
  }
  .btn {
    color: $sail;
    background-color: $berry;
    &:hover {
      color: $scuba-blue;
    }
  }
  #footer-row-01 {
    @include media-breakpoint-up(lg) {
      height: 225px;
    }
    .contact-info-list {
      li {
        list-style: none;
        .contact-icon-block {
          width: 45px;
          height: 45px;
          border-radius: 45px;
          background-color: $berry;
          cursor: pointer;
          .contact-icon {
            width: 80%;
          }
          @include media-breakpoint-down(md) {
            width: 35px;
            height: 35px;
            border-radius: 35px;
            svg {
              width: 13px;
              height: 13px;
            }
          }
          @include media-breakpoint-down(sm) {
            width: 30px;
            height: 30px;
            border-radius: 30px;
            svg {
              width: 11px;
              height: 11px;
            }
          }
        }
        .contact-text-block {
          color: $sail;
          font-size: 18px;
          font-weight: 400;
          cursor: pointer;
        }
        .contact-text-block,
        p {
          @include media-breakpoint-down(md) {
            font-size: 16px;
          }
          @include media-breakpoint-down(sm) {
            font-size: 14px;
          }
        }
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
      margin-right: 20px;
      @include media-breakpoint-down(lg) {
        margin-right: 10px;
      }
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
    margin: 0;
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