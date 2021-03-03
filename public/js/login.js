function login() {

    const currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        Parse.User.logOut();
    } else {
        // show the signup or login page
        Parse.FacebookUtils.logIn("public_profile,email", {
            success: function(user) {
                if (!user.existed()) {
                    FB.api('/me?fields=id,name,email,permissions', function (response) {
                        user.set('username', response.name);
                        user.set('email', response.email);
    
                        user.save(null, {
                            success: function(user) {
                                alert('User logged in and sign up through Facebook, with username: ' + user.get('username') + ' and email: ' + user.get('email'));
    
                                // You should redirect the user to another page after a successful login.
                                Parse.User.current.logOut();
                                window.location.replace('https://a7-bookdrop.herokuapp.com/inventory');
                            },
                            error: function(user, error) {
                                alert('Failed to save user to database with error: ' + error.message);
                            }
                        });
                    });
                } else {
                    alert("User logged in through Facebook!");
                    // You should redirect the user to another page after a successful login.
                    Parse.User.logOut();
                    window.location.replace('https://a7-bookdrop.herokuapp.com/');
                }
            },
            error: function(user, error) {
                console.log("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }


}