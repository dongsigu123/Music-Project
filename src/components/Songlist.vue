<template>
	<!-- 这是歌曲列表组件 -->
	<li :key="item.id" @click="playmusic(item)">
		<slot></slot>
		<div class="left">
			<p class="p1">
				<span class="s1">{{item.name}}</span>
			</p>
			<p class="p2">
				<span v-if="item.song.privilege.maxbr>320000" class="s1"></span>
				{{item.song.artists[0].name}}{{item.song.artists[1]|myname}}&nbsp;-{{item.name}}
			</p>
		</div>
		<div class="right">
			<div v-if="musicid==item.id" class="bft">
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
			</div>
			<div v-else class="bf">
				<span></span>
			</div>
		</div>
	</li>
</template>

<script>
	import {mapState} from "vuex"
	export default{
		props:{
			item:Object,
			songstr:Array
		},
		computed:{
			...mapState(["musicid"])
		},
		methods:{
			playmusic(value){
				let arr = this.songstr;
				var num=[];
				// console.log(value);
				for(let s in arr){
					if(value.id == arr[s].id){
						// console.log(s,arr[s].id);
						num=s;
					}
				}
				this.$store.commit("modifystate",{
					musicid:value.id,
					isplayshow:true,
					isdivshow:true,
					songerid:value.song.artists[0].id,
					songids:this.songstr,
					songcurindex:num
				});
			}
		},
		filters:{
			myname(value){
				if(typeof value != "undefined"){
					return "、"+value.name;
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	li{
		width: 100%;
		padding: 0.3125rem 0 0.1875rem 0.625rem;
		overflow: hidden;
		text-align: left;
		border-bottom: 1px solid #ddd;
		.left{
			float: left;
			width: 75%;
			.p1{
				.s1{
					color: #333;
					font-size: 1.125rem;
					white-space: nowrap;
					overflow: hidden;
					word-break:keep-all;
					text-overflow:ellipsis;
					width: 97%;
					display: block;
				}
			}
			.p2{
				white-space: nowrap;
				overflow: hidden;
				word-break:keep-all;
				text-overflow:ellipsis;
				width: 97%;
				color: #999;
				font-size: 0.75rem;
				.s1{
					background-image: url(../assets/index_icon_2x.png);
					background-position: 0 0;
					background-size: 10.375rem 6.0625rem;
					width: 0.75rem;
					height: 0.5rem;
					margin-right: 0.3125rem;
					display: inline-block;
				}
			}
		}
		.right{
			float: right;
			width: 12%;
			text-align: center;
			.bf{
				span{
					display: inline-block;
					width:1.375rem;
					height:1.375rem;
					background-image: url(../assets/index_icon_2x.png);
					background-position: -1.5rem 0;
					background-size: 10.375rem 6.0625rem;
					margin-top: 0.4375rem;
				}
			}
			.bft{
				width: 1.875rem;
				height: 1.875rem;
				display: flex;
				margin: 0.1875rem auto 0;
				justify-content: space-between;
				align-items: flex-start;
				i{
					display: inline-block;
					width: 0.1875rem;
					height: 1.875rem;
					transform-origin: center bottom;
					animation: loading 0.6s linear -0.4s infinite alternate-reverse;
					&:nth-of-type(1){
						background-color: red;
						animation-delay: -0.1s;
					}
					&:nth-of-type(2){
						background-color: orange;
						animation-delay: -0.9s;
					}
					&:nth-of-type(3){
						background-color: yellow;
						animation-delay: -0.6s;
					}
					&:nth-of-type(4){
						background-color: green;
						animation-delay: -0.2s;
					}
					&:nth-of-type(5){
						background-color: blue;
						animation-delay: -0.7s;
					}
					&:nth-of-type(6){
						background-color: cyan;
						animation-delay: -0.3s;
					}
					&:nth-of-type(7){
						background-color: purple;
						animation-delay: -0.5s;
					}
				}
			}
		}
	}
	@keyframes loading{
		from{
			transform: scaleY(0.2);
		}
		to{
			transform: scaleY(1);
		}
	}
</style>
