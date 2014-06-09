Jquery Fullscreen
=================

This is a simple jQuery plugin which sets any HTML element as fullscreen by changing its height and width. It does not recreate the element again like other Layover, Modalbox does.


## Usage:
```javascript
$('#fullscreen-link').click(function(){
  $('#iframe,#content-block').FullScreen({
    title: function(fullScreenElement) {
      if (!fullScreenElement.parents('.dashboard-iframe-block').find('.dashboard-iframe-header span:first')) {
        throw new Error("Require element to display fullscreen title is not found.")
      }
      return fullScreenElement.parents('.dashboard-iframe-block')
        .find('.dashboard-iframe-header span:first')
        .attr('data-title'); 
    },
    //Activates fullscreen when CTRL + F key is pressed.
    controlF : false,
    hidden: function (fullScreenElement) {
      // Not required nothing to be done once fullscreen element is hidden.
    },
    shown: function (fullScreenElement) {
      // Not required nothing to be done once fullscreen element is shown.
    },
    exitTitle: "Exit Fullscreen",
    titleLength: 85
  });
});  
