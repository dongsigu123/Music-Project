<template>
  <div id="app">
		<Navtop v-show="$route.meta.showNav"></Navtop>
		<keep-alive>
			<router-view v-if='$route.meta.keepAlive'/>
		</keep-alive>
		<router-view v-if='!$route.meta.keepAlive'/>
   
	<transition enter-active-class="animate__animated animate__fadeInUp">
		<Play :musicid="musicid" v-show="isplayshow"></Play>
	</transition>
	<div class="div" v-show="isdivshow"></div>
	<p ref="zhuye" class="zhuye">
		<span ref="xsyc" @click="xsyc" class="s1 iconfont icon-zuojiantou"></span>
		<span @click="zytz" class="s2 iconfont icon-zhuye"></span>
	</p>
  </div>
</template>

<script>
	import Navtop from "./components/Navtop.vue"
	import Play from "./components/Play.vue"
	import {mapState} from "vuex"
	export default {
		components:{
			Navtop,
			Play
		},
		data(){
			return {
				flag:false
			}
		},
		computed:{
			...mapState({
				musicid:"musicid",
				isplayshow:"isplayshow",
				isdivshow:"isdivshow"
			})
		},
		methods:{
			xsyc(){
				if(this.flag){
					this.$refs.zhuye.style.marginRight="-3.4375rem";
					this.$refs.xsyc.className="s1 iconfont icon-zuojiantou";
					this.flag=false;
				}else{
					this.$refs.zhuye.style.marginRight="0px";
					this.$refs.xsyc.className="s1 iconfont icon-arrow-right";
					this.flag=true;
				}
			},
			zytz(){
				this.$router.push("/");
				this.$refs.zhuye.style.marginRight="-3.4375rem";
				this.$refs.xsyc.className="s1 iconfont icon-zuojiantou";
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	margin: 0;
	text-align: center;
	width: 100%;
	padding: 0;
	.div{
		width: 100%;
		height: 3.125rem;
	}
	.zhuye{
		position: fixed;
		width: 4.375rem;
		top: 70%;
		right: 4%;
		margin-right: -3.4375rem;
		z-index: 3;
		transition: all 0.5s linear;
		span{
			font-size: 2.0625rem;
		}
		.s1{
			color: #999;
			margin-right: 0.4375rem;
		}
		.s2{
			color: #dd001b;
		}
	}
}
</style>
