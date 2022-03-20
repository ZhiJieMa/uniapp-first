<template>
	<view style="margin: 0px 30rpx;">
		<view class="content">
			<image class="logo" src="../../../static/images/m.png"></image>
		</view>
		
		<uni-forms ref="signUpForm" :value="user" :rules="rules">
			<uni-forms-item label="账号:" name="username">
				<uni-easyinput type="text" placeholder="请输入账号" v-model="user.username"/>
			</uni-forms-item>
			<uni-forms-item label="密码:" name="password">
				<uni-easyinput type="password" placeholder="请输入密码" v-model="user.password"/>
			</uni-forms-item>
			<button form-type="submit" @click="handleSignUp">{{$t('login.btnName')}}</button>
		</uni-forms>
		
		<view class="content version-view">
			<uni-text class="flex-item">版本号: {{versionCode}}</uni-text>
		</view>
	</view>
</template>

<script>
	import {sendRequest} from '../../../common/js/api.js';
	import urls from '../../../constants/urls.js';
	import {getAppVersion} from '../../../common/js/util.js'
	export default {
		data() {
			return {
				user: {
					username: '',
					password: ''
				},
				rules: {
					username: {
						rules: [
							{
								required: true,
								errorMessage: '账号不能为空'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									if(String(value).length < 8) {
										callback('账号长度不能少于8位');
									}
									return true;
								}
							}
						]
					},
					password: {
						rules: [
							{
								required: true,
								errorMessage: '密码不能为空'
							}
						]
					}
				}
			}
		},
		onLoad() {
	
		},
		methods: {
			handleSignUp() {
				this.$refs.signUpForm.validate( (res) => {
					if(res) {
						// 如果存在错误信息，则校验未过，直接返回
						return;
					}
					// 前台校验通过，请求后台进行登录
					this.login();
				});
			},
			login() {
				console.log(this.user);
				uni.showLoading({title: '加载中...'});
				// 请求后台校验账号密码
				let data = {};
				let _this = this;
				sendRequest('POST', urls.loginAction, data, function(res) {
					console.log("res: ", res);
					uni.hideLoading();
					// 测试时不管code是200 还是500 都让登录成功
					if(res.code) {
					// if(res.code === 200) {
						// 登录成功保存登录信息并跳转主页
						uni.navigateTo({
							url: '/pages/component/index/index'
						});
						
					} else {
						uni.showModal({
							title: '提示',
							content: '账号或者密码输入错误',
							success: function (ress) {
								_this.clearLoginForm();
							}
						});
					}
				});
			},
			clearLoginForm() {
				this.user = {};
			}
		},
		computed: {
			versionCode: function() {
				return getAppVersion();
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.version-view {
		height: 200rpx;
	}
</style>
