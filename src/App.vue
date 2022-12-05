<template>
  <div id="app" class="app">
    <router-view/>
    <audioUnit></audioUnit>
  </div>
</template>
<script>
let tiaaa=null
let tibbb=null
// import './assets/js/errorForm'
import audioUnit from '@/components/audioUnit/audioUnit.vue'
export default {
  name: "app",
  components: {
    audioUnit,
  },
  methods: {
    aaaaa(){
      tiaaa=setTimeout(() => {
        let aaa=[]
        aaa=Array.prototype.slice.call(document.getElementsByClassName('is-error'))
        if(aaa.length>0){
          aaa.forEach((i,n) => {
            aaa[n].classList.add('errooor')
            aaa[n].classList.remove('successss')
          });
          this.bbbbb()
          clearTimeout(tiaaa)
        }else{
          this.aaaaa()
        }
      }, 800);
    },
    bbbbb(){
      tibbb=setTimeout(() => {
        let aaa=[]
        aaa=Array.prototype.slice.call(document.getElementsByClassName('is-error'))
        aaa.forEach((i,n) => {
          aaa[n].classList.remove('errooor')
          aaa[n].classList.add('successss')
        });
        this.aaaaa()
        clearTimeout(tibbb)
      }, 800);
    }
  },
  created() {
   
  },
  mounted(){
    this.aaaaa()
  }
};


</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
.app{
  width: 100%;
  height: 100%;
}
.errooor{
    .el-textarea__inner{
      background-color: #f594944b !important;
      transition: all 0.8s;
    }
    .el-input__inner{
      background-color: #f594944b !important;
      transition: all 0.8s;
    }
    .el-range-input{
      background-color: #f5949400 !important;
    }
    .el-radio__inner{
      background-color: #f594944b !important;
      transition: all 0.8s;
    }
  }
  .successss{
    .el-textarea__inner{
      background-color: #fff !important;
      transition: all 0.8s;
    }
    .el-input__inner{
      background-color: #fff !important;
      transition: all 0.8s;
    }
    .el-range-input{
      background-color: #f5949400 !important;
    }
    .el-radio__inner{
      background-color: #fff !important;
      transition: all 0.8s;
    }
  }
</style>
