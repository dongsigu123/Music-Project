import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',//推荐
    name: 'Recommend',
    component: Recommend,
	meta:{showNav:true,keepAlive:true}
  },
	{
		path:"/search",//搜索
		name:"Search",
		component:()=>import("../views/Search"),
		meta:{showNav:true,keepAlive:true}
	},
	{
		path:"/hot",//热歌
		name:"Hot",
		component:()=>import("../views/Hot"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/find",//发现
		name:"Find",
		component:()=>import("../views/Find"),
		meta:{showNav:true,keepAlive:true}
	},
	{
		path:"/musiclist/:musicid",//歌单
		name:"Musiclist",
		component:()=>import("../views/Musiclist"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/gdmusiclist",//更多歌单
		name:"GdMusiclist",
		component:()=>import("../views/GdMusiclist"),
		meta:{showNav:false,keepAlive:true}
	},
	{
		path:"/popsinger",//热门歌手
		name:"Popsinger",
		component:()=>import("../views/Popsinger"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/mv/:mvid",//mv
		name:"Mv",
		component:()=>import("../views/Mv"),
		beforeEnter:(to,from,next)=>{//路由独享守卫
			// console.log("beforeEach",to);
			next();
		},
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/singer/:singerid",//歌手主页
		name:"Singer",
		component:()=>import("../views/Singer"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/albummusic/:albumid",//歌手专辑
		name:"Albummusic",
		component:()=>import("../views/Albummusic"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/selected",//精选歌单
		name:"Selected",
		component:()=>import("../views/Selected"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/boutique",//精品歌单
		name:"Boutique",
		component:()=>import("../views/Boutique"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/wholemv",//全部mv
		name:"Wholemv",
		component:()=>import("../views/Wholemv"),
		meta:{showNav:false,keepAlive:false}
	}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
