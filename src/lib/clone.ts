function clone<T>(data: T): T {
  //传过来什么类型的值就返回什么类型的值
  return JSON.parse(JSON.stringify(data))
}

export default clone
