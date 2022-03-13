<template>
	<view>
		<view class="content">
			<image class="logo" src="../../../static/images/logo.png"></image>
		</view>
		
		<uni-forms ref="signUpForm" :value="user" :rules="rules">
			<uni-forms-item label="账号" name="username">
				<uni-easyinput type="text" placeholder="请输入账号" v-model="user.username"/>
			</uni-forms-item>
			<uni-forms-item label="密码" name="password">
				<uni-easyinput type="password" placeholder="请输入密码" v-model="user.password"/>
			</uni-forms-item>
			<button form-type="submit" @click="handleSignUp">{{$t('login.title')}}</button>
		</uni-forms>
	</view>
</template>

<script>
	import {sendRequest} from '../../../common/js/api.js';
	import urls from '../../../constants/urls.js';
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
				// 请求后台校验账号密码
				// sendRequest('POST', urls.loginAction, {}).then( (res) => {
				// 	console.log("res: ", res);
				// }).catch( (err) => {
				// 	console.log("err: ", err);
				// });
				// 登录成功跳转主页
				uni.navigateTo({
					url: '/pages/component/index/index'
				});
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
</style>
