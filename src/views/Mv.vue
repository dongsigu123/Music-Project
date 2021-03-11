<template>
	<!-- mv播放页面 -->
	<div class="mv">
		<Return>MV</Return>
		<div class="mymv">
			<div class="mvtop">
				<video @click="videoclick" @dblclick="videoclick2" ref="myvideo" :src="videourl" @timeupdate="timeupdate"></video>
				<div class="tb">
					<transition enter-active-class="animate__animated animate__bounceInLeft" leave-active-class="animate__animated animate__bounceOutLeft">
						<span v-show="issuoShow" @click.stop="suo" class="suo iconfont" :class="iskai?'icon-kaisuo':'icon-guansuo'"></span>
					</transition>
					<div class="bfjz">
						<span v-show="istbShow" ref="bofang" class="bfzt iconfont icon-bofang1" @click.stop="bf"></span>
					</div>
					<transition enter-active-class="animate__animated animate__bounceInUp" leave-active-class="animate__animated animate__bounceOutDown">
						<div v-show="istbShow" class="top">
							<div class="left">
								<span @click="next" class="iconfont icon-kuaijin"></span>
								<span class="s2">{{s1}}</span> /
								<span class="s3">{{s2}}</span>
							</div>
							<div class="right">
								<span @click.stop="laba" class="laba iconfont icon-iconfonthuodonggonggao"></span>
								<span @click.stop="bsnn" class="bsnn iconfont icon-kechengbofang-beisu"></span>
								<span class="mvhz" @click="hzshow">{{hz}}</span>
								<span @click.stop="quanping" class="quanping iconfont icon-quanping1"></span>
								<span class="mvgd iconfont icon-gengduo1"></span>
								<transition enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backOutDown">
									<div v-show="isbsShow" class="bs">
										<span @click.stop="beisu(2)">2倍</span>
										<span @click.stop="beisu(1.25)">1.25倍</span>
										<span @click.stop="beisu(1)">1倍</span>
										<span @click.stop="beisu(0.75)">0.75倍</span>
										<span @click.stop="beisu(0.5)">0.5倍</span>
									</div>
								</transition>
								<transition enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backOutDown">
									<div v-show="ishzShow" class="hz">
										<span @click="huazhi(k)" :key="h.id" v-for="(h, k) in mvdata.brs">{{k}}p</span>
									</div>
								</transition>
							</div>
						</div>
					</transition>
					<transition enter-active-class="animate__animated animate__bounceInUp" leave-active-class="animate__animated animate__bounceOutDown">
						<div  v-show="istbShow"  class="jdt" @click.stop="fnjdt">
							<div ref="xjdt" class="xjdt"></div>
							<div ref="yuan" class="yuan"></div>
						</div>
					</transition>
				</div>
				<div class="js">
					<p class="p1">名称: {{mvdata.name}}</p>
					<p class="p2">作者: {{artistsname}}</p>
				</div>
			</div>
			<div class="comment">
				<p class="h3">最新评论</p>
				<ul>
					<comment v-for="item in comment" :item="item" :key="item.commentId" :textcolor="2"></comment>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Return from "../components/Return.vue"
	import Comment from "../components/Comment.vue"
	import {mapState} from "vuex"
	export default{
		components:{
			Return,
			Comment,
		},
		data(){
			return {
				mvdata:Object,
				comment:[],
				isPlay:false,//是否播放视频
				isVoice:true,//视频是否有声音
				isbsShow:false,//倍速是否显示
				istbShow:true,//小图标是否显示
				timer:null,//延时器，用于video标签单双击事件使用
				issuoShow:true,//锁是否显示
				flag:true,//一个flag，用来判断两个显示隐藏
				ishzShow:false,//画质是否显示
				hznum:240,//视频画质数值
				hz:"流畅",//视频画质
				currentTime:"",//改变画质后保持当前播放时间
				s1:"00:00",
				s2:"00:00",
				s3:"",//改变画质后备份当前播放时间
				videourl:[],//mv路径
				artistsname:[],//mv作者
				iskai:true,//锁是否为kaisuo类名
				timer2:null,//延时器，用于无操作后隐藏图标
				isjiazai:false//视频是否正在加载中
			}
		},
		watch:{
			"mvdata.brs":function(n,o){
				this.videourl=n[this.hznum];
			},
			"mvdata.artists":function(n,o){
				this.artistsname=n[0].name
			}
		},
		computed:{
			...mapState({
				mvids:"mvids",
				mvindex:"mvindex"
			})
		},
		methods:{
			next(){//下一个视频
				this.s3="";
				this.$refs.myvideo.currentTime=0;
				this.setend();
				this.isPlay=false;
				this.$refs.yuan.style.left=0+"rem";
				this.$refs.xjdt.style.width=0+"rem";
				this.$refs.bofang.className="bfzt iconfont icon-bofang1";
				let str=this.mvids;
				let num=this.mvindex;
				num++;
				if(num>str.length-1){
					num=0;
				}
				this.$store.commit("modifystate",{
					mvindex:num,
				});
				this.$router.push("/mv/" + str[num]);
				// console.log(this.$refs.myvideo.currentTime);
			},
			setstart(){//打开延时器
				this.timer2=setTimeout(()=>{
					this.istbShow=false;
					this.issuoShow=false;
				},5000);
			},
			setend(){//关闭延时器
				clearTimeout(this.timer2);
				this.timer2=null;
			},
			bf(e){//播放图标，是否播放视频
				if(this.isPlay==false){
					if(this.s3!=""){//判断s3是否有值，有就播放视频到当前时间
						this.$refs.myvideo.currentTime=this.s3;
						// console.log(this.s3)
					}
					this.$refs.myvideo.play();
					this.isPlay=true;
					e.target.className="bfzt iconfont icon-bofang";
					this.setstart();
				}else{
					this.isPlay=false;
					this.$refs.myvideo.pause();
					e.target.className="bfzt iconfont icon-bofang1";
					this.setend();
				}
			},
			videoclick(){//video标签单击
				clearTimeout(this.timer);
				this.timer=null;
				this.timer=setTimeout(()=>{
					this.isbsShow=false;
					this.ishzShow=false;
					this.setend();
					if(this.issuoShow){
						this.issuoShow=false;
						
						
						if(this.flag){
							this.istbShow=false;
						}
					}else{
						this.issuoShow=true;
						if(this.flag){
							this.istbShow=true;
						}
						if(this.isPlay){
							this.setstart();
						}
					}
				},300);
			},
			videoclick2(){//video标签双击事件
				clearTimeout(this.timer);
				if(this.isPlay){
					this.$refs.myvideo.pause()
					this.isPlay=false;
				}else{
					this.$refs.myvideo.play();
					this.isPlay=true;
				}
			},
			quanping(){//是否全屏
				this.$refs.myvideo.requestFullscreen();
			},
			beisu(value){//视频播放速度
				this.setend();
				this.$refs.myvideo.playbackRate=value;
				this.isbsShow=false;
				this.setstart();
			},
			suo(){//锁是否显示
				this.setend();
				if(this.flag){
					this.issuoShow=false;
					this.flag=false;
					this.istbShow=false;
					this.iskai=false;
				}else{
					this.issuoShow=true;
					this.istbShow=true;
					this.flag=true;
					this.iskai=true;
				}
				this.setstart();
			},
			huazhi(value){//画质数值
				this.setend();
				if(this.isPlay){
					this.$refs.bofang.className="bfzt iconfont icon-bofang1";
				}else{
					this.$refs.bofang.className="bfzt iconfont icon-bofang1";
				}
				this.isPlay=false;
				this.s3=this.$refs.myvideo.currentTime;//改变画质后备份当前播放时间到s3
				this.$refs.myvideo.pause();
				this.ishzShow=false;
				this.hznum=value;
				this.videourl=this.mvdata.brs[value]
				if(value=="240"){
					this.hz="流畅";
				}else if(value=="480"){
					this.hz="标清";
				}else if(value=="720"){
					this.hz="高清";
				}else{
					this.hz="全高清";
				}
			},
			hzshow(){//画质标签
				this.setend();
				this.isbsShow=false;
				if(this.ishzShow){
					this.ishzShow=false;
				}else{
					this.ishzShow=true;
				}
				this.setstart();
			},
			bsnn(){//倍速按钮
				this.setend();
				this.ishzShow=false;
				if(this.isbsShow){
					this.isbsShow=false;
				}else{
					this.isbsShow=true;
				}
				this.setstart();
			},
			laba(e){//喇叭图标，是否静音
				this.setend();
				if(this.isVoice){
					e.target.className="laba iconfont icon-jingyin";
					this.$refs.myvideo.muted=true;
					this.isVoice=false;
				}else{
					e.target.className="laba iconfont icon-iconfonthuodonggonggao"
					this.$refs.myvideo.muted=false;
					this.isVoice=true;
				}
				this.setstart();
			},
			timeupdate(e){//video标签
				let video=e.target;
				let currentTime=video.currentTime;//当前播放时间
				let durationTime=video.duration;//总时长
				
				let jdtw=document.querySelector(".jdt").clientWidth;
				let weizhi=(jdtw*currentTime)/durationTime;
				this.$refs.yuan.style.left=(weizhi-3)/16+"rem";
				this.$refs.xjdt.style.width=weizhi/16+"rem";
				this.s1=this.formatTime(currentTime);
				this.s2=this.formatTime(durationTime);
				if(video.ended){
					this.isPlay=false;
					this.$refs.bofang.className="bfzt iconfont icon-bofang1";
				}
			},
			fnjdt(e){//进度条
				this.setend();
				let barX=e.offsetX;
				let jdtw=document.querySelector(".jdt").clientWidth;
				let newcurrentTime=(barX*this.$refs.myvideo.duration)/jdtw;
				this.$refs.myvideo.currentTime=newcurrentTime;
				this.setstart();
			},
			formatTime(seconds){//视频播放的转换时间
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
			},
			load(id){
				let mydata=[];
				this.$axios.get("/mv/detail?mvid="+id).then(data=>{
					mydata=data.data.data;
					// console.log(data)
					this.mvdata={
						id:mydata.id,
						name:mydata.name,
						artists:mydata.artists,
						brs:mydata.brs//240,480,720,1080
					}
					// console.log(this.mvdata);
				});
				this.$axios.get("/comment/mv?id="+id).then(data=>{
					this.comment=data.data.comments;
					// console.log(this.comment);
				})
			}
		},
		beforeRouteUpdate(to,from,next){
			next();
			this.load(to.params.mvid);
		},
		created() {
			this.load(this.$route.params.mvid);
		}
	}
</script>

<style lang="less" scoped="scoped">
	.mv{
		padding-top: 2.5rem;
		.mymv{
			.mvtop{
				width: 95%;
				margin: 0.4375rem auto 0;
				overflow: hidden;
				video{
					width: 100%;
				}
				.tb{
					position: relative;
					width: 100%;
					height: 1.25rem;
					left: 0;
					bottom: 3.125rem;
					z-index: 2;
					.suo{
						position: absolute;
						left: 2.5%;
						top: -400%;
						color: white;
						font-weight: bold;
						font-size: 1rem;
						text-shadow: 2px 3px 3px rgba(0,0,0,0.5);
					}
					.bfjz{
						position: absolute;
						top: -400%;
						left: 50%;
						transform: translateX(-50%);
						z-index: 3;
						.bfzt{
							color: white;
							font-weight: bold;
							font-size: 2.1875rem;
							text-shadow: 2px 3px 3px rgba(0,0,0,0.5);
						}
					}
					.top{
						width: 95%;
						position: absolute;
						color: white;
						left: 2.5%;
						top: -0.3125rem;
						.left{
							float: left;
							span{
								text-shadow: 2px 3px 3px rgba(0,0,0,0.5);
								&:nth-child(1){
									font-size: 1rem;
								}
							}
							.s2{
								margin-left: 0.625rem;
							}
						}
						.right{
							float: right;
							position: relative;
							.laba,.bsnn,.quanping,.mvgd,.mvhz{
								font-size: 1rem;
								text-shadow: 2px 3px 3px rgba(0,0,0,0.5);
							}
							span{
								margin-right: 0.9375rem;
								&:nth-last-of-type(1){
									margin-right: 0;
								}
							}
							.bs{
								width: 3.125rem;
								line-height: 1.25rem;
								position: absolute;
								background-color: rgba(0,0,0,.6);
								left: 10%;
								top: -6.25rem;
								span{
									color: white;
									display: block;
									margin: 0 auto;
									font-size: 0.75rem;
								}
							}
							.hz{
								width: 3.125rem;
								line-height: 1.25rem;
								height: 5rem;
								position: absolute;
								left: 35%;
								top: -5rem;
								background-color: rgba(0,0,0,.6);
								span{
									color: white;
									margin: 0 auto;
									font-size: 0.75rem;
									position: absolute;
									left: 50%;
									transform: translateX(-50%);
									&:nth-child(1){
										top: 3.75rem;
									}
									&:nth-child(2){
										top: 2.5rem;
									}
									&:nth-child(3){
										top: 1.25rem;
									}
								}
							}
						}
					}
					.jdt{
						width: 93%;
						height: 0.3125rem;
						background-color: white;
						position: absolute;
						bottom: -0.625rem;
						left: 3%;
						.xjdt{
							width: 0;
							background-color: #dd001b;
							height: 0.3125rem;
						}
						.yuan{
							width: 0.75rem;
							height: 0.75rem;
							border-radius: 50%;
							background-color: white;
							position: absolute;
							left: 0;
							bottom: -0.1875rem;
						}
					}
				}
				.js{
					width: 100%;
					text-align: left;
					.p1{
						font-size: 1.125rem;
						color: #333;
					}
					.p2{
						font-size: 1rem;
						color: #999;
					}
				}
			}
			.comment{
				width: 100%;
				.h3{
					width: 100%;
					line-height: 1.125rem;
					font-size: 0.75rem;
					background-color: #eeeff0;
					padding-left: 0.4375rem;
					text-align: left;
					color: #666;
					margin-top: 0.4375rem;
				}
			}
		}
	}
</style>
