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
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click.prevent="modalData.reaction"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["modalData"],
};
</script>