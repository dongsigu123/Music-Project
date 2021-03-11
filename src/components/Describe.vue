<template>
	<!-- 这是歌手描述页面 -->
	<div class="describe">
		<Title>歌手描述</Title>
		<div class="miaoshu">
			<P>{{Describe}}</P>
		</div>
	</div>
</template>

<script>
	import Title from "./Title.vue"
	export default{
		components:{
			Title
		},
		props:{
			Describe:String
		}
	}
</script>

<style lang="less" scoped="scoped">
	.describe{
		width: 100%;
		.miaoshu{
			width: 100%;
			text-align: left;
			p{
				width: 90%;
				margin: 10px auto;
				font-size: 18px;
				color: #333;
				text-indent: 2em;
			}
		}
	}
</style>
