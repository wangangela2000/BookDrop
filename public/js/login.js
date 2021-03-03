function login() {

    const currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        // redirect to inventory
        console.log('already logged in')
        window.location = window.location.origin + '/inventory';
    } else {
        console.log('attempting to login')
        // show the signup or login page
        Parse.FacebookUtils.logIn("public_profile", {
            success: function(user) {
                if (!user.existed()) {
                    FB.api('/me?fields=id,name,email,permissions', function (response) {
                        user.set('username', response.name);

                        user.save(null, {
                            success: function(user) {
                                alert('User logged in and sign up through Facebook, with username: ' + user.get('username'));
    
                                window.location = window.location.origin + '/inventory';
                            },
                            error: function(user, error) {
                                alert('Failed to save user to database with error: ' + error.message);
                            }
                        });
                    });
                } else {
                    console.log("User logged in through Facebook!");
                    window.location = window.location.origin + '/inventory';
                }
            },
            error: function(user, error) {
                console.log("User cancelled the Facebook login or did not fully authorize.");
            }
        }).then((result) => {
            console.log('login result: ' + result);
            window.location = window.location.origin + '/inventory';
        });
    }


}