
const menuList=[
    {
        key:"/home",
        type:'home',
        title:'首页',
        isPublic:true, // 所有用户都可以访问首页
    },
    {
        key:"/products",
        type:'user',
        title:'商品',
        children:[
            {
                key:"/category",
                type:'apartment',
                title:'品类管理'
            },
            {
                key:"/product",
                type:'branches',
                title:'商品管理'
            }
        ]
    },
    {
        key:"/user",
        type:'user',
        title:'用户管理'
    },
    {
        key:"/role",
        type:'slack',
        title:'角色管理'
    },
    {
        key:"/gragh",
        type:'area-chart',
        title:'图形图表',
        children:[
            {
                key:'/pillar',
                type:'bar-chart',
                title:'柱形图'
            },
            {
                key:'/line',
                type:'line-chart',
                title:'折线图'
            },
            {
                key:'/pie',
                type:'pie-chart',
                title:'饼图'
            }
        ]
    }
    
]

export default  menuList