$(document).ready(function() {
    $('.modal').modal(); //habilitando a janela modal
});
$('.code-scan').on('click', function() { //quando clicar no elemento com a classe "code-scan"
    Quagga.init({ //configuração inicial mínima do Quagga
        inputStream : {
            name : "Live",
            type : "LiveStream",
            constraints: {
                width: $(window).width(),
                height: 255
            }
        },
        decoder : {
            readers : ["code_128_reader"]
        },
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function(result) { //quando o Quagga conseguir detectar um codigo de barras
        var code = result.codeResult.code; //pega o código
        console.log('Achei código de barras', code); //apenas printa no console
        Quagga.stop(); //para a biblioteca
        $('#scan').modal('close'); //fecha o modal
        $('#codigo_ticket').focus().val(code); //coloca o valor do código no campo
    });
});

/* notification */
// precisa registrar o service worker
navigator.serviceWorker.register('sw.js');

$('body').on('submit', 'form', function(){
    //notification do materialize
    Materialize.toast('Toast!!', 4000);

    var title = 'Pagamento confirmado';
    var options = {
        icon: 'img/icon.png', 
        body: 'Saída liberada'
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