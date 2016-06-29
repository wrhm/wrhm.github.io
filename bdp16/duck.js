/*
//Get
var bla = $('#txt_name').val();

//Set
$('#txt_name').val('bla');
*/

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

function getURL(n) {
	var xorkey = "8A)3@!Nn.a3l4";
	var answers = [	"\\$]v2l' k%w9ws-@]'","i4@p+p;/m*v>",
					"^-ff2h=&g/t*[o-","y/hg)o+/\\\"[)@a1l" ];
	return myxor(answers[n],xorkey);
}

function capitalize(s) {
	var result = "";
	for (var i=0;i<s.length;i++) {
		var n = s.charCodeAt(i);
		if (i === 0 || s.charCodeAt(i-1) === 32) {
			n -= 32;
		}
		result += String.fromCharCode(n);
	}
	return result;
}

function getPageName(n) {
	var xorkey = "8A)3@!Nn.a3l4";
	var answers = [	"h.gw`q/*j-v>","|$]v2l' k%3(a[*ez.f","i4@p+!?;o\"x)f",
					"~-ff2h=&g/tlrw6e", "y/hg)o+no3p$ql8yv" ];
	return capitalize(myxor(answers[n],xorkey));
}

function checkAnswer(ans,n) {
	var hashes = [96354,97,97,97];
	// abc,a,a,a
	// alert(hashes[n]+"\n"+ans+"\n"+hash(ans));
	return (hashes[n] === hash(ans));
}

$(document).ready(function(){
	$("body").prepend("<h1>"+getPageName(parseInt($("#entrybutton").attr('value')))+"</h1>");
    $("#txt_name").keyup(function(event){
        if(event.keyCode == 13){
            $("#entrybutton").click();
        }
    });

    $("#entrybutton").click(function(){
    	var buttonvalnum = parseInt($(this).attr('value'));
        var textval = $('#txt_name').val();
		var rellink = getURL(buttonvalnum);

		var newlink = "<span class=\"msg\">Oops! Not quite. Try again.</span>";
		//if(rellink.localeCompare(textval) == 0) {
		if(checkAnswer(textval,buttonvalnum) == 1) {
			newlink = "<span class=\"msg\">Quack! You did it! ";
			newlink += "<a href=\""+rellink+".html\">Next Puzzle</a></span>";
		}
		$(".msg").remove();
		$("body").append(newlink);
    });

    $("#hashbox").keyup(function(event){
        if(event.keyCode == 13){
            $("#hashbutton").click();
        }
    });

    $("#hashbutton").click(function(){
        var textval = $('#hashbox').val();
        var hv = hash(textval);
        var newlink = "<span class=\"msg\">"+hv+"</span>";
		//if(rellink.localeCompare(textval) == 0) {
		$(".msg").remove();
		$("body").append(newlink);
    });

    $("#encryptbutton").click(function(){
        var textval = $('#hashbox').val();
        var xv = myxor(textval,"8A)3@!Nn.a3l4");
        var newlink = "<span class=\"msg\">"+xv+"</span>";
		//if(rellink.localeCompare(textval) == 0) {
		$(".msg").remove();
		$("body").append(newlink);
    });

    $("#txt_name").focus();
})
