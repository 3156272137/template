import config from '@/utils/config.js'

const request = async (url, method, data = {}, maxRetryTime = 1) => {

	return new Promise((reslove, reject) => {
		uni.request({
			url: config.baseURL + url,
			method: method || 'GET',
			header: {},
			timeout: 3000,
			data: {
				...params
			},
			success: (resData) => {
				reslove(resData.data.q)
			},
			fail: (msg) => {
			}
		})
	})
}

export default request