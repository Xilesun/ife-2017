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
            if(!that.handlers[k]) continue;
            that.emit(k, newVal[k]);
            return;
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
    user: {
        name: "liangshaofeng",
        age: "24"
    },
    address: {
        city: "beijing"
    }
};

var test = new Observer(data);
test.$watch('age', function(age) {
  console.log('我的年纪变了，现在已经是：' + age + '岁了');
});