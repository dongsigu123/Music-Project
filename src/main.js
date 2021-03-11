import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { Swipe,SwipeItem,Image } from 'vant';
import "vant/lib/index.css"


Vue.config.productionTip = false

Vue.use(Swipe).use(SwipeItem);
Vue.use(Image);

let playmusic={
	isNavShow:true,//顶部导航
	musicid:[],//音乐id
	isPlayShow:false,//播放条
	isDivShow:false,//播放条下面的div
	isPlay:true,//是否播放音乐
	mvid:[]//mvid
}
new Vue({
  router,
  store,
  data:{
	  playmusic
	},
  render: h => h(App)
}).$mount('#app')

var myrem = document.documentElement.clientWidth*16/375;
document.documentElement.style.fontSize=myrem+"px";
window.addEventListener("resize",function(){
	myrem = document.documentElement.clientWidth*16/375;
	document.documentElement.style.fontSize=myrem+"px";
})