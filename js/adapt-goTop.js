define([
  'core/js/adapt'
], function(Adapt) {

  const GoTopView = Backbone.View.extend({

    tagName: 'div',
    className: 'goTop',

    events: {
      'click .goTop-button': 'goTop'
    },

    initialize: function() {
      this.listenTo(Adapt, 'remove', this.remove);
      const template = Handlebars.templates.goTop;
      $('#wrapper').append(this.$el.html(template()));
      this.startScrollListener();
    },

    startScrollListener: function() {
      if (!Adapt.course.get('_goTop')._scrollListener._isEnabled) return;
      const context = this;
      $(window).on('scroll.goTop', function() {
        context.checkIfBottom();
      });
    },

    stopScrollListener: function() {
      $(window).off('scroll.goTop');
    },

    checkIfBottom: _.throttle(function() {
      const viewportTop = $(window).scrollTop();
      if (viewportTop >= Adapt.course.get('_goTop')._scrollListener._offset) {
        $('.goTop').show();
      } else {
        $('.goTop').hide();
      }
    }, 100),

    goTop: function() {
    //   const $page = $('.' + Adapt.location._currentId);
    //   console.log($page)
      Adapt.scrollTo(Adapt.location._currentId, {
        duration: 400
      });
    }
  });

  Adapt.on('router:page router:menu', function() {
    $(window).off('scroll.goTop');
  });

  Adapt.on('pageView:ready', function() {
    const model = Adapt.course.get('_goTop');
    if (!model || !model._isEnabled) return;
    new GoTopView();
  });

  return GoTopView;
});
