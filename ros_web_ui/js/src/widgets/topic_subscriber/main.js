var WidgetTopicSubscriber = function (widgetInstanceId) {
  // 必要属性
  var self = this; //local variable to represent the object表示对象的局部变量
  this.widgetInstanceId = widgetInstanceId;  //setting the ID of the widget 设置部件的ID
  this.selector = ".jsWidgetContainer[data-widget-instance-id=" + self.widgetInstanceId + "]"; // setting the HTML selector 设置HTML选择器

  // Mandatory callback methods必要的回调方式
  this.clbkCreated = function () { };
  this.clbkConfirm = function () { };
  this.clbkResized = function () { };
  this.clbkMoved = function () { };
  this.clbkTab = function (isMyTab) { };

  // Subscriptions Callbacks订阅回调
  this.topic1 = new ROSLIB.Topic({
    ros: ros,
    name: "",
    messageType: ""
  });
  this.onchange1 = function (selectedTopic) {
    self.topic1.unsubscribe();
    self.topic1.name = selectedTopic;
    var elem = $(self.selector).find(".datatopic1");
    $(elem).html("");

    if (selectedTopic == "") return;
    ros.getTopicType(selectedTopic, function (type) {
      self.topic1.messageType = type;
      $(self.selector).find("p.name").html(selectedTopic);
      $(self.selector).find("p.type").html(type);
      self.topic1.subscribe(self.callback1);
    }, function (e) {
      throw new Error(e);
    });
  };
  var last_datetime = 0;
  this.callback1 = function (message) {
    var datetime = new Date();
    var period = 1000 * (1 / self.maxUpdateRate);
    if(datetime - last_datetime > period) {
      var elem = $(self.selector).find(".datatopic1");
      $(elem).html("");
      self.debugObjectInsideElement(elem, message);
      last_datetime = datetime;
    }
  }
  // Adjustable params可调参数
  this.arrayShowLimit = 5;
  this.valueShowLimit = 10;
  this.maxUpdateRate = 1;

  // helper methods辅助方式
  self.debugObjectInsideElement = function (elem, obj, level = 0) {
    for (var k in obj) {
      if (Array.isArray(obj[k])) {
        $(elem).append($("<p>").css({
          "padding-left": level * 10 + "px"
        }).html(k + " []"));
        var arr = obj[k].slice(0, self.arrayShowLimit);
        if (obj[k].length > self.arrayShowLimit) arr.push("-- more --");
        self.debugObjectInsideElement(elem, arr, level + 1);
      } else if (typeof obj[k] == "object") {
        $(elem).append($("<p>").css({
          "padding-left": level * 10 + "px"
        }).html(k + " { }"));
        self.debugObjectInsideElement(elem, obj[k], level + 1);
      } else {
        var val = obj[k].toString().length > self.valueShowLimit ? obj[k].toString().slice(0, self.valueShowLimit) + "..." : obj[k].toString();
        $(elem).append($("<p>").css({
          "padding-left": level * 10 + "px"
        }).html(k + ": " + val));
      }
    }
  }
}

$(document).ready(function () {
  // If you need an onload callback
});