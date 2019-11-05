<template>
  <div id="wrapper">
    <listsPage :playlists="playlists"></listsPage>
    <!-- <listDetail></listDetail> -->
    
    <playBar></playBar>
  </div>
</template>

<script>
  import playBar from './playBar/bar'
  import listsPage from './pages/lists'
  import listDetail from './pages/listDetail'


  export default {
    name: 'landing-page',
    components: { 
      playBar,
      listsPage,
      listDetail
    },
    data(){
      return {
        playlists: [],
        tableData2: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      
    },
    created(){
       this.$axios({
          method:'get',
          url:'http://localhost:3000/toplist/detail'
        }).then((response) =>{        
          console.log(response.data.list);
          this.playlists = response.data.list;      
        }).catch((error)=>{
          console.log(error)
        })
      }
  }
</script>

<style scoped>
  #wrapper {
    height: 100vh;
    width: 100vw;
  }
  
</style>
