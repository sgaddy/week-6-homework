// Initial array of movies
	var fruits = ['orange', 'apple', 'lemon', 'banana', 'pear'];

	// ========================================================
	
	renderButtons();
	$(document).on('click','#fruitButton', displayFruitInfo);
	$(document).on('click','#addFruit', addingFruit);
	$(document).on('click','#img', changingImage);


	function changingImage(){	    	
	   var state = $(this).attr('data-state'); 
	
       if ( state == 'still'){
            	$(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
            	$(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }  

            return false;         
	 }

	function addingFruit () {

        var fruit = $('#fruit-input').val().trim();

        if (jQuery.inArray(fruit, fruits) == -1 & fruit.length > 0) {
            $('#textArea').empty();
            fruits.push(fruit);
		    renderButtons ();
		    $('#fruit-form').clearForm(); 
            console.log (fruits);
            return false;
        } else if (fruit.length == 0 ){
            $('#fruit-form').clearForm();
            $('#textArea').append('<textarea>');
            $('#textArea').html("Please enter a fruit name");
            return false;	  
        } else {
            $('#fruit-form').clearForm();
            $('#textArea').append('<textarea>');
            $('#textArea').html("This fruit is in the fruit list.  Please enter another fruit name");
            return false;   
        }
	}

function displayFruitInfo(){

	var fruit = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + fruit + "&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			
        $('#fruitsView').empty();

        var results = response.data;
        console.log(response);

        for(var i=0; i < results.length; i++){

        if (results[i].rating == "r" || results[i].rating == "pg-13"){
        }
            else {
             var gifDiv = $('<div id=view>')
             var rating = results[i].rating;
             var p = $('<p>').text( "Rating: " + rating);
             var fruitImage = $('<img id = img>');
             fruitImage.attr('src', results[i].images.fixed_width_small_still.url);
             fruitImage.attr('data-still', results[i].images.fixed_width_small_still.url);
             fruitImage.attr('data-animate', results[i].images.fixed_width.url);
             fruitImage.attr('data-state', 'still');
             fruitImage.addClass('img-thumbnail changeImage'); 

             gifDiv.append(p)
             gifDiv.append(fruitImage)
             $('#fruitsView').prepend(gifDiv);               
            	}
         	}
		});
}
function renderButtons(){ 

	$('#buttonsView').empty();

	for (var i = 0; i < fruits.length; i++){

		var a = $('<button id = fruitButton>') 
	    a.addClass('btn btn-default btn-sm btn-primary active btn-block'); 
	    a.attr('data-name', fruits[i]); 
	    a.text(fruits[i]); 
	    $('#buttonsView').append(a); 
	}
}

$.fn.clearForm = function() {
  	return this.each(function() {
    var type = this.type, tag = this.tagName.toLowerCase();
    if (tag == 'form')
      return $(':input',this).clearForm();
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = '';
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};




	
