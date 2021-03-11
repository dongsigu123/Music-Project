<template>
	<!-- 这是歌单内容 -->
	<div class="musiclist">
		<Return>歌单</Return>
		<div class="top">
			<div class="bj" :style="{'background-image':`url(${recommendmusic.coverImgUrl}?imageView=1&type=webp&thumbnail=246x0)`}"></div>
			<div class="content">
				<div class="left" :style="{'background-image':`url(${recommendmusic.coverImgUrl}?imageView=1&type=webp&thumbnail=246x0)`}">
					<span class="s1">歌单</span>
					<span class="s2 iconfont icon-V"> {{recommendmusic.playCount|shuliang}}</span>
				</div>
				<div class="right">
					<p class="p1">{{recommendmusic.name}}</p>
					<p class="p2">
						<img :src="avatarUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
						<span>{{nickname}}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="music">
			<p class="h3">歌曲列表</p>
			<ul>
				<Songlist v-for="(item, k) in musiclist" :songstr="musiclist"  :item="item" :key="item.id">
					<div class="leftnum">{{k+1}}</div>
				</Songlist>
			</ul>
			<Loading v-if="musiclist.length<=0"></Loading>
		</div>
		<div class="comment">
			<p class="h3">最新评论</p>
			<ul>
				<Comment v-for="item in comment" :item="item" :key="item.commentId" :textcolor="2"></Comment>
			</ul>
			<Loading v-if="comment.length<=0"></Loading>
		</div>
	</div>
</template>

<script>
	import Songlist from "../components/Songlist.vue"
	import Comment from "../components/Comment.vue"
	import Loading from "../components/Loading.vue"
	import Return from "../components/Return.vue"
	export default{
		components:{
			Songlist,
			Comment,
			Loading,
			Return
		},
		data(){
			return {
				recommendmusic:{},
				musiclist:[],
				comment:[],
				hotmusic:[],
				avatarUrl:[],
				nickname:[]
			}
		},
		watch:{
			"recommendmusic.creator":function(n,o){
				this.avatarUrl=n.avatarUrl;
				this.nickname=n.nickname;
			}
		},
		methods:{
		},
		filters:{
			shuliang(value){
				let str=" "+(value/10000).toFixed(1)+"万";
				return str;
			}
		},
		created() {
			let trackIds=[];
			this.$axios.get("/playlist/detail?id="+this.$route.params.musicid).then(data=>{
				this.recommendmusic=data.data.playlist;
				// console.log(this.recommendmusic)
				trackIds=this.recommendmusic.trackIds;
				// console.log(trackIds);
			}).then(()=>{
				for(let i of trackIds){
					this.$axios.get("/song/detail?ids="+i.id).then(data=>{
						this.musiclist.push({
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
						// console.log(this.musiclist)
					})
				}
			});
			this.$axios.get("/comment/playlist?id="+this.$route.params.musicid).then(data=>{
				this.comment=data.data.comments;
				// console.log(this.comment)
			});
		}
	}
</script>

<style lang="less" scoped="scoped">
	.musiclist{
		padding-top: 2.5rem;
		.top{
			width: 100%;
			height: 28vh;
			position: relative;
			overflow: hidden;
			.bj{
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: 50%;
				filter: blur(0.5625rem);
				&::after{
					content: "";
					background-color: rgba(0,0,0,.25);
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
				}
			}
			.content{
				width: 95%;
				height: 80%;
				position: relative;
				left: 2.5%;
				top: 10%;
				display: flex;
				.left{
					width: 7.875rem;
					height: 7.875rem;
					position: relative;
					background-repeat: no-repeat;
					background-size: cover;
					background-position: 50%;
					.s1{
						position: absolute;
						left: 0;
						top: 0.9375rem;
						background-color: rgba(217,48,48,.8);
						font-size: 0.75rem;
						line-height: 1.0625rem;
						padding: 0 0.5rem;
						border-radius: 0 0.4375rem 0.4375rem 0;
						color: white;
					}
					.s2{
						text-shadow: 1px 0 0 rgba(0,0,0,.15);
						font-size: 0.75rem;
						color: white;
						position: absolute;
						top: 0;
						right: 0.1875rem;
					}
				}
				.right{
					margin-left: 0.9375rem;
					width: 60%;
					p{
						text-align: left;
					}
					.p1{
						width: 95%;
						color: white;
					}
					.p2{
						margin-top: 1.25rem;
						line-height: 1.875rem;
						img{
							width: 1.875rem;
							height: 1.875rem;
							border-radius: 50%;
							vertical-align: middle;
						}
						span{
							color: hsla(0,0%,100%,.7);
							font-size: 0.875rem;
							display: inline-block;
							margin-left: 0.3125rem;
						}
					}
				}
			}
		}
		.music{
			width: 100%;
			.h3{
				line-height: 1.4375rem;
				font-size: 0.75rem;
				background-color: #eeeff0;
				padding-left: 0.4375rem;
				text-align: left;
				color: #666;
			}
			ul{
				li{
					.leftnum{
						height: 2.5rem;
						line-height: 2.5rem;
						padding-right: 0.625rem;
						float: left;
						color: #dd001b;
						width: 8%;
						text-align: center;
					}
					&:nth-child(n+4){
						.leftnum{
							color: #999;
						}
					}
				}
			}
			
		}
		.comment{
			.h3{
				line-height: 1.4375rem;
				font-size: 0.75rem;
				text-align: left;
				background-color: #eeeff0;
				padding-left: 0.4375rem;
				color: #666;
			}
		}
	}
</style>
