<template>
  <div id="bar">
    <div class="musicDetail">
      <img src="https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg" alt="">
      <div class="detailBox" v-if="musicQueue.length>0">
        <p class="musicNameBox">
          <span class="musicName">{{musicQueue[0].name}}</span>
          <span>-</span>
          <span>泊松</span>
        </p>
        
        <div class="musicTime">
          00:00/03:12
        </div>
      </div>
    </div>
    <div class="musicControl">
      <button class="lastBtn">上一首</button>
      <button class="playBtn" @click="playMusic">play</button>
      <button class="nextBtn">下一首</button>
    </div>
    <div class="volumeControl">
      <p>音量调节</p>
    </div>
  </div>
</template>

<script>


  export default {
      name: 'bar',
      data(){
        return {
          defaultMusic:{
            name:'无'
          }
        }
      },
      methods:{
        playMusic(){
          console.log('点击按钮')
          this.$store.commit('play');
        }
      },
      computed:{
        musicQueue(){
          console.log('获取state里的队列')
          console.log(this.$store.state.Music)
          return this.$store.state.Music.musicQueue;
        }
      }
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
    display: flex;
    justify-content: space-between;
    align-items: center
   }
  .musicDetail,.volumeControl{
    width: 30%;
  }
  .musicDetail{
    display: flex;
    align-items: center;
    padding-left: 48px;
  }
  .musicDetail img{
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: pink;
    margin-right: 1em;
  }
  .detailBox{
    flex: 1;
  }
  .musicNameBox span:first-child {
    color: #313030;
    font-size: 14px;
  }
  .musicNameBox{
    padding-top: 5px;
    font-size: 12px;
    color:#ccc;
  }
  .musicTime{
    padding-top: 6px;
    color:  #313030;
    font-size: 14px;
  }
  .musicControl button{
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    border-radius: 5px;
    background: white;
    border: 1px solid rgb(228, 224, 224);
    color: rgb(53, 52, 52);
    cursor: pointer;
  }
</style>
