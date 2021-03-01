<template>
  <!-- 結帳區域開始 -->
  <section class="row">
    <div class="col-12">
      <form action="" method="post">
        <div class="card mb-5">
          <div class="card-header">
            <h5>第二步：填寫訂購資訊</h5>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
              />
              <label class="form-check-label" for="inlineCheckbox1"
                >同登入會員資訊</label
              >
            </div>
          </div>
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-2">
                <label for="inputMainName">訂購人姓名</label>
                <input
                  type="text"
                  id="inputMainName"
                  class="form-control"
                  placeholder="訂購人姓名"
                />
              </div>
              <div class="form-group col-md-2">
                <label for="inputMainPhoneNumber">訂購人手機號碼</label>
                <input
                  type="number"
                  id="inputMainPhoneNumber"
                  class="form-control"
                  placeholder="範例：0933128872"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputMainEmail">訂購人電子信箱</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputMainEmail"
                  placeholder="範例：Hello-World@email.com"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-2">
                <label for="inputSubName">緊急聯絡人姓名</label>
                <input
                  type="text"
                  id="inputSubName"
                  class="form-control"
                  placeholder="緊急聯絡人姓名"
                />
              </div>
              <div class="form-group col-md-2">
                <label for="inputSubPhoneNumber">緊急聯絡人手機號碼</label>
                <input
                  type="number"
                  id="inputSubPhoneNumber"
                  class="form-control"
                  placeholder="範例：0933128872"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputSubEmail">緊急聯絡人電子信箱</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputSubEmail"
                  placeholder="範例：Hello-World@email.com"
                />
              </div>
            </div>
            <hr />
            <div class="form-row">
              <div class="form-group col-md-2">
                <label for="inputCardName">持卡人姓名</label>
                <input
                  type="text"
                  id="inputCardName"
                  class="form-control"
                  placeholder="持卡人姓名"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputCardNumber">信用卡卡號</label>
                <input
                  type="text"
                  id="inputCardNumber"
                  class="form-control"
                  placeholder="0000-0000-0000-0000"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-2">
                <label for="inputCardNumber">有效期</label>
                <input
                  type="text"
                  id="inputCardNumber"
                  class="form-control"
                  placeholder="範例：08/25"
                />
              </div>
              <div class="form-group col-md-2">
                <label for="inputCardCVV">安全碼（CVV）</label>
                <input
                  type="number"
                  id="inputCardCVV"
                  class="form-control"
                  placeholder="卡片背面三碼"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h5>第三步：填寫聯絡資訊</h5>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
              />
              <label class="form-check-label" for="inlineCheckbox1"
                >同訂購人資訊（全部）</label
              >
            </div>
          </div>
          <div class="card-body">
            <div
              class="projectBlock"
              v-for="(project, index) in confirmProjectsArr"
              :data-id="
                project.bookingProjectId + '-' + project.bookingProjectDate
              "
              :key="index"
            >
              <span class="id">{{ project.bookingProjectId }}</span
              >, <span class="date">{{ project.bookingProjectDate }}</span
              >,<span class="people2">{{
                project.bookingProjectNumOfPeople
              }}</span>

              <div class="col">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label class="form-check-label" for="inlineCheckbox1"
                  >同訂購資訊（個案）</label
                >
              </div>

              <div class="form-row">
                <div class="form-group col-md-2">
                  <label :for="'inputMainName' + (index + 1)"
                    >主要聯絡人姓名</label
                  >
                  <input
                    type="text"
                    :id="'inputMainName' + (index + 1)"
                    class="form-control"
                    placeholder="主要聯絡人姓名"
                  />
                </div>
                <div class="form-group col-md-2">
                  <label :for="'inputMainPhoneNumber' + (index + 1)"
                    >訂購人手機號碼</label
                  >
                  <input
                    type="number"
                    :id="'inputMainPhoneNumber' + (index + 1)"
                    class="form-control"
                    placeholder="範例：0933128872"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label :for="'inputMainEmail' + (index + 1)"
                    >訂購人電子信箱</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    :id="'inputMainEmail' + (index + 1)"
                    placeholder="範例：Hello-World@email.com"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-2">
                  <label :for="'inputSubName' + (index + 2)"
                    >緊急聯絡人姓名</label
                  >
                  <input
                    type="text"
                    :id="'inputSubName' + (index + 2)"
                    class="form-control"
                    placeholder="緊急聯絡人姓名"
                  />
                </div>
                <div class="form-group col-md-2">
                  <label :for="'inputSubPhoneNumber' + (index + 2)"
                    >緊急聯絡人手機號碼</label
                  >
                  <input
                    type="number"
                    :id="'inputSubPhoneNumber' + (index + 2)"
                    class="form-control"
                    placeholder="範例：0933128872"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label :for="'inputSubEmail' + (index + 2)"
                    >緊急聯絡人電子信箱</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    :id="'inputSubEmail' + (index + 2)"
                    placeholder="範例：Hello-World@email.com"
                  />
                </div>
              </div>
              <hr v-if="index < confirmProjectsArr.length - 1" />
            </div>
          </div>
        </div>
        <input type="submit" value="立即結帳" class="btn btn-primary mt-5" />
      </form>
    </div>
  </section>
  <!-- 結帳區域結束 -->
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["confirmProjectsArr"],
  created() {
    console.log(this.$router.currentRoute);
  },
};
</script>

<style lang="scss" scoped>
</style>