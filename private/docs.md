## Simple Accounts system for Meteor

This is a simple and custom Accounts system with config file. It is not dependant on routing, but there are examples how to configure your routes with Iron Router and Flow Router. You can configure your alerts/messages, validators and callback functions.

### Some links

- [Meteor Accounts based on sId package - blog post](http://julian.io/meteor-accounts-based-on-sid-package/)
- [Demo app](http://s-id-demo.meteorapp.com/)

### Usage example in Scotty boilerplate

- [config file](https://github.com/juliancwirko/scotty/blob/master/common/settings/users-accounts-config.js)
- [routes](https://github.com/juliancwirko/scotty/blob/master/common/router/routes.js)
- [login theme included in secret page - example](https://github.com/juliancwirko/scotty/blob/master/client/views/secret-page/secret-page.html)
- [Scotty boilerplate](https://github.com/juliancwirko/scotty)

### Usage

Just add the package:

```
meteor add juliancwirko:s-id
```

### Full Config
All is optional and here you can overwrite defaults.
Place it somewhere where it will be accessible by Server and Client

```javascript
Meteor.startup(function () {
    sId.config({
        registerForm: {
            mainClass: 's-id-register-form', // css class for main container - you can change it and style it like you want in your app
            title: 'Register', // form title
            leadText: 'Hi, join us!', // form description text
            submitBtnLabel: 'Register' // button label text
        },
        loginForm: {
            mainClass: 's-id-login-form',
            title: 'Login',
            leadText: 'Beam me up, Scotty!',
            submitBtnLabel: 'Login'
        },
        forgotPassForm: {
            mainClass: 's-id-forgot-password-form',
            title: 'Forgot Password',
            leadText: 'Please fill in email address!',
            submitBtnLabel: 'Send New!'
        },
        resetPassForm: {
            mainClass: 's-id-reset-password-form',
            title: 'Reset Password',
            leadText: 'Please fill in new password!',
            submitBtnLabel: 'Set New!'
        },
        socialButtons: { // disable/enable social login/register buttons
            'github': true,
            'google': true,
            'twitter': true,
            'facebook': true,
            'labels': { // labels for social buttons
                'github': 'GitHub Access',
                'google': 'Google Access',
                'twitter': 'Twitter Access',
                'facebook': 'Facebook Access'
            }
        },
        // turn on e-mail verification.. without it user is still able to login, you can block it in the app by
        // checking e-mail verified field
        emailVerification: true,
        // change it to 'true' if you need only e-mail field on register form (default there is username and e-mail)
        registerEmailFieldOnly: false,
        // you can turn on and off autologin after user creation - in default turned on
        autoLoginAfterRegistration: true,
        // you can pass empty messages object to turn it off
        messages: {
            verifyEmail: 'Verify your e-mail address',
            verifiedEmail: 'Your email address was verified. Thanks!',
            somethingWrong: 'Something went wrong! Here is the error message: ',
            fillAllFields: 'Fill in all fields!',
            loginNow: 'You can login now.',
            sending: 'Sending...',
            validEmail: 'E-mail should be a valid e-mail address!',
            validPassword: 'Password should be at least one number, one lowercase and one uppercase letter and at least six characters!',
            validUsername: 'Username should be at least 3 characters long and max 12 characters!',
            // placeholders
            loginNamePlaceholderEmailOnly: 'E-mail',
            loginNamePlaceholder: 'Username or E-mail',
            usernamePlaceholder: 'Username',
            passwordPlaceholder: 'Password',
            emailPlaceholder: 'E-mail',
            newPasswordPlaceholder: 'New password'
        },
        // should return true or false - you can overwrite these functions in your app sId config...
        // also remember to adjust your error messages (config above)
        validateUsername: function (username) {
            var min = 3;
            var max = 12;
            if (username && username.length >= min && username.length <= max) {
                return true;
            }
            return false;
        },
        validatePassword: function (password) {
            var r = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
            if (password && r.test(password)) {
                return true;
            }
            return false;
        },
        validateEmail: function (email) {
            var r = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (r.test(email)) {
                return true;
            }
            return false;
        },
        onLogged: function () {
            // callback after successful login
            // it could be for example Router.go('/') or FlowRouter.go('/dashboard') or any other
        },
        onRegistered: function () {
            // callback after successful registration
        },
        onForgotPassword: function () {
            // callback after successful on forgot password action
        },
        onResetPassword: function () {
            // callback after successful password reset
        },
        getPasswordResetToken: function () {
            // here you should return reset password tokent from your route param
            // you should have configured route: '/reset-password/:resetToken',
            // then with Iron Router you can do something like:
            //
            // With Iron Router
            // return Router.current().params.resetToken; or with Flow Router
            // or with Flow Router
            // return FlowRouter.getParam('resetToken');
        }
    });
});
```

You can configure/overwrite here validator functions and messages strings. If you want to remove username, password or e-mail validation just 'return true' in a particular validator function.

You can configure your routes for each view if you want. You can use Iron Router or Flow Router it is up to you because here you will get only templates and couple of config functions which will alow you to configure your login, register callbacks. Below you will find some examples for Iron Router and Flow Router.
Templates to use are:

- **sIdLoginView**
- **sIdRegisterView**
- **sIdForgotPasswordView**
- **sIdResetPasswordView**

### Example routes which you can use in your app (Iron Router example)
Routes names are important here.

```javascript
Router.map(function() {
    this.route('sIdLoginView', {
        path: '/login',
    });
    this.route('sIdRegisterView', {
        path: '/register'
    });
    this.route('sIdForgotPasswordView', {
        path: '/forgot-password'
    });
    this.route('sIdResetPasswordView', {
        path: '/reset-password/:resetToken'
    });
});
```

### Example routes which you can use in your app (Flow Router and Blaze Layout example)

```javascript
FlowRouter.route('/login', {
    name: 'sIdLoginView',
    action: function () {
        BlazeLayout.render('layout', {main: 'sIdLoginView'});
    }
});
FlowRouter.route('/register', {
    name: 'sIdRegisterView',
    action: function () {
        BlazeLayout.render('layout', {main: 'sIdRegisterView'});
    }
});
FlowRouter.route('/forgot-password', {
    name: 'sIdForgotPasswordView',
    action: function () {
        BlazeLayout.render('layout', {main: 'sIdForgotPasswordView'});
    }
});
FlowRouter.route('/reset-password', {
    name: 'sIdResetPasswordView',
    action: function () {
        BlazeLayout.render('layout', {main: 'sIdResetPasswordView'});
    }
});
```

Basicaly you just use ready to go templates from the package and some callbacks which you can configure.

You can then use (somewhere in your templates):

```html
{{#if currentUser}}
    <a href="#" class="js-logout">Logout</a></li>
{{else}}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
{{/if}}
```

Logout event by Meteor.logout(function () { console.log('logged out!') }) - see docs.meteor.com

### Log the user in using an external service

You can log/sign in using an external service. For now it is GitHub, Google, Twitter

If you want to use social buttons (enabled by default) You have to setup your settings.json file : [Meteor Docs](https://docs.meteor.com/#/full/meteor_settings)

Example (settings.json in your app root folder):

```
{
    "private": {
        "github": {
            "clientId": "{your github API client id here}",
            "secret": "{your google API secret key here}"
        },
        "google": {
            "clientId": "{your google API client id here}",
            "secret": "{your google API secret key here}"
        },
        "twitter": {
            "consumerKey": "{your twitter API customer key here}",
            "secret": "{your twitter API secret key here}"
        },
        "facebook": {
            "appId": "{your facebook API app id here}",
            "secret": "{your facebook API secret key here}"
        }
    }
}
```

You can generate your API keys on these sites:

- [Google API](https://console.developers.google.com)
- [Twitter API](https://apps.twitter.com/)
- [GitHub API](https://github.com/settings/applications/)
- [Facebook API](https://developers.facebook.com/apps)

Then you should run your app with:
`meteor --settings settings.json`

You will find more in Meteor Docs.

**Be carefull with Twitter - the email of logged in user isn't avaible**

If you want to transform data in your user collection you can use `Accounts.onCreateUser`

Example:

```javascript
Accounts.onCreateUser(function (options, user) {
    if (user.services.github) {

        user.username = user.services.github.username;
        user.emails = [];
        user.emails.push({
            address: user.services.github.email,
            verified: true
        });

        return user;
    }

    if (user.services.google) {

        user.username = user.services.google.email;
        user.emails = [];
        user.emails.push({
            address: user.services.google.email,
            verified: true
        });

        return user;
    }

    if (user.services.facebook) {

        user.username = user.services.facebook.email;
        user.emails = [];
        user.emails.push({
            address: user.services.facebook.email,
            verified: true
        });

        return user;
    }

    if (user.services.twitter) {

        user.username = user.services.twitter.screenName;
        return user;

    }

    return user;
});
```

### Styling

There will be more customization in the future. For now you can use 'mainClass' (sId config above) as a namespace for DOM elements which has its own ids and classes. As you can see if you provide your own css class in the config you will get simple unstyled template.

You can take the package style.css file as a reference.

It is also integrated with [s-alert](http://s-alert.meteorapp.com) notifications

If you want you can play with excelent package for overwriting templates: [aldeed:template-extension](https://atmospherejs.com/aldeed/template-extension)

### Sending Emails

You can configure Mailgun with Meteor.

Example:

```javascript
Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster@{your-data}.mailgun.org:{your-data}@smtp.mailgun.org:587';
});
```

### Apps using it:

- [SimpleChat.Support - Open Source Live Chat](https://www.simplechat.support)
- [ReleCheck - Track your favourite app's updates](http://www.relecheck.com)

### Changelog

- v3.2.1 - login username e-mail type [#5](https://github.com/juliancwirko/meteor-s-id/issues/5)
- v3.2.0 - changed styles
- v3.1.2 - v3.1.3 - new option `autoLoginAfterRegistration` [#4](https://github.com/juliancwirko/meteor-s-id/issues/4)
- v3.1.0 registerEmailFieldOnly option see: [#3](https://github.com/juliancwirko/meteor-s-id/issues/3)
- v3.0.2 versions bump
- v3.0.1 versions bump
- v3.0.0 added email verification option, added messages config, added validators config, docs changes
- v2.0.0 added Facebook service (thanks to [@yankeyhotel](https://github.com/yankeyhotel)), settings.json structure changed (see example above)
- v1.0.2 fix forgot password link usage
- v1.0.1 fix onLogged() callback with external services like Google etc.
- v1.0.0 is not depended on Iron Router anymore. You should use templates and make your own routes (example above). You can use onLogged, onRegistered, onForgotPassword, onResetPassword callbacks in config to make (for example) redirections.

### License

MIT

### Download and use this website for your documentation

```
$ git clone https://github.com/juliancwirko/meteor-s-id-website.git
$ cd meteor-s-id-website
$ rm -rf .git
$ meteor
```
[https://github.com/juliancwirko/meteor-s-id-website](https://github.com/juliancwirko/meteor-s-id-website)

### Check out other tools for Meteor:

* [SimpleChat.Support - Open Source Live Chat App built with Meteor](https://www.simplechat.support)
* [Prettify and export your raw git diff output](https://atmospherejs.com/juliancwirko/pretty-diff)
* [Foundation 5 with Scss for Meteor](https://atmospherejs.com/juliancwirko/zf5)
* [Stylus, Flexbox grid system](https://atmospherejs.com/juliancwirko/s-grid)
* [Stylus with Jeet, Autoprefixer, Rupture and Nib for Meteor](https://atmospherejs.com/juliancwirko/s-jeet)
* [Notifications for Meteor](http://s-alert.meteorapp.com)
* [Scotty - Meteor boilerplate](https://github.com/juliancwirko/scotty)
* [Meteor CylonJS wrapper for Arduino board](https://atmospherejs.com/juliancwirko/caprica)

### Also check out standalone front-end tools:

* [S-Grid (Stylus, Flexbox grid) GruntJS project scaffold](https://github.com/juliancwirko/s-grid-grunt)
* [Yeoman generator for Zurb Foundation 5](https://github.com/juliancwirko/generator-zf5)
* [Free, very simple and clean starter theme for your Ghost blog](https://github.com/juliancwirko/abc)
* [HTML only and GruntJS based project scaffold](https://github.com/juliancwirko/html-project)
* [React boilerplate with s-Grid and Webpack](https://github.com/juliancwirko/react-boilerplate)