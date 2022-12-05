<template>
  <div class="complant" v-if="isShow">
    <div class="complant_main">
      <div class="popup_top">{{ text.title }}</div>
      <div class="complant_inner">
        <div class="popup_mes" v-if="text.mesg != ''">{{ text.mesg }}</div>
        <div
          class="popup_html"
          v-if="text.cntMsg != ''"
          v-html="text.cntMsg"
        ></div>
        <div class="popup_btn">
          <el-button
            type="primary"
            class="butText1"
            size="small"
            @click="confirm"
            >确定</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "conFirm",
  data() {
    return {
      isShow: true,
      text: {
        title: "",
        mesg: "",
        cntMsg: "",
        cancelBtn: true,
        confirmBtn: true,
        cancelValStyle: null,
        confirmValStyle: null,
        btn: {
          confirmVal: "确定",
          cancelVal: "取消",
        },
      },
    };
  },
  methods: {
    cancel() {
      this.isShow = false;
    },
    confirm() {
      this.isShow = false;
    },
  },
};
</script>
 
<style scope lang="less">
.complant {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000040;

  .complant_main {
    width: 420px;
    background: #fff;
    text-align: center;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    .popup_top {
      line-height: 40px;
      color: #303133;
      font-size: 18px;
      text-align: left;
      padding-left: 15px;
    }

    .complant_inner {
      div {
        margin: 10px 0;
      }
      .popup_mes{
          font-size: 14px;
          text-align: left;
          padding-left: 40px;
          color: #606266;
      }
      .popup_btn {
          display: flex!important;
flex-direction: row-reverse!important;
padding-right: 20px;
        input {
          background-color: #40a9ff;
          color: #fff;
          padding: 6px 10px;
          border-radius: 6px;
          border-color: initial;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>