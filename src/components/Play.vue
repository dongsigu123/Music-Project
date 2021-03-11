<template>
	<!-- 这是播放条、歌词组件 -->
	<div class="play">
		<div class="playerBar" @click="play">
			<i>
				<img ref="rollImg" :src="song.al.picUrl+'?imageView=1&type=webp&thumbnail=246x0'">
			</i>
			<i>
				<p class="p1">{{song.name|namelength}}</p>
				<p class="p2">{{song.ar[0].name}}</p>
			</i>
			<i @click.stop="bofang">
				<span ref="bofang" class="iconfont icon-zanting"></span>
				<canvas ref="canvas" style="width: 2.75rem;height: 2.75rem;"></canvas>
			</i>
		</div>
		<audio ref="musicplay"
			autoplay="autoplay"
			controls="controls"
			:src="`https://music.163.com/song/media/outer/url?id=${musicid2}.mp3`"
			@timeupdate="timeupdate"
		></audio>
		<transition enter-active-class="animate__animated animate__backInUp"
		leave-active-class="animate__animated animate__backOutDown">
			<div class="lyric" v-show="isfulllrc">
				<span @click="myfullLrc" class="iconfont btn icon-zuojiantou"></span>
				<div class="top">
					<span class="s1">{{song.name}}</span>
					<router-link @click.native.self="myspan" class="p1" tag="p" :to="{path:'/singer/'+songerid}">{{song.ar[0].name}}</router-link>
				</div>
				<div class="lrc">
					<div class="zj">
						<div class="cp">
							<div ref="rollImg2" class="cp2"></div>
							<div class="txtp">
								<img ref="rollImg3" :src="song.al.picUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
							</div>
						</div>
					</div>
				</div>
				<div class="gc">
					<ul :style="{
						transform:`translateY(-${lrcCurrent*25/16}rem)`
						}">
						<li on v-for="(lrc,i) in lrcArr" :key="i" :class="{active:i==lrcCurrent}">{{lrc.lyric}}</li>
					</ul>
				</div>
				<div class="xtb">
					<i>
						<span class="iconfont icon-favor-active"></span>
					</i>
					<i @click="bsshouw">
						<span class="iconfont icon-kechengbofang-beisu"></span>
						<transition enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backOutDown">
							<div v-show="isbsshow" class="bs">
								<span @click.stop="beisu(2)">2倍</span>
								<span @click.stop="beisu(1.25)">1.25倍</span>
								<span @click.stop="beisu(1)">1倍</span>
								<span @click.stop="beisu(0.75)">0.75倍</span>
								<span @click.stop="beisu(0.5)">0.5倍</span>
							</div>
						</transition>
					</i>
					<i>
						<span class="iconfont icon-xiazai"></span>
					</i>
					<i @click="plshow">
						<span class="iconfont icon-touzirenpinglun"></span>
						<span class="plnum">{{plnum|plnum}}</span>
						<transition enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backOutDown">
							<div v-show="isPlshow" class="pl">
								<p>
									<span @click.stop="myfullLrc2" class="iconfont btn2 icon-zuojiantou"></span>
									<span class="s2">评论({{plnum}})</span>
								</p>
								<h3>精彩评论</h3>
								<ul>
									<Comment v-for="item in hotcomment" :item="item" :key="item.commentId" :textcolor="textcolor"></Comment>
								</ul>
								<h3>最新评论</h3>
								<ul>
									<Comment v-for="item in comment" :item="item" :key="item.commentId" :textcolor="textcolor"></Comment>
								</ul>
							</div>
						</transition>
					</i>
					<i>
						<span class="iconfont icon-gengduo"></span>
					</i>
				</div>
				<div class="bft">
					<span class="sj1">{{s1}}</span>
					<div @click="fnjdt" class="jdt">
						<span ref="yuan"></span>
						<div ref="xjdt" class="xjdt"></div>
					</div>
					<span class="sj2">{{s2}}</span>
					<span ref="bffs" @click="bffsbtn" class="bffs iconfont icon-shunxubofang"></span>
					<span @click="prev" class="iconfont icon-shangyishou"></span>
					<span ref="bfan2" @click="bofang" class="iconfont icon-bofang"></span>
					<span @click="next" class="iconfont icon-kuaijin"></span>
					<span @click="gqlbbtn" class="cd iconfont icon-caidan"></span>
					<transition enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backOutDown">
						<div v-show="isbflxShow" class="bflx">
							<span @click="bflx(1)" class="iconfont icon-shunxubofang"> 顺序播放</span>
							<span @click="bflx(2)" class="iconfont icon-suijibofang"> 随机播放</span>
							<span @click="bflx(3)" class="iconfont icon-danquxunhuan"> 单曲循环</span>
						</div>
					</transition>
					<transition enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backOutDown">
						<div v-show="isgqlbShow" class="gqlb">
							<ul>
								<li v-for="(s,k) in songids" :key="s.id" @click="playmusic(s)" :class="musicid==s.id?'active':''">
									<div class="left">
										<span class="s1">{{k+1}}</span>
									</div>
									<div class="right">
										<p>{{s.name}}</p>
										<p>{{s.song.artists[0].name}}</p>
									</div>
								</li>
							</ul>
						</div>
					</transition>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import Comment from "./Comment.vue"
	import {mapState} from "vuex"
	export default{
		props:["musicid"],
		components:{
			Comment
		},
		data(){
			return {
				textcolor:1,
				song:{
					al:{
						picUrl:""
					},
					name:null,
					ar:[
						{name:""}
					]
				},
				lrcArr:[],
				lrcCurrent:0,
				s1:"00:00",
				s2:"00:00",
				isbsshow:false,//倍速
				hotcomment:{},//热门评论
				comment:{},//最新评论
				isPlshow:false,
				plnum:{},//评论数量
				isbflxShow:false,//播放类型
				bffs:1,//设置数值，根据数值选择播放方式
				isgqlbShow:false//歌曲播放列表
			}
		},
		watch:{
			musicid2(val){
				this.$http.get('/song/detail?ids='+val).then(data=>{//根据id获取歌曲详细信息.
					this.song=data.data.songs[0];
					// console.log(this.song)
				});
				this.$http.get("/comment/music?id="+val+"&limit=20").then(data=>{
					this.hotcomment=data.data.hotComments;
					this.comment=data.data.comments;
					this.plnum=data.data.total;
				})
				this.$http.defaults.baseURL="http://music.kele8.cn";//临时改变请求baseURL
				this.$http.get('/lyric?id='+val).then((lrcdata)=>{//请求歌词信息
					let lrc=lrcdata.data.lrc.lyric;
					let lrcArr=lrc.split(/\n/);
					//[00:00.000] 作词 : 小星星Aurora
					let reg=/\[(\d+):(\d+\.\d+)\](.+)/;
					this.lrcArr=lrcArr.map(lc=>{
						reg.test(lc)
						return {
							time:parseInt(RegExp.$1*60)+parseFloat(RegExp.$2),
							lyric:RegExp.$3
						}
					})
				})
				this.$http.defaults.baseURL='http://musicapi.leanapp.cn/';//把临时服务器请求改回 leanapp.cn
				if(val == ""){
					return console.log(111);
				}
				return val;
			}
		},
		computed:{
			...mapState({
				songerid:"songerid",
				isfulllrc:"isfulllrc",
				songids:"songids",
				songcurindex:"songcurindex",
				isplay:"isplay",
				musicid2:"musicid"
			})
		},
		methods:{
			playmusic(value){//歌曲播放列表
				let arr = this.songids;
				var num=[];
				for(let s in arr){
					if(value.id == arr[s].id){
						// console.log(s,arr[s].id);
						num=s;
					}
				}
				this.$store.commit("modifystate",{
					musicid:value.id,
					songerid:value.song.artists[0].id,
					songcurindex:num
				});
				this.isgqlbShow=false;
			},
			gqlbbtn(){//歌曲播放列表图标
				if(this.isgqlbShow){
					this.isgqlbShow=false;
				}else{
					this.isgqlbShow=true;
				}
			},
			bffsbtn(){//播放方式
				if(this.isbflxShow){
					this.isbflxShow=false;
				}else{
					this.isbflxShow=true;
				}
			},
			bflx(value){//播放类型
				if(value==1){
					this.$refs.bffs.className="bffs iconfont icon-shunxubofang";
				}else if(value==2){
					this.$refs.bffs.className="bffs iconfont icon-suijibofang";
				}else{
					this.$refs.bffs.className="bffs iconfont icon-danquxunhuan";
				}
				this.isbflxShow=false;
				this.bffs=value;
			},
			random(){//随机播放
				let str=this.songids;
				let length=str.length;
				let num=Math.floor(Math.random()*(length+1));
				this.$store.commit("modifystate",{
					songcurindex:num,
					musicid:str[num].id,
				});
			},
			prev(){//上一首
				if(this.bffs==1 || this.bffs==3){
					let str=this.songids;
					let num=this.songcurindex;
					num--;
					if(num<0){
						num=str.length-1;
					}
					this.$store.commit("modifystate",{
						songcurindex:num,
						musicid:str[num].id
					});
				}
			},
			next(){//下一首
				if(this.bffs==1 || this.bffs==3){
					let str=this.songids;
					let num=this.songcurindex;
					num++;
					if(num>str.length-1){
						num=0;
					}
					this.$store.commit("modifystate",{
						songcurindex:num,
						musicid:str[num].id
					});
				}else if(this.bffs==2){
					this.random();
				}
			},
			myspan(){//歌手页面跳转
				this.$store.commit("modifystate",{isfulllrc:false});
			},
			play(){//小播放条
				this.$store.commit("modifystate",{isfulllrc:true});
			},
			myfullLrc(){//歌曲页面
				this.$store.commit("modifystate",{isfulllrc:false});
			},
			myfullLrc2(){//评论页面
				this.isPlshow=false;
				window.scroll(0,0);
			},
			plshow(){//查看歌曲评论
				this.isPlshow=true;
			},
			beisu(value){//倍速
				// this.bsnum=value;
				this.$refs.musicplay.playbackRate=value;
				this.isbsshow=false;
			},
			bsshouw(){//查看倍速
				if(this.isbsshow){
					this.isbsshow=false;
				}else{
					this.isbsshow=true;
				}
			},
			bofang(){//页面播放按钮
				if(this.isplay){
					this.$refs.musicplay.pause();//暂停音乐
					this.$refs.bofang.className="iconfont icon-bofang2";//改变播放条的播放标签类名
					this.$refs.bfan2.className="iconfont icon-bofang1";
					this.$refs.rollImg.style.animationPlayState="paused";//歌曲图片是否旋转
					this.$refs.rollImg2.style.animationPlayState="paused";
					this.$refs.rollImg3.style.animationPlayState="paused";
					this.$store.commit("modifystate",{isplay:false});//改变是否播放的判断
				}else{
					this.$refs.musicplay.play();
					this.$refs.bofang.className="iconfont icon-zanting";
					this.$refs.bfan2.className="iconfont icon-bofang";
					this.$refs.rollImg.style.animationPlayState="running";
					this.$refs.rollImg2.style.animationPlayState="running";
					this.$refs.rollImg3.style.animationPlayState="running";
					this.$store.commit("modifystate",{isplay:true});
				}
			},
			fnjdt(e){//进度条
				let barX=e.offsetX;
				let jdtw=document.querySelector(".jdt").clientWidth;
				let newcurrentTime=(barX*this.$refs.musicplay.duration)/jdtw;
				this.$refs.musicplay.currentTime=newcurrentTime;
			},
			timeupdate(event){//audio标签
				let audio=event.target;
				let currentTime=audio.currentTime;//当前播放的时间
				let durationTime=audio.duration;//总时长
				
				let jdtw=document.querySelector(".jdt").clientWidth;
				let weizhi=(jdtw*currentTime)/durationTime;
				this.$refs.yuan.style.left=(weizhi-3)/16+"rem";
				this.$refs.xjdt.style.width=weizhi/16+"rem";
				this.s1=this.formatTime(currentTime);
				this.s2=this.formatTime(durationTime);
				
				if(audio.ended){//歌曲播放完后要进行的播放方式
					if(this.bffs==1){
						this.next();
					}else if(this.bffs==2){
						this.random();
					}else{
						audio.load();
					}
				}
				
				for(var i in this.lrcArr){
					let lrcTime=this.lrcArr[i].time;//歌词的时间
					//判断当前歌词时间如果 小于等于当前播放时间，但是小于下一个歌词时间，当前歌词播放
					var i2=parseInt(i)+1;
					if(i>=this.lrcArr.length-1){
						this.lrcCurrent=i;
						break;
					}
					if(currentTime>=lrcTime && currentTime<this.lrcArr[i2].time){
						this.lrcCurrent=i; 
						break;
					}
				}
				this.drawCircle(currentTime,durationTime);
			},
			drawCircle(c,d){//小播放条的圆
				let canvas=this.$refs.canvas;
				canvas.width=44;
				canvas.height=44;
				let cxt=canvas.getContext('2d');//上下文
				cxt.beginPath();
				cxt.lineWidth=2;
				cxt.strokeStyle="red";
				cxt.arc(21,22,20,0,Math.PI*2);
				cxt.stroke();
				cxt.closePath();
				
				cxt.beginPath();
				cxt.lineWidth=2;
				cxt.strokeStyle="blue";
				cxt.arc(21,22,20,0,(Math.PI*2*(c/d)));  
				cxt.stroke(); 
				cxt.closePath();
			},
			formatTime(seconds){//歌曲播放时间
				if(isNaN(seconds)){
					return "00:00";
				}
				else{
					var m = Math.floor( seconds/60%60 );
					m = m<10 ? "0"+m : m ;
					var s = Math.floor( seconds%60 );
					s = s<10 ? "0"+s : s;
					return `${m}:${s}`;
				}
			}
		},
		filters:{
			plnum(value){//判断评论数量
				if(value>=999){
					return "999+";
				}
				return value;
			},
			namelength(value){
				if(value != null){
					if(value.length<=25){
						return value;
					}else{
						let str=value.substr(0,25)+"...";
						return str;
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.play{
		width: 100%;
		height: 3.125rem;
		position: fixed;
		z-index: 3;
		bottom: -0.0625rem;
		left: 0;
		background-image: linear-gradient(to right, pink,skyblue);
		.playerBar{
			width: 100%;
			display: flex;
			i{
				display: inline-block;
				font-style: normal;
				&:nth-of-type(1){
					img{
						width: 2.8125rem;
						height: 2.8125rem;
						margin: -0.4375rem 0 0 0.625rem;
						border-radius: 50%;
						vertical-align: bottom;
						animation: rollImg 5s linear 0s infinite;
					}
				}
				&:nth-of-type(2){
					flex: 1;
					text-align: left;
					p{
						margin-left: 0.4375rem;
					}
					.p1{
						font-size: 1rem;
						margin-top: 0.3125rem;
						color: #333;
					}
					.p2{
						font-size: 0.875rem;
						color: #999;
					}
				}
				&:nth-of-type(3){
					padding: 0.1875rem 0.3125rem 0.3125rem 0;
					position: relative;
					span{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-58%,-60%);
						font-size: 1.5625rem;
						color: #333;
						font-weight: bold;
					}
				}
			}
		}
		.lyric{
			width: 100vw;
			height: 100vh;
			background-image: linear-gradient(to bottom, #180708 20%, #300607 50%, #1e1c1c );
			// background-image: linear-gradient(to bottom, pink, skyblue );
			position: relative;
			overflow: hidden;
			left: 0;
			top: -100vh;
			transform: translateY(-1.625rem);
			z-index: 9;
			.btn{
				position: absolute;
				top: 0.625rem;
				left: 0.4375rem;
				font-size: 1.875rem;
				font-weight: bold;
				color: white;
				z-index: 3;
			}
			.top{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				padding-top: 0.3125rem;
				.s1{
					font-size: 1.125rem;
					color: white;
					display: block;
					margin: 0 auto;
					width: 75%;
					font-weight: bold;
					white-space: nowrap;
					overflow: hidden;
					word-break:keep-all;
					text-overflow:ellipsis;
				}
				.p1{
					font-size: 1rem;
					color: #999;
					font-weight: bold;
					height: 1.875rem;
					position: absolute;
					padding: 0.3125rem 0.625rem;
					left: 50%;
					z-index: 2;
					transform: translateX(-50%);
				}
			}
			.lrc{
				position: relative;
				width: 100%;
				.zj{
					width: 100%;
					height: 60vh;
					.cp{
						width: 18.5rem;
						height: 18.5rem;
						position: relative;
						top: 10vh;
						left: 50%;
						transform: translateX(-50%);
						background-image: url(../assets/cptp1.png);
						background-size: contain;
						z-index: 2;
						.cp2{
							background-image: url(../assets/cptp2.png);
							background-size: contain;
							position: absolute;
							width: 18.5rem;
							height: 18.5rem;
							left: 67%;
							top: 0;
							z-index: 3;
							margin-left: -12.375rem;
							animation: rollImg 5s linear 0s infinite;
						}
						.txtp{
							position: absolute;
							left: 50%;
							top: 17%;
							z-index: 2;
							margin-left: -5.9375rem;
							width: 11.875rem;
							height: 11.875rem;
							border-radius: 50%;
							overflow: hidden;
							img{
								animation: rollImg 5s linear 0s infinite;
								width: 100%;
								vertical-align: middle;
							}
						}
					}
				}
			}
			.gc{
				position: absolute;
				height: 25vh;
				overflow: hidden;
				padding-top: 3.125rem;
				width: 100%;
				left: 0;
				bottom: 18vh;
				ul{
					width: 95%;
					margin: 0 auto;
					li{
						min-height: 1.5625rem;
						color: #999;
						font-size: 1rem;
						&.active{
							color: white;
							font-size: 1.3125rem;
							margin-bottom: 0.3125rem;
						}
					}
				}
			}
			.xtb{
				width: 100%;
				height: 5vh;
				position: absolute;
				left: 0;
				bottom: 10vh;
				display: flex;
				i{
					flex: 1;
					position: relative;
					font-style: normal;
					span{
						color: white;
						font-size: 1.25rem;
						line-height: 5vh;
					}
					&:nth-of-type(2){
						div{
							position: absolute;
							background-color: #180708;
							z-index: 2;
							width: 100%;
							top: -7.8125rem;
							span{
								width: 100%;
								display: inline-block;
								line-height: 1.5625rem;
								font-size: 1rem;
							}
						}
					}
					&:nth-of-type(4){
						.plnum{
							position: absolute;
							top: -0.625rem;
							color: white;
							left: 2.5rem;
							display: block;
							z-index: 2;
							font-size: 0.75rem;
						}
						.pl{
							width: 100vw;
							height: 100vh;
							position: absolute;
							z-index: 3;
							top: -85vh;
							left: -60vw;
							overflow-y: auto;
							background-image: linear-gradient(to bottom, #180708 20%, #300607 50%, #1e1c1c );
							padding-top: 3.125rem;
							p{
								text-align: left;
								overflow: hidden;
								position: fixed;
								top: 0;
								width: 100%;
								left: 0;
								line-height: 3.125rem;
								height: 3.125rem;
								z-index: 2;
								background-color: #dd001b;
								span{
									float: left;
								}
								.btn2{
									font-size: 1.875rem;
									font-weight: bold;
									color: white;
									margin: 0.5625rem 0.3125rem 0 0.3125rem;
								}
								.s2{
									font-size: 1.125rem;
									color: white;
									font-weight: bold;
									float: left;
									margin-top: 0.625rem;
								}
							}
							h3{
								text-align: left;
								color: white;
								font-weight: bold;
								font-size: 1.25rem;
								margin: 0.625rem 0 0.3125rem 0.9375rem;
							}
						}
					}
				}
			}
			.bft{
				width: 100%;
				height: 10vh;
				position: absolute;
				left: 0;
				bottom: 0;
				// background-image: linear-gradient(to right, #CCFBFF, #EF96C5);
				text-align: center;
				.jdt{
					width: 65%;
					height: 0.3125rem;
					background-color: white;
					margin: 0.4375rem auto;
					position: relative;
					.xjdt{
						width: 0;
						height: 0.3125rem;
						background-color: #dd001b;
					}
					span{
						width: 0.6875rem;
						height: 0.6875rem;
						background-color: #dd001b;
						border-radius: 50%;
						position: absolute;
						left: -0.1875rem;
						top: -0.1875rem;
					}
				}
				.sj1,.sj2{
					position: absolute;
					top: -0.125rem;
					color: white;
					padding: 0.1875rem;
				}
				.sj1{
					left: 0.4375rem;
				}
				.sj2{
					right: 0.4375rem;
				}
				.iconfont{
					font-size: 2.0625rem;
					margin: 0.3125rem 0.625rem 0;
					color: white;
				}
				.bffs{
					font-size: 1.5rem;
					position: absolute;
					left: 10%;
				}
				.cd{
					position: absolute;
					left: 80%;
					font-size: 1.5rem;
				}
				.bflx{
					position: absolute;
					left: 16.5%;
					width: 6.25rem;
					height: 5rem;
					transform: translateX(-50%);
					z-index: 2;
					background-color: #180708;
					top: -3.75rem;
					span{
						font-size: 0.875rem;
						color: white;
						line-height: 1.25rem;
						display: block;
						margin: 0.3125rem 0 0 0.1875rem;
					}
				}
				.gqlb{
					position: absolute;
					left: 78%;
					width: 9.375rem;
					height: 12.5rem;
					transform: translateX(-50%);
					top: -11.25rem;
					z-index: 2;
					background-color: #180708;
					overflow-y: auto;
					ul{
						width: 100%;
						li{
							color: white;
							font-size: 0.75rem;
							overflow: hidden;
							text-align: left;
							height: 2.1875rem;
							&.active{
								color:  #dd001b;
							}
							.left{
								float: left;
								width: 20%;
								height: 2.1875rem;
								span{
									display: block;
									text-align: center;
									line-height: 2.1875rem;
								}
							}
							.right{
								width: 80%;
								float: left;
								p{
									width: 95%;
									display: block;
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
		}
	}
	@keyframes rollImg{
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(360deg);
		}
	}
</style>
