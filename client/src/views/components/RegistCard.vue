<template>
  <div class="card pb-4">
    <div class="card-header pb-0 p-3">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h6 class="mb-0">飲酒記録</h6>
        </div>
        <div class="col-6 text-end">
          <argon-button color="success" size="sm" variant="outline" @click="frmCreateAccountPopup.show(true)">
            登録
          </argon-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "invoice-card",
  components: {
    ArgonButton,
  },
};
</script>
