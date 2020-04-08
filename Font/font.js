var fontCreate = (function(){
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
  