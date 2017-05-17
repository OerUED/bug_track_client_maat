<template>
  <group>
    <radio :options="channels" @on-change="change"></radio>
    <datetime :value.sync="startTime" format="YYYY-MM-DD HH:mm" @on-change="changeStart" title="开始时间" inline-desc="选择开始时间"></datetime>
    <datetime :value.sync="endTime" format="YYYY-MM-DD HH:mm" @on-change="changeEnd" title="结束时间" inline-desc="选择结束时间"></datetime>
  </group>
  <div class="wrap">
    <p>错误日志</p>
    <div v-for="item in data" class="item">
      <p class="title">地址：{{item.url}}  line: {{item.line}} col: {{item.col}}</p>
      <p class="title">时间：{{item.date | date 'MM-dd hh:mm:ss'}}</p>
      <p class="desc">
        响应：{{item.msg}}
      </p>
      <br />
      <p class="desc">UA: {{item.ua}}</p>
    </div>
    <p class="more" @click="nextPage">点击加载更多</p>
  </div>
</template>

<script>
  var filt = {
    '全部': {},
    '前端': {
      keyword: 'pageError'
    },
    '服务端': {
      keyword: 'reqSerError'
    }
  };
  import tip from 'vux/dist/components/tip';
  import group from 'vux/dist/components/group';
  import radio from 'vux/dist/components/radio';
  import datetime from 'vux/dist/components/datetime';
  import * as service from './factory';
  export default {
    components: {
      tip,
      radio,
      group,
      datetime
    },
    data () {
      return {
        data: [],
        pageIndex: 1,
        isloading: true,
        more: false,
        type: '1',
        channels: ['全部', '服务端', '前端'],
        filt: '全部',
        startTime: null,
        endTime: null
      };
    },
    created () {
      this.nextPage();
    },
    methods: {
      change (value) {
        this.clear();
        this.filt = value;
        this.nextPage();
      },
      changeStart (value) {
        this.clear();
        this.startTime = value;
        this.nextPage();
      },
      changeEnd (value) {
        this.clear();
        this.endTime = value;
        this.nextPage();
      },
      clear () {
        this.pageIndex = 1;
        this.data = [];
      },
      nextPage () {
        let that = this;
        let params = Object.assign({page: this.pageIndex++, size: 10}, filt[that.filt], {startTime: this.startTime, endTime: this.endTime});
        if (that.$route.query.kwd) {
          params.keyword = that.$route.query.kwd;
        }
        if (that.$route.query.appKey) {
          params.appKey = that.$route.query.appKey;
        }
        let tempArr = [];
        that.isloading = true;
        service.list(params).then(function (_res) {
          if (_res.data.code === 200) {
            _res.data.data.list.forEach(item => {
              try {
                tempArr = {
                  title: item.content.indexOf('pageError') > -1 ? '页面错误' : '服务端错误',
                  msg: JSON.parse(item.content).value || JSON.parse(item.content).msg,
                  ua: JSON.parse(item.content).ua,
                  url: JSON.parse(item.content).url,
                  date: item.createAt,
                  line: JSON.parse(item.content).line,
                  col: JSON.parse(item.content).col
                };
              } catch (e) {
                tempArr = {
                  title: '服务端错误',
                  msg: item.content.toString(),
                  ua: '',
                  url: '',
                  date: item.createAt,
                  line: '',
                  col: ''
                };
              }
              that.data.push(tempArr);
            });
          }
          that.isloading = false;
        });
      }
    }
  };
</script>

<style>
.wrap{
  padding: 10px;
}
.desc{
  color:#333;
}
.item{
  margin: 30px 0;
  font-size: 16px;
}
.title{
  color:#999;
}
.more{
  line-height: 60px;
  font-size: 14px;
  color:#ccc;
  text-align: center;
}
</style>
