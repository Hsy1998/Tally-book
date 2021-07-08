<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <FormItem
      @update:value="onUpdateNotes"
      fild-name="备注"
      placeholder="请在这里添加备注"
    />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import Tags from '../components/MoneyPage/Tags.vue'
import FormItem from '../components/MoneyPage/FormItem.vue'
import NumberPad from '../components/MoneyPage/NumberPad.vue'
import Types from '../components/MoneyPage/Types.vue'
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import recordListModel from '../models/recordListModel'
import tagListModel from '../models/tagListModel'

tagListModel.fetch()

@Component({
  components: { Tags, FormItem, Types, NumberPad },
})
export default class Money extends Vue {
  tags = tagListModel.data.map((item) => item.name)
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
