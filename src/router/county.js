export default [{
        path: 'home',
        name: 'county_home',
        meta: {
            title: "首页"
        },
        component: () => import('@/page-county/Home')
    }, {
        path: 'culture_home',
        name: 'culture_home',
        meta: {
            title: "家族文化"
        },
        component: () => import('@/page-county/culture')
    }, {
        path: 'charity_home',
        name: 'charity_home',
        meta: {
            title: "慈善公益"
        },
        component: () => import('@/page-county/charity')
    }, {
        path: 'industry_home',
        name: 'industry_home',
        meta: {
            title: "家族产业"
        },
        component: () => import('@/page-county/industry')
    }, {
        path: 'famous_home',
        name: 'famous_home',
        meta: {
            title: "家族名人"
        },
        component: () => import('@/page-county/famous')
    }, {
        path: 'ancestors',
        name: 'ancestors_home',
        meta: {
            title: "祖先分支"
        },
        component: () => import('@/page-county/Ancestors')
    }, {
        path: 'family_record_home',
        name: 'family_record_home',
        meta: {
            title: "记录家族"
        },
        component: () => import('@/page-county/family_record')
    },
    {
        path: "tongpu_home",
        name: "tongpu_home",
        meta: {
            title: "统谱编修"
        },
        component: () => import('@/page-county/tongpu')
    },
    {
        path: 'detail',
        name: 'county_detail',
        meta: {
            title: "文章详情"
        },
        component: () => import('@/page-county/Detail')
    }
]