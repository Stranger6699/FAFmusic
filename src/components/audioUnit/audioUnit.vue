<template>
  <div class="audioUnti" v-show="MusicUnitBox">
    <div class="speedBox">
      <p class="MusicTitle">
        <span class="MusicName" title="歌曲名称"><b v-if="(speedVal < 0.2)" class="login el-icon-loading"></b
        >{{ MusicNameVal }}</span
        ><span class="MusicAuthor" title="歌手"
          >{{ MusicAuthorVal
          }}</span>
      </p>
      <el-slider
        :show-tooltip="false"
        :step="0.01"
        v-model="speedVal"
        @mousedown.native="clearTimr()"
        @change="setTime()"
      ></el-slider>
      <p class="MisucTime">
        <span style="color:#a1a1a1">{{ transTime(Math.floor((MusicTimeAll * speedVal) / 100)) }}</span>
         /
        <span style="color:#797979">{{ time }}</span>
      </p>
    </div>
    <div class="www">
      <audio ref="audioMu" controls autoplay loop :src="url"></audio>
      当前播放时间：{{ nowTime }}秒 ==
      <!-- <el-button @click="getUrl()">获取url</el-button> -->
      <!-- <el-button @click="getMuTime()">同步播放时间</el-button> -->
      当前播放进度：{{ speedVal }}%
    </div>
  </div>
</template>
  
<script>
let timer = null;
export default {
  name: "audioUnti",
  data() {
    return {
      bbb: 1,
      MusicUnitBox: true,
      MusicNameVal: "歌曲名称",
      MusicAuthorVal: "歌手",
      speedVal: 0,
      url: "",
      muList: [],
      time: "00:00",
      nowTime: "0",
      nowTimer: "00:00",
      MusicTimeAll: "0",
    };
  },
  components: {},
  methods: {
    blll() {
      let aaa = this.$store.state.musicList;
      this.bbb++;
      aaa.push(this.bbb);
      this.$store.commit("musicList", aaa);
      //   console.log(this.$store.state.musicList);
    },
    gettMu() {
      this.api
        .postFormAPIMS({}, "/playlist/track/all?id=24381616&limit=10&offset=1")
        .then((res) => {
          this.muList = res.data.songs;
        })
        .catch((err) => console.log(err));
    },
    getUrl(red) {
      this.api
        .postFormAPIMS({}, "/song/url/v1?id=" + red.id + "&level=exhigh")
        .then((res) => {
          this.MusicNameVal = red.name;
          this.MusicAuthorVal = red.ar[0].name;

          this.url = res.data.data[0].url;
          this.MusicTimeAll = res.data.data[0].time;
          var cha = new Date(this.MusicTimeAll);
          var tian = 24 * 60 * 60 * 1000,
            shi = 60 * 60 * 1000,
            fen = 60 * 1000,
            miao = 1000;
          var ti = Math.floor(cha / tian);
          var sh = Math.floor((cha % tian) / shi);
          var fe = Math.floor((cha % shi) / fen);
          var mi = Math.floor((cha % fen) / miao);
          this.time = `${this.setZero(fe)}:${this.setZero(mi)}`;
          this.timeMiao = Math.floor(this.MusicTimeAll / miao);
          // this.$refs.audioMu.play()
          this.clearTimr();
          this.setTime();
        })
        .catch((err) => console.log(err));
    },
    setZero(e) {
      if (e < 10) {
        return "0" + e;
      } else {
        return e;
      }
    },
    transTime(e) {
      var cha = new Date(e);
      var tian = 24 * 60 * 60 * 1000,
        shi = 60 * 60 * 1000,
        fen = 60 * 1000,
        miao = 1000;
      var ti = Math.floor(cha / tian);
      var sh = Math.floor((cha % tian) / shi);
      var fe = Math.floor((cha % shi) / fen);
      var mi = Math.floor((cha % fen) / miao);
      return `${this.setZero(fe)}:${this.setZero(mi)}`;
    },
    getMuTime() {
      timer = setInterval(() => {
        this.nowTime = this.$refs.audioMu.currentTime;
        this.nowTimer = this.transTime(Math.floor(this.nowTime * 1000));
        this.speedVal = Number(
          ((Number(this.nowTime) / Number(this.timeMiao)) * 100).toFixed(2)
        );
      }, 100);
    },
    setTime() {
      this.$refs.audioMu.currentTime = (this.speedVal / 100) * this.timeMiao;
      this.getMuTime();
    },
    clearTimr() {
      clearInterval(timer);
    },
  },
  mounted() {
    this.gettMu();
    if (this.$route.path == "/" || this.$route.path == "/login") {
      this.MusicUnitBox = false;
    }
  },
  watch: {
    "$store.state.musicList"(newVal, oldVal) {
      //对数据执行操作
      // console.log(newVal, oldVal);
      this.getUrl(newVal[0]);
    },
    $route(to, from) {
      console.log(from.path); // 从哪来
      console.log(to.path); // 到哪去
      let sel = setTimeout(() => {
        if (to.path == "/" || to.path == "/login") {
          this.MusicUnitBox = false;
        } else {
          this.MusicUnitBox = true;
        }
      }, 10);
    },
  },
};
</script>
  
<style lang="less" scoped>
.audioUnti {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 60px;
  background: #242424;
  .speedBox {
    width: calc(100% - 900px);
    min-width: 800px;
    margin: auto;
    position: relative;
    /deep/.el-slider__runway {
      margin: 0;
    }
    .MusicTitle {
      height: 22px;
      width: 100%;
      margin-bottom: 15px;
      .MusicName {
        font-size: 13px;
        color: #fff;
        cursor: pointer;
      }
      .MusicAuthor {
        font-size: 12px;
        color: #fffccc;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .MisucTime {
      color: #fff;
      font-size: 12px;
      display: inline;
      position: absolute;
      right: -88px;
      bottom: -3px;
    }
    /deep/.el-slider__button {
      border: 4px solid #fff;
      height: 10px;
      width: 10px;
      background-color: #ccc;
    }
    /deep/.el-slider__button-wrapper {
      .dragging {
        background-color: #c20c0c;
      }
    }
    /deep/.el-slider__bar {
      background-color: #c20c0c;
    }
  }
  .www {
    position: absolute;
    bottom: 60px;
    width: 100%;
    left: 0;
  }
}
</style>