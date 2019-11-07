 <template>
  <div class="listDetailBox">
    <table border="1px" width="600px">
      <tr class="headtr">
        <td style="width:30%;">音乐标题</td>
        <td style="width:30%">歌手</td>
        <td style="width:30%">专辑</td>
        <td style="width:10%">时长</td>
      </tr>
      <tr v-for="item in musicListData" :key="item.id" @dblclick="playMusic(item)">
        <td :class="{'red':musicQueue[curIndx]&&item.id==musicQueue[curIndx].id?true:false}">{{ item.name }}</td>
        <td>{{ item.singer }}</td>
        <td>{{ item.al.name }}</td>
        <td>{{ item.dt |millisecondToDate }}</td>
      </tr>
    </table>
  </div>
</template>

  <script>
import { timeToDate } from "../../util/timeToDate";
export default {
  name: "",
  data() {
    return {
      listID: 0, //榜单id
      musicListData: [] //榜单里的音乐集合
    };
  },
  filters: {
    millisecondToDate(time) {
      return timeToDate(false, time);
    }
  },
  created() {
    this.listID = this.$route.query.id;
    this.$axios({
      method: "get",
      url: "http://localhost:3000/playlist/detail?id=" + this.listID
    })
      .then(response => {
        this.musicListData = response.data.playlist.tracks;
        this.musicListData.forEach(function(value, key) {
          value.singer = "";
          value.ar.forEach(function(val, k) {
            value.singer += val.name + "/";
          });
          value.singer = value.singer.substr(0, value.singer.length - 1);
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    playMusic(item) {
      // TODO
      console.log("点击");
      console.log("当前点击是列表的第几首" + this.musicListData.indexOf(item));
      console.log(item);
      let musicObj = {
        listID: this.listID,
        lists: this.musicListData,
        nowID: this.musicListData.indexOf(item)
      };
      this.$store.commit("addMusicQueue", musicObj);
      this.$store.dispatch("getUrl");
      console.log(this.$store.state.Music.musicQueue);
    }
  },
   computed: {
      curIndx() {
      return this.$store.state.Music.curIndx;
    },
     musicQueue() {
      console.log("获取state里的队列");
      console.log(this.$store.state.Music);
      return this.$store.state.Music.musicQueue;
    }
   }
};
</script>

  <style  scoped>
.listDetailBox {
  padding: 48px 96px 100px 96px;
  width: 100%;
}
.listDetailBox table {
  width: 100%;
  cursor: pointer;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
  border: 1px solid rgb(224, 224, 224);
  text-align: center;
  border-left: none;
  border-right: none;
}

table td {
  text-align: left;
  font-size: 14px;
  padding: 5px 10px;
  border-left: none;
  border-right: none;
  height: 30px;
}
.headtr td {
  padding: 13px 10px;
  font-weight: bolder;
  background: rgb(250, 250, 250);
}
.red{
  color: red;
}
</style>