import { getMusicUrl, getMusicIyric } from "../../server/api"
import { parseLyric } from "../../util/util"
const state = {
  musicQueue: [], //音乐播放列表
  curListID: 0,//当前的榜单id
  curIndx: 0, //当前播放第几首歌
  songObj: null, //单曲对象
  allTime: 0, //当前歌曲的总时长
  curTime: 0,//当前播放的时间
  curVolume: null,//当前音量
  lyricObject: null, //歌词对象
  lyricIndx: 0, //当前唱到第几句
  isPlay: false //是否在播歌
}


const mutations = {
  addMusicQueue(state, musicObj) {
    let cloneMusicObj = JSON.parse(JSON.stringify(musicObj));
    state.curListID = cloneMusicObj.listID;
    state.musicQueue = cloneMusicObj.lists;
    state.curIndx = cloneMusicObj.nowID;
    state.allTime = state.musicQueue[state.curIndx].dt;
  },
  createSong(state, url) {
    if (state.songObj instanceof Audio) {
      state.songObj.pause();
      state.songObj = null;
    }
    state.songObj = new Audio(url)
  },
  computeCurTime(state) {
    if (state.songObj.currentTime >= state.allTime) {
      state.curTime = state.allTime;
    }
    state.curTime = state.songObj.currentTime;
  },
  pre(state) {
    if (state.musicQueue.length == 0 || state.curIndx == 0) {
      return
    } else {
      state.curIndx--;
    }

  },
  next(state) {
    if (state.musicQueue.length == 0) return
    if (state.curIndx == state.musicQueue.length - 1) {
      state.curIndx = 0;
    } else {
      state.curIndx++
    }
  },
  changeVolume(state, val) {
    if (val) {
      state.curVolume = val / 100;
    }
    if (state.curVolume !== null) {
      if (state.songObj instanceof Audio) {
        state.songObj.volume = state.curVolume
      }
    }
  },
  createIyricObj(state, lyricObj) {
    state.lyricObject = lyricObj;
  },
  getIyricIdx(state) {
    let curTimeInt = parseInt(state.curTime);
    if (state.lyricObject[curTimeInt]) {
      state.lyricIndx = state.lyricObject[curTimeInt].line;
    }
  }
  // },
  // getIsPlay(state){
  //    if (state.songObj instanceof Audio) {
  //     state.isPlay = !state.songObj.paused;
  //    }
  // }

}

const actions = {
  getUrl({ dispatch, commit, state }) {
    if (state.musicQueue.length > 0) {
      getMusicUrl((err, res) => {
        console.log('geturl')
        console.log(res.data.data[0].url)
        let curUrl = res.data.data[0].url;
        commit('createSong', curUrl)
        state.songObj.addEventListener('canplay', () => {
          console.log('缓冲完' + curUrl + state.songObj.paused)
          dispatch('play')
        })
      }, state.musicQueue[state.curIndx].id)
    }
  },
  play({ dispatch, commit, state }) {
    // commit('getIsPlay')
    if (state.songObj.paused) {
      state.songObj.play();
      commit('changeVolume');
      dispatch('getCurTime');
      dispatch('endToNext');
      dispatch('getIyric')
    } else {
      state.songObj.pause()
    }
  },
  getCurTime({ commit, state }) {
    if (state.songObj) {
      state.songObj.addEventListener('timeupdate', () => {
        commit('computeCurTime');
        commit('getIyricIdx')
      })
    }
  },
  endToNext({ dispatch, commit, state }) {
    state.songObj.addEventListener('ended', () => {
      commit('next');
      dispatch('getUrl')
    })
  },
  getIyric({ commit, state }) {
    getMusicIyric((err, res) => {
      let lyricObj = parseLyric(res.data.lrc.lyric);
      let line = 0;
      for (let i in lyricObj) {
        lyricObj[i].line = line++;
      }
      commit('createIyricObj', lyricObj)
    }, state.musicQueue[state.curIndx].id)
  }
}

export default {
  state,
  mutations,
  actions
}