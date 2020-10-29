var currIndex;
var objChap;
showBooks();
getChapters();
        var list = document.querySelector('div#myULbooks');
        list.addEventListener('click', function(ev) {       
          if (ev.target.tagName === 'DIV') {
            //alert(ev.target.className);
            var obj = document.getElementById("bShortName");
            obj.value = ev.target.innerHTML; 
            document.getElementById("header").innerHTML = obj.value;
            showChapters();     
           }      
        }, false);
        
        var clist = document.querySelector('div#myULchapters');
        clist.addEventListener('click', function(ev) {       
          if (ev.target.tagName === 'DIV') {
            //alert(ev.target.className);
            var obj = document.getElementById("bChapter");
            obj.value = ev.target.innerHTML; 
            document.getElementById("myBar").style.display = '';             
            showText();     
           }      
        }, false); 

        var objSrch = document.getElementById("searchAll");        
        objSrch.addEventListener('keyup', function(event) {                                                      
          if (event.keyCode === 13) {
            if (event.preventDefault){
                    event.preventDefault();
                    console.log("prevent def avail")
            } else {
                    event.returnValue = false;
                    console.log("prevent def NOT")
            }
            searchAll();                        
           }
        });


function showFilter(){
   var obj = document.getElementById("fmFilter");
    obj.classList.toggle('w3-hide');
}
function showSearch(){
    var obj = document.getElementById("fmSearch");
     obj.classList.toggle('w3-hide');     
 }

function setIndex(book, chap){
  var b = book;
  var c = chap;
  for(var i=0; i < objChap.length; i++){
    var ent = objChap[i];
    if(ent.ShortName == b && ent.chapter == c){
      currIndex = i; 
      document.getElementById("navMsg").innerHTML = ent.chapter; 
      document.getElementById("header").innerHTML = ent.ShortName;
    }
  }
}
function prevIndex(){
  for(var i=0; i < objChap.length; i++){
    var ent = objChap[i];
    var tmpIndex = currIndex;
    if(tmpIndex == 0){ tmpIndex =1;} 
    if(i == tmpIndex -1 && i > 0 ){
      document.getElementById("bChapter").value = ent.chapter;      
      document.getElementById("bShortName").value = ent.ShortName;             
      showText();      
    }
  }  
}
function nextIndex(){
  for(var i=0; i < objChap.length; i++){
    var ent = objChap[i];
    var tmpIndex = currIndex;
    if(i == tmpIndex +1  && i < 261 ){
      document.getElementById("bChapter").value = ent.chapter;      
      document.getElementById("bShortName").value = ent.ShortName;             
      showText();      
    }
  }  
}
function getChapters(){          
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            objChap = JSON.parse(this.responseText);
            console.log("chap loaded")
            }
          }; 
      xmlhttp.open("GET", "/nibor/Json/BiNTChaptersEs.json", true);
      xmlhttp.send();
} 
    function clearAll(){
        document.getElementById("myULbooks").innerHTML = '';
        document.getElementById("myULchapters").innerHTML = '';
        document.getElementById("myULverses").innerHTML = '';
        document.getElementById("myBar").style.display = 'none';
        document.getElementById("search").value = '';
        document.getElementById("header").innerHTML = 'Bi';
    }
    function showBooks(){
        document.getElementById("myULbooks").innerHTML = '';
        document.getElementById("myULchapters").innerHTML = '';
        document.getElementById("myULverses").innerHTML = '';
        document.getElementById("myBar").style.display = 'none';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            document.getElementById("myULbooks").innerHTML = '';
            myObj.forEach(function(doc) {
                var d = doc;
                var li = document.createElement("div");    
                var t = document.createTextNode(d.ShortName) ;                 
                li.className = "w3-col s4 w3-center w3-xxlarge w3-hover-white" ;
                li.appendChild(t);
                document.getElementById("myULbooks").appendChild(li);
            });
           }
        };
      xmlhttp.open("GET", "/nibor/Json/BiNTesBooks.json", true);
      xmlhttp.send();
    }
    function showChapters(){          
            var obj = document.getElementById("bShortName");
            var ch = obj.value;            
            document.getElementById("myULbooks").innerHTML = '';
            objChap.forEach(function(doc, z) {
                var d = doc;                                     
                if( ch === d.ShortName) {                     
                var li = document.createElement("div");                  
                var t = document.createTextNode(d.chapter) ;                
                li.className = "w3-col s4 w3-center w3-xxlarge w3-hover-white" ;
                li.appendChild(t);
                document.getElementById("myULchapters").appendChild(li);
                }
            });
    }   
    
    function showText(){ 
        document.getElementById("myULverses").innerHTML = '';
        document.getElementById("myULchapters").innerHTML = ''; 
        document.getElementById("fmFilter").classList.add('w3-hide');
        document.getElementById("fmSearch").classList.add('w3-hide');
        var xmlhttp = new XMLHttpRequest();        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);            
            var cobj = document.getElementById("bChapter");
            var chap = cobj.value; 
            var el = document.getElementById("bShortName");
            var bsn = el.value;                       
            myObj.forEach(function(doc) {
                var d = doc;                                     
                if( chap == d.orig_chapter && bsn == d.ShortName) {                                     
                var li = document.createElement("div");                  
                var t = document.createTextNode(d.orig_chapter
                + ':' + d.orig_verse
                + ' ' + d.text) ;
               //li.className = "grid-item" ;
                li.appendChild(t);
                document.getElementById("myULverses").appendChild(li);
                setIndex(bsn, chap);
                }
            });
           }
        };
      xmlhttp.open("GET", "/nibor/Json/BiNT_RV_es.json", true);
      xmlhttp.send();
    }
    function searchAll(){ 
        document.getElementById("myULbooks").innerHTML = '';
        document.getElementById("myULchapters").innerHTML = '';
        document.getElementById("myULverses").innerHTML = '';
        document.getElementById("myBar").style.display = 'none'; 
        var xmlhttp = new XMLHttpRequest();        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);                        
            var srchInput = document.getElementById("searchAll");
            var srchVal = srchInput.value;
            document.getElementById("myULchapters").innerHTML = '';
            myObj.forEach(function(doc) {
                var d = doc;                                     
                if( d.text.indexOf(srchVal) > 0) {                                     
                var li = document.createElement("div");                  
                var t = document.createTextNode(d.BookName 
                + ' ' + d.orig_chapter
                + ':' + d.orig_verse
                + ' ' + d.text) ;
               //li.className = "grid-item" ;
                li.appendChild(t);
                document.getElementById("myULverses").appendChild(li);                
                }
            });
           }
        };
      xmlhttp.open("GET", "/nibor/Json/BiNT_RV_es.json", true);
      xmlhttp.send();
    }    
function searchMe() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  ul = document.getElementById('myULverses');
  li = ul.getElementsByTagName('div');
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {    
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
} 
