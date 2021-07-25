<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :value.sync="record.type" :data-source="recordTypesList" />
    <div class="notes">
      <FormItem
        :value.sync="record.notes"
        fild-name="备注"
        placeholder="请在这里添加备注"
      />
    </div>

    <Tags @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Tags from '../components/MoneyPage/Tags.vue'
import FormItem from '../components/MoneyPage/FormItem.vue'
import NumberPad from '../components/MoneyPage/NumberPad.vue'
import Tabs from '../components/Tabs.vue'
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import recordTypesList from '@/constants/recordTypesList.ts'

@Component({
  components: { Tags, FormItem, NumberPad, Tabs },
})
export default class Money extends Vue {
  // tags = tagListModel.data.map((item) => item.name)
  get recordList() {
    return this.$store.state.recordList
  }
  recordTypesList = recordTypesList
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
  }

  created() {
    this.$store.commit('fetchRecords')
  }
  onUpdateTags(value: Tag[]) {
    this.record.tags = value
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签')
    } else if (this.record.amount === 0) {
      return window.alert('金额不能为0')
    }
    this.$store.commit('createRecord', this.record) // 创建一个新数据
    if (this.$store.state.createRecordError === null) {
      window.alert('保存成功')
    }
    this.record.notes = ''
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
