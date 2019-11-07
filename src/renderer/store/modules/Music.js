import axios from 'axios'
const state = {
  musicQueue: [], //音乐播放列表
  curListID: 0,//当前的榜单id
  curIndx: 0, //当前播放第几首歌
  songObj: null,
  allTime: 0, //当前歌曲的总时长
  curTime: 0,//当前播放的时间
  curVolume: null //当前音量
}


const mutations = {
  addMusicQueue(state, musicObj) {
    let cloneMusicObj = JSON.parse(JSON.stringify(musicObj));
    state.curListID = cloneMusicObj.listID;
    state.musicQueue = cloneMusicObj.lists;
    state.curIndx = cloneMusicObj.nowID;
    state.allTime = state.musicQueue[state.curIndx].dt;
    console.log('vuex中的总时长');
    console.log(state.allTime);
    console.log(state.curTime)
  },
  createSong(state, url) {
    console.log('一开始的');
    if (state.songObj instanceof Audio) {

      state.songObj.pause();
      state.songObj = null;

    }
    state.songObj = new Audio(url)

  },
  computeCurTime(state){
    if(state.songObj.currentTime >= state.allTime){
      state.curTime = state.allTime;
    }
    state.curTime = state.songObj.currentTime;
  },
  pre(state){
    console.log('点击上一首当前是'+state.curIndx);
    if (state.musicQueue.length == 0 || state.curIndx == 0){
      return
    } else{
      state.curIndx--;
    }
   
  },
  next(state){
      if (state.musicQueue.length == 0 ) return
      if(state.curIndx == state.musicQueue.length - 1){
        state.curIndx=0;
      } else{
        state.curIndx++
      }
      
  },
  changeVolume(state,val){
    if(val){
      console.log('当前拖动'+val)
      state.curVolume = val/100;
    }
    if(state.curVolume!== null){
      if (state.songObj instanceof Audio) {
        state.songObj.volume= state.curVolume
        console.log('当前音量'+state.songObj.volume)
      }
    }
  }
}

const actions = {
  getUrl({ dispatch,commit, state }) {
    if (state.musicQueue.length > 0) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/song/url?id=' + state.musicQueue[state.curIndx].id
      }).then((response) => {
        console.log('geturl')
        console.log(response.data.data[0].url)
        let curUrl = response.data.data[0].url;
        commit('createSong', curUrl)
        state.songObj.addEventListener('canplay', () => {
          console.log('缓冲完' + curUrl + state.songObj.paused)
          dispatch('play')

        });
      })
    }
  },
  play({dispatch,commit, state}) {
    console.log('按play键');
    if (state.songObj.paused) {
      console.log('play')
      state.songObj.play();
      commit('changeVolume');
      dispatch('getCurTime');
      dispatch('endToNext');
    } else {
      console.log('paused')
      state.songObj.pause()
    }
  },
  getCurTime({ commit, state}) {
    console.log('getcurtime');
    console.log(state.songObj)
    if(state.songObj){
      state.songObj.addEventListener('timeupdate',()=>{
        commit('computeCurTime');
      })
    }
  },
  endToNext({ dispatch,commit, state}) {
    state.songObj.addEventListener('ended',()=>{
      commit('next');
      dispatch('getUrl')
    })
  }
}

export default {
  state,
  mutations,
  actions
}