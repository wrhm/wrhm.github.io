
//http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
function hash(msg) {
	var hash = 0, chr;
	for (var i=0;i<msg.length;i++) {
		chr = msg.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash;
}

// function encrypt(msg) {
// 	var result = "";
// 	for (var i=0;i<msg.length;i++) {
// 		result += msg[i]+msg[i];
// 	}
// 	return result;
// }

function myxor(msg, key) { 
	var result = "";
	var keychr = "";
	var xornum;
	for (var i=0;i<msg.length;i++) {
		msgchr = msg.charCodeAt(i);
		keychr = key.charCodeAt(i % key.length);
		xornum = msgchr ^ keychr;
		//Replace non-renderables
		if(xornum < 32){xornum += 32;}
		result += String.fromCharCode(xornum).toLowerCase();
	}
	return result;
}

function getAnswer(n) {
	var xorkey = "8A)3@!Nn.a3l4";
	var answers = [	"\\$]v2l' k%w9ws-@]'",
						"i4@p+p;/m*v>",
						"^-ff2h=&g/t*[o-",
						"y/hg)o+/\\\"[)@a1l" ];
	return myxor(answers[n],xorkey);
}

$(document).ready(function(){
    $("#txt_name").keyup(function(event){
        if(event.keyCode == 13){
            $("#button1").click();
        }
    });

    $("#button1").click(function(){
        // $('#txt_name').val('quack');
        // alert($('#txt_name').val() == 'foo');
        // alert(encrypt($('#txt_name').val()));

        // var textval = $('#txt_name').val()
        // var hashval = hash(textval);
       	// var xored = myxor(textval,xorkey);
       	// var recovered = myxor(xored,xorkey)
        // alert("\""+xored+"\"" + '\n' + recovered);
		
		// alert(getAnswer(0)+'\n'+getAnswer(1)+'\n'+getAnswer(2)+'\n'+getAnswer(3));
		var rellink = getAnswer(0);
		var newlink = "<span>Quack! You did it! ";
		newlink += "<a href=\""+rellink+"\">Next Puzzle</a></span>";
		$("body").append(newlink);
    });

    $("#txt_name").focus();
})

/*
//Get
var bla = $('#txt_name').val();

//Set
$('#txt_name').val('bla');
*/