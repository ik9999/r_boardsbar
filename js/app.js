(function() {
  var $dc;
  var $dc = $(document);

  var init = function() {
    var oldView = App.FooterView;
    var newView = oldView.extend({
      template: function(opts) {
        var $ul = $('<ul></ul>', {class: 'nav nav-pills navbar-left r_boardsbar-bar'});
        _.each(App.boards.models, function(board) {
          var starred = board.boards_stars.findWhere({
            board_id: parseInt(board.id),
            user_id: parseInt(authuser.user.id),
            is_starred: 1
          });
          if (!_.isUndefined(starred) && !_.isEmpty(starred) && (parseInt(board.attributes.is_closed) === 0)) {
            var $li = $('<li></li>', {class: 'hidden-xs'}).appendTo($ul);
            var $a = $('<a></a>', {
              title: board.attributes.name,
              href: '#/board/' + board.attributes.id,
              class: 'btn btn-default r_boardsbar-link'
            }).appendTo($li);
            $('<span>' + board.attributes.name + '</span>').appendTo($a);
          }
        });
        var template = JST['templates/footer'](opts);
        var $template = $('<div>' + template + '</div>');
        $template.find('.action-block > .navbar > .nav:first-of-type').after($ul);
        return $template.html();
      }
    });
    App.FooterView = newView;
  };

  $dc.ready(function() {
    init();
  });
})();
