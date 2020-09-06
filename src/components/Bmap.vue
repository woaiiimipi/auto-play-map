<template>
  <div id="map-container" ref="map-container"></div>
</template>
<script>
import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import { options, topNumber } from './utils';
export default {
  data() {
    return {
      chart: null,
      dataIndex: 0,
      autoSwitchTimer: null,
      timeout: 3 * 1000,
    }
  },
  mounted() {
    this.initMap();
    this.showTip();
  },
  methods: {
    initMap() {
      this.chart = echarts.init(this.$refs['map-container']);
      this.chart.setOption(options);
    },
    showTip() {
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 1,
        dataIndex: this.dataIndex++,
      });
      this.autoSwitchTimer = setTimeout(this.showTip, this.timeout)
    }
  },
  watch: {
    dataIndex(val) {
      if (val > topNumber - 1) {
        this.dataIndex = 0;
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.autoSwitchTimer);
  }
}
</script>
<style>
#map-container {
  width: 100%;
  height: 100%;
}
</style>
