// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  let value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement('article');
    //add class
    element.classList.add('grocery-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
          <div class="btn-container">
            <button type="button" class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
                  <button type="button" class="delete-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>`;
    //to have access to the edit and delete button. We must create the selector after the element.html is created. not before.
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
deleteBtn.addEventListener('click', deleteItem);
editBtn.addEventListener('click', editItem);
    //appendChild
    list.appendChild(element);
    displayAlert('item added to the list', 'success');
    //show container
    container.classList.add('show-container');
    //add to localStorage
    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();
  } else if (value && editFlag) {

editElement.innerHTML = value
displayAlert('value changed', 'success');
setBackToDefault();
//edit local Storage
editLocalStorage(editID, value);
  } else {
    displayAlert('please enter value', 'danger');
  }
}

//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(function () {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//clear function
function clearItem() {
  let items = document.querySelector('grocery-item');
  if (items.length) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert('empty list', 'danger');
  setBackToDefault();
  // localStorage.removeItem('list');
}

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItem);

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  console.log('added to local storage');
}

function removeFromLocalStorage(id){

}

function editLocalStorage(id) {
    
}

function deleteItem(e){
const element = e.currentTarget.parentElement.parentElement;
const id = element.dataset.id;
list.removeChild(element);
if(list.children.length === 0){
    container.classList.remove('show-container')
}
displayAlert('item removed', 'danger')
setBackToDefault();
//remove from local storage
// removeFromLocalStorage(id)
}

function editItem(e) {
const element = e.currentTarget.parentElement.parentElement;
//set edit item
editElement = e.currentTarget.parentElement.previousElementSibling;
//set form value
grocery.value = editElement.innerHTML;
editFlag = true;
editID = element.dataset.id;
submitBtn.textContent = "edit";



}

function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}

// ****** SETUP ITEMS **********
