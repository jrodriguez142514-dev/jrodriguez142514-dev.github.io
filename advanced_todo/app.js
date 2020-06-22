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
const btnSort = document.getElementById('btnSort')
const txtAreaImportList = document.getElementById('txtAreaImportList')


let getUrl = function () {
  let uri = location.href.split("/").slice(-1).toString();
  if (uri.includes("?")) {
    uri = uri.slice(0, uri.indexOf("?"));
  }
  return uri;
};

let uri = getUrl();

let itemsArray = []

if (form != null) {
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    if (uri == "import.html") {
      if (txtAreaImportList.value == '' || txtAreaImportList.value == null) {
        message.innerHTML = "You Cannot Submit an Empty Item Value";
      } else {
        let importList = txtAreaImportList.value;
        itemImportList(importList);
      }
    } else {
      if (item.value == '' || item.value == null) {
        message.innerHTML = "You Cannot Submit an Empty Item Value";
      } else {

        let listQuery = getQueryString();
        if (listQuery != null) {
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
        } else {
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
    }
  });
};


function allowDrop(ev) {
  ev.preventDefault();
  ev.stopPropagation();
}

function drag(ev) {
  console.log(ev.target.innerHTML);
  console.log("drag " + ev.target.id);
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  var data = ev.dataTransfer.getData("text");
   console.log("drop " + data);
  let draggedElement = document.getElementById(data);
  let targetElement = ev.target;
   console.log("drop " + targetElement.innerHTML)

  targetElement.insertAdjacentElement("afterend", draggedElement)
  
  let childItems = "";
  let children = ul.children;
  for (i = 0; i < children.length; i++) {
    if(i == children.length - 1){
      childItems += children[i].id;
    }
    else{
      childItems += children[i].id + ",";
    }
  }
  
  itemsArray = childItems.split(",");

  let listQuery = getQueryString();

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  if (itemsArray != "") {
    itemsArray.forEach(item => {
      makeList(item);
    });
  }

  localStorage.setItem('items', JSON.stringify(itemsArray));

  localStorage.setItem(listQuery + "_list", JSON.stringify(itemsArray));

  itemsArray = []
}

function itemImportList(ilist) {

  let data = importListItems(ilist);

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }


  if (data != "") {
    data.forEach(item => {
      makeList(item);
    });
  }
}

function itemDelete(item) {

  let listQuery = getQueryString();


  let data = deleteExistingListItem(item, listQuery);

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

function itemEdit(item) {

  let listQuery = getQueryString();


  let data = editExistingListItem(item, listQuery);

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

function itemComplete(item) {

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
  let btnDel = document.createElement('button');
  let btnEdit = document.createElement('button');

  let faviconStatus = document.createElement('span');
  let faiconDel = document.createElement('span');
  let faiconEdit = document.createElement('span');


  moditem = item.slice(0, item.indexOf("_"));
  button.id = moditem;  
  btnDel.id = moditem + "_del";
  btnEdit.id = moditem + "_edit";

  if (uri.includes("import") || uri.includes("add")) {
    
  }
  else{
    button.addEventListener('click', function () {
      itemComplete(button.id);
    }, false);

    btnDel.addEventListener('click', function () {
      itemDelete(btnDel.id);
    }, false);

    btnEdit.addEventListener('click', function () {
      itemEdit(btnEdit.id);
    }, false);
  }

  li.textContent = moditem;
  li.className = "list-group-item";
  ul.appendChild(li)  

  li.style.setProperty("-webkit-user-drag", "element");
  if (item.includes("complete")) {
    li.id = moditem + "_complete";
    li.style.setProperty("text-decoration", "line-through");
    button.className = "btn btn-danger pull-right";
    faviconStatus.className = "fa fa-times";
  } else {
    li.id = moditem + "_active";
    li.style.setProperty("text-decoration", "none !important");
    button.className = "btn btn-info pull-right";
    faviconStatus.className = "fa fa-check";
  }

  btnDel.className = "btn btn-danger pull-left";
  btnEdit.className = "btn btn-secondary pull-left ml-1";


  li.appendChild(button);
  button.appendChild(faviconStatus);

  li.appendChild(btnDel);
  btnDel.appendChild(faiconDel);
  faiconDel.className = "fa fa-trash-o";

  li.appendChild(btnEdit);
  btnEdit.appendChild(faiconEdit);
  faiconEdit.className = "fa fa-pencil-square-o";

  li.setAttribute('draggable', true);
  li.addEventListener( "dragstart" , function(event){
    drag(event);
  });
};

function getEmojiChars(text) {
  let str = "";

  if (text.match(/[\u{2705}-\u{274C}]/gu)) {
    str = true;
  } else {
    str = false;
  }

  return str;
}

function importListItems(ilist) {
  let data = '';
  let lname = '';
  let listItems = "";
  let indvitem = "";
  let itemStartIndex = 0;

  if (ilist.value != "") {
    listItems = ilist.replace(/(\r\n|\n|\r)/gm, " ");
    listItems = listItems.replace(/\s+/g, " ");


    let i = 0;
    while (listItems[i]) {
      lname += listItems[i];
      itemStartIndex = i;
      i++;
      if (lname.includes("list") || lname.includes("List")) {
        break;
      }
    }

    k = itemStartIndex + 1;
    for (j = k; j < listItems.length; j++) {
      if (getEmojiChars(listItems[j]) != true) { //charcode for \ is 9989
        indvitem += listItems[j];
        k++;
      } else {
        indvitem = indvitem.trim();
        if (listItems[j] == '\u{2705}') {
          indvitem += '_active';
        } else if (listItems[j] == '\u{274C}') {
          indvitem += '_complete';
        }
        itemsArray.push(indvitem);
        indvitem = '';
      }
    }

    localStorage.setItem('items', JSON.stringify(itemsArray));

    localStorage.setItem(lname + "_list", JSON.stringify(itemsArray));

    data = JSON.parse(localStorage.getItem('items'));

    let header = document.getElementById("headerListName");
    header.innerHTML = lname;
  }

  itemsArray = []

  return data
}

function deleteExistingListItem(item, listQuery) {
  let data = ''

  if (item != "") {
    item = item.slice(0, item.indexOf("_"));
    for (var i = 0; i < localStorage.length; i++) {
      let listname = localStorage.key(i);
      if (listname.includes("list")) {
        if (listname == (listQuery + "_list")) {
          try {
            JSON.parse(localStorage.getItem(localStorage.key(i)))
            let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))

            listitems.forEach(function (litem) {

              let modlitem = litem.slice(0, litem.indexOf("_"));

              if (item == modlitem) {
                itemsArray = itemsArray.filter(function (item) {
                  return item != modlitem;
                });

              } else {
                itemsArray.push(litem);
              }
            });
          } catch {
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

function editExistingListItem(item, listQuery) {
  let data = ''

  if (item != "") {
    item = item.slice(0, item.indexOf("_"));
    for (var i = 0; i < localStorage.length; i++) {
      let listname = localStorage.key(i);
      if (listname.includes("list")) {
        if (listname == (listQuery + "_list")) {
          try {
            JSON.parse(localStorage.getItem(localStorage.key(i)))
            let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))

            listitems.forEach(function (litem, index) {

              if (item == litem.slice(0, litem.indexOf("_"))) {
                itemsArray = itemsArray.filter(function (item) {
                  return item + "_active" != litem;
                });

                var editInput = prompt("Edit your entry: " + item, item);
                //var entry = this.parentElement.getElementsByClassName("userEntry")[0]; // get sibling userEntry element
                litem = editInput + "_complete";


                if(litem.includes("_complete")){
                  litem = litem.slice(0, litem.indexOf("_"));
                  itemsArray.push(litem + "_active");
                }
                else{
                  litem = litem.slice(0, litem.indexOf("_"));
                  itemsArray.push(litem + "_complete");
                }

                
              } else {
                itemsArray.push(litem);
              }
            });
          } catch {
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

function modifyExistingListItemStatus(item, listQuery) {
  let data = ''

  if (item != "") {

    for (var i = 0; i < localStorage.length; i++) {
      let listname = localStorage.key(i);
      if (listname.includes("list")) {
        if (listname == (listQuery + "_list")) {
          try {
            JSON.parse(localStorage.getItem(localStorage.key(i)))
            let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))

            listitems.forEach(function (litem, index) {

              if (item == litem.slice(0, litem.indexOf("_"))) {
                itemsArray = itemsArray.filter(function (item) {
                  return item + "_active" != litem;
                });

                
                if(litem.includes("_complete")){
                  litem = litem.slice(0, litem.indexOf("_"));
                  itemsArray.push(litem + "_active");
                }
                else{
                  litem = litem.slice(0, litem.indexOf("_"));
                  itemsArray.push(litem + "_complete");
                }

                
              } else {
                itemsArray.push(litem);
              }
            });
          } catch {
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
      if (listname.includes("list")) {
        if (listname == (listQuery + "_list")) {
          try {
            JSON.parse(localStorage.getItem(localStorage.key(i)))
            let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))

            listitems.forEach(function (litem) {
              itemsArray.push(litem);
            });
          } catch {
            return false
          }
        }
      }
    }

    itemsArray.push(item.value + "_active");

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
    itemsArray.push(item.value + "_active");

    localStorage.setItem('items', JSON.stringify(itemsArray));

    localStorage.setItem(listname.value + "_list", JSON.stringify(itemsArray));

    data = JSON.parse(localStorage.getItem('items'));
  }

  itemsArray = []

  return data
}

function getPreviousListsQuery(listQuery) {
  let data = ''

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

          data = JSON.parse(localStorage.getItem('items'));


        } catch (err) {
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

  return data
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



function addRedirect() {
  window.location.href = "add.html";
};

function importRedirect() {
  window.location.href = "import.html";
};

window.onload = function () {
  let listQuery = getQueryString();

  if(uri == "index.html") {
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
  else if (uri == "import.html") {
    getName();
  }
};

if (btnClear != null) {
  btnClear.addEventListener('click', function () {

    if (confirm('This Will Delete Your List. Are You Sure?')) {
      let listQuery = getQueryString();
      if (listQuery == null) {
        localStorage.removeItem(listname.value + "_list");
      } else {
        localStorage.removeItem(listQuery + "_list");
      }
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
      }
      window.location.replace("index.html");
    }
  }, false);
}

if (btnShare != null) {
  btnShare.addEventListener('click', function () {
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
              if (litem.includes("active")) {
                litem = litem.slice(0, litem.indexOf("_"));
                strItems += litem + " " + '\u{2705}' + "\r\n";
              } else if (litem.includes("complete")) {
                litem = litem.slice(0, litem.indexOf("_"));
                litem = '~' + litem + '~';
                strItems += litem + " " + '\u{274C}' + "\r\n";
              }
            });
          } catch {}
        }
      }
    }

    if (navigator.share) {
      navigator.share({
          title: 'Advanced To-Do ' + listQuery,
          text: strItems + "\r\n" + "\r\n" + "Make Your Own List At:",
          url: 'https://jrodriguez142514-dev.github.io/advanced_todo/index.html',
        })
        .then(() => console.log('Successful share'))
        .catch((error) => alert("Your Browser Is Not Supported")); //console.log('Error sharing', error));
    }

    strItems = '';
    listname = '';

  }, false)
};

if (btnSort != null) {
  btnSort.addEventListener('click', function () {  
    let listQuery = getQueryString();
    let listname = "";
    let itemsArr = [];

    for (var i = 0; i < localStorage.length; i++) {
      listname = localStorage.key(i);
      if (listname.includes("list")) {
        listname = listname.replace("_list", "");

        if (listname == listQuery) {
          try {
            JSON.parse(localStorage.getItem(localStorage.key(i)))
            let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))

            listitems.forEach(function (litem) {
              itemsArr.push(litem);
            });
          } catch {}
        }
      }
    }

    itemsArr.sort()
    data = itemsArr;

    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  
    if (data != "") {
      data.forEach(item => {
        makeList(item);
      });
    }

    itemsArr = ''
    
  }, false)
};