$(document).ready(function() {
	var chatDataRef = new Firebase('https://printingsomebleu.firebaseio.com/chat');
	var loginDataRef = new Firebase('https://printingsomebleu.firebaseio.com/login');

	var username;

	try{
		var uid = loginDataRef.getAuth().uid;		
	} catch(error) {
		console.log('Error loading user, defaulting to guest');
	}

	if (uid) {
		var userDataRef = new Firebase('https://printingsomebleu.firebaseio.com/users/'+uid);

		userDataRef.once('value', function(snapshot) {
			var data = snapshot.val();
			username = data[Object.keys(data)[0]];
		});

	} else {
		username = 'guest'+Math.floor(Math.random() * 10000 + 1);
	}

	$('#messageInput').keypress(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			var name = username;
			var text = $('#messageInput').val();
			var date = new Date();
			chatDataRef.push({name: name, text: text, date: date});
			$('#messageInput').val('');
		}
	})

	$('#clearButton').click(function(e) {
		chatDataRef.remove();
	})

	chatDataRef.on('child_added', function(snapshot) {
		var data = snapshot.val();
		$('<div class="msg"/>').text(data.text).prepend($('<b/>').text(data.name+': ')).appendTo($('#messagesDiv'));
		$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
	});

	chatDataRef.on('child_removed', function(snapshot) {
		$('#messagesDiv').empty();
	})

	$('#logout_button').click(function() {
		loginDataRef.unauth();
		try {
			userDataRef.remove();
		} catch (error) {
			console.log('No user to exit, assuming guest');
		}
		window.location = 'login.html';
	});
	
})
