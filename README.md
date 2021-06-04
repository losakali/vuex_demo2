# 1.初始化项目

（1）通过 vue ui 命令打开可视化面板，创建新项目 vuex-demo2

（2）安装 vuex 依赖包 、 axiox 依赖包 、ant-design-vue （ui组件库）依赖包

```
npm install vuex axios ant-design-vue-S
```

（3）实现 Todos 基本布局 （基于已有样式模板）

要安装的插件

| 序号 | 选项                              | 描述                                                         | 选择 |
| ---- | --------------------------------- | ------------------------------------------------------------ | ---- |
| 1    | Choose Vue version                | 选择Vue版本                                                  | Y    |
| 2    | Babel                             | vue项目中普遍使用es6语法，但有时我们的项目需要兼容低版本浏览器，这时就需要引入babel插件，将es6转成es5 | Y    |
| 3    | TypeScript                        | TypeScript通过添加类型来扩展JavaScript。通过了解JavaScript，TypeScript可以节省您捕获错误的时间并在运行代码之前提供修复。任何浏览器，任何操作系统，任何运行JavaScript的地方。 完全开源 |      |
| 4    | Progressive Web App (PWA) Support | 渐进式Web应用程序（PWA）支持                                 |      |
| 5    | Router                            | 路由                                                         |      |
| 6    | Vuex                              | 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化 | Y    |
| 7    | CSS Pre-processors                | CSS预处理器，预处理器：比如要用sass或者cssNext就要按照人家规定的语法形式，就是用人家的语法去编写，然后人家把你编写的代码转成css。 |      |
| 8    | Linter / Formatter                | 格式化程序                                                   |      |
| 9    | Unit Testing                      | 单元测试                                                     |      |
| 10   | E2E Testing                       | 端到端（end-to-end）                                         |      |

# 2.在main.js中导入组件库

导入 ant-design-vue ui组件库 并全局注册该组件库

```
// 1.导入 ant-design-vue 组件库
import Antd from 'ant-design-vue'
// 2.导入组件库的样式表
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false

// 3.全局注册组件库
Vue.use(Antd)
```

# 3.App根组件的设置

## 1.样式

```
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
```

## 2.HTML标签

```
<div id="todos-app">
    <div>
      <a-icon type="menu" />
      {{ title }}
    </div>

    <div class="icons-list">
      <a-icon type="home" />
      <a-icon type="smile" theme="outlined" />
      <a-icon type="sync" spin />
      <a-icon type="smile" :rotate="180" />
      <a-icon type="loading" />
    </div>

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
    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @click.native="changeDoneById(item.id)"
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

    <div style="margin-top: 50px">
      <a-divider>数据展示区</a-divider>
      <a-collapse>
        <a-collapse-panel key="1" header="json | this.$store.state">
          <p>{{ this.$store.state }}</p>
        </a-collapse-panel>
        <a-collapse-panel
          key="2"
          header="json | this.$store.getters "
          :disabled="false"
        >
          <p>{{ this.$store.getters }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="int | count">
          <!--<P> json | this.$store.state ===> {{this.$store.state}}</P>-->
          <!--<P> json | this.$store.getters ===> {{this.$store.getters}}</P>-->
          <p>count ===> {{ count }},</p>
          <P> count2 ===> {{ count2 }},</P>
          <P> count3 ===> {{ count3 }},</P>
          <P> count4 ===> {{ count4 }},</P>
          <P>count6_my_computed ===> {{ count6_my_computed }}</P>
          <!--{{count5}} 注意 这里count5 无法正常输出的 因为 因为 count5 上箭头函数的this指针并没有指向vue实例,
          因此不要滥用箭头函数 如要正常使用 且需求必须如此 请按照 count4写法-->
        </a-collapse-panel>
      </a-collapse>
      <a-divider>数据展示区2</a-divider>
      <a-carousel autoplay>
        <div>
          <a-tooltip placement="topLeft" arrow-point-at-center>
            <template slot="title">
              {{ this.$store.state }}
            </template>
            <a-button>json | this.$store.state</a-button>
          </a-tooltip>
        </div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
      </a-carousel>
    </div>
  </div>
```

# 4.数据存储

1.在项目的public中新建一个data目录

目录中新建list.json文件

文件中存放的数据如下

```
[
    {
        "id": 0,
        "info": "写代码",
        "done": false
    },
    {
        "id": 1,
        "info": "吃饭",
        "done": true
    },
    {
        "id": 3,
        "info": "打豆豆",
        "done": false
    }
]
```

# 5.发起数据请求

1.在 src → store → index.js

在 actions 属性中 发起 axios的 get 请求

因为 axios 的请求是异步的 所以要在 actions 中发起请求

```
actions: {
    // 因为axios是异步操作 所以要把它定义到 actions 中
    getList(context) {
      // 发起请求list.json文件数据的操作
      // .then(({data})=>{}) 是请求成功后把 data属性解构出来 并且传入参数中
      axios.get('/data/list.json').then(({ data }) => {
        console.log(data);
      })
    }
```

2.然后在App.vue根组件中加载该请求 

```
// 在声明周期函数的页面渲染加载函数中调用 actions 中的方法
  created() {
    this.$store.dispatch("getList");
  },
```

3.打印的数据如下 即 list.json 文件中的数据

```
0: {id: 0, info: "写代码", done: false}
1: {id: 1, info: "吃饭", done: true}
2: {id: 3, info: "打豆豆", done: false}
```

4.把返回的list数据挂载到 state属性中

```
state: {
    // list列表数据
    list: []
  },
```

   因为actions是不能直接修改 state属性中的数据的 必须调用 mutations中的方法进行修改

   首先定义一个方法

```
mutations: {
    initList(state, list) {
      state.list = list
    }
  },
```

然后在actions中调用该方法 把data中的数据 赋值给 state中的list属性

```
actions: {
    // 因为axios是异步操作 所以要把它定义到 actions 中
    getList(context) {
      // 发起请求list.json文件数据的操作
      // .then(({data})=>{}) 是请求成功后把 data属性解构出来 并且传入参数中
      axios.get('/data/list.json').then(({ data }) => {
        // 调用 initList 函数 进行对state中数据的修改
        // context store的实例 commit触发mutations
        context.commit('initList', data)
      })
    }
  },
```

# 6.把list数据渲染到页面中

1.在 app.vue 根组件中按需导入mapState 函数

```
import { mapState } from "vuex";
```

2.把state中的list数据挂载到 computed 计算属性中

```
// 在计算属性中把state中的数据挂载出来
  computed: {
    ...mapState(["list"]),
  },
```

3.在 a-list ui组件的 dataSoure 属性中绑定 list 属性值

```
<!-- 列表区域 -->
    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox>{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions">删除</a>
      </a-list-item>
    </a-list>
```

这样就能把数据在页面中显示出来

# 7.文本框的数据双向绑定

1.在state共享属性中定义一个 inputValue 属性用来存放文本框的内容

```
state: {
    // 文本框的内容
    inputValue: 'aaa'
  },
```

2.在app.vue组件中的computed计算属性中 挂载 inputValue 属性

```
computed: {
    ...mapState(["list", "inputValue"]),
  },
```

3.给 a-input 输入框ui组件 的value属性绑定 inputValue 属性值 

```
 <!-- 输入框 -->
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handlInputChange"
    />
```

4.在store的mutations方法中定义setInputValue方法 给state中的inputValue赋值

```
// 为 inputValue 赋值的方法
    setInputValue(state, val) {
      state.inputValue = val
    }
```

5.利用 a-input 输入框ui组件 的 @change 事件 在methods中定义handlInputChange方法

```
 methods: {
    // 监听文本框内容的变化
    handlInputChange(e) {
      // 调用 store 的 setInputValue 方法 给 state 中的inputValue赋值
      //  e.target.value 为文本框中输入的内容
      this.$store.commit("setInputValue", e.target.value);
    },
  },
```

这样就完成了双向绑定

# 8.添加列表项操作

1.在store的mytations中创建 添加列表项方法 代码逻辑如下

   在 state中新建一个 nextId 用来存储id

```
// 因为id是后端返回的 我们这只做前端 并没有后端数据 所以定义一个假的id
    nextId: 5
```

```
// 添加列表项
    addItem(state) {
      // 创建list数据结构
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      // 把obj数据添加到list数据列表中
      state.list.push(obj);
      // 为了让下次的id不一样 给nextId自增
      state.nextId++;
      // 添加操作完成后 清空文本框的内容
      state.inputValue = ""
    }
```

2.在app.vue中调用该方法

```
<!-- 添加事项按钮 -->
    <a-button type="primary" @click="addItemToList">添加事项</a-button>
```

```
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
```

# 9.删除列表项操作

1.在store的mytations中创建 删除列表项的方法 代码逻辑如下

```
// 根据id删除列表项操作
    removeItem(state, id) {
      // 根据id查找对应项的索引
      // findIndex会循环列表的每一项 并用回调函数把每一项传进形参 我们就可以通过findIndex的形参接收到每一个数组的值
      // 如果循环的id ==== 传入的id 会返回该值的索引
      const i = state.list.findIndex(x => x.id === id)
      // 判断元素是否存在 存在删除
      // splice(从哪个位置开始，删除几个)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    }
```

2.在app.vue组件中调用 removeItem 方法

```
<!-- 列表区域 -->
    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox>{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>
     <a-list>
```

```
  // 根据id删除对应的任务事项
    removeItemById(id) {
      this.$store.commit("removeItem", id);
    },
```

# 10.修改列表项的任务状态

列表项的状态是 利用复选框的选中状态进行改变的 

list数据中的done属性指定任务项的完成状态 

true 完成

false 未完成

1.给复选框 绑定 done 属性 

```
<!-- 列表区域 -->
    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>
     </a-list>
```

2.监听复选框的 @change 状态改变事件 把id值记录下来

```
<a-checkbox :checked="item.done" @change="(e) => {cbStatusChanged(e);}">
{{ item.info }}
</a-checkbox>
```

我也不知道为什么不可以直接获取到 e 对象

要用 立即执行函数 把e当形参传进去 再调用函数 把e传进去 才能获取到

3.定义 cbStatusChanged 复选框状态改变事件

```
 // 复选框状态改变的事件处理函数
    cbStatusChanged(e) {
      console.log(e.target);
    },
```

获取的值如下

```
checked: true
defaultChecked: false
prefixCls: "ant-checkbox"
type: "checkbox"
```

所以通过 e.target.checked 可以获取到复选框最新的值

4.具体操作逻辑如下

```
app.vue中
<a-checkbox :checked="item.done" @change="(e) => {cbStatusChanged(e,item.id);}">
{{ item.info }}
</a-checkbox>
```

```
store中
// 修改列表项的选中状态
    changeStatus(state, param) {
      // 根据id查找对应值的索引
      const i = state.list.findIndex(x => x.id === param.id)
      // 判断索引是否存在 -1 表示不存在
      if (i !== -1) {
        // 存在根据索引改变list数据的值
        state.list[i].done = param.status
      }
    }
```

```
app.vue中
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
```

# 11.未完成任务条数显示

因为未完成任务条数显示 只涉及到数据的展示 没有涉及到修改操作 

所以这里我们使用 store 的getters包装器属性就行

1.再包装器中定义一个方法 用于查询未完成任务的条数

```
// 包装器
  getters: {
    // 统计未完成任务的条数
    unDoneLength(state) {
      // filter() 函数会返回指定条件的数据 形成一个新的数组
      // 然后通过链式编程 直接返回数组的长度
      return state.list.filter(x => x.done === false).length;
    }
  },
```

2.在app.vue中按需导入 mapGetters 函数

```
// 按需导入函数
import { mapGetters } from "vuex";
```

3.把 unDoneLength 方法 映射到 app.vue 的 computed 计算属性中

```
computed: {
    ...mapState(["list", "inputValue"]),
    ...mapGetters(["unDoneLength"]),
  },
```

4.在html中直接调用 unDoneLength 方法

```
<!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余待做</span>
```

# 12.清除已完成的任务

1.给  清除已完成按钮 绑定点击事件 

```
<!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
```

2.定义 clean 事件

```
// 清除已完成的任务
    clean() {
      this.$store.commit("cleanDone");
    },
```

3.在 store 的mutations属性中 定义 cleanDone 方法 执行清除操作

```
// 清除已完成的任务
    cleanDone(state) {
      // 通过 filter 查询并返回未完成的 任务数组 把该数组赋值给 list
      // 这样就清除了 已完成的任务
      state.list = state.list.filter(x => x.done === false);
    }
```

# 13.实现按钮切换效果

实现 全部、未完成、已完成、三个按钮的切换效果

1.给全部按钮绑定一个点击事件 并根据点击不同的按钮传递不同的字符 

```
<!-- 操作按钮 -->
        <a-button-group>
          <a-button
            @click="ChangeList('all')" 
            :type="primary'>全部</a-button
          >
          <a-button
            @click="ChangeList('undone')"
            >未完成</a-button
          >
          <a-button
            @click="ChangeList('done')"
            >已完成</a-button
          >
        </a-button-group>
```

2.在store的state全局数据属性中定义一个 viewKey 值 用于保存按钮的状态

```
// 按钮状态
// 默认按钮状态为 <button>全部</button>
    viewKey: 'all'
```

3.在 app.vue中定义按钮绑定的 ChangeList 方法

```
// 修改页面上展示的列表数据
    ChangeList(key) {
      this.$store.commit("changeViewKey", key);
    },
```

4.在 store 的 mutations 属性中 定义 changeViewKey 修改按钮的状态值 viewKey

```
// 修改按钮的状态
    changeViewKey(state, key) {
      state.viewKey = key
    }
```

5.在app.vue的计算属性中 把  全局 viewKey 映射过来

```
computed: {
    ...mapState(["viewKey"]),
  },
```

6.根据 viewKey 值得变化 编写三元表达式 更改 按钮得高亮显示

```
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
```

# 14.根据点击的按钮实现不同数据的展示

1.因为只涉及到不同数据的展示 所以在 store 的 getters包装器属性上定义方法 来根据按钮状态返回不同的数据

```
// 根据按钮状态 返回不同的列表数据
    infolist(state) {
      if (state.viewKey === 'all') {
        // 返回已完成的任务
        return state.list
      }
      if (state.viewKey === 'undone') {
        // 返回未完成的任务列表 !x.done 是 x.done === false 的简写
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        // 返回已完成的任务列表 x.done 是 x.done === true 的简写
        return state.list.filter(x => x.done)
      }
      // 为了防止报错 如果三个条件都不满足 直接返回所有的任务
      return state.list
    }
```

2.在app.vue的计算属性中通过 mapGetters 函数 把 infolist 方法映射出来

```
computed: {
    ...mapGetters(["infolist"]),
  },
```

3.把  a-list ui组件绑定的值 从 list 改为 infolist 即可

```
<a-list bordered :dataSource="infolist" class="dt_list">
```

