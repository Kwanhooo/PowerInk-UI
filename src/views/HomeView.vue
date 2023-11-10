<script>
import TopBar from "@/components/TopBar.vue";
import StatusPanel from "@/components/StatusPanel.vue";
import ControlPanel from "@/components/ControlPanel.vue";

export default {
  name: 'HomeView',
  components: {ControlPanel, StatusPanel, TopBar},
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<template>
  <div id="home-view-wrapper">
    <TopBar/>
    <StatusPanel style="margin-top: 25px;width: 70%;"/>
    <ControlPanel style="margin-top: 25px;width: 70%"/>
  </div>
</template>

<style scoped>
#home-view-wrapper {
  background-image: url("@/assets/img/wallpaper.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 75px;
}
</style>
