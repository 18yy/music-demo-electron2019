<template>
  <el-breadcrumb class="app-breadcrumb toolbar" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path">
      <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "toolBar-page",
  data() {
    return {
      levelList: null
    };
  },
  methods: {
    /**
     * 生成面包屑的方法
     */
    getBreadcrumb() {
      console.log("jaishi");
      let matched = this.$route.matched.filter(item => item.name);
      console.log(matched[0]);
      const first = matched[0];
      if (
        first &&
        first.name !== "landing-page" &&
        first.meta.title !== "主页"
      ) {
        matched = [{ path: "/", meta: { title: "主页" } }].concat(matched);
      }
      this.levelList = matched;
      console.log(matched);
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  }
};
</script>

<style  scoped>
.toolbar {
  padding: 18px 0 0 48px;
}
</style>