import clone from '@/lib/clone'
const localStorageKeyName = 'recordList'
const recordListModel = {
  // clone(data: RecordItem[] | RecordItem){
  //   return JSON.parse(JSON.stringify(data))
  // },
  data: [] as RecordItem[],
  fetch(){
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data
  },
  create(record: RecordItem){
    const record2 = clone(record)
    record2.createdAt = new Date()
    this.data.push(record2)
    this.save()
  },
  save(){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
  }
}
export default recordListModel