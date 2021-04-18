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
}
</style>
