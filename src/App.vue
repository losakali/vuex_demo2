<template>
  <div id="app">
    <!-- 输入框 -->
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handlInputChange"
    />

    <!-- 添加事项按钮 -->
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <!-- 列表区域 -->
    <a-list bordered :dataSource="infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            (e) => {
              cbStatusChanged(e, item.id);
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余待做</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            @click="ChangeList('all')"
            :type="viewKey === 'all' ? 'primary' : ''"
            >全部</a-button
          >
          <a-button
            @click="ChangeList('undone')"
            :type="viewKey === 'undone' ? 'primary' : ''"
            >未完成</a-button
          >
          <a-button
            @click="ChangeList('done')"
            :type="viewKey === 'done' ? 'primary' : ''"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
// 按需导入函数
import { mapState, mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {};
  },
  // 在声明周期函数的页面渲染加载函数中调用 actions 中的方法
  created() {
    this.$store.dispatch("getList");
  },
  // 在计算属性中把state中的数据挂载出来
  computed: {
    ...mapState(["inputValue", "viewKey"]),
    ...mapGetters(["unDoneLength", "infolist"]),
  },
  methods: {
    // 监听文本框内容的变化
    handlInputChange(e) {
      // 调用 store 的 setInputValue 方法 给 state 中的inputValue赋值
      this.$store.commit("setInputValue", e.target.value);
    },
    // 向列表中新增 item 项
    addItemToList() {
      // 判断用户输入的值是否为空 为空不进行操作
      // trim 去除字符串的头尾空格
      // 去除字符串首尾空格后 判断字符串长度是否小于或者等于0
      // 如果是的话 直接return掉 并提示错误消息 不执行后面的操作
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning("文本框内容不能为空");
      }
      // 内容存在 修改list数组
      this.$store.commit("addItem");
    },
    // 根据id删除对应的任务事项
    removeItemById(id) {
      this.$store.commit("removeItem", id);
    },
    // 复选框状态改变的事件处理函数
    cbStatusChanged(e, id) {
      // 定义一个数据对象 存储状态改变时的id 和 选中状态
      const param = {
        id: id,
        status: e.target.checked,
      };
      // 调用 store 中的 changeStatus 事件函数 并把改变的值传过去
      this.$store.commit("changeStatus", param);
    },
    // 清除已完成的任务
    clean() {
      this.$store.commit("cleanDone");
    },
    // 修改页面上展示的列表数据
    ChangeList(key) {
      this.$store.commit("changeViewKey", key);
    },
  },
};
</script>

<style scoped>
#todos-app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*跑马灯*/
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #1890ff;
  overflow: hidden;
}
.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
/*跑马灯*/
</style>
