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
}());