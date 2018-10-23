(function ($) {
    $.fn.sidebarMenu = function (options) {
        options = $.extend({}, $.fn.sidebarMenu.defaults, options || {});
        var target = $(this);
        target.addClass('nav');
        target.addClass('sidebar-menu');
        if (options.data) {
            init(target, options.data);
        }
        else {
            if (!options.url) return;
            $.getJSON(options.url, options.param, function (data) {
                init(target, data);
            });
        }
        var url = window.location.pathname;
        //menu = target.find("[href='" + url + "']");
        //menu.parent().addClass('active');
        //menu.parent().parentsUntil('.nav-list', 'li').addClass('active').addClass('open');
        function init(target, data) {
            $.each(data, function (i, item) {
                var li = $('<li></li>');
                var a = $('<a></a>');
                var icon = $('<span></span>');
                //icon.addClass('glyphicon');
                icon.addClass(item.icon);
                var text = $('<span></span>');
                text.addClass('sidebar-title').text(item.text);
                a.append(icon);
                a.append(text);
                if (item.menus&&item.menus.length>0) {
                    a.addClass('accordion-toggle');
                    a.attr('href', '#');
                    var arrow = $('<span></span>');
                    arrow.addClass('caret');
                    a.append(arrow);
                    li.append(a);
                    var menus = $('<ul></ul>');
                    menus.addClass('nav').addClass('sub-nav');
                    init(menus, item.menus);
                    li.append(menus);
                }
                else {
                    var href = 'javascript:addTabs({id:\'' + item.id + '\',title: \'' + item.text + '\',close: true,url: \'' + item.url + '\'});';
                    a.attr('href', href);
                    //if (item.istab)
                    //    a.attr('href', href);
                    //else {
                    //    a.attr('href', item.url);
                    //    a.attr('title', item.text);
                    //    a.attr('target', '_blank')
                    //}
                    li.append(a);
                }
                target.prepend(li);
            });
        };
   // 3. LEFT MENU LINKS TOGGLE
   $('.sidebar-menu li a.accordion-toggle').click(function(e) {
             // Any menu item with the accordion class is a dropdown submenu. Thus we prevent default actions
             e.preventDefault();
    
             // Any menu item with the accordion class is a dropdown submenu. Thus we prevent default actions
             if ($('body').hasClass('sb-l-m') && !$(this).parents('ul.sub-nav').length) {
                return;
             }
    
             // Any menu item with the accordion class is a dropdown submenu. Thus we prevent default actions
             if (!$(this).parents('ul.sub-nav').length) {
                $('a.accordion-toggle.menu-open').next('ul').slideUp('fast', 'swing', function() {
                   $(this).attr('style', '').prev().removeClass('menu-open');
                });
             }
             // Any menu item with the accordion class is a dropdown submenu. Thus we prevent default actions
             else {
                var activeMenu = $(this).next('ul.sub-nav');
                var siblingMenu = $(this).parent().siblings('li').children('a.accordion-toggle.menu-open').next('ul.sub-nav')
    
                activeMenu.slideUp('fast', 'swing', function() {
                   $(this).attr('style', '').prev().removeClass('menu-open');
                });
                siblingMenu.slideUp('fast', 'swing', function() {
                   $(this).attr('style', '').prev().removeClass('menu-open');
                });
             }
    
             // Now we expand targeted menu item, add the ".open-menu" class
             // and remove any left over inline jQuery animation styles
             if (!$(this).hasClass('menu-open')) {
                $(this).next('ul').slideToggle('fast', 'swing', function() {
                   $(this).attr('style', '').prev().toggleClass('menu-open');
                });
             }
    
          });


    }

    $.fn.sidebarMenu.defaults = {
        url: null,
        param: null,
        data: null
    };
})(jQuery);