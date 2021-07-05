<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @sumbit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Tags from '../components/MoneyPage/Tags.vue'
import Notes from '../components/MoneyPage/Notes.vue'
import NumberPad from '../components/MoneyPage/NumberPad.vue'
import Types from '../components/MoneyPage/Types.vue'
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
  creeatedAt?: Date
}
@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '烟酒']
  record: Record = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
  }
  recordList: Record[] = JSON.parse(
    window.localStorage.getItem('recordList') || '[]'
  )
  onUpdateNotes(value: string) {
    this.record.notes = value
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value
  }
  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record))
    record2.creeatedAt = new Date()
    this.recordList.push(record2)
  }
  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped></style>
