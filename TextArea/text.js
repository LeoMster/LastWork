var textCreate = (function(){
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
}());