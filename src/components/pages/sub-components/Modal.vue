<template>
  <div
    id="modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-label">提示訊息</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p v-html="modalData.situation.message || ''"></p>
        </div>
        <div class="modal-footer">
          <button
            v-for="button in returnButtons"
            :key="button.text"
            :value="button.value"
            type="button"
            class="btn"
            :class="button.class"
            data-dismiss="modal"
            @click.prevent="$eventBus.$emit('emitModalValue', button.value)"
          >
            {{ button.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttos: [
        { type: "gotIt", text: "我知道了", class: ["btn-primary"] },
        { type: "yesNo", text: "是", value: 1, class: ["btn-primary"] },
        { type: "yesNo", text: "否", value: 0, class: ["btn-danger"] },
      ],
    };
  },
  props: ["modalData"],
  computed: {
    returnButtons() {
      let btnArr = [];

      this.buttos.forEach((button) => {
        if (button.type == this.modalData.situation.buttonType)
          btnArr.push(button);
      });

      return btnArr;
    },
  },
};
</script>