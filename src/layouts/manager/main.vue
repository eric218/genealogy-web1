<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
            <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
                <div class="logo-con">
                    <img :src="Logo" key="Logo">
                    <div v-if="!collapsed">{{siteinfo.siteName}}</div>
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                    <user :user-avator="userAvator"/>
                    <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
                </header-bar>
            </Header>
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
                    </div>
                    <Content class="content-wrapper">
                        <keep-alive :include="cacheList">
                            <router-view/>
                        </keep-alive>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
import SideMenu from "./components/side-menu";
import HeaderBar from "./components/header-bar";
import TagsNav from "./components/tags-nav";
import User from "./components/user";
import Fullscreen from "./components/fullscreen";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getNewTagList, getNextRoute, routeEqual } from "@/libs/util";
import Logo from "./img/logo.png";
import "./main.less";
export default {
    name: "Main",
    components: {
        SideMenu,
        HeaderBar,
        TagsNav,
        Fullscreen,
        User
    },
    data() {
        return {
            collapsed: false,
            Logo,
            isFullscreen: false,
            siteinfo: {}
        };
    },
    computed: {
        tagNavList() {
            return this.$store.state.admin.tagNavList;
        },
        tagRouter() {
            return this.$store.state.admin.tagRouter;
        },
        userAvator() {
            return this.$store.state.user.avatorImgPath;
        },
        cacheList() {
            return this.tagNavList.length
                ? this.tagNavList
                      .filter(item => !(item.meta && item.meta.notCache))
                      .map(item => item.name)
                : [];
        },
        menuList() {
            return this.$store.getters.menuList;
        },
        user() {
            return this.$store.state.user;
        }
    },
    mounted() {
        /**
         * @description 初始化设置面包屑导航和标签导航
         */
        this.setTagNavList();
        this.addTag({
            route: this.$store.state.admin.homeRoute
        });
        this.setBreadCrumb(this.$route);
        if (!this.tagNavList.find(item => item.name === this.$route.name)) {
            this.$router.push({
                name: this.api.admin.index
            });
        }
        this.getSiteinfo();
    },
    methods: {
        ...mapMutations(["setBreadCrumb", "setTagNavList", "addTag"]),
        ...mapActions(["handleLogin"]),
        getSiteinfo() {
            this.api
                .get(this.api.admin.base + this.api.admin.admin_site_info, {
                    siteId: this.$store.state.siteId
                })
                .then(res => {
                    if (res.code == 200) {
                        this.siteinfo = res.data;
                    }
                });
        },
        turnToPage(route) {
            let { name, params, query } = {};
            if (typeof route === "string") name = route;
            else {
                name = route.name;
                params = route.params;
                query = route.query;
            }
            if (name.indexOf("isTurnByHref_") > -1) {
                window.open(name.split("_")[1]);
                return;
            }
            this.$router.push({
                name,
                params,
                query
            });
        },
        handleCollapsedChange(state) {
            this.collapsed = state;
        },
        handleCloseTag(res, type, route) {
            if (type === "all") {
                this.turnToPage(this.api.admin.index);
            } else if (routeEqual(this.$route, route)) {
                if (type !== "others") {
                    const nextRoute = getNextRoute(this.tagNavList, route);
                    this.$router.push(nextRoute);
                }
            }
            this.setTagNavList(res);
        },
        handleClick(item) {
            this.turnToPage(item);
        }
    },
    watch: {
        $route(newRoute) {
            const { name, query, params, meta } = newRoute;
            this.addTag({
                route: { name, query, params, meta },
                type: "push"
            });
            this.setBreadCrumb(newRoute);
            this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
            this.$refs.sideMenu.updateOpenName(newRoute.name);
        }
    }
};
</script>
