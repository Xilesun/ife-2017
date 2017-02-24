//此处是一个构造函数
//组合使用构造函数模式和原型模式
function Observer(data) {
  this.data = data;
  this.walk();
}

Observer.prototype = {
  constructor: Observer,
  walk: function () {
    var obj = this.data;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var val = obj[key];
        if (typeof val === 'object') {
          new Observer(val);
        }
      }
      this.convert(key, val);
    }
  },
  convert: function (key, val) {
    //创建访问器属性
    Object.defineProperty(this.data, key, {
      enumerable: true, //表示能否通过for-in循环返回属性
      configurable: true, //表示能否通过delete删除属性从而重新定义属性
      get: function () {
        console.log('你访问了' + key);
        return val
      },
      set: function (newVal) {
        console.log('你设置了' + key + ', 新的值为' + newVal);
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