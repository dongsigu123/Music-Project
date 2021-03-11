<template>
	<!-- 这是 歌手的专辑 -->
	<div class="albummusic">
		<Return>歌手专辑</Return>
		<div class="top">
			<div class="left">
				<img :src="albuminfor.picUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
			</div>
			<div class="right">
				<p class="p1">{{albuminfor.name}}</p>
				<p class="p2">{{albuminfor.publishTime|time}}</p>
			</div>
		</div>
		<div class="content">
			<div class="nav">
				<ul>
					<li @click="liclick(1)" :class="curindex==1?'active':''">歌曲列表</li>
					<li @click="liclick(2)" :class="curindex==2?'active':''">评论</li>
					<li @click="liclick(3)" :class="curindex==3?'active':''">专辑信息</li>
				</ul>
			</div>
			<div class="bottom">
				<ul v-show="curindex==1">
					<Songlist v-for="item in albumsong" :songstr="albumsong" :item="item" :key="item.id"></Songlist>
					<Loading v-if="albumsong.length<=0"></Loading>
				</ul>
				<ul v-show="curindex==2">
					<h3>精彩评论</h3>
					<comment v-for="item in hotcomment" :item="item" :key="item.commentId" :textcolor="2"></comment>
					<h3>最新评论</h3>
					<comment v-for="item in comment" :item="item" :key="item.commentId" :textcolor="2"></comment>
				</ul>
				<ul class="ul3" v-show="curindex==3">
					<li>
						<div class="left"><p>专辑</p></div>
						<div class="right"><p>{{albuminfor.name}}</p></div>
					</li>
					<li>
						<div class="left"><p>唱片公司</p></div>
						<div class="right"><p>{{albuminfor.company|company}}</p></div>
					</li>
					<li>
						<div class="left"><p>发行时间</p></div>
						<div class="right"><p>{{albuminfor.publishTime|time}}</p></div>
					</li>
					<li>
						<div class="left"><p>专辑类型</p></div>
						<div class="right"><p>{{albuminfor.type}}</p></div>
					</li>
					<li>
						<p>{{albuminfor.description}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Return from "../components/Return.vue"
	import Songlist from "../components/Songlist.vue"
	import Loading from "../components/Loading.vue"
	import Comment from "../components/Comment.vue"
	export default{
		components:{
			Return,
			Songlist,
			Loading,
			Comment
		},
		data(){
			return{
				albuminfor:[],//专辑信息
				albumsong:[],//专辑音乐
				curindex:1,
				hotcomment:[],//热门评论
				comment:[]//最新评论
			}
		},
		methods:{
			liclick(value){
				this.curindex=value;
			}
		},
		created() {
			let songid=[];
			this.$axios.get("/album?id="+this.$route.params.albumid).then(data=>{
				this.albuminfor=data.data.album;
				songid=data.data.songs
				// console.log(this.albuminfor)
			}).then(()=>{
					for(let i of songid){
						this.$axios.get("/song/detail?ids="+i.id).then(data=>{
							this.albumsong.push({
								name:data.data.songs[0].name,
								id:data.data.songs[0].id,
								song:{
									alias:data.data.songs[0].alia,
									privilege:{
										maxbr:data.data.privileges[0].maxbr
									},
									artists:data.data.songs[0].ar
								}
							});
						})
					}
				// console.log(this.albumsong)
			});
			this.$axios.get("/comment/album?id="+this.$route.params.albumid).then(data=>{
				this.hotcomment=data.data.hotComments;
				this.comment=data.data.comments
				// console.log(data);
			})
		},
		filters:{
			time(value){
				let date=new Date(value);
				let year=date.getFullYear();
				let moth=date.getMonth()+1;
				let day=date.getDate();
				return year+"年"+moth+"月"+day+"日";
			},
			company(value){
				if(value!=null){
					return value;
				}else {
					return "(无)";
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.albummusic{
		width: 100%;
		padding-top: 2.5rem;
		.top{
			width: 100%;
			overflow: hidden;
			margin-top: 0.9375rem;
			padding-left: 0.3125rem;
			height: 20vh;
			border-bottom: 1px solid #ddd;
			div{
				float: left;
			}
			.left{
				width: 35%;
				float: left;
				img{
					vertical-align: bottom;
				}
			}
			.right{
				padding-left: 1.25rem;
				padding-top: 1.875rem;
				width: 65%;
				text-align: left;
				.p1{
					font-size: 1.25rem;
					color: #333;
				}
				.p2{
					font-size: 1rem;
					margin-top: 0.3125rem;
					color: #999;
				}
			}
		}
		.content{
			width: 100%;
			.nav{
				width: 100%;
				line-height: 2.5rem;
				border-bottom: 1px solid #ddd;
				ul{
					width: 100%;
					display: flex;
					li{
						flex: 1;
						color: #999;
						font-size: 1.125rem;
						font-weight: bold;
					}
					.active{
						font-size: 1.25rem;
						color: #dd001b;
					}
				}
			}
			.bottom{
				width: 100%;
				ul{
					width: 100%;
					h3{
						text-align: left;
						color: white;
						background-color: #ddd;
						font-weight: bold;
						font-size: 1.125rem;
						padding-left: 0.4375rem;
						line-height: 1.875rem;
					}
				}
				.ul3{
					li{
						width: 95%;
						margin: 0 auto;
						border-bottom: 1px solid #ddd;
						text-align: left;
						overflow: hidden;
						div{
							float: left;
						}
						.left{
							width: 35%;
							p{
								font-size: 1.125rem;
								line-height: 1.875rem;
								color: #b4b4b4;
								font-weight: bold;
							}
						}
						.right{
							width: 65%;
							p{
								font-size: 1rem;
								color: #333;
								line-height: 1.875rem;
							}
						}
						&:nth-last-of-type(1){
							p{
								width: 95%;
								font-size: 1rem;
								line-height: 1.5625rem;
								color: #333;
								text-indent: 2em;
							}
						}
					}
				}
			}
		}
	}
</style>
