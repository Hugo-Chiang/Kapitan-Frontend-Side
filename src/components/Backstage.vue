<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import BackstageNavbar from "@/components/pages/admin/sub-components/BackstageNavbar";

export default {
  components: { BackstageNavbar },
};
</script>