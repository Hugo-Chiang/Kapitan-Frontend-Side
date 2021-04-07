<template>
  <main id="home-page" class="container-fluid">
    <section id="chapter-carousel" class="position-relative mx-auto">
      <div
        class="carousel-controls left-arrow d-inline-block position-absolute"
        @click="aa(1)"
      >
        <i class="fas fa-chevron-left"></i>
      </div>
      <div
        class="carousel-controls right-arrow d-inline-block position-absolute"
        @click="aa(-1)"
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
                    <span class="d-inline-block mr-1">
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
    </section>
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
    };
  },
  created() {
    window.scrollTo(0, 0);

    // 因應Heroku休眠機制，所做的後端喚醒行為，並不具備太多意義
    // const api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/WakeUpBackend.php`;

    // this.$http.get(api).then((response) => {
    //   console.log(response.data);
    // });

    // 初始化航程分類與清單
    const randomProjectsListAPI = `${process.env.REMOTE_HOST_PATH}/API/Forestage/QueryRandomProjectsList.php`;
    const vm = this;

    this.$http.get(randomProjectsListAPI).then((response) => {
      vm.carouselData.carouselProjectsArr = response.data;
    });
  },
  methods: {
    aa(para) {
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

      if (offSet + para != -4 || offSet + para != 1) {
        this.carouselData.carouselCurrentOffSet += para;
        this.carouselData.carouselXaxisPixels =
          cardPlusSpace * this.returnOffSet;
        let Xaxis = this.carouselData.carouselXaxisPixels;

        console.log(offSet);
        console.log(Xaxis);

        for (const routerLink of routerLinks) {
          routerLink.style.transform = `translate3d(${Xaxis}px, 0, 0)`;
        }
      }
    },
  },
  computed: {
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

#home-page {
  height: 1000px;
  // padding: $desktop-nav-bar-height + $main-container-pt 0 $main-container-pt;
  padding: 500px 0 $main-container-pt;
  img {
    display: block;
    margin: auto;
  }
  #chapter-carousel {
    border: 1px solid black;
    width: 1140px;
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
    .carousel-controls {
      font-size: 32px;
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
        border: 1ppx solid blue;
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
}
</style>