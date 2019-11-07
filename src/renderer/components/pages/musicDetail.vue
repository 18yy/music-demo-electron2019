<template>
  <div class="main">
    <img src="https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg" alt />
    <div class="wordBox">
      <h2>标题</h2>
      <div class="subtile">
        <p>专辑：听闻余生</p>
        <p>歌手：泊松</p>
      </div>
      <div class="wordScrollBox"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "musicDetail-page"
};
</script>

<style scoped>
.main {
  padding: 48px 96px 80px 96px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.main img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
.wordBox {
  width: 450px;
  height: 90%;
}
.subtile {
  display: flex;
  padding: 10px 0;
}
.subtile p {
  padding-right: 10px;
}
</style>