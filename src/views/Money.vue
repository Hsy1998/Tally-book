<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <div class="notes">
      <FormItem
        @update:value="onUpdateNotes"
        fild-name="备注"
        placeholder="请在这里添加备注"
      />
    </div>

    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
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

const tagList = tagListModel.fetch() // 获取标签

@Component({
  components: { Tags, FormItem, Types, NumberPad },
})
export default class Money extends Vue {
  // tags = tagListModel.data.map((item) => item.name)
  tags = tagList
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
  }
  recordList = recordListModel.fetch() // 获取用户所有数据
  onUpdateNotes(value: string) {
    this.record.notes = value
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value
  }
  saveRecord() {
    recordListModel.create(this.record) // 创建一个新数据
  }
  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList) // 保存数据
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
