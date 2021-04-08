<template>
  <main id="home-page" class="container-fluid">
    <!-- 服務形象章節開始 -->
    <section id="chapter-image" class="mb-5">
      <div class="video-container position-relative">
        <iframe
          src="https://www.youtube.com/embed/lkEOK0l7REE?controls=0&showinfo=0&mute=1&rel=0&autoplay=1&loop=1&playlist=lkEOK0l7REE"
          frameborder="0"
          allowfullscreen
          class="position-absolute"
        ></iframe>
        <h1 id="slogan" class="text-center position-absolute">
          出海吧，台灣人
          <h2 class="text-center mt-2">喚醒冒險熱情×重啟親海基因</h2>
        </h1>
      </div>
    </section>
    <!-- 服務形象章節結束 -->
    <!-- 方案輪播章節開始 -->
    <section id="chapter-carousel" class="container position-relative mx-auto">
      <div class="row">
        <div class="col-12">
          <h2 class="chapter-title text-center mb-2">最多元的遊艇行程</h2>
          <h5 class="mx-auto mb-5 text-center">
            自然景觀、文化巡禮、水上活動，一應俱全
          </h5>
          <div
            class="carousel-controls left-arrow d-inline-block position-absolute"
            @click="slideCarousel(1)"
          >
            <i class="fas fa-chevron-left"></i>
          </div>
          <div
            class="carousel-controls right-arrow d-inline-block position-absolute"
            @click="slideCarousel(-1)"
          >
            <i class="fas fa-chevron-right"></i>
          </div>
          <div id="projects-carousel-area" class="position-relative mx-auto">
            <ul
              id="cards-list"
              class="position-absolute d-flex justify-content-between"
            >
              <!-- 方案卡片開始 -->
              <router-link
                v-for="(project, index) in carouselData.carouselProjectsArr"
                :key="project['PROJECT_ID']"
                :data-id="project['PROJECT_ID']"
                :to="{
                  name: '方案',
                  params: {
                    selectedProjectID:
                      carouselData.carouselProjectsArr[index]['PROJECT_ID'],
                  },
                }"
                class="router-link d-block"
              >
                <li class="card" :key="project['PROJECT_ID']">
                  <img
                    class="card-img-top"
                    :src="
                      project['PROJECT_AVATAR_URL'] != null
                        ? GlobalVariables.cloudUrlprefix +
                          project['PROJECT_AVATAR_URL']
                        : GlobalVariables.cloudUrlprefix +
                          GlobalVariables.cloudNoImgUrl
                    "
                    alt="這裡是卡片頂圖"
                  />
                  <div class="card-body position-relative">
                    <h6 class="card-title">
                      {{ project["PROJECT_NAME"] }}
                    </h6>
                    <p class="card-text"></p>
                    <div class="row">
                      <div
                        class="card-people-num col-6 pl-0 position-absolute d-flex align-items-center"
                      >
                        <span class="d-flex align-items-center mr-1">
                          <i class="fas fa-users"></i>
                        </span>
                        <span class="d-inline-block">
                          {{ project["PROJECT_MIN_NUM_OF_PEOPLE"] }} -
                          {{ project["PROJECT_MAX_NUM_OF_PEOPLE"] }}
                        </span>
                      </div>
                      <div
                        class="card-price col-6 pr-0 text-right position-absolute"
                      >
                        每人
                        <span class="price">
                          {{
                            Number(project["PROJECT_ORIGINAL_PRICE_PER_PERSON"])
                              | currency
                              | dollarSign
                          }}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </router-link>
              <!-- 方案卡片結束 -->
            </ul>
            <div id="carousel-pagination-block" class="position-absolute">
              <ul
                id="carousel-pagination"
                class="p-0 m-0 d-flex justify-content-between"
              >
                <li
                  v-for="(page, index) in 4"
                  :class="
                    Math.abs(carouselData.carouselCurrentOffSet) == index
                      ? 'current-page'
                      : ''
                  "
                  :key="index"
                ></li>
              </ul>
            </div>
          </div>
          <!-- 操作按鈕開始 -->
          <router-link :to="{ name: '挑選航程' }">
            <button class="btn btn-primary d-xl-block mx-xl-auto mt-5">
              挑選航程
            </button>
          </router-link>
          <!-- 操作按鈕結束 -->
        </div>
      </div>
    </section>
    <!-- 方案輪播章節結束 -->
    <!-- 服務摘要章節開始 -->
    <section id="chapter-summary" class="container d-flex flex-column">
      <div class="row">
        <div class="col-12">
          <h2 class="chapter-title text-center mb-2">超便捷的預約流程</h2>
          <h5 class="mx-auto mb-5 text-center">三個步驟即能開展您專屬的航程</h5>
          <div id="booking-process" class="d-flex justify-content-between">
            <div
              class="step-block d-flex flex-column"
              :class="index % 2 != 0 ? 'justify-content-center' : ''"
              v-for="(step, index) in bookingProcessData"
              :key="step.name"
            >
              <img
                class="d-block mx-auto"
                :class="index % 2 != 0 ? 'arrow' : ''"
                :src="`${step.iconUrl}`"
                alt=""
              />
              <h4 class="text-center mt-3">{{ step.name }}</h4>
              <p class="align-self-center text-center">
                {{ index % 2 != 0 ? "" : step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 服務摘要章節結束 -->
    <!-- 誘導註冊章節開始 -->
    <section id="chapter-register" class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="chapter-title text-center mb-3">立即註冊會員</h2>
          <h5 class="mx-auto mb-5 text-center">現在就成為一位甲必丹</h5>
          <div class="framework">
            <router-link
              class="router-link d-block position-relative"
              :to="{ name: '登入註冊' }"
            >
              <img
                src="../../assets/img/forestage/home/yacht-party.jpeg"
                alt=""
              />
              <div id="click-register" class="position-absolute">點擊註冊</div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <!-- 誘導註冊章節結束 -->
    <!-- 誘導註冊章節開始 -->
    <!-- <section id="chapter-summary" class="container">
      <h2 class="chapter-title text-center mb-3">合作夥伴</h2>
      <hr />
    </section> -->
    <!-- 誘導註冊章節結束 -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      carouselData: {
        carouselProjectsArr: [],
        carouselCurrentOffSet: 0,
        carouselXaxisPixels: 0,
      },
      bookingProcessData: [
        {
          stepIndex: 0,
          name: "網路預約",
          description: "成為甲必丹會員，在網站上預約非72小時內的行程",
          iconUrl:
            "https://res.cloudinary.com/hugo-chiang/image/upload/v1617864910/Side-Projects/Frontend-Side-Projects-0001-Kapitan/Web-Imgs/nhsu2aebmf51uksv22gr.png",
        },
        {
          stepIndex: 1,
          name: "",
          iconUrl:
            "https://res.cloudinary.com/hugo-chiang/image/upload/v1617865914/Side-Projects/Frontend-Side-Projects-0001-Kapitan/Web-Imgs/hzldarybdbxzfyfmpj5k.png",
        },
        {
          stepIndex: 2,
          name: "獲取憑證",
          description: "獲取系統寄發的預約憑證，48小時內可以取消",
          iconUrl:
            "https://res.cloudinary.com/hugo-chiang/image/upload/v1617864910/Side-Projects/Frontend-Side-Projects-0001-Kapitan/Web-Imgs/nv8pnayasuzeb38p6jij.png",
        },
        {
          stepIndex: 3,
          name: "",
          iconUrl:
            "https://res.cloudinary.com/hugo-chiang/image/upload/v1617865914/Side-Projects/Frontend-Side-Projects-0001-Kapitan/Web-Imgs/hzldarybdbxzfyfmpj5k.png",
        },
        {
          stepIndex: 4,
          name: "開心出遊",
          description: "根據預約憑證前往會合碼頭，盡情享受水上時光",
          iconUrl:
            "https://res.cloudinary.com/hugo-chiang/image/upload/v1617868655/Side-Projects/Frontend-Side-Projects-0001-Kapitan/Web-Imgs/m4zjzxm32nigiosophvt.png",
        },
      ],
    };
  },
  created() {
    window.scrollTo(0, 0);

    // 初始化航程分類與清單
    const randomProjectsListAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryRandomProjectsList.php`;
    const vm = this;

    this.$http.get(randomProjectsListAPI).then((response) => {
      vm.carouselData.carouselProjectsArr = response.data;
    });
  },
  methods: {
    // 方法：根據響應式畫面寬度和輸入方向，移動對應距離的輪播卡片
    slideCarousel(direction) {
      let routerLinks = document.querySelectorAll(".router-link");
      let innerWidth = window.innerWidth;
      let cardWidth = 255;
      let cardPlusSpace = 0;
      let offSet = this.carouselData.carouselCurrentOffSet;

      if (innerWidth > 1200) {
        cardPlusSpace = cardWidth + 100;
      } else if (innerWidth <= 1200 && innerWidth > 960) {
        cardPlusSpace = cardWidth + 95;
      } else if (innerWidth <= 960 && innerWidth > 720) {
        cardPlusSpace = cardWidth + 50;
      } else if (innerWidth <= 720 && innerWidth > 540) {
        cardPlusSpace = cardWidth + 50;
      } else {
        cardPlusSpace = cardWidth + 50;
      }

      if (offSet + direction != -4 || offSet + direction != 1) {
        this.carouselData.carouselCurrentOffSet += direction;
        this.carouselData.carouselXaxisPixels =
          cardPlusSpace * this.returnOffSet;
        let Xaxis = this.carouselData.carouselXaxisPixels;

        for (const routerLink of routerLinks) {
          routerLink.style.transform = `translate3d(${Xaxis}px, 0, 0)`;
        }
      }
    },
  },
  computed: {
    // 計算（方法）：根據輪播所在頁碼索引，於超界時回傳最最大值或最小值
    returnOffSet() {
      let offSet = this.carouselData.carouselCurrentOffSet;
      if (offSet < -3) this.carouselData.carouselCurrentOffSet = -3;
      else if (offSet > 0) this.carouselData.carouselCurrentOffSet = 0;
      else return this.carouselData.carouselCurrentOffSet;

      return this.carouselData.carouselCurrentOffSet;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

$chapter-margin: 120px;

#home-page {
  padding: $desktop-nav-bar-height 0 $main-container-pt;
  .chapter-title {
    font-weight: 700;
    color: $deep-teal;
  }
  #chapter-image {
    opacity: 0.65;
    .video-container {
      overflow: hidden;
      width: 100vw -18px;
      height: 65vh;
      margin-bottom: $chapter-margin;
      iframe {
        width: 100vw;
        height: 100vh;
        transform: translate(-50%, -50%);
        top: 55%;
        left: 50%;
        z-index: -99;
        @media (min-aspect-ratio: 16/9) {
          height: 56.25vw;
        }
        @media (max-aspect-ratio: 16/9) {
          width: 177.78vh;
        }
      }
      #slogan {
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        font-size: 3rem;
        color: $sail;
        text-shadow: 3px 3px 4px black;
      }
    }
  }
  #chapter-summary {
    margin-bottom: $chapter-margin;
    #booking-process {
      padding: 0 180px;
      .step-block {
        // border: 1px solid red;
        width: 150px;
        img {
          height: 60px;
        }
        .arrow {
          height: 40px;
        }
        h4 {
          font-weight: 700;
        }
        p {
          width: 180px;
        }
      }
    }
  }
  #chapter-carousel {
    width: 1140px;
    margin-bottom: $chapter-margin;
    @include media-breakpoint-down(lg) {
      width: 960px;
    }
    @include media-breakpoint-down(md) {
      width: 720px;
    }
    @include media-breakpoint-down(sm) {
      width: 540px;
    }
    @include media-breakpoint-down(xs) {
      width: 100%;
    }
    p {
      width: 500px;
    }
    .carousel-controls {
      font-size: 32px;
      color: $deep-teal;
      transform: translate3d(0%, -50%, 0);
      top: 50%;
      cursor: pointer;
      z-index: 9995;
      &:hover {
        opacity: 0.85;
      }
    }
    .left-arrow {
      left: 30px;
    }
    .right-arrow {
      right: 30px;
    }
    #projects-carousel-area {
      width: 969px;
      height: 400px;
      overflow: hidden;
      @include media-breakpoint-down(lg) {
        width: 609px;
      }
      @include media-breakpoint-down(md) {
        width: 564px;
      }
      @include media-breakpoint-down(sm) {
        width: 259px;
      }
      #cards-list {
        width: 2030px;
        padding: 0;
        @include media-breakpoint-down(lg) {
          width: 2005px;
        }
        @include media-breakpoint-down(md) {
          width: 1780px;
        }
        .router-link {
          width: 255px;
          transition: transform 0.8s cubic-bezier(0.43, 0.195, 0.02, 1);
          .card {
            height: 22rem;
            color: black;
            box-shadow: 1px 1px 1px 0.5px rgba(0, 0, 0, 0.2);
            img {
              width: 100%;
              height: 160px;
              object-fit: cover;
              @include border-top-radius($card-inner-border-radius);
            }
            .card-body {
              height: 75%;
              .card-title {
                font-weight: 600;
              }
              .card-text {
                height: 40%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .card-people-num,
              .card-price {
                bottom: 20px;
              }
              .card-people-num {
                left: 20px;
                font-size: 14px;
              }
              .card-price {
                right: 20px;
                font-size: 14px;
                .price {
                  font-size: 18px;
                  font-weight: 700;
                  color: darkred;
                }
              }
            }
          }
        }
      }
      #carousel-pagination-block {
        transform: translate3d(-50%, 0%, 0);
        left: 50%;
        bottom: 3%;
        #carousel-pagination {
          width: 60px;
          li {
            list-style: none;
            width: 10px;
            height: 10px;
            border-radius: 10px;
            background-color: #dddddd;
          }
          .current-page {
            background-color: black;
          }
        }
      }
    }
  }
  #chapter-register {
    margin-bottom: $chapter-margin;
    .framework {
      width: 100%;
      overflow: hidden;
      .router-link {
        &:hover {
          transform: scale(1.1);
          transition: transform 1.5s;
        }
        img {
          opacity: 0.9;
        }
        #click-register {
          width: 240px;
          height: 80px;
          background: rgba(0, 0, 0, 0.7);
          font-size: 40px;
          font-weight: 700;
          color: $sail;
          line-height: 80px;
          text-align: center;
          transform: translate3d(-50%, -50%, 0);
          top: 50%;
          left: 50%;
        }
      }
    }
  }
}
</style>