/**
 * jQuery Fullscreen 0.1
 * 
 * CopyRight 2014 Prabin Giri
 *  
 * Download Source: 
 *   https://github.com/prabeengiri/jquery_fullscreen/archive/master.zip
 * Depends:
 *   jQuery.js
 * 
 * This Fullscreen Plugin will expand the selected element to fullscreen
 * with close button at the top. It does not clone and append the 
 * fullscreen element like Lighbox, ModalBox. It can be perfectly used with
 * Iframes. It does not reload the iframes.
 */
(function($) {
  
  // Construct the Fullscreen Object.
  var FullScreen = function (el, options) {
    this.settings = $.extend({}, this.defaults, options);
    this.fullScreenElement = el;
    this.init();
    this.fullScreenMode = false;
    var self = this;
    
    // Attache Keydown event. 
    $(document).on('keydown' , function(e) {
      self.keyDown(e); 
    }); 
    
  };
  
  // Extend Fullscreen Object.
  FullScreen.prototype = {
    defaults : {
      fullScreenElement: null,
      cancel : null,
      title : function(fullScreenElement) {
        return null;
      },
      //Activates fullscreen when CTRL + F key is pressed.
      controlF : false
    },
    
    init : function () {
      this.showAll();
    },
    
    showAll : function() {
      this.showFullScreen();
      this.showCloseUI();
      this.fullScreenMode = true;
    },
    
    hideAll: function () {
      this.hideCloseUI();
      this.hideFullScreen();
      this.fullScreenModel = false;
    },
    
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
          self.hideAll();
        });
      });
      
      // Hide ScrollBar.
      $('html,body').css({'overflow' : 'hidden'});
    },
    
    // Remove the Close UI from DOM.
    hideCloseUI : function () { 
      $('#fullscreen-close').slideUp('fast', function () { 
        $(this).remove();
      });

      // Get the scrollbar back.
      $('html,body').css({'overflow' : 'auto'});
    },
    
    showFullScreen : function() {
      this.fullScreenElement.addClass('fullscreen-active');
    },
    
    hideFullScreen: function() {
      this.fullScreenElement.toggleClass('fullscreen-active');
    },
    
    keyDown : function (e) {
      // Close when ESC key is pressed and fullscreen mode is on.
      if (e.keyCode == 27 && this.fullscreenMode) {  
        this.hideAll(); 
      }
      // Open the fullscreen on ctrl + f.
      else if(e.keyCode == 70 && e.ctrlKey && e.shiftKey && !this.fullscreenMode && this.settings.controlF) { 
        this.showAll(); 
      }
      // If tab is pressed, it puts focus on other elements in DOM which are not being 
      // displayed and its messes the fullscreen.
      else if (e.keyCode == 9 && this.fullscreenMode) { 
        e.preventDefault();
      } 
    } 
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
})(jQuery);