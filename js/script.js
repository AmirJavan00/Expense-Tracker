// ------------class------------
class Category {
    /**
     * ساخت دسته یندی و ذخیره آن در لوکال هاست
     * @param {string} name 
     * @param {string} icon 
     */
    constructor(name, icon) {
        this.category_list_html = document.querySelector(".category_list");
        this.category_option_html = document.querySelector(".category_option");
        
        // اگر نام و آیکون پاس داده شده بود، یعنی می‌خواهیم کتگوری جدید بسازیم
        if (name && icon) {
            this.cat_name = name;
            this.cat_icon = icon;
            this.cat_color = this.randomColor();
            this.create(this.cat_name, this.cat_icon, this.cat_color);
        }
    }

    randomColor() {
        /**
         * تولید یک کد رنگی به صورت تصادفی
         */
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    create(name, icon, color) {
        /**
         * update مقدار دهی دسته بندی و فرستادن اطلاعات به متد 
         */
        const id = Date.now();
        const category_obj = { "id": id, "name": name, "icon": icon, "color": color };
        this.update(category_obj);
    }

    update(object) {
        /**
         * ذخیره دسته بندی در لوکال هاست
         */
        let currentCategories = JSON.parse(localStorage.getItem("categories")) || [];
        currentCategories.push(object);
        localStorage.setItem("categories", JSON.stringify(currentCategories));
        
        this.loadHtml();
    }

    loadHtml() {
        /**
         * html قرار دادن دسته بندی در کد های 
         */
        let currentCategories = JSON.parse(localStorage.getItem("categories")) || [];

        if(this.category_list_html) this.category_list_html.innerHTML = '';
        if(this.category_option_html) this.category_option_html.innerHTML = '';

        currentCategories.forEach(category => {
            // اضافه کردن دسته بندی به لیست دسته یندی در قسمت تنظیمات
            const category_div = document.createElement('div');
            category_div.className = 'category_item';
            category_div.innerHTML = `
                <div class="category_content">
                    <div class="line" style="background-color:${category.color};"></div>
                    <div class="category_logo">${category.icon}</div>
                    <div class="category_title">${category.name}</div>
                </div>
                <div class="delete_category">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </div>
            `;
            this.category_list_html.appendChild(category_div);


            // اضافه کردن دسته بندی به فرم اضافه کردن تراکنش
            const add_transaction_category = document.createElement("div");
            add_transaction_category.innerHTML = `
                <input type="radio" name="cat_option" id="${category.id}" value="${category.id}">
                <label for="${category.id}">${category.name}</label>
            `;
            this.category_option_html.appendChild(add_transaction_category);


            // دکمه حذف
            const deleteBtn = category_div.querySelector('.delete_category');
            deleteBtn.addEventListener('click', () => {
                this.removeCategory(category.id);
            });

        });
    }

    removeCategory(id) {
        /**
         * حذف کردن دسته یندی از همه جا
         */
        let currentCategories = JSON.parse(localStorage.getItem("categories")) || [];
        const newCategories = currentCategories.filter(cat => cat.id !== id);
        localStorage.setItem("categories", JSON.stringify(newCategories));
        
        this.loadHtml();
    }
}
const categoryManager = new Category(); 
categoryManager.loadHtml();

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
