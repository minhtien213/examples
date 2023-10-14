// TABS_UI

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var tabs = $$('.tab-item');
var panes = $$('.tab-pane');
var tabActive = $('.tab-item.active');
var line = $('.line');
line.style.left = tabActive.offsetLeft + 'px';
line.style.width = tabActive.offsetWidth + 'px';
// console.log(tabs,panes);
tabs.forEach(function(tab, index) {
    var pane = panes[index];
    tab.onclick = function(){
        document.querySelector('.tab-item.active').classList.remove('active');
        this.classList.add('active');
        document.querySelector('.tab-pane.active').classList.remove('active');
        pane.classList.add('active');
        line.style.left = this.offsetLeft + 'px';
        line.style.width = this.offsetWidth + 'px';
    }
});

// CARD UI
var size_spans = document.querySelectorAll('.size span')
size_spans.forEach(function(size_span){
    size_span.addEventListener('click', function(){
        document.querySelector('.size .active').classList.remove('active')
        size_span.classList.add('active')
    })
})

var green_btn = document.querySelector('.green')
var red_btn = document.querySelector('.red')
var white_btn = document.querySelector('.white')
green_btn.addEventListener('click', function(){
    document.querySelector('.color .selected').classList.remove('selected')
    green_btn.classList.add('selected')
    var card__image = document.querySelector('.card__image img')
    card__image.src = "./assets/img/green_shoes.png"
})
red_btn.addEventListener('click', function(){
    document.querySelector('.color .selected').classList.remove('selected')
    red_btn.classList.add('selected')
    var card__image = document.querySelector('.card__image img')
    card__image.src = "./assets/img/red_shoes.png"
})
    green_btn.classList.add('selected')
white_btn.addEventListener('click', function(){
    document.querySelector('.color .selected').classList.remove('selected')
    white_btn.classList.add('selected')
    var card__image = document.querySelector('.card__image img')
    card__image.src = "./assets/img/white_shoes.png"
})


//SEARCH BOX
var search_btn = document.querySelector('.search_btn')
var box = document.querySelector('.box')
search_btn.addEventListener('click', function(){
    box.classList.toggle('larger')
    this.previousElementSibling.focus() //focus vào thẻ input khi click vào btn
}) //previousElementSibling: thẻ anh em đứng trước 
    //nextElementSibling: thẻ anh em đứng trước 



// E_VALUE
var ekey = document.querySelector('.ekey')
var elocation = document.querySelector('.elocation')
var ewhich = document.querySelector('.ewhich')
var ecode = document.querySelector('.ecode')
var result_label = document.querySelector('.result_label')

document.addEventListener('keydown', function(e) {
    result_label.innerText = e.which;
    ekey.innerText = e.key.toUpperCase();
    elocation.innerText = e.location;
    ewhich.innerText = e.which;
    ecode.innerText = e.code;
})


//SEARCH TAGS
var input = document.querySelector('.input')
var content = document.querySelector('.content')
var remove = document.querySelector('.ti-close')
var remove_all = document.querySelector('.remove_all')
// var btn_remove_all = document.querySelector('.btn_remove_all')
var tags = []

render()

function render() {
    content.innerHTML = ''
    var htmls = tags.map(function(tag, index){
    return `<li>
                <span>${tag}</span> 
                <i class = "ti-close" onclick = "removeTag(${index})"></i>
            </li>`
    })
    content.innerHTML = htmls.join('')
    content.appendChild(input)
    // input.focus()
}

input.addEventListener('keydown', function(e){
    if (e.key == 'Enter'){
        if(!input.value == ''){
            tags.push(input.value.trim())
            input.value = ''
            render()
            remove_all.classList.remove('hide')
        }
        
    }
})

function removeTag(index){
    tags.splice(index, 1)
    render()
}

remove_all.onclick = function(){
    tags = []
    remove_all.classList.add('hide')
    render()
}


// VALIDATE FORM
var form = document.querySelector('form')
var form_grounp = document.querySelector('.form_grounp')
var username = document.querySelector('#username')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var password_confirm = document.querySelector('#password_confirm')

function showError(input, message) {
    input.parentElement.classList.add('error')
    input.parentElement.querySelector('span').innerText = message
}

function showSuccess(listInput) {
    listInput.forEach(function(input){
        input.parentElement.classList.remove('error')
        input.parentElement.querySelector('span').innerText = ""
    })
}


function checkEmptyValue(listInput){
    listInput.forEach(function(input){
        var getNameLabel = input.parentElement.querySelector('label').innerText
        if(input.value === ''){
            showError(input, `${getNameLabel} Không được để trống`)
        }
    })
}

function checkEmail(input) {
    var regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    if(!regex.test(input.value.trim())){
        showError(input, "Email không hợp lệ")
    }
}

function checkPassword(input, min, max){
    console.log(input.value.length)
    if(input.value.length < min){
        showError(input, `Password tối thiểu ${min} kí tự`)
    }
    if(input.value.length > max){
        showError(input, `Password tối đa ${max} kí tự`)
    }
}

function checkPasswordConfirm(password, passwordConfirm){
    if(password.value !== passwordConfirm.value){
        showError(password_confirm, "Mật khẩu không khớp")
    }
}


form.addEventListener('submit', function(e){
    e.preventDefault()
    showSuccess([username, email, password, password_confirm]) //mặc định cho all hợp lệ
    //check error
    checkEmptyValue([username, email, password, password_confirm])
    checkEmail(email)
    checkPassword(password, 6, 10)
    checkPasswordConfirm(password, password_confirm)
})



// TODOLIST

var todo_form = document.querySelector('.todo_form')
var data_form = document.querySelector('.data_form')
var todo_input = document.querySelector('.todo_input')
var todo_btn = document.querySelector('.todo_btn')
var todo_list = document.querySelector('.todo_list')
var delete_todo = document.querySelector('i')
var todo_item = document.querySelector('.todo_item')

todo_btn.addEventListener('click', function(){
    var inputValue = todo_input.value.trim()
    if(inputValue){
        addTodoItem({
            text: inputValue,
            status: ''
        })
    }
    todo_input.value = ""
    saveTodoList()
})

function addTodoItem(inputValue) {
    var li = document.createElement('li')
    li.innerHTML = `<span>${inputValue.text}</span>
                    <i class="ti-trash"></i>`

    li.querySelector('span').addEventListener('click', function(){
        li.classList.toggle('completed')
        saveTodoList()
    })
 
    if(inputValue.status == 'completed'){
        li.setAttribute('class', 'completed')
    }

    li.querySelector('i').addEventListener('click', function(){
        this.parentElement.remove()
        if(document.querySelectorAll(this.parentElement.nodeName).length == 0){
            document.querySelector('.empty').classList.add('active')
        }
        
        saveTodoList()
    })

    todo_list.appendChild(li)
}

function saveTodoList(){
    var li_list = document.querySelectorAll('li')
    var list_todo = []
    li_list.forEach(function(li){
        var text = li.querySelector('span').innerText
        var status = li.className
        list_todo.push({text, status})
    })

    localStorage.setItem('list_todo', JSON.stringify(list_todo))
    //vì localStorage chỉ lưu được kiểu DL là String nên dùng JSON.stringify(list_todo) để chuyển qua string
}

function loadTodoList(){
    var data = JSON.parse(localStorage.getItem('list_todo')) //chuyển về lại thành mảng
    data.forEach(function(todo){
        addTodoItem(todo)
    })
}

loadTodoList()

todo_input.addEventListener('keydown', function(e){
    if(e.which == "13"){
        todo_btn.click()
        if(!document.querySelectorAll(this.parentElement.nodeName).length == 0){
            document.querySelector('.empty').classList.remove('active')
        }
    }
})


// TOAST BLOCK
var toast_form = document.querySelector('.toast_form')
var success_btn = document.querySelector('.success_btn')
var warning_btn = document.querySelector('.warning_btn')
var error_btn = document.querySelector('.error_btn')

success_btn.addEventListener('click', function(){
    toastDisplay('success')
})
warning_btn.addEventListener('click', function(){
    toastDisplay('warning')
})
error_btn.addEventListener('click', function(){
    toastDisplay('error_toast')
})

function toastDisplay(toastname){

    var template = `<i class = "ti-check"></i>
                    <label>This is success toast</label>`
    switch(toastname){
        case 'success':
            template = `<i class = "ti-check"></i>
                        <label>This is success toast</label>`
            break
        case 'warning':
            template = `<i class = "ti-alert"></i>
                        <label>This is warning toast</label>`
            break
        case 'error_toast':
        template = `<i class = "ti-close"></i>
                    <label>This is error toast</label>`
        break
    }


    var toastDiv = document.createElement('div')
    toastDiv.setAttribute('class', toastname)
    toastDiv.innerHTML = `${template}
                        <span class="process"></span>`
    
    toast_form.appendChild(toastDiv)

    setTimeout(function() {
        toastDiv.style.animation = 'toast_hide 1s ease-in-out forwards'
    }, 5000)

    setTimeout(function() {
        toastDiv.remove()
    }, 6000)
}

// CONTACT SEARCH BLOCK
var list_contacts = document.querySelector('.list_contacts')
var search_input = document.querySelector('.search_input')

var listItemSearch = []

async function getApi(searchContactItem){
    const urlApi = 'https://randomuser.me/api?results=50'
    const responseApi = await fetch(urlApi)
    const { results } = await responseApi.json()
     // dùng destrusturing để lấy 1 key resutls trong mảng data của urlApi
    list_contacts.innerHTML = 'loading...' //xóa all trong list_contacts trước khi appendChild
    setTimeout(function() {
        list_contacts.innerHTML = ''
        results.forEach(result => {
            var contact_item = document.createElement('div')
            listItemSearch.push(contact_item) //thêm all các divvào mảng để search
            contact_item.classList.add('contact_item')
            contact_item.innerHTML = `<img src="${result.picture.thumbnail}" alt="logo" class="contact_item_img">
                                    <div class="contact_item_info">
                                    <span class="contact_item_name">${result.name.title} ${result.name.first} ${result.name.last}</span>
                                    <span class="contact_item_phone">Phone: ${result.cell}</span>
                                    <span class="contact_item_email">Email: ${result.email}</span>
                                    </div>`
            list_contacts.appendChild(contact_item)
        })
    }, 1000)
}

getApi() 


search_input.addEventListener('keyup', function(e) {
    searchContact(e.target.value)
})

function searchContact(keySearch){
    listItemSearch.forEach(item => {
        //nếu trong mảng có innerText trùng thì cho hiện, ngược lại cho ẩn
        if(item.innerText.toLowerCase().includes(keySearch.toLowerCase())) {
            item.classList.remove('hidden')
        }else{
            item.classList.add('hidden')
        }
    })
}






