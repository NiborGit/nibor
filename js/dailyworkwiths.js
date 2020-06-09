var db; 
var remotePouch = false;

var list = document.querySelectorAll('ul');
for (i = 0; i < list.length; i++) {
  list[i].addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {     
      ev.target.classList.toggle('checked');
    }
  }, false);
};

var rListItem = document.querySelectorAll('ul');
for (j = 0; j < rListItem.length; j++) {
  rListItem[j].addEventListener('dblclick', function (ev) {
    var o = ev.target;//alert(ev.target);
    var parent = ev.target.parentElement;
    var r = o.getAttribute('data-id');
    app.removeRow(r);
    parent.removeChild(ev.target);
  }, false);
};

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
   close[i].onclick = function() {
    var parent = this.parentElement;
    var r = this.getAttribute('data-id');
    app.removeRow(r);
    parent.removeChild(ev.target);
  }
};

var app = {  
getDbInfo: function(){
    db.info().then(function (info) {
        console.log(info);
        var msg = document.getElementById("msg");
        msg.innerHTML = JSON.stringify(info);
      });     
},  
showWeek :function (){
	var obj = document.getElementById('week');    
    //alert(obj.value);
},
buildForm : function() {
  var n,p,e,t,w;
    n = document.getElementById('name');
    p = document.getElementById('phone');
    e = document.getElementById('email');
    t = document.getElementById('topic');
    w = document.getElementById('week');
  return [
     n.value,
     t.value,
     w.value     
    ];
  },
addRecord: function (){
    event.preventDefault();
    const buildForm = this.buildForm();   
    var todo = {
      _id: new Date().toISOString(),
      name: buildForm[0],
      topic: buildForm[1],
      week: buildForm[2]      
    };   
    
    db.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
    db.get(todo._id).then(function (doc) {
      console.log(JSON.stringify(doc));
    }).catch(function (err) {
      console.log(err);
    });      

    var row = todo.name 
            // + ' ' + p.value 
            // + ' '  + e.value 
             + ' ' + todo.topic
             + ' ' + todo.week;
             //+ ' ' + todo._id;
    var li = document.createElement("li");    
    var t = document.createTextNode(row);
    li.setAttribute('data-id',todo._id)
    li.appendChild(t);
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);	
  if (row === '  ') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }  
},
getRows: function(){   
  db.allDocs({include_docs: true, descending: true  }, function(err, doc) {
       var documents =  doc.rows ;  
       documents.forEach(function(docx) {
          var ent = docx.doc;                                           
          var li = document.createElement("li");    
          var t = document.createTextNode(ent.name 
            + ' ' + ent.topic
            + ' ' + ent.week ) ;          
          li.setAttribute('data-id',ent._id)
          li.appendChild(t);
          document.getElementById("myUL").appendChild(li)  
        }); 
    });    
},
removeRow: function(id){
  //var id = 
  if(id !== undefined){    
  db.get(id).then(function (doc) {
      return db.remove(doc);
    });      
  } else {
      alert("No record row selected to delete.");
  }
},
handleExport : function () {
  db.allDocs({include_docs: true}, (error, doc) => {
    if (error) console.error(error);
    else this.download(
      JSON.stringify(doc.rows.map(({doc}) => doc)),
      'tracker.json',
      'text/plain'
    );
  });
},
download : function(data, filename, type) {
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
      var a = document.createElement("a"),
              url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
  }
},
searchMe : function () {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  ul = document.getElementById('myUL');
  li = ul.getElementsByTagName('li');

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
}
function init(){
    //$.support.cors = true;
    var obj = Object.create(app);
    db = new PouchDB('dailyworkwiths');
    //app.createPouch();  
}





