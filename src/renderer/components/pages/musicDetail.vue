<template>
  <div class="musicDetailmain">
    <img :src="musicQueue[curIndx].al.picUrl" />
    <div class="wordBox">
      <h2  @click="myclick">{{musicQueue[curIndx].name}}</h2>
      <div class="subtile">
        <p>专辑：{{musicQueue[curIndx].al.name}}</p>
        <p>歌手：{{musicQueue[curIndx].singer}}</p>
      </div>
      <div class="wordScrollBox">
        <el-scrollbar ref="srollBox">
          <p
            v-for="(value,key,index) in lyricObj"
            :key="index"
            :class="{'highLight':index==lyricIndx?true:false}"
          >{{value.text}}</p>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "musicDetail-page",
  data() {
    return {};
  },
  computed: {
    curIndx() {
      return this.$store.state.Music.curIndx;
    },
    musicQueue() {
      return this.$store.state.Music.musicQueue;
    },
    lyricObj() {
      return this.$store.state.Music.lyricObject;
    },
    curTime() {
      return parseInt(this.$store.state.Music.curTime);
    },
    lyricIndx() {
      return this.$store.state.Music.lyricIndx;
    }
  },
  methods:{
    //TODO
    myclick(){
      this.$nextTick(() => {
        console.log( this.$refs.srollBox.$el)
       this.$refs.srollBox.$el.scrollTop = '200px';
     })
    }
  }
};
</script>

<style>
.musicDetailmain {
  padding: 80px 96px 0 96px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.musicDetailmain img {
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
  font-size: 12px;
}
.wordScrollBox {
  width: 100%;
  height: 65%;
  font-size: 12px;
  line-height: 26px;
  padding-top: 6px;
}
.el-scrollbar {
  height: 100%;
}
.wordScrollBox .el-scrollbar__wrap {
  overflow-x: hidden !important;
  width: 100%;
}
.highLight {
  color: #ccc;
}
</style>