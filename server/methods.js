'use strict';

Meteor.methods({
    getMDcontent: function () {
        return Assets.getText('docs.md');
    }
});
