<template>
	<!-- 更多歌单 -->
	<div class="gdmusic">
		<Return>更多歌单</Return>
		<div class="musiclist">
			<ul>
				<router-link @click.native="liclick" v-for="m in mymusiclist" tag="li" :to="{path:'/musiclist/'+m.id}" :key="m.id">
					<div>
						<img :src="m.picUrl+'?imageView=1&type=webp&thumbnail=246x0'">
						<p class="p1">
							<span class="shuliang iconfont icon-V">{{m.playCount|shuliang}}</span>
						</p>
						<p class="p2">{{m.name}}</p>
					</div>
				</router-link>
			</ul>
			<Loading v-if="mymusiclist.length<=0"></Loading>
		</div>
	</div>
</template>

<script>
	import Loading from "../components/Loading.vue"
	import Return from "../components/Return.vue"
	export default{
		data(){
			return {
				mymusiclist:[],
				num:0
			}
		},
		components:{
			Loading,
			Return
		},
		methods:{
			liclick(){
				window.scroll(0,0);
			}
		},
		created() {
			this.$axios.get("/personalized?limit=30").then(data=>{
				this.mymusiclist=data.data.result;
				// console.log(this.mymusiclist);
			})
		},
		filters:{
			shuliang(value){
				let str=" "+(value/10000).toFixed(1)+"万";
				return str;
			}
		}
		
	}
</script>

<style lang="less" scoped="scoped">
	.gdmusic{
		padding-top: 2.5rem;
		.musiclist{
			width: 100%;
			ul{
				width: 100%;
				overflow: hidden;
				li{
					width: 31%;
					float: left;
					margin: 0.4375rem 0 0.4375rem 1.75%;
					&:nth-child(3n){
						margin-right: 1.75%;
					}
					div{
						position: relative;
						img{
							width: 100%;
							height: 7.5rem;
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
							line-height: 1.5625rem;
							white-space: nowrap;
							overflow: hidden;
							word-break:keep-all;
							text-overflow:ellipsis;
						}
					}
				}
			}
		}
	}
</style>
