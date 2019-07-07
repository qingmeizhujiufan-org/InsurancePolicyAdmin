/* 本地环境 */
// const ADDR = 'http://localhost:7001';
/* 开发环境 */
const ADDR = 'http://www.xuecheh.com';
/* 生产环境 */
// const ADDR = 'http://wujie.hbfolkways.com';

/* 图片服务器地址 */
const FILE_SERVER = 'http://www.xuecheh.com';

module.exports = {
    ADDR,
    BASE_HOST: ADDR + '/api',
    FILE_UPLOAD_HOST: FILE_SERVER + '/api/',
    FILE_ASSET: FILE_SERVER + '/public/',
};
