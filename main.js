$(document).ready(function() {
	var chatDataRef = new Firebase('https://printingsomebleu.firebaseio.com/chat');
	var userDataRef = new Firebase('https://printingsomebleu.firebaseio.com/users');
	var loginDataRef = new Firebase('https://printingsomebleu.firebaseio.com/login');

	var username;

	userDataRef.on('value', function(snapshot) {
		if (snapshot.val()) {
			username = snapshot.val()['username'];
		}
	});

	$('#messageInput').keypress(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			if (username) {
				var name = username;				
			} else {
				name = 'guest'+Math.floor(Math.random() * 10000 + 1);
			}
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
		userDataRef.remove();
		window.location = 'login.html';
	});
	
})
