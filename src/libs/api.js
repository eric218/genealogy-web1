import axios from 'axios'
import router from '../router/';
const api = {
    imghost: 'http://192.168.2.132:8090/',
    urls: {
        base: 'http://192.168.2.179:8090/', //后台接口地址
    },
    county: {
        base: 'http://192.168.2.179:8090/', //联谊会前台接口地址
        feeds: 'genogram/allMessageBoard/addMessage', //留言板
        common_home_all: 'genogram/fanMenu/getIndexMenuBySiteId', //首页api
        common_site_menu: 'genogram/fanMenu/getTitlesByMenuId', //导航栏
        site_list: 'genogram/sysSite/person/getSysSite', //网站列表
        detail: {
            culture: 'genogram/fanNewsCulture/getFamilyCultureDetail', //家族文化
            charity: 'genogram/fanNewsCharity/getFanNewsCharityDetail', //慈善公益详情
            industry: 'genogram/fanNewsIndustry/getFamilyIndustryDetail', //家族产业详情
            famous: 'genogram/fanNewsFamous/getFamilyFamilyDetail', //家族名人
            family_record: 'genogram/fanNewsFamilyRecord/getFamilyRecordDetail', //家族动态
        },
        ancestor_list: '/genogram/proNewsAncestor/getFamousAncestorPage', //祖先名人列表
        ancestor_info: '/genogram/proNewsAncestor/getFamousAncestorDetails', //祖先名人详情
    },
    user: {
        base: 'http://192.168.2.179:8090/', //用户中心接口地址
        login: 'genogram/userLogin/login', //登录
        reg: 'genogram/userLogin/signIn', //注册
        reset: 'genogram/userLogin/updatePassword', //修改密码
        info: 'genogram/userLogin/getUserLogin', //用户信息
        update: 'genogram/userLogin/updatePerson', //修改用户资料
        firstname: 'genogram/userLogin/getAllFamily', //姓氏列表
        pay: {
            ali: 'genogram/pay/aLiPay', //支付宝支付
            wx: 'genogram/pay/weChatPay', //微信支付
        }
    },
    admin: {
        index: 'home',
        base: 'http://192.168.2.179:8050/', //后台接口地址
        upload_img: 'fan/uploadFastdfs', //图片上传
        users_list: 'genogram/admin/person/getUserLoginList', //用户列表
        users_info: 'genogram/admin/person/getUserLogin', //用户信息
        users_edit: 'genogram/admin/person/updatePerson', //用户修改
        site_list: 'genogram/admin/person/getSysSite', //网站列表
        site_creat: 'genogram/admin/sysSite/insertSysSite', //开通网站
        firstname: 'genogram/admin/sysSite/getAllFamily', //姓氏列表
        admin_sys_menu: 'genogram/admin/fanMenu/getTitlesByMenuId', //
        admin_sys_menu_add: 'genogram/admin/fanMenu/addTitles', //类别添加
        admin_sys_menu_edit: 'genogram/admin/fanMenu/updateTitlesById', //类别修改
        admin_sys_menu_del: 'genogram/admin/fanMenu/delTitlesById', //类别删除
        admin_sys_feeds: 'genogram/admin/allMessageBoard/selectMessage', //留言板

        admin_site_info: 'genogram/admin/fanIndex/getFanIndexInfo', //网站信息--后台
        admin_site_edit: 'genogram/admin/fanIndex/insertOrUpdateFanIndexInfo', //网站信息--修改
        admin_site_withdraw: 'genogram/admin/fanNewsCharity/insertFanIndexFundDrowing', //线上提现
        admin_site_withdraw_list: 'genogram/admin/fanNewsCharity/getFanIndexFundDrowing', //提现记录
        admin_site_outline: 'genogram/admin/fanNewsCharity/insertFanNewsCharityPayIn', //线下捐款
        admin_site_finance: 'genogram/admin/fanNewsCharity/getFanIndexFund', //当前资金

        admin_slider_list: 'genogram/admin/fanIndex/getFanIndexSlidePicList', //轮播图
        admin_slider_edit: 'genogram/admin/fanIndex/insertOrUpdateFanIndexSlidePic', //轮播图修改
        admin_slider_del: 'genogram/admin/fanIndex/deleteFanIndexSlidePic', //轮播图删除

        admin_summarys_list: 'genogram/admin/fanIndex/getFanIndexFamilySummarysPage', //联谊会列表
        admin_summarys_info: 'genogram/admin/fanIndex/getFanIndexFamilySummarys', //联谊会详情
        admin_summarys_edit: 'genogram/admin/fanIndex/insertOrUpdateFanIndexFamilySummarys', //联谊会新增修改
        admin_summarys_drft: 'genogram/admin/fanIndex/insertOrUpdateFanIndexFamilySummarysDrft', //联谊会草稿
        admin_summarys_del: 'genogram/admin/fanIndex/deleteFanIndexFamilySummarys', //联谊会删除

        culture_zipai_info: 'genogram/admin/fanNewsCulture/getZiPaiDetail', //字派详情
        culture_zipai_edit: 'genogram/admin/fanNewsCulture/addOrUpdateZiPai', //字派添加
        culture_zipai_del: 'genogram/admin/fanNewsCulture/deleteZipaiById', //字派删除

        culture_news_info: 'genogram/admin/fanNewsCulture/getFamilyCultureDetail', //家族文化详情
        culture_news_edit: 'genogram/admin/fanNewsCulture/addOrUpdateCulture', //家族文化添加
        culture_news_drft: 'genogram/admin/fanNewsCulture/addOrUpdateCultureDrft', //家族文化草稿
        culture_news_del: 'genogram/admin/fanNewsCulture/deleteCulturById', //家族文化删除

        charity_list_info: 'genogram/admin/fanNewsCharity/getFanNewsCharityDetail', //财务收支详情
        charity_list_edit: 'genogram/admin/fanNewsCharity/insertOrUpdateFanNewsCharityOut', //财务收支增加
        charity_list_drft: 'genogram/admin/fanNewsCharity/insertOrUpdateFanNewsCharityOutDrft', //财务收支草稿
        charity_list_del: 'genogram/admin/fanNewsCharity/deleteFanNewsCharityOut', //财务收支删除

        industry_info: 'genogram/admin/fanNewsIndustry/getFamilyIndustryDetail', //家族产业详情
        industry_edit: 'genogram/admin/fanNewsIndustry/addOrUpdateIndustry', //家族产业添加
        industry_drft: 'genogram/admin/fanNewsIndustry/addOrUpdateIndustryDrft', //家族产业草稿
        industry_del: 'genogram/admin/fanNewsIndustry/deleteIndustryById', //家族产业删除

        admin_famous_list: 'genogram/admin/fanNewsFamous/getFamilyPersionPage', //家族名人列表
        admin_famous_info: 'genogram/admin/fanNewsFamous/getFamilyPersionDetail', //家族名人详情
        admin_famous_edit: 'genogram/admin/fanNewsFamous/addOrUpdatePersion', //家族名人修改
        admin_famous_drft: 'genogram/admin/fanNewsFamous/addOrUpdateIndustryDrft', //家族名人草稿
        admin_famous_del: 'genogram/admin/fanNewsFamous/deletePersionById', //家族名人删除

        record_list: 'genogram/admin/fanNewsFamilyRecord/selectRecort', //记录家族列表
        record_info: 'genogram/admin/fanNewsFamilyRecord/getFamilyRecord', //记录家族详情
        record_edit: 'genogram/admin/fanNewsFamilyRecord/addOrUpdateRecord', //记录家族修改
        record_drft: 'genogram/admin/fanNewsFamilyRecord/addOrUpdateRecordDrft', //记录家族草稿
        record_del: 'genogram/admin/fanNewsFamilyRecord/deleteRecordById', //记录家族删除

        media_list: 'genogram/admin/fanNewsFamilyRecord/selectRecortVedioPage', //官方视频
        media_info: 'genogram/admin/fanNewsFamilyRecord/getFamilyRecordVedioDetail', //信息
        media_edit: 'genogram/admin/fanNewsFamilyRecord/addOrUpdateVedioRecord', //修改
        media_del: 'genogram/admin/fanNewsFamilyRecord/deleteRecordVedioById', //删除
    },
    post: function (url, data) {
        if (!data.pageNo) {
            data.pageNo = 1
        }
        if (!data.pageSize) {
            data.pageSize = 8
        }
        if (!data.token && localStorage.user) {
            data.token = JSON.parse(localStorage.user).token
        }
        let params = new URLSearchParams();
        for (let v in data) {
            params.append(v, data[v]);
        }
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => {
                console.log(res.data)
                if (res.data.code == 401) {
                    alert(res.data.msg)
                    history.go(-1)
                    return;
                } else {
                    resolve(res.data);
                }
            })
        })
    },
    get: function (url, data) {
        if (!data.pageNo) {
            data.pageNo = 1
        }
        if (!data.pageSize) {
            data.pageSize = 8
        }
        if (!data.token && localStorage.user) {
            data.token = JSON.parse(localStorage.user).token
        }
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: data
            }).then(res => {
                console.log(res.data)
                if (res.data.code == 401) {
                    alert(res.data.msg)
                    history.go(-1)
                    return;
                } else {
                    resolve(res.data);
                }
            }).catch(err => {
                reject(err)
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
    isMobile: function (phone) {
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    },
    isNumber: function (e) {
        if (!(/^\d+$/).test(e)) {
            return false;
        } else {
            return true;
        }
    },
    imgurl: function (e) {
        if (!e) {
            return '';
        }
        return e.indexOf('http') > -1 ? e : this.imghost + e;
    },
    imgBG: function (e) {
        return 'backgroundImage:url(' + this.imgurl(e) + ')';
    },
    toPagedown() {
        document.getElementsByClassName('page')[0].scrollTop = document.getElementsByClassName('page')[0].scrollHeight
        setTimeout(() => {
            document.getElementsByClassName('page')[0].scrollTop = document.getElementsByClassName('page')[0].scrollHeight
        }, 500);
    },
}
export default api;