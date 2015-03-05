/**
* The purpose of this function is to perform the Global AJAX management. Different options are 
* provided as below :
*	- requestUrl    ==> URL to fire
*	- requestMethod ==> "GET" or "POST"
*	- postData      ==> Any data to post to server, can be json or string
*	- myDataType    ==> Return type from the server, normally html
*	- formId        ==> If formId is given, the form parameters will be serialized and sent to server  
*	- succesDivId   ==> Div to update in case of success, no  further action is needed
*	- failureDivId  ==> Div to update in case of errors, no  further action is needed
*	- callbackFn    ==> Perform custom ajax response handling - define your own callback functions
*	- argumentsArray ==> Array of arguments to your callback function
*	- funcDivId      ==> Function for which parent div ID and error image needs to be displayed
*	- myContentType    ==> Stating what the content type is (ex 'application/json;')
*/
function performAJAX(requestUrl, requestMethod, postData, executeBeforeSend, executeOnComplete, myDataType, formId, succesDivId, failureDivId, warningDivId, callbackFn, onFailure, argumentsArray, funcDivId, myContentType){
	// for example
	// ("/ISDWeb/targetservicetool/clientSummary.htm", "GET","clientDetails", "clientErrorDiv", updateClientData
//	try{
		var customUrl =requestUrl;
		if(formId!=undefined || formId==''){
			customUrl = customUrl + $("#"+formId).serialize();
		}
		if(myDataType==undefined || myDataType==''){
			// use "string", "text", "html" or "json" for our needs 
			dataType = "html";
		}
		if(executeBeforeSend =='' || executeBeforeSend == undefined){
			executeBeforeSend = function(){};
		}
		if(executeOnComplete =='' || executeOnComplete == undefined){
			executeOnComplete = function(){};
		}	
		if(onFailure == '' || onFailure == undefined) {
			onFailure = function(xhr, status, error){};
		}
		return $.ajax({	
			url : customUrl,
			dataType : myDataType,
			data : postData,
			type : requestMethod,
			contentType: myContentType,
			cache : false,
			beforeSend : executeBeforeSend,
			complete : executeOnComplete,
			success : function(result, status, xhr) {
			         if(result["errors"] != undefined){
			        	
			           // parse response & update error div + any error handling
			           var errorsObj = result["error"];
			         /**Example - sytnax  
			         	$.each([52, 97], function(index, value) {
			        	   alert(index + ': ' + value);
			           });*/
			           var errorMsgs = '';
			           $.each(errorsObj, function(index, value) {
			        	   if(errorsObj.length==0){
			        		   return;
			        	   }
			        	   if(errorsObj.length==1 || errorsObj.length > 1){
			        		   if(value.errorType == 'WARNING'){
				        		   $("#"+funcDivId+"ParentWarningDiv").show();
				        		   $("#"+funcDivId+"WarningImage").show();
				        		   $("#"+warningDivId).show().html(""+value.errorMsg);
			        		   }
			        		   else{
			        			   $("#"+funcDivId+"ParentErrorDiv").show();
				        		   $("#"+funcDivId+"ErrorImage").show();
				        		   $("#"+failureDivId).show().html(""+value.errorMsg);
			        		   }
			        		   return;
			        	   }
			        	   if(errorMsgs!=''){
			        		   errorMsgs = errorMsgs + ","+ value.errorMsg;
			        	   }else{
			        		   errorMsgs = value.errorMsg;	
			        	   }
			           });
			           if(errorMsgs!=''){
			        	   $("#"+failureDivId).show().html(errorMsgs);
			           }
			           // execute errors and success function
			           callbackFn(result, status, xhr);
			       }else{
						// process response normally
						if(succesDivId!=undefined && succesDivId!=''){
							$("#"+succesDivId).html(result);
							callbackFn(result, status, xhr);
						}else{
							callbackFn(result, status, xhr);
						}
						
						
					}
			},
			error: function(xhr, status, error) {
				onFailure(xhr, status, error);
			}
		});
//	}catch(e){
		
//		throw("Global ajax function failed due to JS error - "+e);
//	}
}