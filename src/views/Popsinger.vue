<template>
	<!-- 这是热门歌手页面 -->
	<div class="popsinger">
		<Return>热门歌手</Return>
		<ul>
			<router-link @click.native="liclick" v-for="s in popsinger" :key="s.id" tag="li" :to="{path:'/singer/'+s.id}">
				<div class="top">
					<img :src="s.picUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
				</div>
				<div class="bottom">
					<p class="p1">歌手: {{s.name}}</p>
					<p class="p2">{{s.alias[0]|bieming}}</p>
				</div>
			</router-link>
		</ul>
		<Loading v-if="popsinger.length<20*offsetnum"></Loading>
		<button @click="btn">点击加载更多</button>
	</div>
</template>

<script>
	import Return from "../components/Return.vue"
	import Loading from "../components/Loading.vue"
	export default{
		components:{
			Return,
			Loading
		},
		data(){
			return {
				popsinger:[],
				offsetnum:0,
			}
		},
		methods:{
			liclick(){
				this.$store.state.isNavShow=false;
			},
			btn(){
				this.loadMusic(this);
			},
			loadMusic(vm){
				vm.offsetnum++;
				vm.$http.get("/top/artists?offset="+(vm.offsetnum-1)*20+"&limit=20").then(data=>{
					for(let a of data.data.artists){
						vm.popsinger.push(a)
						// console.log(a)
					}
					// console.log(vm.offsetnum)
					// console.log(data)
				})
			}
		},
		filters:{
			bieming(value){
				if(typeof value != "undefined"){
					return "别名: "+value;
				}
			}
		},
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				vm.loadMusic(vm);
			})
		},
		beforeRouteUpdate(to,from,next){
			this.loadMusic(this);
			next();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.popsinger{
		width: 100%;
		padding-top: 2.5rem;
		ul{
			width: 100%;
			overflow: hidden;
			li{
				width: 45%;
				margin: 0.4375rem 0 0.4375rem 3.3%;
				text-align: left;
				background-color: #a8a8a8;
				float: left;
				div{
					width: 100%;
				}
				.top{
					img{
						height: 9.375rem;
						width: 100%;
					}
					
				}
				.bottom{
					height: 3.125rem;
					p{
						margin-left: 0.4375rem;
						color: white;
						text-shadow: 2px 2px 3px rgba(0,0,0,0.5);
					}
					.p1{
						font-size: 1rem;
					}
					.p2{
						font-size: 0.75rem;
					}
				}
			}
		}
		button{
			outline: none;
			border: none;
			margin: 0.75rem auto;
			background-color: transparent;
		}
	}
</style>
