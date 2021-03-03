function login() {

    const currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        Parse.User.logOut();
        console.log('logged out')
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
    
                                // You should redirect the user to another page after a successful login.
                                window.location = 'https://a7-bookdrop.herokuapp.com/inventory';
                            },
                            error: function(user, error) {
                                alert('Failed to save user to database with error: ' + error.message);
                            }
                        });
                    });
                } else {
                    console.log("User logged in through Facebook!");
                    // You should redirect the user to another page after a successful login.
                    window.location = 'https://a7-bookdrop.herokuapp.com/inventory';
                }
            },
            error: function(user, error) {
                console.log("User cancelled the Facebook login or did not fully authorize.");
            }
        }).then((result) => {
            window.location = 'https://a7-bookdrop.herokuapp.com/inventory';
        });
    }


}