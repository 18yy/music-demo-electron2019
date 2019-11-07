<template>
  <div class="main">
        <router-link :to="{ path: '/listDetail',query:{id:item.id} }" 
        class="list" v-for="item in playlists" :key="item.id">
            <img :src="item.coverImgUrl" alt="">
            <p>{{item.name}}</p>
        </router-link>
  </div>
</template>

<script>


  export default {
      name: 'lists-page',
     data(){
      return {
        playlists: []
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
  .main{
    padding: 48px 96px 80px 96px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .list {
    width: 260px;
    height: 200px;
    border: 1px solid #ccc;
    margin-bottom: 48px;
    cursor: pointer;
    text-decoration: none;
    border-radius: 2px;
  }
  .list img{
    width: 100%;
    height: 70%;
    background: rgb(66,109,171)
  }
  .list p{
    text-decoration: none;
    color:black;
    text-align: center;
    padding-top: 10px;
  }
</style>
