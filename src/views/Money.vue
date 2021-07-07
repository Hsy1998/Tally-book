<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import Tags from '../components/MoneyPage/Tags.vue'
import Notes from '../components/MoneyPage/Notes.vue'
import NumberPad from '../components/MoneyPage/NumberPad.vue'
import Types from '../components/MoneyPage/Types.vue'
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import recordListModel from '../models/recordListModel'
import tagListModel from '../models/tagListModel'

tagListModel.fetch()

@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue {
  tags = tagListModel.data
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
  }
  recordList = recordListModel.fetch()
  onUpdateNotes(value: string) {
    this.record.notes = value
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value
  }
  saveRecord() {
    const record2 = recordListModel.clone(this.record)
    record2.createdAt = new Date()
    this.recordList.push(record2)
  }
  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList)
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
