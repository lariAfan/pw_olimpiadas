$(document).ready(function(){
 
  //Slider
  if ($("#featured").length > 0){
    $("#featured").tabs({fx:{opacity: "toggle"}}).tabs("rotate", 5000, true);
  }

  //Newsletter
  if ($("#newsletter-form").length > 0) {
  
    jQuery.validator.addMethod("valid_data", function(value, element) { 
      return isDate(value); 
    });
    
    $("#txtData").mask("99/99/9999");

    $('#newsletter-form').validate({
      onsubmit: true,
      onfocusout: false,
      onkeyup: false,
      onclick: false,      
      errorLabelContainer: "#error",
 
      submitHandler: function(form) {
        $("#error").hide();
        $("#success").show();
        $(".required-fields").hide();
        $("#newsletter-form").hide();
      },
      
      rules: {
          campoNome: {
            required: true,
          },
          campoData: {
            required: true,
            valid_data : true,
          },
          campoEmail: {
            required: true,
            email: true,
          },          
      },
      
      messages: {
        campoNome: {
          required: "O campo Nome é obrigatório.",
        },
        campoData: {
          required: "O campo Data de Nascimento é obrigatório.",
          valid_data: "A Data de Nascimento informada não é válida.",
        },
        campoEmail: {
          required: "O campo E-mail é obrigatório.",
          email: "O E-mail informado não é válido.",
        },
      },
    });    
  }
  
  //Gallery
  if ($("div.gallery").length > 0) {
    $("#fotos a").lightBox();
  }
  
  //Search Result
  if ($("div.resultado-busca").length > 0) {  
    $("span.word").html(decodeURIComponent(querystring('q')));
  }

  //Search - coloca querystring na url
  $("div#search a").click(function(){
    if (!($("div#search input").val().trim())) {
      alert("Digite uma palavra para buscar!");
      return false;
    }
    else {
      $("div#search a").attr("href", "busca.html?q=" + encodeURIComponent($("div#search input").val()));      
    }
  });
  
  //Search - bloqueia o enter no input
  $('div#search input').keypress(function(event){ 
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      return false;
    }
    event.stopPropagation();  
  });
  
});

function isDate(txtDate)
{
  var currVal = txtDate;
  if(currVal == '')
    return false;
  
  //Declare Regex  
  var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; 
  var dtArray = currVal.match(rxDatePattern); // is format OK?

  if (dtArray == null)
     return false;
 
  //Checks for dd/mm/yyyy format.
  dtMonth = dtArray[3];
  dtDay= dtArray[1];
  dtYear = dtArray[5];

  if (dtMonth < 1 || dtMonth > 12)
      return false;
  else if (dtDay < 1 || dtDay> 31)
      return false;
  else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
      return false;
  else if (dtMonth == 2)
  {
     var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
     if (dtDay> 29 || (dtDay ==29 && !isleap))
          return false;
  }
  return true;
}

function querystring(key) {
  var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
  var r=[], m;
  while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
  return r;
}