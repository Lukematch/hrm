export interface weather {
  // 地址
  address?:string,
  // 湿度
  temp?:string,
  // 天气描述
  weather?:string,
  // 风向描述
  windDirection?:string,
  // 凤力描述
  windPower?:string,
  // 湿度
  humidity?:string,
  // 天气发布时间
  reportTime?:string
}

export interface notice {
  notice_id?: any,
  notice_title?: string,
  notice_topic?: string,
  content?: string,
  note?: string,
  send_time?: string,
  sender?: string
}