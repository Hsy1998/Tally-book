<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :value.sync="record.type" :data-source="recordTypesList" />
    <div class="notes">
      <FormItem
        @update:value="onUpdateNotes"
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

  onUpdateNotes(value: string) {
    this.record.notes = value
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value
  }
  saveRecord() {
    this.$store.commit('createRecord', this.record) // 创建一个新数据
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
