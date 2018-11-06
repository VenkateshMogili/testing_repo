;(function ($, window, document) {

  var effect = {
    slideDown: {
      height: "show",
      paddingTop: "show",
      marginTop: "show",
      paddingBottom: "show",
      marginBottom: "show"
    },
    slideUp: {
      height: "hide",
      paddingTop: "hide",
      marginTop: "hide",
      paddingBottom: "hide",
      marginBottom: "hide"
    }
  };

  Accordion = {

    init: function (el, options) {
      var that = this;

      // add css style to link
      $('[data-acc-link]').css({'cursor': 'pointer'});

      // hide content by default except content has class "acc-open"
      $('[data-acc-content]').not('.acc-open').css({'display': 'none'});

      // bind click event
      el.on('click', '[data-acc-link]', function (e) {
        e.preventDefault();
        that.options = options;
        var linkName = $(this).data('acc-link');
        var contentObj = $('[data-acc-content=' + linkName + ']');
        that.toggle(contentObj, el);
      });
    },

    open: function (contentObj) {
      contentObj.animate(effect.slideDown, this.options.duration).addClass('acc-open');
    },

    close: function (contentObj) {
      contentObj.animate(effect.slideUp, this.options.duration).removeClass('acc-open');
    },


    toggle: function (contentObj, el) {
      var that = this;
      if (!this.options.multiOpen) {
        var contentName = contentObj.data('acc-content');
        var contentObjs = $(el).find('[data-acc-content]:not([data-acc-content=' + contentName + '])');
        contentObjs.each(function (i, v) {
          that.close($(v));
        });
      }
      contentObj.hasClass('acc-open') ? this.close(contentObj) : this.open(contentObj);
    }

  };

  $.fn.accordion = function (options) {
    options = $.extend({
      multiOpen: true,
      duration: 200
    }, options);

    return this.each(function () {
      Accordion.init($(this), options);
    });
  }

})(jQuery, window, document);
