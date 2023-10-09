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
    input.focus()
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





