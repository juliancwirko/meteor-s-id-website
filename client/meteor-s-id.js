'use strict';

var goTopFunc = function () {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
};

Template.backBtn.onRendered(function () {
    var $backToTopButton = this.$('.js-back-to-top-btn');
    if ($backToTopButton.length) {
        $(window).on('scroll.backBtn', function () {
            if ($(this).scrollTop() > 700) {
                $backToTopButton.removeClass('hidden');
            } else {
                $backToTopButton.addClass('hidden');
            }
        });
        $backToTopButton.on('click.backBtn', goTopFunc);
    }
});

Template.backBtn.onDestroyed(function () {
    $(window).off('scroll.backBtn');
    this.$('.js-back-to-top-btn').off('click.backBtn');
});

Template.stickyHeder.onRendered(function () {
    var $stickyHeader = this.$('.js-sticky-header');
    if ($stickyHeader.length) {
        $(window).on('scroll.stickyHeader', function () {
            if ($(this).scrollTop() > 500) {
                $stickyHeader.addClass('active');
            } else {
                $stickyHeader.removeClass('active');
            }
        });
    }
});

Template.stickyHeder.onDestroyed(function () {
    $(window).off('scroll.stickyHeader');
});

Template.stickyHeder.events({
    'click .js-go-to-paragraph': function (e) {
        e.preventDefault();
        var goToId = $(e.target).attr('href');
        $('html, body').stop(true, false).animate({
            scrollTop: $(goToId).position().top - 45
        }, 'slow', 'linear');
    },
    'click .js-go-top': function (e) {
        e.preventDefault();
        goTopFunc();
    }
});

Template.main.events({
    'click .js-go-to-install': function (e) {
        e.preventDefault();
        $('html, body').stop(true, false).animate({
            scrollTop: $('.docs').position().top
        }, 'slow', 'linear');
    }
});

// get content from private/docs.md file
Template.docs.onCreated(function () {
    var self = this;
    self.mdDocsContent = new ReactiveVar('');
    Meteor.call('getMDcontent', function (err, result) {
        if (!err) {
            self.mdDocsContent.set(result);
        }
    });
});

Template.docs.helpers({
    mdDocs: function () {
        var tmpl = Template.instance();
        var content = tmpl && tmpl.mdDocsContent.get();
        var converter = new Showdown.converter();
        var formatedContent = converter.makeHtml(content);
        return formatedContent;
    }
});
