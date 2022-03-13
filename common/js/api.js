export function sendRequest(method, param, complete) {
    //拼接完整请求地址
    let requestUrl = this.siteBaseUrl + url;
    //GET或POST
    if(method) {
        method = method.toUpperCase();//小写改为大写
    }
    
    //网络请求
    uni.request({
        url: requestUrl,
        method: method || "GET",
        header: header || {'content-type' : "application/json"},
        data: data,
        success: res => {
            console.log("网络请求success:" + JSON.stringify(res));
            if (res.statusCode && res.statusCode != 200) {//api错误
                uni.showModal({
                    content:"" + res.errMsg
                });
                return;
            }
            if (res.data.code) {//返回结果码code判断:0成功,1错误,-1未登录
                if (res.data.code == "-1") {
                    _self.login(backpage, backtype);
                    return;
                }
                if (res.data.code != "0") {
                    uni.showModal({
                        showCancel:false,
                        content:"" + res.data.msg
                    });
                    return;
                }
            } else{
                uni.showModal({
                    showCancel:false,
                    content:"" + res.data.msg
                });
                return;
            }
            
            typeof param.success == "function" && param.success(res.data);
        },
        fail: (e) => {
            console.log("网络请求fail:" + JSON.stringify(e));
            uni.showModal({
                content:"" + res.errMsg
            });
            
            typeof param.fail == "function" && param.fail(res.data);
        },
        complete: () => {
            console.log("网络请求complete");
            uni.hideLoading();
            
            typeof param.complete == "function" && param.complete(res.data);
            return;
        }
    });
}