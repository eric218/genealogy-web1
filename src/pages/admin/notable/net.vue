<template>
    <div>
        <div class="tabs">
            <Tabs @on-click="chgMenu">
                <TabPane :label="v.menuName" :name="i+''" v-for="(v,i) in menu" :key="i"></TabPane>
                <Button to="type" type="primary" shape="circle" slot="extra">管理分类</Button>
            </Tabs>
        </div>
        <Famouslist :url="url" v-if="url.length" :menu="menucurr.menuType" :type="menucurr.showId"/>
    </div>
</template>

<script>
import Famouslist from "./c/famous-list";
export default {
    components: {
        Famouslist
    },
    data() {
        return {
            menu: [],
            menucurr: {},
            url: ""
        };
    },
    mounted() {
        this.getMenu();
    },
    methods: {
        getMenu() {
            this.api
                .get(this.api.admin.base + this.api.admin.admin_sys_menu, {
                    siteId: this.$store.state.siteId,
                    menuId: 7
                })
                .then(res => {
                    this.menu = res.data;
                    this.chgMenu(0);
                });
        },
        chgMenu(e) {
            this.menucurr = this.menu[e];
            setTimeout(() => {
                this.url = this.menucurr ? this.menucurr.apiAdminUrl : "";
            }, 300);
        }
    }
};
</script>