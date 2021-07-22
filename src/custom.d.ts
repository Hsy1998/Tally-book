type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createdAt?: string
}

type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  tagList: Tag[]
  fetchTags: () => Tag[]
  createTag: (name: string) => 'success' | 'duplicated' // 联合类型
  updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  removeTag: (id: string) => boolean
  saveTag: () => void
  findTag: (id:string) => Tag
}
interface Window {
  // tagList: Tag[]
  // createTag: (name: string) => void
  // removeTag: (id: string) => boolean
  // updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  // findTag: (id:string) => Tag | undefined
  // recordList: RecordItem[]
  // createRecord: (record: RecordItem) => void
}