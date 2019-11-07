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
        <td>{{ item.name }}</td>
        <td>{{ item.singer }}</td>
        <td>{{ item.al.name }}</td>
        <td>{{ item.dt |millisecondToDate }}</td>
      </tr>
    </table>
  </div>
</template>

  <script>
import { MillisecondToDate } from "../../util/MillisecondToDate ";
export default {
  name: "",
  data() {
    return {
      musicListData: null,
      curIdx: 0,
      curId: 0,
      songObj: null
    };
  },
  filters: {
    millisecondToDate(time) {
      return MillisecondToDate(time);
    }
  },
  created() {
    console.log(this.$route.query);
    let musicId = this.$route.query.id;
    this.$axios({
      method: "get",
      url: "http://localhost:3000/playlist/detail?id=" + musicId
    })
      .then(response => {
        console.log("榜单");
        console.log(response.data.playlist);
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
      console.log("点击");
      console.log(item);
      console.log(this.$store.state.Music.musicQueue);
      this.$store.commit("addMusicQueue", item);
      this.$store.dispatch("getUrl");
      console.log(this.$store.state.Music.musicQueue);
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
  background: rgb(250,250,250)
}
</style>