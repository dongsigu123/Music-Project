<template>
	<!-- 这是发现页面 -->
	<div class="find">
		<Banner></Banner>
		<Title>热门系列</Title>
		<div class="assembly">
			<ul>
				<router-link tag="li" to="/hot" @click.native="liclick">
					<p>热歌榜</p>
				</router-link>
				<router-link tag="li" to="/popsinger" @click.native="liclick">
					<p>热门歌手</p>
				</router-link>
			</ul>
		</div>
		<Title>歌单系列</Title>
		<div class="songsheet">
			<ul>
				<router-link tag="li" to="/selected" @click.native="liclick">
					<p>精选歌单</p>
				</router-link>
				<router-link tag="li" to="/boutique" @click.native="liclick">
					<p>精品歌单</p>
				</router-link>
			</ul>
		</div>
		<Title>MV系列</Title>
		<div class="mv">
			<ul>
				<router-link tag="li" to="/wholemv" @click.native="liclick">
					<p>全部MV</p>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import Banner from "../components/Banner.vue"
	import Title from "../components/Title.vue"
	export default{
		components:{
			Banner,
			Title
		},
		data(){
			return {
				
			}
		},
		methods:{
			liclick(){
				this.$store.commit("modifystate",{isnavshow:false});
			}
		},
		created() {
			
		}
	}
</script>

<style lang="less" scoped="scoped">
	.find{
		width: 100%;
		padding-top: 2.8125rem;
		.assembly{
			width: 100%;
			ul{
				width: 100%;
				display: flex;
				li{
					flex: 1;
					text-align: center;
					margin-left: 3%;
					display: flex;
					align-items: center;
					justify-content: center;
					box-shadow: 2px 5px 5px rgba(0,0,0,.5);
					p{
						font-style: italic;
						font-size: 1.875rem;
						color: white;
						line-height: 5.625rem;
						text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
						font-weight: bold;
					}
					&:nth-child(1){
						background-color: #d16c58;
					}
					&:nth-child(2){
						background-color: #c44969;
						margin-right: 3%;
					}
				}
			}
		}
		.songsheet{
			width: 100%;
			ul{
				width: 100%;
				display: flex;
				li{
					flex: 1;
					text-align: center;
					margin-left: 3%;
					display: flex;
					align-items: center;
					justify-content: center;
					box-shadow: 2px 5px 5px rgba(0,0,0,.5);
					p{
						font-style: italic;
						font-size: 1.875rem;
						color: white;
						text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
						font-weight: bold;
						line-height: 5.625rem;
					}
					&:nth-child(1){
						background-color: #6e96e5;
					}
					&:nth-child(2){
						background-color: #47b4ba;
						margin-right: 3%;
					}
				}
			}
		}
		.mv{
			width: 100%;
			ul{
				width: 100%;
				padding-bottom: 0.9375rem;
				li{
					text-align: center;
					display: flex;
					width: 94%;
					margin: 0 auto;
					align-items: center;
					background-color: #acb2e2;
					justify-content: center;
					box-shadow: 2px 5px 5px rgba(0,0,0,.5);
					p{
						font-style: italic;
						font-size: 2.625rem;
						color: white;
						text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
						font-weight: bold;
						line-height: 7.5rem;
					}
				}
			}
		}
	}
</style>
