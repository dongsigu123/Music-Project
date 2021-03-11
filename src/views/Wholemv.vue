<template>
	<!-- 这是全部mv -->
	<div class="wholemv">
		<Return>全部MV</Return>
		<div class="nav">
			<ul class="ul1">
				<li @click="liclick(1)" :class="curindex==1?'active':''">全部</li>
				<li @click="liclick(2)" :class="curindex==2?'active':''">内地</li>
				<li @click="liclick(3)" :class="curindex==3?'active':''">港台</li>
				<li @click="liclick(4)" :class="curindex==4?'active':''">日本</li>
				<li @click="liclick(5)" :class="curindex==5?'active':''">韩国</li>
				<li @click="liclick(6)" :class="curindex==6?'active':''">欧美</li>
			</ul>
			<ul class="ul2">
				<li>类型:</li>
				<li @click="liclick2(1)" :class="curindex2==1?'active2':''">全部</li>
				<li @click="liclick2(2)" :class="curindex2==2?'active2':''">官方版</li>
				<li @click="liclick2(3)" :class="curindex2==3?'active2':''">原生</li>
				<li @click="liclick2(4)" :class="curindex2==4?'active2':''">现场版</li>
				<li @click="liclick2(5)" :class="curindex2==5?'active2':''">网易出品</li>
			</ul>
		</div>
		<div class="anniu">
			<span @click="liclick3(1)" :class="curindex3==1?'active3':''"></span>
			<span @click="liclick3(2)" :class="curindex3==2?'active3':''"></span>
			<span @click="liclick3(3)" :class="curindex3==3?'active3':''"></span>
		</div>
		<Mvlist :mvdata="mvdata"></Mvlist>
		<!-- <Loading v-if="mvdata.length<=0"></Loading> -->
	</div>
</template>

<script>
	import Mvlist from "../components/Mvlist.vue"
	// import Loading from "../components/Loading.vue"
	import Return from "../components/Return.vue"
	export default{
		components:{
			Return,
			// Loading,
			Mvlist
		},
		data(){
			return {
				curindex:1,
				curindex2:1,
				curindex3:1,
				area:"全部",
				type:"全部",
				order:"最热",
				str:["全部","内地","港台","日本","韩国","欧美"],
				str2:["全部","官方版","原生","现场版","网易出品"],
				str3:["最热","最新","最快"],
				mvdata:[]
			}
		},
		methods:{
			liclick(value){
				this.curindex=value;
				this.area=this.str[value-1];
				this.loadmv();
			},
			liclick2(value){
				this.curindex2=value;
				this.type=this.str2[value-1];
				this.loadmv();
			},
			liclick3(value){
				this.curindex3=value;
				this.order=this.str3[value-1];
				this.loadmv();
			},
			loadmv(){
				this.$axios.get("/mv/all?area="+this.area+"&type="+this.type+"&order="+this.order).then(data=>{
					this.mvdata=data.data.data;
					// console.log(data);
				})
			}
		},
		beforeRouteUpdate(to,from,next){
			this.loadmv();
			next();
		},
		created() {
			this.loadmv();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.wholemv{
		width: 100%;
		padding-top: 6.875rem;
		.anniu{
			position: fixed;
			height: 1.5rem;
			width: 10rem;
			right: 0.4375rem;
			z-index: 3;
			top: 0.5rem;
			span{
				padding-left: 0.1875rem;
				position: relative;
				float: left;
				border: 2px solid #8a8a8a;
				height: 1.25rem;
				width: 1.25rem;
				margin-top: 0.0625rem;
				border-radius: 50%;
				background-color: white;
				&.active3{
					background-image: linear-gradient(to right bottom,white,black);
				}
				&::after{
					position: absolute;
					font-size: 0.875rem;
					color: white;
					width: 1.875rem;
					right: -2rem;
				}
				&:nth-child(1){
					left: 0;
					&::after{
						content: "最热";
					}
				}
				&:nth-child(2){
					left: 20%;
					&::after{
						content: "最新";
					}
				}
				&:nth-child(3){
					left: 40%;
					&::after{
						content: "最快";
					}
				}
			}
		}
		.nav{
			width: 100%;
			height: 4.375rem;
			position: fixed;
			top: 2.5rem;
			z-index: 2;
			background-color: white;
			.ul1{
				width: 100%;
				height: 2.5rem;
				display: flex;
				border-bottom: 1px solid #ddd;
				li{
					flex: 1;
					font-size: 1.125rem;
					color: #999;
					line-height: 2.5rem;
					font-weight: bold;
					&.active{
						color: #dd001b;
						font-size: 1.25rem;
					}
				}
			}
			.ul2{
				width: 100%;
				display: flex;
				height: 1.875rem;
				border-bottom: 1px solid #ddd;
				li{
					font-size: 0.9375rem;
					line-height: 1.875rem;
					color: #999;
					font-weight: bold;
					&.active2{
						color: #dd001b;
						font-size: 1.125rem;
					}
					&:nth-child(1){
						flex: 0.9;
					}
					&:nth-child(2),&:nth-child(4){
						flex: 0.6;
					}
					&:nth-child(3),&:nth-child(5){
						flex: 0.9;
					}
					&:nth-child(6){
						flex: 1.3;
					}
				}
			}
		}
	}
</style>
