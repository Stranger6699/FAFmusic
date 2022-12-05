import http from '../utils/http'

// let msIp = "http://192.168.1.105:3000";
// let msIp = "http://101.201.49.201:3000";
let msIp="http://localhost:3000"

export default class api {

    //==========↓==========↓==========↓==========↓==========GET==========↓==========↓==========↓==========↓==========

    /**
     *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
     *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
     */
    static getListAPIMS(params, url) {
        return http.get(`${msIp}${url}`, params)
    }

    //==========↑==========↑==========↑==========↑==========GET==========↓==========↓==========↓==========↓==========

    //==========↓==========↓==========↓==========↓==========POST==========↓==========↓==========↓==========↓==========

    static postFormAPIMS(params, url, urlData) {
        return http.post(`${msIp}${url}`, params, urlData)
    }
}