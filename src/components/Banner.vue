<template>
	<div class="banner">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(s,k) in picurl" :key="k">
				<img :src="s" alt="">
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				picurl:[
					"http://p1.music.126.net/zBs9G3PtOduJ9sXKz3KFrQ==/109951165670411073.jpg",
					"http://p1.music.126.net/V1Aq9ME58uRmnJnVnbkzww==/109951165670428160.jpg",
					"http://p1.music.126.net/zBU44Ljy1v_DTEQU3KyHGQ==/109951165670372157.jpg",
					"http://p1.music.126.net/xLDnDUXFj_LUrP7MWNtwOA==/109951165670413482.jpg",
					"http://p1.music.126.net/3cm3JLy7DUnl-YtySirC1g==/109951165670392962.jpg"
				]
			}
		},
	}
</script>

<style lang="less" scoped="scoped">
	.banner{
		width: 100%;
		.my-swipe .van-swipe-item {
			color: #fff;
			font-size: 20px;
			text-align: center;
			background-color: #39a9ed;
			img{
				vertical-align: bottom;
			}
		}
	}
</style>
