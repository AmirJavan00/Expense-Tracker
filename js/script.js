// ------------class------------
class Category {
    categories_arr = JSON.parse(localStorage.getItem("categories")) || [];
    category_list_html = document.querySelector(".category_list")

    
    constructor(name, icon) {
        this.cat_name = name;
        this.cat_icon = icon;
        this.cat_color = randomColor(); 
        this.create(this.cat_name, this.cat_icon, this.cat_color);
    }

    create(name, icon, color) {
        this.category_obj = { "name": name, "icon": icon, "color": color };
        this.update(this.category_obj);
    }
    
    update(object) {
        this.categories_arr.push(object);
        localStorage.setItem("categories", JSON.stringify(this.categories_arr));
        this.loadHtml(object)
    }

    loadHtml(category){
            this.category_list_html.insertAdjacentHTML("beforeend",`
                <div class="category_item">
                    <div class="category_content">
                        <div class="line" style="background-color:${category.color};"></div>
                        <div class="category_logo">${category.icon}</div>
                        <div class="category_title">${category.name}</div>
                    </div>
                    <div class="delete_category">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{fill:url(#linear-gradient-2);}</style><linearGradient id="linear-gradient" x1="5.85" y1="32" x2="58.15" y2="32" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffae46"/><stop offset="0.19" stop-color="#ff9755"/><stop offset="0.74" stop-color="#ff5a7d"/><stop offset="1" stop-color="#ff428d"/></linearGradient><linearGradient id="linear-gradient-2" x1="22.35" y1="32" x2="41.65" y2="32" xlink:href="#linear-gradient"/></defs><g id="Layer_7" data-name="Layer 7"><path class="cls-1" d="M50.5,13.5a26.15,26.15,0,1,0,0,37A26.18,26.18,0,0,0,50.5,13.5ZM47.67,47.67a22.16,22.16,0,1,1,0-31.34A22.17,22.17,0,0,1,47.67,47.67Z"/><path class="cls-2" d="M41.06,22.94a2,2,0,0,0-2.83,0L32,29.17l-6.23-6.23a2,2,0,0,0-2.83,2.83L29.17,32l-6.23,6.23a2,2,0,1,0,2.83,2.83L32,34.83l6.23,6.23a2,2,0,0,0,2.83-2.83L34.83,32l6.23-6.23A2,2,0,0,0,41.06,22.94Z"/></g></svg>
                    </div>
                </div>
                `)
    }
}


// ------------variables------------
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
let add_category_submit = document.querySelector("#add_category_submit")
let inp_category_name
let inp_category_icon
let category_object
// ------------eventlisteners------------

add_category_submit.addEventListener("click",()=>{
    inp_category_name = document.querySelector("#inp_category_name")
    inp_category_icon = document.querySelector(".icons_option input:checked + label")
    category_object = new Category(inp_category_name.value, inp_category_icon.innerHTML)
    add_category_section.classList.add("display-none")
})

function randomColor(){
    /**
     * تولید یک کد رنگی به صورت تصادفی و برگشت دادن آن به صورت رشته 
     */
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

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
