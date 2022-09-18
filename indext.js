"use strict";
/*--------------------------------main()----------------------------------*/
$(document).ready(function(){
    console.log("Page loading ...");
    
    addEventListenerToAll();
})


/*--------------------------------main()----------------------------------*/
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gValidForm = true;
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
function addEventListenerToAll(){
    reponsiveFormInput($("#form-residenceDeclaration"));
    $("#btn-send").on("click", function(){
        onBtnSendClick();
    });
   
}
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onBtnSendClick(){
    console.log("Button send click.");
    if(isValidForm($("#form-residenceDeclaration"))){
        // var vObj = {
        //     fullname: $("#inp-fullname").val().trim(),
        // }
        console.log($(this).serializeArray());
        sendingFormData();
    }
}
function reponsiveFormInput(paramForm){
    paramForm.find("input,select").each(function(){
        //Form reponsive when input
       $(this)
           .keyup( function (){
               formValidateProcess(this);
               
           })
           .change( function (){
               //Standalize input value
               $(this).val(
                   $(this)
                   .val().replace(/^\s+|\s+$/g,"")
               );
               formStandilizer(this);
               formValidateProcess(this);
           })

   })
}
function formStandilizer(paramEvent){
    if($(paramEvent).attr("allLetterUpcaseStandilizer") == "true"){
        $(paramEvent).val(fullNameStandalize($(paramEvent).val()));
    } else if($(paramEvent).attr("localUpperCase") == "true"){
        $(paramEvent).val(localUpperCaseStandilizer($(paramEvent).val()));
    }
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function formValidateProcess(paramThis){
    const vERROR_CLASS = "is-invalid";
    const vSUCCESS_CLASS = "is-valid";
    var vErrorMsg = "";
    var vIsValid = true;
    
    //Start validating
    var bErrorEle = $(paramThis).parents().find("label[for='"+$(paramThis).attr('id')+"']");
    if(($(paramThis).val() == "")){
        if($(paramThis).attr("requiredCheck") == "true"){
            vIsValid = false;
            vErrorMsg = "Trường này còn thiếu!";
        } 
    } else if($(paramThis).attr("type")=="timeDuration"){
        var bTestObj =isValidInputTimeDuration($(paramThis).val());
        if(!bTestObj.testResult){
            vIsValid = false;
            vErrorMsg = bTestObj.errorDiscription;
        }
                   
    } else if($(paramThis).attr("type") == "url"){
        var bTestObj =isUrl($(paramThis).val());
        if(!bTestObj.testResult){
            vIsValid = false;
            vErrorMsg = bTestObj.errorDiscription;
        }
    } else if($(paramThis).attr("emailType") == "true"){
        var bTestObj =isEmail($(paramThis).val());
        if(!bTestObj.testResult){
            vIsValid = false;
            vErrorMsg = bTestObj.errorDiscription;
        }
    } else if($(paramThis).attr("phonumberType") == "true"){
        var bTestObj =isVNPhonenumber($(paramThis).val());
        if(!bTestObj.testResult){
            vIsValid = false;
            vErrorMsg = bTestObj.errorDiscription;
        }
    } else if($(paramThis).attr("isCitizenId") == "true"){
        var bTestObj = isCitizenId($(paramThis).val());
        if(!bTestObj.testResult){
            vIsValid = false;
            vErrorMsg = bTestObj.errorDiscription;
        }
    } else if($(paramThis).attr("isBirthyear") == "true"){
        var bTestObj = isBirthYear($(paramThis).val());
        if(!bTestObj.testResult){
            vIsValid = false;
            vErrorMsg = bTestObj.errorDiscription;
        }
    } 
              
    if(!vIsValid){
        bErrorEle.html(vErrorMsg)
                        .addClass(vERROR_CLASS)
                        .removeClass(vSUCCESS_CLASS);
                        $(paramThis)
                        .addClass(vERROR_CLASS)
                        .removeClass(vSUCCESS_CLASS);
                        gValidForm= false;
                        //debugger;
    }
    else{
        bErrorEle.html("Hợp lệ!")
            .addClass(vSUCCESS_CLASS)
            .removeClass(vERROR_CLASS);
        $(paramThis)
            .addClass(vSUCCESS_CLASS)
            .removeClass(vERROR_CLASS);
       
    }
    //reset form valid and invalid class
    
   
}
function isValidForm(paramForm){
    gValidForm = true;
    
   
    paramForm.find("input,select").each(function(){
        $(this).val(
            $(this)
            .val().replace(/^\s+|\s+$/g,"")
        );
        formValidateProcess(this);
    })
    

    console.log(gValidForm);
    return gValidForm;
}
function isUrl(paramStrn){
    console.log("Currently testing reg strn url: \'"+ paramStrn + "\'");
    const vREG_STRING_TEST = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    console.log("String time duration test result: " + vREG_STRING_TEST.test(paramStrn));
    var vReturnObj = {
        testResult: null,
        errorDiscription: "",
    }
    vReturnObj.testResult = vREG_STRING_TEST.test(paramStrn);
    vReturnObj.errorDiscription = "Invalid url, for instance ABC.com is correct";
    return vReturnObj;
}
function isBirthYear(paramStrn){
    console.log("Currently testing reg strn url: \'"+ paramStrn + "\'");
    const vREG_STRING_TEST = /(^(19\d{2}|20(([01]\d)|2[012]))$)/;
    console.log("String time duration test result: " + vREG_STRING_TEST.test(paramStrn));
    var vReturnObj = {
        testResult: null,
        errorDiscription: "",
    }
    vReturnObj.testResult = vREG_STRING_TEST.test(paramStrn);
    vReturnObj.errorDiscription = "Năm sinh chưa hợp lệ.";
    return vReturnObj;
}
function isCitizenId(paramStrn){
    console.log("Currently testing reg strn url: \'"+ paramStrn + "\'");
    
    
    var vReturnObj = {
        testResult: true,
        errorDiscription: "",
    }
    if(String(paramStrn).length != 9 && String(paramStrn).length !=12){
        vReturnObj.testResult = false;
        vReturnObj.errorDiscription = "... số CCCD/CMND chưa hợp lệ! ";
    } 
   
    return vReturnObj;
}
function isEmail(paramStrn){
    console.log("Currently testing reg strn email: \'"+ paramStrn + "\'");
    const vREG_STRING_TEST = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    console.log("String time duration test result: " + vREG_STRING_TEST.test(paramStrn));
    var vReturnObj = {
        testResult: null,
        errorDiscription: "",
    }
    vReturnObj.testResult = vREG_STRING_TEST.test(paramStrn);
    vReturnObj.errorDiscription = "Invalid email, for instance ABC@gmail.com is correct";
    return vReturnObj;
}
function isVNPhonenumber(paramStrn){
    console.log("Currently testing reg strn phonenumber: \'"+ paramStrn + "\'");
    const vREG_STRING_TEST = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    console.log("String time duration test result: " + vREG_STRING_TEST.test(paramStrn));
    var vReturnObj = {
        testResult: null,
        errorDiscription: "",
    }
    vReturnObj.testResult = vREG_STRING_TEST.test(paramStrn);
    vReturnObj.errorDiscription = "Invalid phonenumber, for instance 0388888888 is correct";
    return vReturnObj;
}
function  copyToClipboard(value) {
    navigator.clipboard.writeText(value)
}
function sendingFormData(){
    console.log("Sending form data.");
    const vSERVER_URL = "https://www.apispreadsheets.com/table/XhEZo59rAwqqzA6H/";
    // console.log(paramObj);
    //data:$("#form-residenceDeclaration").serializeArray(),
    SubForm();
}
function SubForm (){
    $.ajax({
        url:"https://api.apispreadsheets.com/data/XhEZo59rAwqqzA6H/",
        type:"post",
        data:$("#form-residenceDeclaration").serializeArray(),
        success: function(res){
            alert("Đã gửi thành công. Xin cảm ơn!");
            
            console.log(res);
            location.reload();
        },
        error: function(){
            alert("There was an error :(")
        }
    });
}
function fullNameStandalize(paramStr){
    console.log("Standalizing fullname: " + "\'" + paramStr + "\'");
    paramStr = paramStr.trim();
    paramStr =  paramStr.replace(/\s+/g," ");
    paramStr = String(paramStr).toUpperCase();
    console.log(paramStr);
    return paramStr;
}
function localUpperCaseStandilizer(paramStr){
    console.log("Standalizing local upper case string: " + "\'" + paramStr + "\'");
    paramStr = String(paramStr).toLowerCase();
    paramStr = paramStr.trim();
    paramStr =  paramStr.replace(/\s+/g," ");
    paramStr = paramStr.replace(/((\s+[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýa-z])|(^[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýa-z]))/g, function(e){
        console.log(e);
        return String(e).toLocaleUpperCase();
    });
    //paramStr = paramStr.replace(/((\s+[a-z])|(^[a-z]))/g,this.toUpperCase());
    console.log(paramStr);
    return paramStr;
}
