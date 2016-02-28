$(document).ready(function() {
	$('#loginForm').submit(function(handler) {
		handler.preventDefault();
		var loginDataRef = new Firebase('https://printingsomebleu.firebaseio.com/login');
		loginDataRef.authAnonymously(function(error, authData) {
			if (error) {
				console.log("Login Failed", error);
			} else {
				console.log("Authenticated successfully with payload", authData);
			}

			username = $('#username_box').val();
			var userDataRef = new Firebase('https://printingsomebleu.firebaseio.com/users');
			userDataRef.update({username: username, uid: loginDataRef.getAuth().uid});

			window.location = 'index.html';
		});
	})

	$('#login_as_guest').click(function() {
		window.location = 'index.html';
	})
});

