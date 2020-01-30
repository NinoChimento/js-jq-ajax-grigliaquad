$(document).ready(function () {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  var context = { };
  var html = template(context);
  for (var i = 0; i < 36; i++) {
    $(".container").append(html)
  }
  for (var i = 0; i < 36; i++) {
    $(".container2").append(html)
  }
  $(document).on("click",".container div",function () {
    var div = $(this);
    $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/random/int",
      method: "GET",
      success: function (data, stato) {
         if (div.text().length != 0) {
           alert("hai gia cliaccato su questo div")
         }
         else if (parseInt(data.response)<= 5) {
           div.addClass("yellow");
           div.text("")
           div.append(data.response);
         }
         else {
            div.addClass("green")
            div.text("")
            div.append(data.response);
         }
      },
      error: function (richiesta, stato, errori) {
         alert("E' avvenuto un errore. " + errori);
      }
    });
  })
  $(document).on("click",".container2 div",function () {
    var div = $(this);
    var parolaUtente = prompt("inserisci una parola");
    console.log(parolaUtente.length);
    while (parolaUtente.length == 0) {
      parolaUtente = prompt("inserisci una parola");
    }
    $.ajax({
      url : "https://flynn.boolean.careers/exercises/api/random/word",
      method: "GET",
      success: function(data) {
        if (data.response.length > parolaUtente.length) {
          div.append(data.response)
        }
        else if (data.response.length < parolaUtente.length) {
          div.append(parolaUtente);
        }
        else {
          alert("le parole sono simili");
          div.append(data.response +" "+parolaUtente )
        }
      },
      error :function (errore) {
        alert("si e verificato il segunte errore" + errore)
      }
    });
  })
});
