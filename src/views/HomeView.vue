<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      aaa: 'value',
    };
  },
  components: {
  },
  mounted(){
      // this.aaa=this.$http
  
      // // console.log(this.$http.http);
      // let data={
      //   id:'9001',
      //   limit:'10'
      // }
      // this.$axios({
      //   method:'get',
      //   url:this.$http+'/personalized/newsong?limit=10',
      //   data:''
      // })
      // .then(res=>{
      //   console.log(res.data);
      // })

      // this.$axios({
      //   method:'get',
      //   url:this.$http+'/song/url?id=1970559930',
      //   data:''
      // })
      // .then(res=>{
      //   console.log(res.data);
      // })

        // window.open('../../public/index222.html')
      
      // window.open(this.$http)
      // 
  }
}
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  .home_title{
    height: 75px;
    background: #C20C0C;
  }
  .home_nav{
    height: 70px;
    background: #242424;
    color: #fff;
  }
  .innn{
    width: 100%;
    height: 100%;
  }
}
</style>