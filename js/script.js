// ----class----

// ----variables----

// مقدار های قسمت نویگیشن پایین
let pages = document.querySelectorAll(".page")
let nav_items = document.querySelectorAll("#bottom_nav a")
let home_page = document.querySelector("#home_page")
let path_icons = document.querySelectorAll("#bottom_nav path")

// مقدار های بخش اضاه کردن تراکنش
let add_transaction_btn = document.querySelectorAll(".add_transaction_btn")
let add_transaction_section = document.querySelector("#add_transaction_section")
let btn_close_add_transaction = document.querySelector("#btn_close_add_transaction")

// مقدارهای بخش اضافه کردن دسته یندی
let btn_add_category = document.querySelector(".btn_add_category")
let btn_close_add_category = document.querySelector("#btn_close_add_category")
let add_category_section = document.querySelector("#add_category_section")

// ----eventlisteners----

// بخش اضافه کردن دسته بندی
btn_add_category.addEventListener("click",()=>{
    add_category_section.classList.remove("display-none")
})
btn_close_add_category.addEventListener("click",()=>{
    add_category_section.classList.add("display-none")
})

// بخش اضافه کردن تراکنش 
btn_close_add_transaction.addEventListener("click",()=>{
    add_transaction_section.classList.add("display-none")
})

add_transaction_btn.forEach(btn => {
    btn.addEventListener("click",()=>{
    add_transaction_section.classList.remove("display-none")
    })    
});

// بخش نویگیشن پایین
function displayNoneAll(){
    pages.forEach(page => {
        page.classList.add("display-none")
        page.classList.remove("display-block")
    });
}
function fill_icon(){
    path_icons.forEach(path_icon => {
        path_icon.classList.add("icon_fill")
    });
}
function remove_after_line(){
    nav_items.forEach(nav_item => {
        nav_item.classList.remove("after-line")
    });
}

fill_icon()

displayNoneAll()
home_page.classList.add("display-block")

let home_icon_path = document.getElementById("home_icon_path")
home_icon_path.classList.remove("icon_fill")

nav_items.forEach(nav_item => {
    nav_item.addEventListener("click",()=>{
        displayNoneAll()
        fill_icon()
        remove_after_line()

        nav_item.classList.add("after-line")

        let nav_id = nav_item.getAttribute("id")
        let paths = document.querySelectorAll(`#${nav_id} path`)
        paths.forEach(path => {
            path.classList.remove("icon_fill")
        });

        let profile_page = nav_item.getAttribute("pageSelector")
        let page_selected = document.getElementById(profile_page)
        page_selected.classList.add("display-block")
        page_selected.classList.remove("display-none")
        
    })
});
