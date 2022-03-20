<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
			if(uni.getSystemInfoSync().platform === 'android' && typeof plus !== 'undefined') {
				plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
					uni.setStorage({
					    key: 'app_version',
					    data: wgtinfo.versionCode,
					    success: function () {
					        uni.showToast({
					        	title: wgtinfo.versionCode,
					        	duration: 2000
					        });
					    }
					});
				});
			} else {
				uni.setStorage({
				    key: 'app_version',
				    data: '100',
				    success: function () {
				        
				    }
				});
			}
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/css/uni.css';
</style>
