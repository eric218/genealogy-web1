<template>
    <div class="main">
        <div class="sub">
            <div class="inner">
                <div class="grid">
                    <div class="h">
                        <div class="tit">最新文章</div>
                    </div>
                    <div class="b">
                        <div class="text">正文部分</div>
                    </div>
                </div>
                <div class="grid">
                    <div class="h">
                        <div class="tit">精彩说说</div>
                    </div>
                    <div class="b">
                        <div class="item" v-for="v in 6" :key="v">
                            <div class="img"></div>
                            <div class="obj">
                                <div class="name">李四</div>
                                <div class="intro">描述</div>
                                <div class="tag">
                                    <div class="mark">
                                        <iconfont name="markfill"/>
                                        <span>15</span>
                                    </div>
                                    <div class="appreciate">
                                        <iconfont name="appreciatefill"/>
                                        <span>15</span>
                                    </div>
                                    <div class="date">2018-10-10 16:12</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="suc">
            <div class="inner grid">
                <div class="h">
                    <div class="more">全部</div>
                    <div class="tit">视频</div>
                </div>
                <div class="b">
                    <div class="item" v-for="v in 5" :key="v">
                        <div class="img"></div>
                        <div class="obj">
                            <div class="total">
                                <iconfont name="recordfill"/>
                                <span>150</span>
                            </div>
                            <div class="tit">张氏祖堂</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="suc">
            <div class="inner grid">
                <div class="h">
                    <div class="more">全部</div>
                    <div class="tit">图片</div>
                </div>
                <div class="b">
                    <div class="item" v-for="v in 5" :key="v">
                        <div class="img"></div>
                        <div class="obj">
                            <div class="tit">张氏祖堂</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {};
    },
    computed: {},
    mounted: function() {},
    methods: {}
};
</script>