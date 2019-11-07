import axios from 'axios'
const state = {
    musicQueue: [], //音乐播放列表
    curIndx: 0, //当前播放第几首歌
    songObj: null,
    allTime: 0,
    curTime: 0,//当前播放的时间
}

  
const mutations = {
    addMusicQueue(state,item){
        state.musicQueue.push(item);
        state.curIndx=state.musicQueue.length-1;
    },
    play(state){
        if (state.songObj.paused) {
            console.log('play')
            state.songObj.play()
        }else{
            console.log('paused')
            state.songObj.pause()
        }
    },
    createSong(state, url){
        console.log('一开始的');
        console.log(state.songObj.url)
        if(state.songObj instanceof Audio){
            
            state.songObj.pause();
            state.songObj = null;
          
        }
            state.songObj = new Audio(url)
        
    }
}
  
const actions = {
    getUrl({commit,state}){
        if (state.musicQueue.length > 0) {
            // if(state.songObj){
            //     state.songObj.pause();
            //     state.songObj = null;
            //   }
            
            axios({
            method:'get',
            url:'http://localhost:3000/song/url?id='+state.musicQueue[state.curIndx].id
            }).then((response) =>{

                let curUrl = response.data.data[0].url;
                commit('createSong',curUrl)
               // console.log(state.songObj);
                // if (state.songObj==null) {
                //     state.songObj = new Audio(curUrl)
                //   } else {
                //     state.songObj.src =curUrl
                   
                //   }
                // state.songObj.paused = false;
                // state.songObj.src =curUrl
                //   console.log(state.songObj);
                state.songObj.addEventListener('canplay',()=>{
                console.log('缓冲完'+curUrl+state.songObj.paused)
                    commit('play')
                
                });
            })
        }
    }
}
  
export default {
    state,
    mutations,
    actions
}