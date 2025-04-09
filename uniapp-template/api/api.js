// 导入request模块
import req from '@/api/index.js'

// 测试接口
export const getTest = (data) => req("/api/index/getAlipayCode", 'POST', data);
