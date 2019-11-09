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
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (
        first &&
        first.name !== "landing-page" &&
        first.meta.title !== "主页"
      ) {
        matched = [{ path: "/", meta: { title: "主页" } }].concat(matched);
      }
      this.levelList = matched;
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
  padding: 18px 0 10px 48px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  background: white;
  width: 100%;
}
</style>