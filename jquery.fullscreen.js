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
	
	if (el.size() == 0) {
		throw new Error("FullScreen element not found in current context.");
		return;
	}
    this.settings = $.extend({}, this.defaults, options);
    this.fullScreenElement = el;
    this.init();
    this.fullScreenMode = false;
    
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
      controlF : false,
      hidden: function (el) {},
      shown: function (el) {},
      exitTitle: "Exit Fullscreen",
      titleLength: 85
    },
    
    // Show fullscreen when fullscreen icon/link is clicked.
    init : function () {
      this.showAll();
    },
    
    // Display fullscreen and exit bar.
    showAll : function() {
      this.showFullScreen();
      this.showCloseUI();
      this.fullScreenMode = true;
      // Expose event.
      this.settings.shown(this.fullScreenElement);
      this.fullScreenElement.trigger('onFullScreenShown', [this.fullScreenElement]);  
    },
    
    hideAll: function () {
      this.hideCloseUI();
      this.hideFullScreen();
      this.fullScreenMode = false;
      // Expose event.
      this.settings.hidden(this.fullScreenElement);
      this.fullScreenElement.trigger('onFullScreenHidden', [this.fullScreenElement]);

    },
    
    showCloseUI : function () {
      var self = this;
      var title = this.trimTitle ( self.settings.title(self.fullScreenElement) );
      
      $("<div>", { 
        'id' : 'fullscreen-close',
        'align' : "center"
      })
      .appendTo('body')
      .append('<span class="fullscreen-title">' + title + "</span>")
      .append("<span class='fullscreen-close-text'>" + self.settings.exitTitle + "</span>") 
      .slideDown('slow', function() {
        $(this).click(function () {
          self.hideAll();
        });
      });
      
      // Hide ScrollBar.
      $('html,body').css({'overflow' : 'hidden'});
    },
    
    // Trim title if its too long with dots.
    trimTitle : function (title) {
      if (title.length > this.settings.titleLength) {
        return title.substring(0, this.settings.titleLength) + " ...";
      }
      return title;
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
      // @todo What if fullscreenElement has inline height/width and its set 
      // as important.
      this.fullScreenElement.addClass('fullscreen-active');
    },
    
    hideFullScreen: function() {
      this.fullScreenElement.toggleClass('fullscreen-active');
    },
    
    keyDown : function (e) {
      // Close when ESC key is pressed and fullscreen mode is on.
      if (e.keyCode == 27 && this.fullScreenMode) {  
        this.hideAll(); 
      }
      // Open the fullscreen on ctrl + f.
      else if(e.keyCode == 70 && e.ctrlKey && e.shiftKey && !this.fullScreenMode && this.settings.controlF) { 
        this.showAll(); 
      }
      // If tab is pressed, it puts focus on other elements in DOM which are not being 
      // displayed and its messes the fullscreen.
      else if (e.keyCode == 9 && this.fullScreenMode) { 
        e.preventDefault();
      } 
    } 
  };

  $.fn.FullScreen = function(options) {
    new FullScreen(this, options);
    return this;
  };
})(jQuery);