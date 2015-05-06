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
    //Invoked when fullscreen mode is inactive after being active
    hidden: function (fullScreenElement) {
      fullScreenElement.sibiling('span').show();
    },
    // Invoked when fullscreen mode is active
    shown: function (fullScreenElement) {
      fullScreenElement.next('div.test').hide();
    },
    // Exit title that gets dispalyed in the top of the page when fullscreen mode is active
    exitTitle: "Exit Fullscreen",
    // Length of the title to be displaye in the header of the fullscreen mode. If titile exceeeds 
    // The specified length, then its will trim it appending ellipsis at the end. 
    titleLength: 85
  });
});  
