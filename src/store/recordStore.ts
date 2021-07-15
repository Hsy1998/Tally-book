import clone from '@/lib/clone'

const localStorageKeyName = 'recordList'

const recordStore = {
  recordList: [] as RecordItem[],

  // 获取record数据
  fetchRecords(){
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList
  },

  // 保存record数据
  saveRecords(){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList))
  },

  // 新增record数据
  createRecord(record: RecordItem) {
    const record2 = clone(record)
    record2.createdAt = new Date()
    // this.recordList && this.recordList.push(record2)
    this.recordList?.push(record2) // 可选链语法
    this.saveRecords()
  },
}

recordStore.fetchRecords()

export default recordStore