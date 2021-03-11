<template>
	<!-- 这是歌手单曲页面 -->
	<div class="single">
		<ul>
			<Songlist v-for="item in Single" :item="item" :songstr="Single" :key="item.id"></Songlist>
		</ul>
		<Loading v-if="Single.length<=0"></Loading>
	</div>
</template>

<script>
	import Songlist from "./Songlist.vue"
	import Loading from "./Loading.vue"
	export default{
		components:{
			Songlist,
			Loading
		},
		props:{
			Single:Array
		},
		methods:{
		}
	}
</script>

<style>
</style>
