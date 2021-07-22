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
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li class="record" v-for="(item, index) in group.items" :key="index">
            <span>{{ item.tags.length === 0 ? '无' : item.tags[0].name }}</span>
            <span class="note">{{ item.notes }}</span>
            <span> ￥{{ item.amount }} </span>
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
    type HashTableValue = {
      title: string
      items: RecordItem[]
    }
    const hashTable: { [key: string]: HashTableValue } = {}
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt.split('T')
      hashTable[date] = hashTable[date] || { title: date, items: [] }
      hashTable[date].items.push(recordList[i])
    }
    console.log(hashTable)

    return hashTable
  }

  created() {
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
%item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  padding: 0 16px;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.note {
  margin-right: auto;
  margin-left: 16px;
  color: #999;

  overflow: hidden;
}
</style>
