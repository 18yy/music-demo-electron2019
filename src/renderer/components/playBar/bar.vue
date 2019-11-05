<template>
  <div id="bar">
    <div class="musicDetail">
      <img src="" alt="">
      <div class="detailBox">
        <p class="musicName">
          世界美好与你环环相扣-泊松
        </p>
        <div class="musicTime">
          00:00/03:12
        </div>
      </div>
    </div>
    <div class="musicControl">
      <button class="lastBtn">上一首</button>
      <button class="playBtn">play</button>
      <button class="nextBtn">下一首</button>
    </div>
  </div>
</template>

<script>


  export default {
      name: 'bar'
  }
</script>

<style scoped>
   #bar {
       width: 100%;
       height: 80px;
       border-top: 1px solid #ccc;
       position: fixed;
       left: 0;
       bottom: 0;
       background: white;
   }
</style>
