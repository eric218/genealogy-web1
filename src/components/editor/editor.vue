<template>
    <div class="editor-wrapper">
        <div :id="editorId"></div>
    </div>
</template>
<script>
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
import { oneOf } from "@/libs/tools";
export default {
    name: "Editor",
    props: {
        value: {
            type: String,
            default: ""
        },
        /**
         * 绑定的值的类型, enum: ['html', 'text']
         */
        valueType: {
            type: String,
            default: "html",
            validator: val => {
                return oneOf(val, ["html", "text"]);
            }
        },
        /**
         * @description 设置change事件触发时间间隔
         */
        changeInterval: {
            type: Number,
            default: 200
        },
        /**
         * @description 是否开启本地存储
         */
        cache: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        editorId() {
            return `editor${this._uid}`;
        }
    },
    methods: {
        setHtml(val) {
            this.editor.txt.html(val);
        }
    },
    mounted() {
        let that = this;
        this.editor = new Editor(`#${this.editorId}`);
        this.editor.customConfig.onchange = html => {
            let text = this.editor.txt.text();
            if (this.cache) localStorage.editorCache = html;
            this.$emit("input", this.valueType === "html" ? html : text);
            this.$emit("on-change", html, text);
        };
        this.editor.customConfig.menus = [
            "head", // 标题
            "bold", // 粗体
            "fontSize", // 字号
            "fontName", // 字体
            "italic", // 斜体
            "underline", // 下划线
            "strikeThrough", // 删除线
            "foreColor", // 文字颜色
            "backColor", // 背景颜色
            "list", // 列表
            "justify", // 对齐方式
            "quote", // 引用
            "image", // 插入图片
            "table", // 表格
            "video", // 插入视频
            "undo", // 撤销
            "redo" // 重复
        ];
        this.editor.customConfig.uploadImgServer =
            this.api.admin.base + this.api.admin.upload_img;
        this.editor.customConfig.uploadFileName = "file";
        // this.editor.customConfig.uploadImgShowBase64 = true
        this.editor.customConfig.onchangeTimeout = this.changeInterval;
        this.editor.customConfig.uploadImgHooks = {
            before: function(xhr, editor, files) {},
            success: function(xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function(xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function(xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function(xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function(insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = that.api.imghost + result.data.file_path;
                insertImg(url);
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        };
        this.editor.customConfig.customAlert = function(info) {
            console.log(info);
        };
        // create这个方法一定要在所有配置项之后调用
        this.editor.create();
        // 如果本地有存储加载本地存储内容
        let html = this.value || localStorage.editorCache;
        if (html) this.editor.txt.html(html);
    }
};
</script>