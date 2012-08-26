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
          required: "O campo Nome � obrigat�rio.",
        },
        campoData: {
          required: "O campo Data de Nascimento � obrigat�rio.",
          valid_data: "A Data de Nascimento informada n�o � v�lida.",
        },
        campoEmail: {
          required: "O campo E-mail � obrigat�rio.",
          email: "O E-mail informado n�o � v�lido.",
        },
      },
    });    
  }

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