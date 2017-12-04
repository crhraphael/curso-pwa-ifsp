document.onclick = function(e) {
	var element = e.target;

	if(element.nodeName == "A") {
		var attr = element.getAttribute("href");

		if(attr.indexOf("#") == 0) {
			console.log(attr);
		}
	}
};	


$(document).ready(function() {
	//habilitando a janela modal
	$('.modal').modal();
});


navigator.serviceWorker.register('sw.js');

$('body').on('submit', 'form', function(){
	//notification do materialize
	Materialize.toast('Toast!!', 4000);

	$('form')[0].reset();

	var now = new Date();
	var saida = new Date(now.getTime() + 1000 * 60 * 15);

	var title = 'Pagamento confirmado';
	var options = {
		icon: 'img/icon.png', 
		body: 'Saída liberada até ' + saida.getHours() + 'h' + ("0" + (saida.getMinutes() + 1)).slice(-2)
	};

	if ('Notification' in window) {
	Notification.requestPermission();

		if ('showNotification' in ServiceWorkerRegistration.prototype) {
		  console.log('Notification SW');
		  navigator.serviceWorker.ready.then(function(registration){
		    registration.showNotification(title, options);
		  });
		} else {
		  console.log('Notification classic');
		  new Notification(title, options);
		}
	}

	return false;
});