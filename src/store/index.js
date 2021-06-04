import Vue from 'vue'
import Vuex from 'vuex'
// 导入 axios
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  // 共享数据
  state: {
    // list列表数据
    list: [],
    // 文本框的内容
    inputValue: 'aaa',
    // 因为id是后端返回的 我们这只做前端 并没有后端数据 所以定义一个假的id
    nextId: 5,
    // 按钮状态
    viewKey: 'all'
  },
  // 方法
  mutations: {
    // 给list赋值的方法 由actions中的getList方法调用
    initList(state, list) {
      state.list = list
    },
    // 为 inputValue 赋值的方法
    setInputValue(state, val) {
      state.inputValue = val
    },
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
    },
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
    },
    // 修改列表项的选中状态
    changeStatus(state, param) {
      // 根据id查找对应值的索引
      const i = state.list.findIndex(x => x.id === param.id)
      // 判断索引是否存在 -1 表示不存在
      if (i !== -1) {
        // 存在根据索引改变list数据的值
        state.list[i].done = param.status
      }
    },
    // 清除已完成的任务
    cleanDone(state) {
      // 通过 filter 查询并返回未完成的 任务数组 把该数组赋值给 list
      // 这样就清除了 已完成的任务
      state.list = state.list.filter(x => x.done === false);
    },
    // 修改按钮的状态
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  // 异步
  actions: {
    // 因为axios是异步操作 所以要把它定义到 actions 中
    getList(context) {
      // 发起请求list.json文件数据的操作
      // .then(({data})=>{}) 是请求成功后把 data属性解构出来 并且传入参数中
      axios.get('/vuex_demo2/dist/data/list.json').then(({ data }) => {
        // 调用 initList 函数 进行对state中数据的修改
        // context store的实例 commit触发mutations
        context.commit('initList', data)
      })
    }
  },
  // 包装器
  getters: {
    // 统计未完成任务的条数
    unDoneLength(state) {
      // filter() 函数会返回指定条件的数据 形成一个新的数组
      // 然后通过链式编程 直接返回数组的长度
      return state.list.filter(x => x.done === false).length;
    },
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
  },
  modules: {
  }
})
