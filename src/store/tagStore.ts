import createId from '@/lib/createId'

const localStorageKeyName = 'tagList'
const tagStore: TagListModel = {
  tagList: [] as Tag[],

  // 新增tag
  createTag(name: string) {
    const names = this.tagList.map((item) => item.name)
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复了')
      return 'duplicated'
    }
    const id = createId().toString()
    this.tagList?.push({ id, name: name })
    this.saveTag()
    window.alert('新建标签成功')
    return 'success'
  },

  // 删除tag
  removeTag(id: string) {
    let index = -1
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i
        break
      }
    }
    this.tagList.splice(index, 1)
    this.saveTag()
    console.log(this.tagList, 999)

    return true
  },

  // 更新tag
  updateTag(id: string, name: string) {
    const idList = this.tagList.map((item) => item.id)
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        return 'duplicated'
      } else {
        const tag = this.tagList.filter((item) => item.id === id)[0]
        tag.name = name
        this.saveTag()
        return 'success'
      }
    } else {
      return 'not found'
    }
  },

  // 查找tag
  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0]
  },

  // 保存tag
  saveTag() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.tagList)
    )
  },

  // 获取tags数据
  fetchTags() {
    this.tagList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || '[]'
    )
    return this.tagList
  },
}
tagStore.fetchTags()

export default tagStore
