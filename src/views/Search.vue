<template>
	<div>
		<form @submit.stop.prevent="searchList(keywords)">
			<div class="search">
				<i></i>
				<input type="text" placeholder="输入歌手、歌曲" v-model.trim="keywords"/>
				<i></i>
			</div>
		</form>
		<Suggest v-show="showSearch" :suggests="suggests" :keywords="keywords" @searchResult="searchList"/>
		<ul v-show="showList">
			<Songlist v-for="item in searchMusicList" :songstr="searchMusicList" :key="item.id" :item="item"></Songlist>
		</ul>
		<Loading v-show="searching"/>
	</div>
</template>
<script>
	import Suggest from '../components/Suggest'
	import Loading from '../components/Loading'
	import Songlist from "../components/Songlist.vue"
	export default {
		components:{
			Suggest,
			Loading,
			Songlist
		},
		data(){
			return {
				keywords:'',
				suggests:[],
				searchMusicList:[],
				searching:false,//是否显示 加载loading
				showList:false,//是否显示 搜索结果
				showSearch:false,//是否显示 搜索提示
				tiemr:null
			}
		},
		methods:{
			searchList(keywords){//点击确认搜索 显示搜索结果列表
				// this.keywords=keywords;
				this.showList=false;
				this.searching=true;
				this.showSearch=false;
				this.axios.get('/search?keywords='+keywords).then(d=>{//根据关键词得到搜索结果.
					if(d.data.code==200){
						this.showList=true;
						this.searching=false;
						this.searchMusicList=d.data.result.songs.map(dat=>{
							return {
								name:dat.name,
								id:dat.id,
								song:{
									artists:dat.artists,
									privilege:{
										maxbr:1
									}
								}
							}
						});
					}
				});
			}
		},
		watch:{
			keywords(val){//输入关键字
				this.searching=true; //loadding要显示
				this.showList=false;
				this.suggests=[];
				if(val==""){
					this.searching=false;
				}
				clearTimeout(this.tiemr);
				this.tiemr=setTimeout(()=>{
					if(val!==""){
						this.$http.get('/search/suggest?keywords='+val).then(data=>{
							if( data.data.code==200&&data.data.result.order){
								let result=data.data.result;  
								let re=result.order.reduce((prev,v)=>{
									if(v!=='playlists'){
										let rev=result[v];
										return prev.concat(rev);
									}
									return prev;
								},[]);
								this.suggests=re;
								this.searching=false;
								this.showSearch=true;
								if(this.keywords==''){//判断如果搜索的字词已经全部删除为空.
									this.suggests=[];
								}
							}
						}).finally(()=>{
							this.searching=false;
						});
					}
				},700)
			}
		}
	}
</script>
<style lang="less" scoped>
	.search{
		display: flex;
		margin:0.625rem;
		padding:0.3125rem 0.625rem;
		background: #ebecec;
		border-radius: 1.25rem;
		margin-top: 3.125rem;
		input{
			border:none;
			outline: none;
			flex:1;
			background-color: transparent;
		}
		i{
			display: inline-block;
			width:0.8125rem;
			margin-top: 0.25rem;
			height:0.8125rem;
			&:first-of-type{
			background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
			}
			// &:last-of-type{
			// 	background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
			// }
		}
	}
</style>