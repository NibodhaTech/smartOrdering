<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6 ielt8"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7 ielt8"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<title>Walk Score Api</title>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<link id="style" href="css/classic.css" rel="stylesheet" media="screen">

<style>
body {
font-family: helvetica, sans-serif;
}
.source {
font-family: monospace;
padding: 10px;
}
</style>

</head>

<body>

<script src="js/test.js"></script> 
<script src="js/utility.js"></script> 
<script src="js/jquery.min.js"></script> 
<script src="js/jquery.columns-1.0.min.js"></script> 
<div style="margin-top: 25px">
<input type="radio" name="sortOption" value="Amenity">Sort based on Amenities</input>
<input type="radio" name="sortOption" value="WalkScore">Sort based on WalkScore</input>
<input type="radio" name="sortOption" value="Both">Sort based on Both Walkscore and Amenities</input>
<input type="submit" id="submit" value="Sort Products">
</div>

<div style="margin-top: 25px" id="data"></div>
<script type="text/javascript">
 
  $(document).ready(function(){
    $("#submit").click(function () {
    	var requestUrl = 'https://shasureshkumar-smart-ordering-v1.p.mashape.com/smartordering/sort/';
	if($('input:radio[name=sortOption]:checked').val() == 'Amenity'){
		requestUrl += 'amenity';
	}
	else if($('input:radio[name=sortOption]:checked').val() == 'WalkScore') {
		requestUrl += 'walkscore';
	}
	$.ajax({
        url: requestUrl,
        headers: { 'X-Mashape-Key' : 'q4ymM1vrtpmshz2GJbp5jAndqsowp15ZdHajsnc12JWnKD9cv7', 'Content-Type' : 'application/json; charset=utf-8' },
        type: 'POST',
        data:  testData,
        complete:function(){
        },
	    success: function(data,status,xhr){
	    	$('#data').columns({
				data: data['products'],
				sortBy: ['score'],
				reverse: true,
				schema: [
                              {"header":"Product Id", "key":"productId"},
                              {"header":"Product Name", "key":"productName"},
                              {"header":"Score", "key":"score"}
                          ]
				});
	    },
	    error: function(jqXHR, textStatus, errorThrown){
	    	console.log(jqXHR);
	    }         
    });
	
    });
  });
</script>
</body>
</html>
