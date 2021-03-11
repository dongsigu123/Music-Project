<template>
	<!-- 这是推荐歌单组件 -->
	<div class="recommend">
		<Title class="gd">
			推荐歌单
			<span class="gengduo iconfont icon-arrow-right" @click="gengduo"></span>
		</Title>
		<div class="musiclist">
			<ul>
				<router-link v-for="m in mymusiclist" :key="m.id" tag="li" :to="{path:'/musiclist/'+m.id}" @click.native="liclick">
					<div>
						<img :src="m.picUrl+'?imageView=1&type=webp&thumbnail=246x0'">
						<p class="p1">
							<span class="shuliang iconfont icon-V">{{m.playCount|shuliang}}</span>
						</p>
						<p class="p2">{{m.name|substr}}</p>
					</div>
				</router-link>
			</ul>
		</div>
		<Loading v-if="mymusiclist.length<=0"></Loading>
		<Title>推荐MV</Title>
		<div class="mv">
			<ul>
				<router-link v-for="m in mymv" :key="m.id" tag="li" :to="{path:'/mv/'+m.id}" @click.native="liclick2(m,mymv)">
					<div class="top">
						<img :src="m.picUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
						<span class="bf iconfont icon-bofang1"></span>
						<span class="bfsl iconfont icon-bofang2"> {{m.playCount}}</span>
					</div>
					<div class="bottom">
						<p class="p1">名称： {{m.name}}</p>
						<p class="p2">作者： {{m.artists[0].name}}</p>
					</div>
				</router-link>
			</ul>
			<Loading v-if="mymv.length<=0"></Loading>
		</div>
		<Title>推荐音乐</Title>
		<ul>
			<Songlist v-for="item in mynewsong" :songstr="mynewsong" :item="item" :key="item.id"></Songlist>
		</ul>
		<Loading v-if="mynewsong.length<=0"></Loading>
	</div>
</template>

<script>
import Title from "../components/Title.vue"
import Songlist from "../components/Songlist.vue"
import Loading from "../components/Loading.vue"
import {mapState} from "vuex"
export default {
	name: 'Recommend',
	components: {
		Title,
		Songlist,
		Loading
	},
	computed:{
		// ...mapState(["musicid"])
	},
	data(){
		return {
			mymusiclist:[],
			mynewsong:[],
			mymv:[]
		}
	},
	methods:{
		gengduo(){
			this.$router.push("/gdmusiclist");
			this.$store.commit("modifystate",{isnavshow:false});
		},
		liclick(){
			// window.scroll(0,0);
			this.$store.commit("modifystate",{isnavshow:false});
		},
		liclick2(v,v2){
			var num = "",arr = [];
			for(let s of v2){
				arr.push(s.id);
			}
			for(let s in arr){
				if(v.id == arr[s]){
					num=s;
				}
				// console.log(s)
			}
			// console.log(num);
			this.$store.commit("modifystate",{
				isnavshow:false,
				mvids:arr,
				mvindex:num
			});
		}
	},
	filters:{
		shuliang(value){
			if(value<10000){
				return value;
			}else{
				let str=" "+(value/10000).toFixed(1)+"万";
				return str;
			}
		},
		substr(value){
			if(value.length<=14){
				return value;
			}else{
				let str=value.substr(0,14)+"...";
				return str;
			}
		}
	},
	beforeRouteEnter(to,from,next) {
		next(vm=>{
			vm.$http.get("/personalized?limit=6").then(data=>{
				vm.mymusiclist=data.data.result;
				// console.log(vm.mymusiclist)
			});
			vm.$http.get("/personalized/newsong").then(data=>{
				vm.mynewsong=data.data.result;
				// console.log(vm.mynewsong)
			});
			vm.$http.get("/personalized/mv").then(data=>{
				vm.mymv=data.data.result;
				// console.log(vm.mymv)
			})
		})
	}
}
</script>

<style lang="less" scoped="scoped">
	.recommend{
		margin-top: 2.8125rem;
		.gd{
			.gengduo{
				float: right;
				margin-right: 0.3125rem;
				font-size: 1.25rem;
				font-weight: bold;
				&::after{
					content: "查看更多";
					position: absolute;
					right: 1.5625rem;
					font-size: 1.125rem;
					font-weight: normal;
				}
			}
		}
		.musiclist{
			overflow-x: auto;
			width: 100%;
			ul{
				width: 200%;
				li{
					width: 15%;
					float: left;
					margin-left: 1%;
					div{
						position: relative;
						img{
							width: 100%;
							vertical-align: bottom;
						}
						.p1{
							position: absolute;
							top: 0.3125rem;
							right: 0.3125rem;
							.shuliang{
								color: white;
								font-size: 0.75rem;
								text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
							}
						}
						.p2{
							font-size: 0.8125rem;
							text-align: left;
						}
					}
				}
			}
		}
		.mv{
			width: 100%;
			overflow: hidden;
			ul{
				width: 100%;
				overflow: hidden;
				li{
					width: 45%;
					float: left;
					margin: 0.4375rem 0 0.4375rem 3.3%;
					.top{
						position: relative;
						img{
							width: 100%;
							height: 6.875rem;
						}
						span{
							position: absolute;
							color: white;
							text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
						}
						.bf{
							font-size: 2.5rem;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
						}
						.bfsl{
							font-size: 0.875rem;
							left: 0.3125rem;
							bottom: 0.4375rem;
						}
					}
					.bottom{
						text-align: left;
						padding-left: 0.3125rem;
						width: 100%;
						p{
							width: 95%;
							white-space: nowrap;
							overflow: hidden;
							word-break:keep-all;
							text-overflow:ellipsis;
						}
						.p1{
							font-size: 0.875rem;
							color: #333;
						}
						.p2{
							font-size: 0.75rem;
							color: #999;
						}
					}
				}
			}
		}
	}
</style>