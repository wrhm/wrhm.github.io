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
	var hashes = [3094713,-1335220573,-292193090,94921146,3287937];
	// duck,detect,uncover,crack,keel
	// alert(hashes[n]+"\n"+ans+"\n"+hash(ans));
	return (hashes[n] === hash(ans.toLowerCase()));
}

$(document).ready(function(){
	$("body").prepend("<h1>"+getPageName(parseInt($("#entrybutton").attr('value')))+"</h1>");
    $("#txt_name").keyup(function(event){
        if(event.keyCode == 13){
            $("#entrybutton").click();
        }
    });

    $(".reward").hide();
    $("#entrybutton").click(function(){
    	var buttonvalnum = parseInt($(this).attr('value'));
        var textval = $('#txt_name').val();
		var newlink = "<span class=\"msg\">Oops! Not quite. Try again.</span>";
		//if(rellink.localeCompare(textval) == 0) {
		if(checkAnswer(textval,buttonvalnum) == 1) {
			newlink = "<span class=\"msg\">Quack! You did it! ";
			if(buttonvalnum<=3) {
				var rellink = getURL(buttonvalnum);
				newlink += "<a href=\""+rellink+".html\">Waddle along...</a></span>";
			} else {
				$(".reward").show();
			}
		}
		$(".msg").remove();
		// $("body").append(newlink);
		$("#entry").append(newlink);
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
		// $("body").append(newlink);
		$("#entry").append(newlink);
    });

    $("#encryptbutton").click(function(){
        var textval = $('#hashbox').val();
        var xv = myxor(textval,"8A)3@!Nn.a3l4");
        var newlink = "<span class=\"msg\">"+xv+"</span>";
		//if(rellink.localeCompare(textval) == 0) {
		$(".msg").remove();
		// $("body").append(newlink);
		$("#entry").append(newlink);
    });

    $(".container").hide();
    $("#c0").show();

    $(".correct").click(function(){
    	var idnum = $(this).parent().attr('id');
    	var digit = parseInt(idnum.charCodeAt(1))-48;
    	var next = "#c"+(digit+1);
    	$(".msg").remove();
    	$(next).show();
    });

    $(".incorrect").click(function(){
    	var idnum = $(this).parent().attr('id');
    	var digit = parseInt(idnum.charCodeAt(1))-48;
    	// var err = "hid: ";
    	for (var i=1;i<=5;i++) {
    		$("#c"+i).hide();
    		// err = err + " " + idnum;
    	}
    	// alert(err);
    	$(".msg").remove();
		var newlink = "<span class=\"msg\">Uh oh! You done ducked up!</span>";
		$("#entry").append(newlink);
    });

    $("#ffbox").keyup(function(event){
        if(event.keyCode == 13){
            $("#ffbutton").click();
        }
    });

    $("#ffbutton").click(function(){
        var textval = $('#ffbox').val();
        var correctmsg = "<p class=\"fcmsg\">Nice! Way to <strong>CRACK</strong> that one. Indeed, no breed above has that letter. </p>";
        var wrongmsg = "<p class=\"fcmsg\">Uh oh! Try again...</p>";
        if (hash(textval.toLowerCase()) == -1076032515) {
			$(".fcmsg").remove();
			$(".ffcenter").append(correctmsg);
		} else {
			$(".fcmsg").remove();
			$(".ffcenter").append(wrongmsg);
		}
    });

    $("#txt_name").focus();
})
