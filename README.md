Jquery Fullscreen Plugin
========================

This is a simple jQuery plugin which sets any HTML element as fullscreen by changing its height and width. It does not recreate the element again like other Layover, Modalbox does.


## Usage:
```javascript
$('#fullscreen-link').click(function(){
  $('#iframe,#content-block').FullScreen({
    // This option has to be implemented if 'title' is required on the header when fullscreen mode is on.
    title: function(fullScreenElement) {
      if (!fullScreenElement.parents('.dashboard-iframe-block').find('.dashboard-iframe-header span:first')) {
        throw new Error("Require element to display fullscreen title is not found.")
      }
      return fullScreenElement.parents('.dashboard-iframe-block')
        .find('.dashboard-iframe-header span:first')
        .attr('data-title'); 
    },
    // Optional settings
    // Activates fullscreen when CTRL + F key is pressed only if there is only one Fullscreen element
    // in the DOM.
    controlF : false,
    hidden: function (fullScreenElement) {
      fullScreenElement.sibiling('span').show();
    },
    shown: function (fullScreenElement) {
      fullScreenElement.next('div.test').hide();
    },
    exitTitle: "Exit Fullscreen",
    titleLength: 85
  });
});  
