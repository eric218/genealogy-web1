import axios from 'axios';
import 'es6-promise/auto';

const api = {
    pageSize: 20,
    host: 'http://192.168.2.179:8090/',
    server: 'http://192.168.2.179:8090/',
    urls: {
        USER_LOGIN: 'home/login', //登录//用户名、密码
        USER_REG: "home/reg01", //注册//用户名、密码、姓氏、地区、
        USER_SMS: 'home/send', //验证码//类型（注册、找回密码）、手机号、新的密码
        PAY_ALI: "pay/aliPay", //支付宝支付//token、支付金额
        PAY_WX: "pay/wechatPay", //微信支付//token、支付金额
        SYS_SITE: '', //网站信息//网站ID、地区、姓氏
        SYS_NAV: 'genogram/fanMenu/getMenuBySiteId', //网站导航栏//网站ID

        //家族文化列表
        //字派列表
        //财政收入、支出
        //捐款名录
        //家族名人
        //家族公告
        //记录家族
        //家族动态
        //家族视频
        //个人视频
        //个人图片
        //个人日志
        //个人说说

        LIST_: 'columnIndustry/commonality',
        LIST_ZIPAI: 'genogram/fanNewsCulture/commonality',
    },
    post: function (url, data) {
        if (!data.pageNow) {
            data.pageNo = 1
        }
        if (!data.pageSize) {
            data.pageSize = 8
        }
        let params = new URLSearchParams();
        for (let v in data) {
            params.append(v, data[v]);
        }
        return new Promise((resolve, reject) => {
            axios.post(this.server + this.urls[url], params).then(res => {
                console.log(res.data)
                resolve(res.data);
            })
        })
    },
    get: function (url, data) {
        console.log(1)
        if (!data.pageNow) {
            data.pageNo = 1
        }
        if (!data.pageSize) {
            data.pageSize = 8
        }
        return new Promise((resolve, reject) => {
            axios.get(this.server + this.urls[url], {
                params: data
            }).then(res => {
                console.log(res.data)
                resolve(res.data);
            })
        })
    },
    upload: function (url, data, files) {
        let params = new FormData();
        params.append(files['key'], files['file']);
        for (let v in data) {
            params.append(v, data[v]);
        }
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, params, config).then(res => {
                console.log(res.data)
                resolve(res.data);
            })
        })
    },
    encode: function (_map, _content) {
        _content = '' + _content
        if (!_map || !_content) {
            return _content || ''
        }
        return _content.replace(_map.r, function ($1) {
            var _result = _map[!_map.i ? $1.toLowerCase() : $1]
            return _result != null ? _result : $1
        });
    },
    object2query: function (obj) {
        let keys = Object.keys(obj)
        let queryArray = keys.map(item => {
            return `${item}=${encodeURIComponent(obj[item])}`
        })
        return queryArray.join('&')
    },
    mergeObject: function (dest, src) {
        if (typeof dest !== 'object' || dest === null) {
            dest = Object.create(null)
        }
        dest = Object.assign(Object.create(null), dest, src)
        return dest
    },
    mergeVueObject: function (dest, src) {
        let keys = Object.keys(src)
        keys.forEach(item => {
            if (typeof src[item] !== 'undefined') {
                Vue.set(dest, item, src[item])
            }
        })
        return dest
    },
    getUrlParam: function (name, old_url = window.location.search) {
        var new_url = encodeURI(old_url);
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = new_url.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    },
    checkPhone: function (phone) {
        if (!(/^1[345789]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    },
    imgurl: function (e) {
        if (!e) {
            return '';
        }
        return e.indexOf('http') > -1 ? e : this.host + e;
    },
    imgBG: function (e) {
        return 'backgroundImage:url(' + this.imgurl(e) + ')';
    },
    regConfig: function () {
        this.ajax('jssdk', {
            'url': window.location.href
        }).then(res => {
            if (res.success) {
                this.initjsconf(res.data.AppId, res.data.Signature, res.data.NonceStr, res.data.Timestamp);
            }
        })
    },
    initjsconf: function (appId, signature, nonceStr, timestamp) {
        wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: ["hideOptionMenu", "showMenuItems", 'onMenuShareTimeline', 'onMenuShareAppMessage',
                'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems',
                'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'chooseImage', 'previewImage',
                'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation',
                'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay',
                'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
            ]
        });
    },
    onBridgeReady: function (data, url) {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
        } else {
            this.onBridge(data, url);
        }
    },
    onBridge: function (data, url) {
        WeixinJSBridge.invoke('getBrandWCPayRequest', JSON.parse(data), function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                if (!url) {
                    location.reload();
                } else {
                    location.href = url
                }
            }
        });
    },
    chooseImage: function () {
        return new Promise((resolve, reject) => {
            wx.ready(() => {
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['album', 'camera'],
                    success: suc => {
                        resolve(suc);
                    },
                    fail: err => {
                        reject(err);
                    }
                });
            })
        })
    },
    uploadImage: function (e) {
        return new Promise((resolve, reject) => {
            wx.uploadImage({
                localId: e,
                isShowProgressTips: 1,
                success: suc => {
                    resolve(suc);
                },
                fail: err => {
                    reject(err);
                }
            });
        })
    },
    //画布转图片
    convertCanvasToImage(canvas) {
        let image = new Image();
        image.src = canvas.toDataURL("image/png");
        return image.src;
    },
    //base64转文件
    convertBase64UrlToBlob(urlData) {
        var bytes = window.atob(urlData.split(',')[1]);
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {
            type: 'image/png'
        });
    },
    toPagedown() {
        document.getElementsByClassName('page')[0].scrollTop = document.getElementsByClassName('page')[0].scrollHeight
        setTimeout(() => {
            document.getElementsByClassName('page')[0].scrollTop = document.getElementsByClassName('page')[0].scrollHeight
        }, 500);
    },
};
export default api;