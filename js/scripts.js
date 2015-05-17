// NOTE:  if there are extensions or plugins included then variable names may overlap without you knowing hence why we want to use name spacing

// NOTE:  if you had your objects and functions inside the jQuery(document).ready() you can't access the object within the console...  if you do it outside of it however you can access it at any time and anywhere, it's no longer trapped as a local variable or function within the jQuery(document).ready()

////////////////////////////////////////////
// 		VARIABLES
////////////////////////////////////////////
// create an empty object... which is the start of the application
// you don't have to start it empty though... it is cleaner however
// the word app is too generic...
// you might use the initials of the website you're designing

var tdCG1 = {};

// then below there you can add things
tdCG1.angle = 0;
tdCG1.netDegrees = 360;
tdCG1.spinner = $('#spinner');
tdCG1.leftPrev = $('span[data-dir1="left"]');
tdCG1.rightNext = $('span[data-dir1="right"]');
// tdCG1.items1 holds the items in the gallery... whether they're images or a div
tdCG1.items1 = $('figure#spinner img');

////////////////////////////////////////////
// 		END VARIABLES
////////////////////////////////////////////


////////////////////////////////////////////
// 		FUNCTIONS
////////////////////////////////////////////
// don't forget to call the function in EXECUTION CODE area before running

// NOTE:  in terms of organization, Ryan prefers to put all other functions and variables above the object.init() method however in reality it doesn't matter

tdCG1.craftRotateString = function (axisString,angleValue) {
	var string = "rotate" + axisString + "(";
		string += angleValue;
		string += "deg)";
	return string;
}

tdCG1.itemAngles = function () {
	// this function sets the initial item angle positions upon load before we do anything else... especially if our gallery is huge

	var totalItems = tdCG1.items1.length;
	// may want to floor the value so you avoid decimals
	// var degreeItem = tdCG1.netDegrees/totalItems;
	var degreeItem = Math.floor(tdCG1.netDegrees/totalItems);
	tdCG1.degreeConstant = degreeItem;
	var degreeCount = degreeItem;

	// for (var i = 0; i < tdCG1.items1.length; i++) {
	// 	if (i == 0) {
	// 		tdCG1.items1[i].css('transform', 'rotateY(0deg)');
	// 	} else {
	// 		tdCG1.items1[i].css('transform', tdCG1.craftRotateString("Y",degreeItem));

	// 		degreeCount += degreeItem;
	// 	}
	// }

	$.each(tdCG1.items1, function(index, target) {
		// what we have here is an array of objects
		// console.log(index,target);

		// I had to store the target in the $() so that it became a jQuery object, otherwise jQuery methods wouldn't work
		var finalTarget = $(target);

		if (index == 0) {
			finalTarget.css('transform', 'rotateY(0deg)');
		}

		// you needed to use degreeCount not degreeItem otherwise all images would be set with the same angle
		finalTarget.css('transform', tdCG1.craftRotateString("Y",degreeCount));

		degreeCount += degreeItem;
	});
}

tdCG1.galleryspin = function (dirString) {

	// just realized that the angle adjustments must match the angle increments you calculated in object.itemAngles() method

	// this is used for the previous and next buttons
	if (dirString == "left") {
		tdCG1.angle -= tdCG1.degreeConstant;
		console.log(tdCG1.angle);
	} else {
		tdCG1.angle += tdCG1.degreeConstant;
		
		console.log(tdCG1.angle);
	}

	tdCG1.spinner.css({
		'-webkit-transform': "rotateY("+ tdCG1.angle +"deg) rotateX(-7deg)",
		'-moz-transform': "rotateY("+ tdCG1.angle +"deg) rotateX(-7deg)",
		'transform': "rotateY("+ tdCG1.angle +"deg) rotateX(-7deg)"
	});

	// tdCG1.spinner.attr({
	// 	style: "-webkit-transform: rotateY("+ tdCG1.angle +"deg); -moz-transform: rotateY("+ tdCG1.angle +"deg); transform: rotateY("+ tdCG1.angle +"deg);"	
	// });

	// setting the actual inline style attribute seems to result in real time changes
	// spinner.setAttribute("style","-webkit-transform: rotateY("+ tdCG1.angle +"deg); -moz-transform: rotateY("+ tdCG1.angle +"deg); transform: rotateY("+ tdCG1.angle +"deg);");
}

////////////////////////////////////////////
// 		END FUNCTIONS
////////////////////////////////////////////


////////////////////////////////////////////
// 		EVENTS
////////////////////////////////////////////
// for storing various event listeners
// this method will be used to listen for the open and close events and trigger those methods
// Ryan C often uses this though Drew doesn't always
tdCG1.events = function () {
	
	tdCG1.itemAngles();

	$(tdCG1.leftPrev).on('click', function(e) {
		e.preventDefault();
		console.log('clicked left');
		// var dirString = tdCG1.leftPrev.attr('data-dir1').val();
		// console.log(dirString);
		// tdCG1.galleryspin(dirString);
		tdCG1.galleryspin("left");
	});

	$(tdCG1.rightNext).on('click', function(e) {
		e.preventDefault();
		console.log('clicked right');
		// var dirString = tdCG1.rightNext.attr('data-dir1').val();
		// console.log(dirString);
		// tdCG1.galleryspin(dirString);
		tdCG1.galleryspin("right");
	});

}
////////////////////////////////////////////
// 		END EVENTS
////////////////////////////////////////////



////////////////////////////////////////////
// 		INIT
////////////////////////////////////////////
// method to initialize our application
// all our code will be put inside here
// you should not be defining things in here
tdCG1.init = function () {
	this.events();
}
////////////////////////////////////////////
// 		END INIT
////////////////////////////////////////////

////////////////////////////////////////////
// 		EXECUTION CODE
////////////////////////////////////////////
jQuery(document).ready(function($) {
	tdCG1.init();
});  //end doc.onready function
////////////////////////////////////////////
// 		END EXECUTION CODE
////////////////////////////////////////////
