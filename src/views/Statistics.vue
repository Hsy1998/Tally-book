<template>
  <Layout>
    <Tabs
      :value.sync="type"
      class-prefix="type"
      :data-source="recordTypesList"
    />
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }} <span>{{ group.total }}</span>
        </h3>
        <ol>
          <li class="record" v-for="(item, index) in group.items" :key="index">
            <span class="tag">{{ tagString(item.tags) }} </span>
            <span class="note">{{ item.notes }}</span>
            <span> ￥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Tabs from '../components/Tabs.vue'
import intervalList from '@/constants/intervalList.ts'
import recordTypesList from '@/constants/recordTypesList.ts'
import dayjs from 'dayjs'
import clone from '@/lib/clone'

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  get recordList() {
    return this.$store.state.recordList
  }

  get groupedList() {
    const { recordList } = this

    const newList: RecordItem[] = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      )
    if (newList.length === 0) {
      return []
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[]
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),
        items: [newList[0]],
      },
    ]
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]
      const last = result[result.length - 1]
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current)
      } else {
        result.push({
          title: dayjs(current.createdAt).format('YYYY-MM-DD'),
          items: [current],
        })
        console.log(current)
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
    })

    return result
  }

  created() {
    this.$store.commit('fetchRecords')
  }
  beautify(string: string) {
    const day = dayjs(string)
    const now = dayjs()
    // isSame 是同样的
    if (day.isSame(now, 'day')) {
      return '今天'
      // subtract 减去
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日')
    } else {
      return day.format('YYYY年MM月DD日')
    }
  }
  tagString(Tags: Tag[]) {
    return Tags.length === 0 ? '无' : Tags.map((item) => item.name).join('，')
  }

  type = '-'
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
.tag {
  min-width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.note {
  margin-right: auto;
  margin-left: 8px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.noResult {
  text-align: center;
  padding: 16px;
}
</style>
