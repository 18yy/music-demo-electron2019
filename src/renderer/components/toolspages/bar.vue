<template>
  <div id="bar">
    
    <div class="musicDetail" v-if="musicQueue.length>0">
      <!-- 默认样式？TODO -->
      <img :src="musicQueue[curIndx].al.picUrl" class="musicPic" />
      <div class="detailBox">
        <p class="musicNameBox">
          <span class="musicName">{{musicQueue[curIndx].name}}</span>
          <span>-</span>
          <span>{{musicQueue[curIndx].singer}}</span>
        </p>

        <div
          class="musicTime"
        >{{ curtime|secondToDate }}/{{ musicQueue[curIndx].dt|millisecondToDate }}</div>
      </div>
    </div>
    <div class="musicDetail" v-else>
      <div class="musicPic"></div>
      <div class="detailBox">
        <p class="musicNameBox"></p>
        <div class="musicTime">00:00/00:00</div>
      </div>
    </div>
    <div class="musicControl">
      <button class="lastBtn" @click="pre">上一首</button>
      <button class="playBtn" @click="playMusic">play</button>
      <button class="nextBtn" @click="next">下一首</button>
    </div>
    <div class="volumeControl">
      <p>音量：</p>
      <el-slider v-model="volumeVal" @change="changeVolume" class="volumeSlider"></el-slider>
    </div>
  </div>
</template>

<script>
import { timeToDate } from "../../util/timeToDate";
export default {
  name: "bar",
  data() {
    return {
      volumeVal: 50
    };
  },
  filters: {
    millisecondToDate(time) {
      return timeToDate(false, time);
    },
    secondToDate(time) {
      return timeToDate(true, time);
    }
  },
  methods: {
    playMusic() {
      console.log("点击按钮");
      this.$store.dispatch("play");
      this.$store.dispatch("getCurTime");
    },
    pre() {
      this.$store.commit("pre");
      this.$store.dispatch("getUrl");
    },
    next() {
      this.$store.commit("next");
      this.$store.dispatch("getUrl");
    },
    changeVolume(val) {
      this.$store.commit("changeVolume",val);
    }
  },
  computed: {
    musicQueue() {
      console.log("获取state里的队列");
      console.log(this.$store.state.Music);
      return this.$store.state.Music.musicQueue;
    },
    curIndx() {
      return this.$store.state.Music.curIndx;
    },
    curtime() {
      return this.$store.state.Music.curTime;
    },
    
  }
};
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
  align-items: center;
}
.musicDetail,
.volumeControl {
  width: 30%;
}
.musicDetail {
  display: flex;
  align-items: center;
  padding-left: 48px;
}
.musicPic {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: pink;
  margin-right: 1em;
}
.detailBox {
  flex: 1;
}
.musicNameBox span:first-child {
  color: #313030;
  font-size: 14px;
}
.musicNameBox {
  padding-top: 5px;
  font-size: 12px;
  color: #ccc;
}
.musicTime {
  padding-top: 6px;
  color: #313030;
  font-size: 14px;
}
.musicControl button {
  padding: 0 10px;
  height: 28px;
  line-height: 28px;
  border-radius: 5px;
  background: white;
  border: 1px solid rgb(228, 224, 224);
  color: rgb(53, 52, 52);
  cursor: pointer;
}
.volumeControl{
  display: flex
}
.volumeSlider {
  width: 50%;
}
.volumeControl p{
  line-height: 38px;
  font-size: 14px;
  color: rgb(53, 52, 52);
  padding: 0 5px;
}
</style>
