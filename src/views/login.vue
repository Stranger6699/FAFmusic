<template>
  <div class="login">
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
      <div class="banner-box" v-loading="bannerLoading">
        <div class="banner-box-img" v-for="(i, n) in list" :key="n">
          <img class="banner-img-bg" :src="i.imageUrl" alt="" />
          <img class="banner-img-bg" :src="i.imageUrl" alt="" />
          <img class="banner-img" :src="i.imageUrl" alt="" />
        </div>
      </div>
      <div class="login-box">
        <el-card class="login-card">
          <div class="titleBox">
            <p>{{title}} <span>网易云音乐账号</span></p>
          </div>
          <el-form ref="form" :rules="rules" class="loginPut" :model="form" label-width="80px">
            <el-form-item label="手机号：" prop="cellphone">
              <el-input size="small" v-model="form.cellphone"></el-input>
            </el-form-item>
            <el-form-item v-if="!verificationWhether" label="密码：" prop="password">
              <el-input size="small" type="password" v-model="form.password"></el-input>
            </el-form-item>
          </el-form>
          <el-form v-if="verificationWhether" ref="formr" :rules="rules" class="loginPut" :model="form" label-width="80px">
            <el-form-item label="验证码：" prop="verificationVal">
              <p>
                <el-input class="verificationPut" style="width:200px" size="small" v-model="form.verificationVal"></el-input>
                <el-button :disabled="verificationDis" class="verificationBtn" size="small" @click="verification()">{{verificationTime}}</el-button>
              </p>
            </el-form-item>
          </el-form>
          <div class="optionBox">
            <el-button size="small" class="loginBtn" @click="login()">登录</el-button>
            <p class="passwordWet text_colorWhite" @click="cellWht()">{{cellWhether}}</p>
          </div>
        </el-card>
      </div>
    </div>
    <Vcode :show="isShow" @success="success" @close="close" />
  </div>
</template>

<script>
let bannerTimer = null;
import Vcode from "vue-puzzle-vcode";
export default {
  name: "loginView",
  data() {
    const phone = (rule, value, callback) => {//
      let text= /^[1][3,4,5,6.7,8,9][0-9]{9}$/
      if (!text.test(value) && value) {
        callback(new Error('请输入正确手机号'))
      } else if(!value){
        callback(new Error('手机号不能为空'))
      } else {
        callback()
      }
    }
    const passwordr = (rule, value, callback) => {//
      if (value.length>32) {
        callback(new Error('密码不能超过32位'))
      } else if(!value){
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      isShow:false,
      form:{
        cellphone: "",
        password:'',
        verificationVal:''
      },
      cellWhether:"验证码登录",
      verificationDis:false,
      verificationWhether:false,
      verificationTime:'获取验证码',
      title:'手机号登录',
      list: [],
      bannerLoading: true,
      activeName: "0",
      imgUrl: "",
      imgState: "",
      imgGetState: false,
      imgShow: false,
      key: "",
      loginNum:true,
      rules:{
        cellphone:[
          { required: true, validator: phone, trigger: 'change'}
        ],
        password:[
          { required: true, validator: passwordr}
        ],
        verificationVal:[
          { required: true, message: '请输入 验证码'}
        ],
      },
    };
  },
  components:{ Vcode  },
  methods: {
    banner() {
      let imgArr = document.getElementsByClassName("banner-box-img");
      // console.log(imgArr);
      let num = 0;
      let bannerTime = setTimeout(() => {
        imgArr[0].style.opacity = "1";
        num++;
        clearTimeout(bannerTime);
      }, 10);
      bannerTimer=setInterval(() => {
        if (num == imgArr.length - 1) {
          imgArr[num - 1].style.opacity = "0";
          imgArr[num].style.opacity = "1";
          num = 0;
        } else if (num == 0) {
          imgArr[num].style.opacity = "1";
          imgArr[imgArr.length - 1].style.opacity = "0";
          num++;
        } else {
          imgArr[num - 1].style.opacity = "0";
          imgArr[num].style.opacity = "1";
          num++;
        }
      }, 5000);
    },
    success(){//验证人机通过后事件
      this.isShow=false
      let date = new Date();
      this.$axios({//获取验证码
        method: "post",
        url: this.$http + "/captcha/sent?phone="+this.form.cellphone+"&"+date.getTime(),
        data: "",
      }).then((res) => {
        // console.log(res.data);
        if(res.data.code==200 && res.data.data==true){
          this.$message({
              message: '发送成功！',
              type: 'success'
          });
          this.loginNum=false
          if(this.verificationTime=='获取验证码' || this.verificationTime=='重新获取'){
            this.verificationTime='重新获取(59)'
            this.verificationDis=true
            let time=59
            let timeVal=setInterval(() => {
              if(time>1){
                time--
                this.verificationTime=`重新获取(${time})`
              }else{
                this.verificationTime=`重新获取`
                this.verificationDis=false
                clearInterval(timeVal)
              }
            }, 1000);
          }
        }else{
          this.$message({
              message: '发送失败,{'+res.data.message+'}，请重新再试！',
              type: 'error'
          });
          this.verificationTime=`重新获取`
        }
      });
    },
    close(){//验证人机失败后事件
      this.isShow=false
      this.$message({
          message: '取消验证！',
          type: 'warning'
      });
    },
    login(){//登录按钮点击后处理事件
      if(this.cellWhether=='验证码登录'){//密码登录
        this.$refs['form'].validate((valid) => {
            if (valid) {
              this.api
              .postFormAPIMS({ua:'pc'}, "/login/cellphone?phone="+this.form.cellphone+"&md5_password="+this.$md5(this.form.password))
              .then((res) => {
                console.log(res)
              })
              .catch((err) => console.log(err));
            }
        })
      }else if(this.cellWhether=='密码登录'){//验证码登录
        this.$refs['form'].validate((valid) => {
          this.$refs['formr'].validate((validr) => {
            if (valid && validr) {
              console.log(111);
              this.api
              .postFormAPIMS({ua:'pc'}, "/login/cellphone?phone="+this.form.cellphone+"&captcha="+this.form.verificationVal)
              .then((res) => {
                console.log(res)
                if(res.data.code==200 && res.data.cookie){
                  this.$message({
                    message:'登陆成功！',
                    type:'success'
                  })
                }
              })
              .catch((err) => console.log(err));
            }
          })
        })
      }
    },
    verification(){//获取验证码按钮事件
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(this.loginNum){//当前页面内获取验证码人机验证只触发一次
            this.isShow=true
          }else{//当前页面内重新获取验证码直接发送
            this.success()
          }
        }
      })
    },
    cellWht(){
      // this.$refs['form'].clearValidate()
      if(this.verificationWhether){
        this.cellWhether='验证码登录'
      }else{
        this.cellWhether='密码登录'
      }
      this.verificationWhether=!this.verificationWhether
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getKey() {
      let date = new Date();
      this.$axios({
        method: "get",
        url: this.$http + "/login/qr/key?" + date.getTime(),
        data: "",
      }).then((res) => {
        // console.log(this.$md5("123"), "--------");
      });
    },
  },
  mounted() {
    clearInterval(bannerTimer)
    this.getKey();
    let data = {
      id: "9001",
      limit: "10",
    };
    this.$axios({
      method: "get",
      url: this.$http + "/banner?type=0",
      data: "",
    }).then((res) => {
      console.log(res.data.banners);
      this.list = res.data.banners;
      this.bannerLoading = false;
      this.banner();
    });
  },
};
</script>

<style lang="less" scoped>
/deep/.auth-canvas2_{
    border: none !important;
  }
.login {
  width: 100%;
  height: 100%;
  
  .banner-box {
    width: 50%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #ffffff60;
    overflow: hidden;
    .banner-box-img {
      transition: all 2s;
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .banner-img {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
      .banner-img-bg {
        width: 100%;
        height: 50%;
        filter: blur(50px);
        position: relative;
      }
    }
  }
  .login-box {
    width: 50%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  /deep/.login-card {
    width: 50%;
    height: 40%;
    min-width: 500px;
    min-height: 400px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #ffffff80;
    color: #fff;
    .text_colorWhite:hover{
      color: white !important;
    }
    .titleBox{
      height: 38px;
      background: #242424;
      p{
        float: left;
        line-height: 38px;
        font-size: 14px;
        padding-left: 15px;
        span{
          background: #a61919;
          padding: 1px 2px;
          font-size: 12px;
          border-radius: 3px;
        }
      }
    }
    .el-card__body {
      padding: 0 !important;
    }
    .loginPut{
      width: 90%;
      margin-top: 24px;
      margin-left: 5%;
      .el-form-item__label{
        color: #000 !important;
      }
      .el-form-item__error{
        color: #e62626;
      }
      .verificationPut{
        float: left;
        .el-input__inner{
          border-radius: 5px 0 0 5px;
        }
      }
      .verificationBtn{
        margin-top: 4px;
        margin-bottom: 4px;
        height: 32px;
        float: left;
        border-radius: 0 3px 3px 0;
      }
    }
    .optionBox{
      width: 100%;
      .loginBtn{
        margin: auto 105px;
        width: 160px;
      }
      .passwordWet{
        float: right;
        margin-right: 30px;
        font-size: 14px;
        color: #000;
        cursor: pointer;
        -o-user-select: none;
        -moz-user-select: none; /*火狐 firefox*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10+*/
        -khtml-user-select :none; /*早期的浏览器*/
        user-select: none; 
      }
    }
    .login-tab-box {
      background: #00000090;
      color: #fff;
      height: 42px;
      width: 100%;
    }
    .el-tabs__content {
      display: none;
    }
  }
  .vue-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(./../assets/images/bg.png) top no-repeat;
    background-size: cover;
    color: #0099ff;
  }
  /deep/.bgd {
    position: absolute;
    width: calc(100% - 3px);
    height: calc(100% - 5px);
    canvas{
      border: none !important;
    }
  }
}
</style>