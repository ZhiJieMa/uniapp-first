import {h5VerisonCode} from '../../constants/configs.js'

/**
 * 获取app版本，安卓取manifest配置，h5 取configs.js的配置
 */
export function getAppVersion() {
	let version = 100;
	switch(uni.getSystemInfoSync().platform) {
	    case 'android':
	       console.log('运行Android上');
		   version = uni.getStorageSync('app_version');
	       break;
	    case 'ios':
	       console.log('运行iOS上');
	       break;
	    default:
		   version = h5VerisonCode;
	       break;
	}
	return version;
}
