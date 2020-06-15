import config from "./config.json";

const { host, imgDir, suffix } = config;

const getTimeStr = (time: number) => {
  if (time < 6) {
    return "深夜好(?)";
  } else if (time >= 6 && time < 11) {
    return "早上好";
  } else if (time >= 11 && time < 13) {
    return "中午好";
  } else if (time >= 13 && time < 18) {
    return "下午好";
  } else if (time >= 18) {
    return "晚上好";
  }
};
export const getMsg = (time: number) => {
  const imgNumber = time % 12 || 12;
  return [
    {
      type: "Image",
      url: `${host}/${imgDir}/${imgNumber}.${suffix}`,
    },
    {
      type: "Plain",
      text: `${imgNumber}点了,${getTimeStr(time)}哦哦哦哦哦哦哦哦哦哦哦！`,
    },
  ];
};
