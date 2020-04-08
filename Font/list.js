function List(){
  var list = $(''
    +'<div class="font-list">'
    +'<input class="ipt" type="text"><br>'
    +'<ul class="list">'
    +'</ul>'
    +'</div>');
  
  var ipt       = list.find('.ipt'),
      fontList  = list.find('.list'),
      items;
  
  var obj = {
    container: '',
    list: [],
    select: 0,
    width: '200px',
    isFont: false,
    isFontStyle: false,
    selectHandler: null
  };
  
  function setFontStyle(item,style){  
    if(obj.style === '常规'){
      item.css({'font-weight':'normal','font-style':'normal'});
      return;
    } 
    if(style === '斜体'){
      item.css({'font-weight':'normal','font-style':'italic'});
      return;
    }
    if(style === '粗体'){
      item.css({'font-weight':'bold','font-style':'normal'});
      return;
    }
    if(style === '粗偏斜体'){
      item.css({'font-weight':'bold','font-style':'italic'});
      return;
    }
  }
  
  function setData(){
    var i = 0,item;
    if(obj.isFont){
      for(i = 0;i < obj.list.length;i++){
        item = $('<li class="item"></li>');
        item.css({'font-family':obj.list[i]});
        fontList.append(item.html(obj.list[i]));
      }
    }else if(obj.isFontStyle){
      for(i = 0;i < obj.list.length;i++){
        item = $('<li class="item"></li>');
        setFontStyle(item,obj.list[i]);
        fontList.append(item.html(obj.list[i]));
      }
    }else{
      for(i = 0;i < obj.list.length;i++) {
        item = $('<li class="item"></li>');
        fontList.append(item.html(obj.list[i]));
      }
    }
    items = fontList.find('.item');
  }
  
  function setSelect(n){
    $(items[n]).addClass('selected');
    ipt.val(obj.list[n]);
    ipt.select();
  }
  
  function init(){
    var preList = $(obj.container).find('.font-list');
    if(preList.length !== 0) preList.remove();
    $(obj.container).append(list);
    list.css({ width:obj.width });
    setData();
    setSelect(obj.select);
  }
  
  this.create = function(conf){
    $.extend(obj, conf);
    init();
  
    fontList.click(function(e){
      $(items[obj.select]).removeClass('selected');
      obj.select = obj.list.indexOf($(e.target).html());
      $(items[obj.select]).addClass('selected');
      ipt.val(obj.list[obj.select]);
      ipt.select();
      obj.selectHandler(obj.select);
    });
  
    ipt.keyup(function(){
      var i = 0;
      
      for(i = 0;i < obj.list.length;i++){
        if(obj.list[i].indexOf(ipt.val()) === 0) break;
      }
  
      if(i === obj.list.length) return;
  
      items[i].scrollIntoView({behavior:'smooth',block:'start'});
      $(items[obj.select]).removeClass('selected');
      $(items[i]).addClass('selected');
      obj.select = i;
    });
  };
}
  