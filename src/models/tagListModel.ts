const localStorageKeyName = 'tagList'
type Tag = {
  id: string,
  name: string
}
type tagList = {
  data: Tag[]
  fetch: () => Tag[]
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
  create(name:string) {
    const names = this.data.map(item => item.name)
    if(names.indexOf(name) >= 0){return 'duplicated'} 
    this.data.push({id: name, name: name})
    this.save()
    return 'success'
  }
}
export default tagListModel