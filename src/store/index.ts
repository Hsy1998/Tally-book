import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/createId'
import router from '@/router'

Vue.use(Vuex) // 将 store 绑定到 Vue.prototype.$store 上，可以通过 this.$store 获取 store

type RootState = {
  recordList: RecordItem[]
  tagList: Tag[]
  currentTag?: Tag
  createRecordError: Error | null
  createTagError: Error | null
}
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    createRecordError: null,
    createTagError: null,
    currentTag: undefined,
  } as RootState,

  // 通过$store.commit('xxx')调取mutations里的方法，commit没有返回值，且mutations里的方法除了state以为只能传一个参数
  mutations: {
    // 获取record数据
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem('recordList') || '[]'
      ) as RecordItem[]
    },
    // 新增record数据
    createRecord(state, record: RecordItem) {
      const record2 = clone(record)
      record2.createdAt = record2.createdAt || new Date().toISOString()
      // this.recordList && this.recordList.push(record2)
      state.recordList?.push(record2) // 可选链语法
      store.commit('saveRecords')
    },
    // 保存record数据
    saveRecords(state) {
      window.localStorage.setItem(
        'recordList',
        JSON.stringify(state.recordList)
      )
    },
    // 获取tags数据
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣')
        store.commit('createTag', '食')
        store.commit('createTag', '住')
        store.commit('createTag', '行')
      }
    },
    // 新增tag
    createTag(state, name: string) {
      state.createTagError = null
      const names = state.tagList.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated')
        return
      }
      const id = createId().toString()
      state.tagList?.push({ id, name: name })
      store.commit('saveTag')
    },
    // 删除tag
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTag')
        window.alert('删除成功')
        router.back()
      } else {
        window.alert('删除失败')
      }
    },
    // 更新tag
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload
      const idList = state.tagList.map((item) => item.id)
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name)
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复')
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0]
          tag.name = name
          store.commit('saveTag')
        }
      } else {
        window.alert('标签不存在')
      }
    },
    // 查找tag
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0]
    },
    // 保存tag
    saveTag(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
  },
  actions: {},
  modules: {},
})

export default store
