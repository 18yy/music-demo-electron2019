<template>
  <div id="wrapper">
    <toolBar></toolBar>
    <router-view></router-view>
    <playBar></playBar>
  </div>
</template>

<script>
import playBar from "./toolspages/bar";
import toolBar from "./toolspages/toolbar";
import listsPage from "./pages/lists";
import listDetail from "./pages/listDetail";
import musicDetail from "./pages/musicDetail";

export default {
  name: "landing-page",
  components: {
    playBar,
    listsPage,
    listDetail,
    musicDetail,
    toolBar
  },
  data() {
    return {};
  },
  created() {}
};
</script>

<style scoped>
#wrapper {
  height: 100vh;
  width: 98vw;
}
</style>
