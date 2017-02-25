//此处是一个构造函数
//组合使用构造函数模式和原型模式
function Observer(data) {
  this.data = data;
  this.walk();
}

Observer.prototype = {
  constructor: Observer,
  handlers: {},
  walk: function () {
    var obj = this.data;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var val = obj[key];
        if (typeof val === 'object') {
          new Observer(val);
        }
      }
      this.convert(obj, key, val);
    }
  },
  $watch: function (e, handler) {
    //如果观察的属性为对象，同时观察对象下面的属性
    if (typeof this.data[e] === 'object') {
      for (var key in this.data[e]) {
        if (!(key in this.handlers)) {
          this.handlers[key] = [];
        }
        this.handlers[key].push(handler);
      }
    }
    if (!(e in this.handlers)) {
      this.handlers[e] = [];
    }
    this.handlers[e].push(handler);
  },
  emit: function (e, args) {
    var handlerArgs = Array.prototype.slice.call(arguments,1);
    for(var i = 0; i < this.handlers[e].length; i++) {
      this.handlers[e][i].apply(this, handlerArgs);
    }
  },
  convert: function (data, key, val) {
    //创建访问器属性
    var that = this;
    Object.defineProperty(data, key, {
      enumerable: true, //表示能否通过for-in循环返回属性
      configurable: true, //表示能否通过delete删除属性从而重新定义属性
      get: function () {
        console.log('你访问了' + key);
        return val;
      },
      set: function (newVal) {
        //如果设置值为对象，同样进行递归处理
        if (typeof newVal === 'object') {
          for (var k in newVal) {
            that.convert(newVal, k, newVal[k]);
            that.emit(k, newVal[k]);
          }
        }
        that.emit(key, newVal);
        if (newVal === val) return;
        val = newVal
      }
    })
  }
}

var data = {
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
};

var test = new Observer(data);
test.$watch('name', function(newName) {
  console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});