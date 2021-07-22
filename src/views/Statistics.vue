<template>
  <Layout>
    <Tabs
      :value.sync="type"
      class-prefix="type"
      :data-source="recordTypesList"
    />
    <Tabs
      :value.sync="interval"
      class-prefix="interval"
      :data-source="intervalList"
    />
    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3>{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id">
            {{ item.amount }} {{ item.createdAt }}
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Tabs from '../components/Tabs.vue'
import intervalList from '@/constants/intervalList.ts'
import recordTypesList from '@/constants/recordTypesList.ts'

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  get recordList() {
    return this.$store.state.recordList
  }
  get result() {
    const { recordList } = this

    type HashTableValue = { tite: string; items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {}
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T')
      hashTable[date] = hashTable[date] || { title: date, items: [] }
      hashTable[date].items.push(recordList[i])
    }
    return hashTable
  }

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  type = '-'
  interval = 'day'
  intervalList = intervalList
  recordTypesList = recordTypesList
}
</script>

<style lang="scss" scoped>
// v-deep 透传到组件里面
::v-deep .type-tabs-item {
  border: 1px solid red;
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>
