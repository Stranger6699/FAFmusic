<template>
  <div class="homeMusic">
    <div class="vue-particles">
      <vue-particles
        class="bgd"
        color="#0099ff"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#0099ff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>
      <div class="music-box" v-loading="bannerLoading">
        <div class="head_box">
          
        </div>
        <div class="mubody">
          <router-view></router-view>
          <p class="musicList" v-for="i in muList" :key="i.id" @click="beginMusic(i)"><img :src="i.al.picUrl" alt="">{{i.name}} <span>{{i.ar[0].name}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeMusic",
  data() {
    return {
      bannerLoading: false,
      muList:[],
      MusicNumber:'1',

    };
  },
  components: {},
  methods: {
    gettMu() {
      // let date = new Date();
      // this.api
      //   .postFormAPIMS({limit:'10'}, "/top/playlist/highquality"+ date.getTime())
      //   .then((res) => {
      //     // this.muList = res.data.songs;
      //     console.log(res);
      //   })
      //   .catch((err) => console.log(err));
      this.api
        .postFormAPIMS({}, "/playlist/track/all?id=2320041657&limit=30&offset=1")
        .then((res) => {
          this.muList = res.data.songs;
        })
        .catch((err) => console.log(err));
    },
    beginMusic(res){
      this.$store.state.musicList=[res]
    }
  },
  mounted() {
    this.gettMu()
  },
  watch:{
    
  }
};
</script>

<style lang="less" scoped>
.homeMusic {
  width: 100%;
  height: 100%;
  .music-box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    .head_box {
      background: #00000063;
      height: 70px;
    }
    .mubody{
      position: relative;
      height: 400px;
      overflow: auto;
      .musicList:hover{
        background: #ccc;
      }
      .musicList{
        cursor: pointer;
        font-size: 14px;
        margin-left: 20px;
        color: #0099ff;
        img{
          width: 40px;
          height: 40px;
          margin-right: 20px;
        }
        span{
          padding-left: 20px;
          color: #000;
        }
      }
    }
  }
  .vue-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    color: #0099ff;
  }
  /deep/.bgd {
    position: absolute;
    width: calc(100% - 3px);
    height: calc(100% - 5px);
    canvas {
      border: none !important;
    }
  }
}
</style>