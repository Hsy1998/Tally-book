const localStorageKeyName = 'tagList'
type tagList = {
  data: string[]
  fetch: () => string[]
  save: ()=>void
  create: (name: string) => 'success' | 'duplicated' | 'null'
}
const tagListModel: tagList = {
  data: [],
  fetch(){
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
    return this.data
  },
  save(){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
  },
  create(name) {
    if(this.data.indexOf(name) >= 0){return 'duplicated'} 
    this.data.push(name)
    this.save()
    return 'success'
  }
}
export default tagListModel