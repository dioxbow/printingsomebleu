$(document).ready(function() {
	var messageDataRef = new Firebase('https://printingsomebleu.firebaseio.com');

	$('#messageInput').keypress(function(e) {
		if (e.keyCode == 13) {
			var name = $('#nameInput').val();
			var text = $('#messageInput').val();
			var date = new Date();
			messageDataRef.push({name: name, text: text, date: date});
			$('#messageInput').val('');
		}
	})

	$('#clearButton').click(function(e) {
		messageDataRef.remove();
		$('#messagesDiv').empty();
	})

	messageDataRef.on('child_added', function(snapshot) {
		var data = snapshot.val();
		$('<div/>').text(data.text).prepend($('<b/>').text(data.name+': ')).appendTo($('#messagesDiv'));
		$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
	});
	
})
