export default [{
    path: 'home',
    name: 'n_home',
    meta: {
        title: "首页"
    },
    component: () => import('@/pages/nation/Home')
}, {
    path: 'culture',
    name: 'n_culture',
    meta: {
        title: "家族文化"
    },
    component: () => import('@/pages/nation/Culture')
}, {
    path: 'genealogy',
    name: 'n_genealogy',
    meta: {
        title: "数字家谱"
    },
    component: () => import('@/pages/nation/Genealogy')
}, {
    path: 'human',
    name: 'n_human',
    meta: {
        title: "祖先名人"
    },
    component: () => import('@/pages/nation/Human')
}, {
    path: 'tree',
    name: 'n_tree',
    meta: {
        title: "各地分支"
    },
    component: () => import('@/pages/nation/Tree')
}, {
    path: 'record',
    name: 'n_record',
    meta: {
        title: "记录家族"
    },
    component: () => import('@/pages/nation/Record')
}, {
    path: 'charity',
    name: 'n_charity',
    meta: {
        title: "慈善公益"
    },
    component: () => import('@/pages/nation/Charity')
}, {
    path: 'detail',
    name: 'n_detail',
    meta: {
        title: "详情"
    },
    component: () => import('@/pages/nation/Detail')
}]