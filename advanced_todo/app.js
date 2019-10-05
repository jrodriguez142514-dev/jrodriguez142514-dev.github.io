const form = document.querySelector('form')
const ul = document.getElementById('items')
const previousLists = document.getElementById('previousLists')
const listname = document.getElementById('listname')
const itemLabel = document.getElementById('itemLabel')
const item = document.getElementById('item')
const message = document.getElementById('Message')
const button = document.querySelector('button')
const btnShare = document.getElementById('btnShare')
const submit = document.getElementById('Submit')
const btnClear = document.getElementById('btnClear')

// let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

let itemsArray = []

if (form != null) {
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    if (item.value == '' || item.value == null) {
      message.innerHTML = "You Cannot Submit an Empty Item Value";
    } else {

      let listQuery = getQueryString();
      if(listQuery != null){
        let data = saveToExistingListItem(listQuery)

        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }

        if (data != "") {
          data.forEach(item => {
            makeList(item);
          });
        }
      
        // makeList(item)
        item.value = ''
      }
      else{
        let data = saveListItem()

        if (data != "") {
          data.forEach(item => {
            makeList(item);
          });
        }
      
        // makeList(item)
        item.value = ''
      }
    }

  });
};




function itemComplete(item){

  let listQuery = getQueryString();

  let data = modifyExistingListItemStatus(item, listQuery);

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }


  if (data != "") {
    data.forEach(item => {
      makeList(item);
    });
  }

  // makeList(item)
  item.value = ''

}

function getName() {

  // Check browser support
  if (typeof (Storage) !== "undefined") {
    // Retrieve

    if (localStorage.getItem("name") == null || localStorage.getItem("name") == "" || localStorage.getItem("name").length == 0) {
      document.getElementById("greeting").innerHTML = "Hello, Guest!";
      window.location.href = "guest_index.html";
    } else {
      document.getElementById("greeting").innerHTML = "Hello, " + localStorage.getItem("name") + "!"
    }

  } else {
    document.getElementById("greeting").innerHTML = "Sorry, your browser does not support Web Storage...";
  }

}

let makeList = function todoList(item) {
  let li = document.createElement('li');
  let button = document.createElement('button');
  let faviconSpan = document.createElement('span');
  moditem = item.slice(0, item.indexOf("_"));
  button.id = moditem;
  button.addEventListener('click', function() {
    itemComplete(button.id);
  }, false);
  
  li.textContent = moditem
  li.className = "list-group-item";
  ul.appendChild(li)
  if(item.includes("complete")){
    li.style.setProperty("text-decoration", "line-through");
    button.className="btn btn-danger pull-right";
    faviconSpan.className="fa fa-times";
  }
  else{
    li.style.setProperty("text-decoration", "none !important");
    button.className="btn btn-info pull-right";
    faviconSpan.className="fa fa-check";
  }
  
  li.appendChild(button)
  button.appendChild(faviconSpan)
  
};

function modifyExistingListItemStatus(item, listQuery) {
  let data = ''

  if (item != "") {
    
    for (var i = 0; i < localStorage.length; i++) {
      let listname = localStorage.key(i);
      if (listname.includes("list")) 
      {
        if (listname == (listQuery + "_list")) 
        {
          try {
            JSON.parse(localStorage.getItem(localStorage.key(i)))
            let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))
  
            listitems.forEach(function (litem, index) {
              
              if(item == litem.slice(0, litem.indexOf("_")))
              {
                itemsArray = itemsArray.filter(function(item){
                  return item+"_active" != litem;
                });

                litem = litem.slice(0, litem.indexOf("_"));
                itemsArray.push(litem+"_complete"); 
              }
              else{
                itemsArray.push(litem); 
              }              
            });
          }
          catch{
            return false
          }
        }
      }
    }

    localStorage.setItem('items', JSON.stringify(itemsArray));

    localStorage.setItem(listQuery + "_list", JSON.stringify(itemsArray));

    data = JSON.parse(localStorage.getItem('items'));
  }

  itemsArray = []

  return data
}

function saveToExistingListItem(listQuery) {
  let data = ''

  if (item.value != "") {
    
    for (var i = 0; i < localStorage.length; i++) {
      let listname = localStorage.key(i);
      if (listname.includes("list")) 
      {
        if (listname == (listQuery + "_list")) 
        {
          try {
            JSON.parse(localStorage.getItem(localStorage.key(i)))
            let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))
  
            listitems.forEach(function (litem) {
              itemsArray.push(litem); 
            });
          }
          catch{
            return false
          }
        }
      }
    }

    itemsArray.push(item.value+"_active"); 

    localStorage.setItem('items', JSON.stringify(itemsArray));

    localStorage.setItem(listQuery + "_list", JSON.stringify(itemsArray));

    data = JSON.parse(localStorage.getItem('items'));
  }

  itemsArray = []

  return data
}

function saveListItem() {
  let data = ''

  if (item.value != "") {
    itemsArray.push(item.value+"_active");

    localStorage.setItem('items', JSON.stringify(itemsArray));

    localStorage.setItem(listname.value + "_list", JSON.stringify(itemsArray));

    data = JSON.parse(localStorage.getItem('items'));
  }

  itemsArray = []

  return data
}

function getPreviousListsQuery(listQuery) {

  for (var i = 0; i < localStorage.length; i++) {
    let listname = localStorage.key(i);
    if (listname.includes("list")) {
      listname = listname.replace("_list", "");

      if (listname == listQuery) {
        try {
          JSON.parse(localStorage.getItem(localStorage.key(i)))
          let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))

          listitems.forEach(function (litem) {
            makeList(litem);
          });


          let a = document.createElement('a');
          let li = document.createElement('li');


          a.href = "./selected.html?listname=" + listname;
          li.textContent = listname.replace("_list", "");
          if (li.textContent = listname) {
            li.className = "list-group-item active";
          } else {
            li.className = "list-group-item";
          }
          previousLists.appendChild(a);
          a.appendChild(li);


        } catch (err){
          return false;
        }
      } else {

        let a = document.createElement('a');
        let li = document.createElement('li');


        a.href = "./selected.html?listname=" + listname;
        li.textContent = listname.replace("_list", "");
        if (li.textContent = listname) {
          li.className = "list-group-item";
        } else {
          li.className = "list-group-item";
        }
        previousLists.appendChild(a);
        a.appendChild(li);
      }
    } else {
      try {
        let item = (localStorage.getItem(localStorage.key(i)))
      } catch {
        return false;
      }
    }
  }
}

function getPreviousLists() {

  for (var i = 0; i < localStorage.length; i++) {
    let listname = localStorage.key(i);
    if (listname.includes("list")) {
      try {
        JSON.parse(localStorage.getItem(localStorage.key(i)))

        let a = document.createElement('a');
        let li = document.createElement('li');

        listname = listname.replace("_list", "");
        a.href = "./selected.html?listname=" + listname;
        li.textContent = listname.replace("_list", "");
        li.className = "list-group-item";
        previousLists.appendChild(a);
        a.appendChild(li);

      } catch {
        return false;
      }
    } else {
      try {
        let item = (localStorage.getItem(localStorage.key(i)))
      } catch {
        return false;
      }
    }
  }
}

function getListItem() {


  data = saveListItem();

  if (data != "") {
    data.forEach(item => {
      makeList(item);
    });
  }
};

let getQueryString = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const listQuery = urlParams.get('listname');

  return listQuery;
};

let getUrl = function () {
  let uri = location.href.split("/").slice(-1).toString();
  if (uri.includes("?")) {
    uri = uri.slice(0, uri.indexOf("?"));
  }
  return uri;
};

function addRedirect() {
  window.location.href = "add.html";
}

window.onload = function () {
  let listQuery = getQueryString();
  let uri = getUrl();

  if (uri == "index.html") {
    getName();
    getPreviousLists();
  } else if (uri == "selected.html") {
    getName();

    if (listQuery != null) {
      getPreviousListsQuery(listQuery);
    } else {
      getPreviousLists();
      getListItem();
    }
  } else if (uri == "add.html") {
    getName();
  }
};

if(btnClear != null){
  btnClear.addEventListener('click', function() {

    if(confirm('This Will Delete Your List. Are You Sure?'))
    {    
      let listQuery = getQueryString();
      if(listQuery == null)
      {
        localStorage.removeItem(listname.value+"_list");    
      }
      else{
        localStorage.removeItem(listQuery+"_list");
      }
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
      }
      window.location.replace("index.html");
    }
  }, false);
}

if(btnShare != null){
  btnShare.addEventListener('click', function() {
    let listQuery = getQueryString();
    let strItems = "";
    let listname = "";
    for (var i = 0; i < localStorage.length; i++) {
      listname = localStorage.key(i);
      if (listname.includes("list")) {
        listname = listname.replace("_list", "");
  
        if (listname == listQuery) {
          try {
            JSON.parse(localStorage.getItem(localStorage.key(i)))
            let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))
            
            strItems += listname + "\r\n" + "\r\n";
            listitems.forEach(function (litem) {
              if (litem.includes("active")){
                litem = litem.slice(0, litem.indexOf("_"));
                strItems +=  litem + " " + '\u{2705}' + "\r\n";
              }
              else if(litem.includes("complete")){
                litem = litem.slice(0, litem.indexOf("_"));
                litem = '~'+litem+'~'; 
                strItems += litem + " " + '\u{274C}' + "\r\n";
              }
            });
          }catch{}
        }
      }
    }

    if (navigator.share) {
      navigator.share({
          title: 'Advanced To-Do ' + listname,
          text: strItems,
          url: 'https://jrodriguez142514-dev.github.io/advanced_todo/index.html',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => alert("Your Browser Is Not Supported")); //console.log('Error sharing', error));
    }    

  }, false)};