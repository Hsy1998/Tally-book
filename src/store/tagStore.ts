import tagListModel from '@/models/tagListModel'
export default {
  // 获取tagList
tagList : tagListModel.fetch(),
// 新增tag
createTag : (name: string) => {
  const message = tagListModel.create(name)
      if (message === 'duplicated') {
        window.alert('标签名重复了')
      } else if (message === 'success') {
        window.alert('新建标签成功')
      } 
},
// 删除tag
removeTag : (id:string) => {
 return tagListModel.remove(id)
},
// 更新tag
updateTag : (id:string, name:string) => {
  return tagListModel.update(id, name);
},
// 查找tag
findTag(id:string){
  return this.tagList.filter((t) => t.id === id)[0]
}
}