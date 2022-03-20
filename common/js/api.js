const baseURL = "http://127.0.0.1:8081";

export function sendRequest(method, url, data, complete) {
    //拼接完整请求地址
    let requestUrl = baseURL + url;
    //GET或POST
    if(method) {
        method = method.toUpperCase();//小写改为大写
    }
    let resData = {};
    //网络请求
    uni.request({
        url: requestUrl,
        method: method || "GET",
        header: {'content-type' : "application/json"},
        data: data,
        success: res => {
            console.log("网络请求success:" + JSON.stringify(res));
            resData.code = 200;
			resData.data = res.data;
        },
        fail: (e) => {
            console.log("网络请求fail:" + JSON.stringify(e));
            resData.code = 500;
			resData.errMsg = e.errMsg;
        },
        complete: () => {
            console.log("网络请求complete");
            if(complete) {
				complete(resData);
			}
        }
    });
}

//带Token请求
export function httpTokenRequest(opts, data) {
	// 异步获取token
	// let token = "";
	// uni.getStorage({
	// 	key: 'token',
	// 	success: function(ress) {
	// 		token = ress.data
	// 	}
	// });
	
	// 同步获取token
	const token = uni.getStorageSync('token');
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method === 'get' ? {
			'Token': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'Token': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1]);
			}
		).catch(
			(response) => {
				reject(response);
			}
		)
	})
	return promise;
};