<template>
	<!-- 这是歌手主页 -->
	<div class="singer">
		<Return>歌手</Return>
		<div class="top">
			<div>
				<img :src="picUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
				<p>歌手: {{songname}}</p>
			</div>
		</div>
		<div class="nav">
			<ul>
				<li @click="liclick(1)" :class="curindex==1?'active':''">单曲</li>
				<li @click="liclick(2)" :class="curindex==2?'active':''">专辑</li>
				<li @click="liclick(3)" :class="curindex==3?'active':''">MV</li>
				<li @click="liclick(4)" :class="curindex==4?'active':''">描述</li>
			</ul>
		</div>
		<div class="content">
			<!-- 单曲、专辑、mv、详情 -->
			<Single v-show="curindex==1" :Single="Single"></Single>
			<Album v-show="curindex==2" :Album="Album"></Album>
			<Singermv v-show="curindex==3" :Singermv="Singermv"></Singermv>
			<Describe v-show="curindex==4" :Describe="Describe"></Describe>
		</div>
	</div>
</template>

<script>
	import Return from "../components/Return.vue"
	import Single from "../components/Single.vue"
	import Album from "../components/Album.vue"
	import Singermv from "../components/Singermv.vue"
	import Describe from "../components/Describe.vue"
	export default{
		components:{
			Return,
			Single,
			Album,
			Singermv,
			Describe
		},
		data(){
			return{
				curindex:1,
				song:[],//获取歌手图片、名字
				Single:[],//获取歌手单曲
				Album:[],//获取专辑
				Singermv:[],//歌手mv
				Describe:"",//歌手描述
				picUrl:[],//歌手图片
				songname:[]
			}
		},
		watch:{
			"song.artist":function(n,o){
				this.picUrl=n.picUrl;
				this.songname=n.name;
			}
		},
		methods:{
			liclick(value){
				this.curindex=value;
			}
		},
		created() {
			let songid=[];
			this.$axios.get("/artists?id="+this.$route.params.singerid).then(data=>{//获取单曲
				this.song=data.data;
				songid=data.data.hotSongs
				// console.log(this.song);
			}).then(()=>{
				for(let i of songid){
					this.$axios.get("/song/detail?ids="+i.id).then(data=>{
						this.Single.push({
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
				// console.log(this.Single)
			})
			this.$axios.get("/artist/album?id="+this.$route.params.singerid).then(data=>{//获取专辑
				this.Album=data.data.hotAlbums
				// console.log(this.Album);
			})
			this.$axios.get("/artist/mv?id="+this.$route.params.singerid).then(data=>{//获取mv
				this.Singermv=data.data.mvs;
				// console.log(this.Singermv);
			});
			this.$axios.get("/artist/desc?id="+this.$route.params.singerid).then(data=>{//获取描述
				this.Describe=data.data.briefDesc;
				// console.log(this.Describe);
			});
		}
	}
</script>

<style lang="less" scoped="scoped">
	.singer{
		padding-top: 2.5rem;
		.top{
			width: 100%;
			background-color: #cfcfcf;
			div{
				margin: 0 auto;
				width: 70%;
				position: relative;
				img{
					height: 12.5rem;
					vertical-align: bottom;
				}
				p{
					position: absolute;
					left: -7%;
					bottom: 3%;
					color: white;
					text-shadow: 2px 2px 3px rgba(0,0,0,.5);
					font-size: 1.125rem;
				}
			}
		}
		.nav{
			width: 100%;
			height: 2.5rem;
			ul{
				width: 100%;
				height: 100%;
				display: flex;
				border-bottom: 1px solid #ddd;
				li{
					flex: 1;
					line-height: 2.5rem;
					color: #999;
					font-size: 1.125rem;
					font-weight: bold;
					text-decoration: none;
				}
				.active{
					font-size: 1.25rem;
					color: #dd001b;
				}
			}
		}
	}
</style>
