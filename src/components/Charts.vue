<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as echarts from 'echarts'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { EChartsOption, ECharts } from 'echarts'

@Component({})
export default class Charts extends Vue {
  myChart?: ECharts
  @Prop() options?: EChartsOption
  mounted() {
    this.myChart = echarts.init(this.$refs.wrapper as HTMLDivElement)
    this.myChart.setOption(this.options!)
  }
  @Watch('options')
  onOptionsChange(newValue: EChartsOption) {
    this.myChart!.setOption(newValue)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>
