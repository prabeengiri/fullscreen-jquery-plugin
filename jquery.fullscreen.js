/**
 * jQuery Fullscreen 0.1
 * 
 * CopyRight 2014 Prabin Giri
 *  
 * Download Source: 
 *   https://github.com/prabeengiri/Persistent-Folder-Tree-Accordion/archive/master.zip
 * Depends:
 *   jQuery.js
 * 
 * This Javacsript creates the clickable accordion with Javascript that
 * opens/and closes the lists. Its basically designed for the folder tree.
 * 
 * It also saves the state in the cookie. When visited next time, based 
 * on the previous open/close state, it will open or close the folders.  
 */
(function($) {
  
  // Construct the Fullscreen Object.
  var FullScreen = function (el, options) {
    this.settings = $.extend({}, this.defaults, options);
    this.fullScreenElement = el;
    this.init();
  };
  
  // Extend Fullscreen Object.
  FullScreen.prototype = {
    defaults : {
      fullScreenElement: null,
      cancel : null,
      title : function(fullScreenElement) {
        return null;
      }
    },
    
    /**
     * Initialize the fullscreen Object.
     */
    init : function () {
      this.showFullScreen();
      this.showCloseUI();
    },
    
    /**
     * Create the Fullscreen close UI.
     * Css for all the elements is defined in the CSS file.
     * 
     * On close we have the rever the Fullscreens element's position
     * and hide the close bar. 
     */
    showCloseUI : function () {
      var self = this;
      $("<div>", { 
        'id' : 'fullscreen-close',
        'align' : "center"
      })
      .appendTo('body')
      .append('<span class="fullscreen-title">' + self.settings.title(self.fullScreenElement) + "</span>")
      .append("<span class='fullscreen-close-text'>Exit Fullscreen</span>") 
      .slideDown('slow', function() {
        $(this).click(function () {
          self.hideCloseUI();
          self.hideFullScreen();
        });
      });
      
      // Hide ScrollBar.
      $('html,body').css({'overflow' : 'hidden'});
    },
    
    /**
     * Remove the Close UI from DOM.
     */
    hideCloseUI : function () { 
      $('#fullscreen-close').slideUp('fast', function () { 
        $(this).remove();
      });

      // Get the scrollbar back.
      $('html,body').css({'overflow' : 'auto'});
    },
    
    /**
     * DisplayFullscreen element as Fullscreen.
     * This just changes top,left,position.height, width
     * attribute of the fullscreen Element.
     */
    showFullScreen : function() {
      this.fullScreenElement.addClass('fullscreen-active');
    },
    
    /**
     * Revert back to the same position.
     */
    hideFullScreen: function() {
      this.fullScreenElement.toggleClass('fullscreen-active');
    },
  };

  $.fn.FullScreen = function(options) {
    new FullScreen(this, options);
    return this;
  };
  
  /**
   * IE has window.resize bug which gets fired everytime the element on the 
   * DOM is resized, to get rid of this problem we are creating own
   * resize handler 
   */
   window.onWindowResize = function (callback) {
     var width = $(window).width(), height = $(window).height();
     $(window).resize(function() {
       var newWidth = $(window).width(),
         newHeight = $(window).height();
       if (newWidth !== width || newHeight !== height) {
         width = newWidth;
         height = newHeight;
         callback();
       }
    });
  };

  $(document).ready(function(){
    $('.dashboard-fullscreen').click(function(){
      $(this).parents('.dashboard-iframe-block').find('iframe').FullScreen({
        title: function(fullScreenElement) {
          return fullScreenElement.parents('.dashboard-iframe-block').find('.dashboard-iframe-header span:first').attr('data-title'); 
        }
      });
    });  
  });
})(jQuery);