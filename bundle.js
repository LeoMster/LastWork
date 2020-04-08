var menuBarCreate = (function(){
    var menuBar = $('<div class="menu-bar"></div>');
    var menuData,menusArr = [];
    var active = -1;

    function createMenuTitle(){
        var titles = $('<ul class="menu-title"></ul>');

        for(var i = 0;i < menuData.length;i++){
            var title = $('<li class="title"></li>');
            title.html(menuData[i].title);
            title.attr('data-id',i);
            titles.append(title);

            title.click(function(e){
                var i = Number(this.dataset.id);
                    
                if(active === -1){
                    menusArr[i].css({ display:'inline-block' });
                    active = i;
                }else if(active !==i){
                    menusArr[active].css({ display:'none' });
                    menusArr[i].css({ display:'inline-block' });
                    active = i;
                }else{
                    menusArr[active].css({ display:'none' });
                    active = -1;
                }

                e.stopPropagation();
            });

            title.hover(function(){
                if(active !== -1){
                    var i = Number(this.dataset.id);

                    menusArr[active].css({ display:'none' });
                    menusArr[i].css({ display:'inline-block' });
                    active = i;
                }
            });
        }
        menuBar.append(titles);
    }

    function createMenus(){
        for(var i = 0;i < menuData.length;i++){
            var menus = $('<ul class="menus"></ul>');
            var items = menuData[i].menuItems;

            for(var j = 0;j < items.length;j++){
                if(items[j].title === 'hr'){
                    var hr = $('<li class="menu-hr"></li>');
                    menus.append(hr);
                    continue;
                }

                var menu = $('<li class="menu-item"></li>');
                menu.html(items[j].title);
                menu.attr('data-x',i);
                menu.attr('data-y',j);

                if(items[j].shortcut !== ''){
                    var shortcut = $('<span class="shortcut"></span>');

                    shortcut.html(items[j].shortcut);
                    menu.append(shortcut);
                }

                if(!items[j].enabled) menu.addClass('disabled');
                menus.append(menu);

                menu.click(function(e){
                    e.stopPropagation();
                    if($(this).hasClass('disabled')) return;

                    var i = this.dataset.x;
                    var j = this.dataset.y;

                    menusArr[i].css({display:'none'});
                    active = -1;

                    menuData[i].menuItems[j].handler();
                });
            }

            menus.css({
                width:menuData[i].width,
                left:menuData[i].left,
                display: 'none'
            });

            menuBar.append(menus);
            menusArr.push(menus);
        }
    }

    function checked(r,c,isChecked){
        var menuItem = menusArr[r].find('.menu-item')[c];
        if(isChecked){
            $(menuItem).prepend($('<span class="checked">✓</span>')[0]);
        }else{
            $(menuItem).find('.checked').remove();
        }
    }

    function enabled(r,c,isEnabled){
        var menuItem = menusArr[r].find('.menu-item')[c];
        if(isEnabled){
            $(menuItem).removeClass('disabled');
        }else{
            $(menuItem).addClass('disabled');
        }
    }

    function hideMenu(){
        if(active === -1) return;
        menusArr[active].css({display:'none'});
        active = -1;
    }

    function init(data){
        menuData = data;
        createMenuTitle();
        createMenus();
        $('body').append(menuBar);
    }

    return {
        init:init,
        checked:checked,
        enabled:enabled,
        hideMenu:hideMenu
    };
}());;var data = [
    { 
        title:'文件(F)',
        menuItems:[
            {
                title:'新建(N)',
                shortcut:'Ctrl+N',
                enabled:true,
                handler:function(){}
            },
            {
                title:'打开(O)...',
                shortcut:'Ctrl+O',
                enabled:true,
                handler:function(){}
            },
            {
                title:'保存(S)',
                shortcut:'Ctrl+S',
                enabled:true,
                handler:function(){}
            },
            {
                title:'另存为(A)...',
                shortcut:'',
                enabled:true,
                handler:function(){}
            },
            {
                title:'hr',
                shortcut:'',
                enabled:true,
                handler:null
            },
            {
                title:'页面设置(U)...',
                shortcut:'',
                enabled:true,
                handler:function(){}
            },
            {
                title:'打印(P)...',
                shortcut:'Ctrl+P',
                enabled:true,
                handler:function(){}
            },
            {
                title:'hr',
                shortcut:'',
                enabled:true,
                handler:null
            },
            {
                title:'退出(X)',
                shortcut:'',
                enabled:true,
                handler:function(){}
            }
        ],
        width:'202px',
        left:'0px'
    },
    {
        title:'编辑(E)',
        menuItems:[
            {
                title:'撤销(U)',
                shortcut:'Ctrl+Z',
                enabled:false,
                handler:function(){}
            },
            {
                title:'hr',
                shortcut:'',
                enabled:true,
                handler:null
            },
            {
                title:'剪切(T)',
                shortcut:'Ctrl+X',
                enabled:true,
                handler:function(){}
            },
            {
                title:'复制(C)',
                shortcut:'Ctrl+C',
                enabled:false,
                handler:function(){}
            },
            {
                title:'粘贴(P)',
                shortcut:'Ctrl+V',
                enabled:false,
                handler:function(){}
            },
            {
                title:'删除(L)',
                shortcut:'Del',
                enabled:false,
                handler:function(){}
            },
            {
                title:'hr',
                shortcut:'',
                enabled:true,
                handler:null
            },
            {
                title:'使用 Bing 搜索...',
                shortcut:'Ctrl+E',
                enabled:true,
                handler:function(){}
            },
            {
                title:'查找(F)...',
                shortcut:'Ctrl+F',
                enabled:false,
                handler:function(){} 
            },
            {
                title:'查找下一个(N)',
                shortcut:'F3',
                enabled:false,
                handler:function(){}
            },
            {
                title:'替换(R)...',
                shortcut:'Ctrl+H',
                enabled:true,
                handler: function(){} 
            },
            {
                title:'转到(G)...',
                shortcut:'Ctrl+G',
                enabled:true,
                handler:function(){} 
            },
            {
                title:'hr',
                shortcut:'',
                enabled:true,
                handler:null
            },
            {
                title:'全选(A)',
                shortcut:'Ctrl+A',
                enabled:true,
                handler:function(){} 
            },
            {
                title:'时间/日期(D)',
                shortcut:'F5',
                enabled:true,
                handler:function(){} 
            },
        ],
        width:'218px',
        left:'52px'
    },
    {
        title:'格式(O)',
        menuItems:[
            {
                title:'自动换行(W)',
                shortcut:'',
                enabled:true,
                handler:function(){}
            },
            {
                title:'字体(F)...',
                shortcut:'',
                enabled:true,
                handler:function(){
                    fontCreate.createFont({
                        handler: function(e){
                            console.log(e);
                        }
                    });
                } 
            }
        ],
        width:'156px',
        left:'106px'
    },
    {
        title:'查看(V)',
        menuItems:[
            {
                title:'状态栏(S)',
                shortcut:'',
                enabled:true,
                handler:function(){}
            }
        ],
        width:'138px',
        left:'162px'
    },
    {
        title:'帮助(H)',
        menuItems:[
            {
                title:'查看帮助(H)',
                shortcut:'',
                enabled:true,
                handler:function(){}
            },
            {
                title:'关于记事本(A)',
                shortcut:'',
                enabled:true,
                handler:function(){}
            },
        ],
        width:'166px',
        left:'216px'
    }
];
$(function(){
    menuBarCreate.init(data);
    textCreate.init();
});;var textCreate = (function(){
    var dom = $(''
        + '<div class="note-text">'
        + '<textarea spellcheck="false"></textarea>'
        + '</div>');
  
    var textArea = dom.find('textarea');

    function init(){
      $('body').append(dom);
      textArea.trigger('focus');
    }
  
    return {init:init};
}());;var fontCreate = (function(){
    var fontContainer = $(''
        + '<div class="note-mask note-font">'
        + '<div class="dialogbox note-box">'
        + '<div class="note-title">'
        + '<p class="title">字体</p>'
        + '<span class="btn-close" title="关闭">✖</span>'
        + '</div>'
        + '<div class="main note-main">'
        + '<div class="font-family"><p>字体(F):</p></div>'
        + '<div class="font-style"><p>字形(Y):</p></div>'
        + '<div class="font-size"><p>大小(S):</p></div>'
        + '<fieldset class="sample">'
        + '<legend>示例</legend>'
        + '<p class="sample-txt">AaBbYyZz</p>'
        + '</fieldset>'
        + '<div class="script">'
        + '<label>'
        + '脚本(R):<br>'
        + '<select>'
        + '<option value="西欧语言">西欧语言</option>'
        + '<option value="中文 GB2312">中文 GB2312</option>'
        + '</select>'
        + '</label>'
        + '</div>'
        + '<input class="btn-ok btn" type="button" value="确定">'
        + '<input class="btn-cancel btn" type="button" value="取消">'
        + '</div>'
        + '</div>'
        + '</div>');
  
    var btnOk       = fontContainer.find('.btn-ok'),
        btnClose    = fontContainer.find('.btn-close'),
        btnCancel   = fontContainer.find('.btn-cancel'),
        sampleTxt   = fontContainer.find('.sample-txt'),
        noteTitle   = fontContainer.find('.note-title');
  
    var fonts = ['Agency FB','Algerian','Arial','Arial Rounded MT','Axure Handwriting','Bahnschrift','Baskerville Old Face','Bauhaus 93','Bell MT','Berlin Sans FB','Bernard MT','BlackAdder ITC'],
        styles = ['常规','斜体','粗体','粗偏斜体'],
        sizes = ['8','9','10','11','12','14','16','18','20','22','24','26','28','36','48','72'];
  
    var obj = {
      family: 'Arial',
      style: '常规',
      size: '16',
      handler: null
    };
  
    function sample(){  
        sampleTxt.css({ 'font-family':obj.family,'font-size':obj.size + 'pt' });
        if(obj.style === '常规'){
            sampleTxt.css({'font-weight':'normal','font-style':'normal'});
            return;
        }
        if(obj.style === '斜体'){
            sampleTxt.css({'font-weight':'normal','font-style':'italic'});
            return;
        }
        if(obj.style === '粗体'){
            sampleTxt.css({'font-weight':'bold','font-style':'normal'});
            return;
        }
        if(obj.style === '粗偏斜体'){
            sampleTxt.css({'font-weight':'bold','font-style':'italic'});
            return;
        }
    }
  
    function init(){
        var lstFamily = new List();
        lstFamily.create({
            container: '.note-font .font-family',
            width: '176px',
            list: fonts,
            select: fonts.indexOf(obj.family),
            isFont: true,
            selectHandler: function(e){
                obj.family = fonts[e];
                sample();
            }
        });
  
        var lstStyle = new List();
        lstStyle.create({
            container: '.note-font .font-style',
            width: '132px',
            list: styles,
            select: styles.indexOf(obj.style),
            isFontStyle: true,
            selectHandler: function(e){
                obj.style = styles[e];
                sample();
            }
        });
  
        var lstSize = new List();
        lstSize.create({
            container: '.note-font .font-size',
            width: '64px',
            list: sizes,
            select: sizes.indexOf(obj.size),
            selectHandler: function(e){
                obj.size = sizes[e];
                sample();
            }
        });
    
        sample();
    }
  
    function destory(){ fontContainer.remove(); }
  
    function createFont(conf){
        $.extend(obj,conf);
        $('body').append(fontContainer);
        init();
        fontContainer.find('.dialogbox').draggable({handle:noteTitle});
        btnClose.click(destory);
        btnCancel.click(destory);
        btnOk.click(function(){
            obj.handler({
                family: obj.family,
                style: obj.style,
                size: obj.size
            });
            destory();
        });
        fontContainer.click(function(e){
            e.stopPropagation();
        });
    }

    return {createFont:createFont};
}());
  ;function List(){
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
  