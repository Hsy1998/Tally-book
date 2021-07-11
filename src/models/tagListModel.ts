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
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not fund'
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
  },
  update(id,name) {
    const idList = this.data.map(item => item.id)
    if(idList.indexOf(id) >= 0){
      const names = this.data.map(item => item.name)
      if(names.indexOf(name) >= 0){
        return 'duplicated'
      }else {
        const tag = this.data.filter(item => item.id === id)[0]
        console.log(tag, 'item.id');
      
        tag.name = name
        this.save()
        return 'success'
      }
    }else{
      return 'not fund'
    }
  },

}
export default tagListModel