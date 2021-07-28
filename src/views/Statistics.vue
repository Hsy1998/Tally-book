<template>
  <Layout>
    <div ref="content">
      <Tabs
        :value.sync="type"
        class-prefix="type"
        :data-source="recordTypesList"
      />
      <div class="charts-wrapper" ref="ChartsWrapper">
        <Charts class="charts" :options="x" />
      </div>

      <ol v-if="groupedList.length > 0">
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">
            {{ beautify(group.title) }} <span>￥{{ group.total }}</span>
          </h3>
          <ol>
            <li
              class="record"
              v-for="(item, index) in group.items"
              :key="index"
            >
              <span class="tag">{{ tagString(item.tags) }} </span>
              <span class="note">{{ item.notes }}</span>
              <span> ￥{{ item.amount }} </span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        目前没有相
      </div>
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
import Charts from '@/components/Charts.vue'

@Component({
  components: { Tabs, Charts },
})
export default class Statistics extends Vue {
  get recordList() {
    return this.$store.state.recordList
  }

  get groupedList() {
    const { recordList } = this

    const newList: RecordItem[] = clone(recordList as RecordItem[])
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

  get x() {
    return {
      title: {
        text: 'ECharts 入门示例',
      },
      grid: {
        // 去掉echarts左右padding
        left: 0,
        right: 0,
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
        ],
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          name: '销量',
          type: 'line',
          data: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
          ],
        },
      ],
    }
  }

  created() {
    this.$store.commit('fetchRecords')
  }
  mounted() {
    window.scrollTo(0, 0)
    ;(this.$refs.ChartsWrapper as HTMLDivElement).scrollLeft = 9999
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
.charts-wrapper {
  overflow: auto;
}
.charts {
  width: 430%;
}
</style>
