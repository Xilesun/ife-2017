/*
18812011232  // 测试结果应该为 true
18812312     // false
12345678909  // false
*/
var phoneNumber = /^1(3|4|5|7|8)\d{9}$/;

/*
foo foo bar       // true
foo bar foo       // false  有重复单词但是不相邻
foo  barbar bar   // false
*/
var stringExp = /\b([a-zA-z]+)\b(\s+\1)+/