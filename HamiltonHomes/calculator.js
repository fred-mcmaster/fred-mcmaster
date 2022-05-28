$(document).ready(function()
{

    function reset(event)
    {   
        $("#mortgage").val("");
        $("#interestRate").val("");
        $("#loanLength").val("");
        $("#postalCode").val("");
        
        $("#mortgage").removeClass("is-valid");
        $("#interestRate").removeClass("is-valid");
        $("#loanLength").removeClass("is-valid");
        $("#postalCode").removeClass("is-valid");

        $("#mortgage").removeClass("is-invalid");
        $("#interestRate").removeClass("is-invalid");
        $("#loanLength").removeClass("is-invalid");
        $("#postalCode").removeClass("is-invalid");

        $("#notice").html("");
        $("#notice").removeClass("alert-danger");
        $("#notice").removeClass("alert-success");
        event.preventDefault();
    }

    

    function handleSubmit(event)
    {
        let mortgage = $("#mortgage").val();
        let interestRate = $("#interestRate").val();
        let loanLength = $("#loanLength").val();
        let postalCode = $("#postalCode").val();

        $("#notice").html("");
        
        let errors = [];
        let was_invalid = false;

        //check mortgaga input     
        if (!isNaN(mortgage) && parseFloat(mortgage) >= 0)
        {
            $("#mortgage").addClass("is-valid");
            $("#mortgage").removeClass("is-invalid");   
        }
        else 
        {
            errors.push("Mortgage Amount must be a positive number.");
            was_invalid = true;
            $("#mortgage").addClass("is-invalid");
            $("#mortgage").removeClass("is-valid");
        }
        //check interest rate input
        if (!isNaN(interestRate) && parseFloat(interestRate) >= 0)
        {
            $("#interestRate").addClass("is-valid");
            $("#interestRate").removeClass("is-invalid");
        }
        else 
        {
            errors.push("Interest Rate must be a positive number.");
            was_invalid = true;
            $("#interestRate").addClass("is-invalid");
            $("#interestRate").removeClass("is-valid");
        }
        //check loan length input
        if (Number.isInteger(Number(loanLength)) && Number(loanLength) >= 5 && Number(loanLength) <= 30)
        {
            $("#loanLength").addClass("is-valid");
            $("#loanLength").removeClass("is-invalid");   
        }
        else 
        {
            errors.push("Loan Length must be between 5-30 years.");
            was_invalid = true;
            $("#loanLength").addClass("is-invalid");
            $("#loanLength").removeClass("is-valid");
        }
        //check postal code input
        if (postalCode.length == 7 && postalCode.charAt(0).toUpperCase() == "L")
        {
            $("#postalCode").addClass("is-valid");
            $("#postalCode").removeClass("is-invalid");  
        }
        else 
        {
            errors.push("Must be located in Hamilton.");
            was_invalid = true;
            $("#postalCode").addClass("is-invalid");
            $("#postalCode").removeClass("is-valid");
        }
        //Input value invalid alert
        if (was_invalid)
        {
          let error_list = "<ul>";

          for (let i = 0; i < errors.length; i++)
            error_list += "<li>" + errors[i] + "</li>";

          error_list += "</ul>";

          $("#notice").html(error_list);
          $("#notice").addClass("alert-danger");
          $("#notice").removeClass("alert-succes");
        }
        //mortgage payment alert
        else 
        {   
          let payment = 0;
          let monthrate = parseFloat(interestRate)/100/12;
          let period = parseInt(loanLength)*12;
          payment =  parseInt(mortgage) * (Math.pow(1 + monthrate,period) * monthrate /((Math.pow(1 + monthrate, period) - 1)))
          $("#notice").html("<P>The estimated monthly mortgage payment is " + parseFloat(payment).toFixed(2) + "$.</p>");
          $("#notice").addClass("alert-success");
          $("#notice").removeClass("alert-danger");
        }
        event.preventDefault();
    }
    $("#reset").click(reset);
    $("#calculator").submit(handleSubmit);

});
