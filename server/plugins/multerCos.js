const multer = require('multer');
const multerCOS = require('multer-cos');

const cosConfig = {
  //id和key是必须

  SecretId: 'AKIDlNksvjadkeKm05za0CG5f0EDxRgjIBYp',
  SecretKey: 'FFzZx5yeBTaUFrEMH1VjjW8TYMzMWS9e',
  Bucket: 'multer-1258613188',
  Region : 'ap-shanghai',
  // 可选参数
  FileParallelLimit: 3, // 控制文件上传并发数
  ChunkParallelLimit: 3, // 控制单个文件下分片上传并发数
  ChunkSize: 1024 * 1024, // 控制分片大小，单位 B
  domain: 'multer-1258613188.cos.ap-shanghai.myqcloud.com', //cos域名
  dir: 'uploads', //cos文件路径
  onProgress: function (progressData) { //进度回调函数，回调是一个对象，包含进度信息
    //console.log(progressData);
  }

};


module.exports = function (opt) {
  /**
   * @dir 存储路径str
   * @flag 请求头别名str
   * @onProgress 进度函数func @data
   * @mk 是否自定义创建目录func@requires,res,cb
   */

  cosConfig.dir = opt.dir
  cosConfig.onProgress = opt.onProgress 
  
  let con = {
    cos: cosConfig,
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建 如果什么都不传 系统自己会生成tmp目录
    destination: opt.dir,  //
    //destination:function(req,res,cb){
      //cb(null,cosConfig.dir)
    //},
    //自己会生成个随机16字母的文件名和后缀
    filename: 'auto'
  }


  //定义仓库
  const storage = multerCOS(con);


  return multer({
    storage: storage,
  }).array(opt.flag);
};


// module.exports = function (opt) {
//   return multer({
//     storage: storage,
//   }).array(opt);
// };