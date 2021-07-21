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
