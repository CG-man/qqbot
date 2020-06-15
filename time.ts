//整点报时器方法
export const hourReport = (fn: Function) => {
  //当前时间
  var time = new Date();
  //小时
  var hours = time.getHours();
  //分钟
  var mins = time.getMinutes();
  //秒钟
  var secs = time.getSeconds();
  //下一次报时间隔
  var next = ((60 - mins) * 60 - secs) * 1000;
  //设置下次启动时间
  setTimeout(() => {
    hourReport(fn);
  }, next);
  //整点报时，因为第一次进来mins可能不为0所以要判断
  if (mins === 0) {
    fn(hours);
  }
};
