// ------------class------------


class Category {
    /**
     * ساخت دسته یندی و ذخیره آن در لوکال هاست
     * @param {string} name 
     * @param {string} icon 
     */
    constructor(name, icon) {
        /**
         * update مقدار دهی دسته بندی و فرستادن اطلاعات به متد 
         */
        this.list_category_html = document.querySelector(".category_list");
        this.category_option_html = document.querySelector(".category_option");
        this.list_category_stats_html = document.querySelector(".list_category_stats")
        
        // اگر نام و آیکون پاس داده شده بود، یعنی می‌خواهیم کتگوری جدید بسازیم
        if (name && icon) {
            const category_obj = { "id": Date.now(), "name": name, "icon": icon, "color": this.randomColor(), "amount": 0 };
            this.update(category_obj);
            }
    }

    randomColor() {
        /**
         * تولید یک کد رنگی به صورت تصادفی
         */
        return '#' + Math.floor(Math.random()*16777215).toString(16);
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

        if(this.list_category_html) {
            this.list_category_html.innerHTML = ''
            this.category_option_html.innerHTML = ''
            this.list_category_stats_html.innerHTML = ''
            
        }
        // بررسی خالی بودن دسته بندی‌ه
        if (currentCategories.length === 0) {
            // نمایش پیام در بخش انتخاب دسته بندی
            this.category_option_html.innerHTML = `
                <div style="text-align: center; color: #e05858ff; font-size: 16px; padding: 10px;">
                    لطفا در بخش تنظیمات دسته بندی اضافه کنید
                </div>
            `}

        currentCategories.forEach(category => {
            // اضافه کردن دسته بندی به لیست دسته یندی در قسمت تنظیمات
            const category_div = document.createElement('div');
            category_div.className = 'category_item';
            category_div.innerHTML = `
                <div class="category_content">
                    <div class="line" style="background-color:${category.color};"></div>
                    <div class="category_logo" style="
                        box-shadow: ${category.color} 0px 0px 5px 1px;">${category.icon}</div>
                    <div class="category_title">${category.name}</div>
                </div>
                <div class="delete_category">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </div>
            `;
            this.list_category_html.appendChild(category_div);

            // اضافه کردن دسته بندی به فرم اضافه کردن تراکنش
            const add_transaction_category = document.createElement("div");
            add_transaction_category.innerHTML = `
                <input type="radio" name="cat_option" id="${category.id}" value="${category.id}">
                <label for="${category.id}">${category.name}</label>
            `;
            this.category_option_html.appendChild(add_transaction_category);

            // اضافه کردن دسته بندی به صفحه آمار
            const category_stat = document.createElement("div")
            category_stat.classList.add("category_stat")
            category_stat.innerHTML=`
                    <div class="stat_label">${category.name}</div>
                    <div class="stat_value">${category.amount}</div>
            `
            this.list_category_stats_html.appendChild(category_stat)

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
class Transaction {
    /**
     * ساخت تراکنش و ذخیره آن در لوکال هاست 
     * @param {string} title عنوان تراکنش
     * @param {string} category آی دی دسته بندی
     * @param {number} amount مفدار دسته یندی
     * @param {string} type نوع تراکنش که آیا درآمد است یا خرج
     */

    constructor(title, category, amount, type) {
        /**
         * update مقدر دهی های اولیه و فرستادن آن به متد 
         */
        if (title && category && amount && type) {
            let today = new Date()
            this.transaction_obj = { "id": Date.now(), "title": title, "category": category, "amount": amount, "type": type, "date":today.toDateString()};
            this.update(this.transaction_obj);
        }
    }

    update(transaction) {
        /**
         * ذخیره تراکنش در لوکال هاست
         */
        let currentTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        currentTransactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(currentTransactions));
        this.loadHtml();
        this.calculator()
    }

    calculator(){
        /**
         * انجام محاسبات و به دست آوردن خرج، درآمد و موجودی
         */
        let currentTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        let currentCategories = JSON.parse(localStorage.getItem("categories")) || [];

        // مقدار دهی های اولیه
        let income = 0
        let expence = 0
        let balance = 0
        let your_balance = document.querySelectorAll(".your_balance")

        let transactions_number = document.querySelector("#transactions_number")
        transactions_number.innerHTML = String(currentTransactions.length)

        currentCategories.forEach(category => {
            category.amount = 0
        });



        currentTransactions.forEach(transaction => {
            currentCategories.forEach(category => {
                // اضافه کردن مبلغ به مقدار دسته بندی مخصوص خودش
                if(category.id == Number(transaction.category)){
                    category.amount += Number(transaction.amount)
                }
            });
            // برسی درآمد یا خرج و کم یا زیاد کردن موجودی
            if(transaction.type == "value_income"){
                income += Number(transaction.amount)
                balance += Number(transaction.amount)
            }else if(transaction.type == "value_expence"){
                expence += Number(transaction.amount)
                balance -= Number(transaction.amount)
            }
        });

        your_balance.forEach(element => {
            element.innerHTML = String(balance)
        });

        // بروزرسانی اطلاعات
        localStorage.setItem("categories", JSON.stringify(currentCategories));
        let add_amout_category = new Category()
        add_amout_category.loadHtml()
    }

    history(date){
        let currentTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        let currentCategories = JSON.parse(localStorage.getItem("categories")) || [];

        let list_transaction_history = document.querySelector("#list_transaction_history")
        let current_historyTransactions = []
        let current_date

        list_transaction_history.innerHTML = ""

        current_historyTransactions = currentTransactions.filter((transaction)=>{{
            return transaction.date == date 
        }})

        current_historyTransactions.forEach(transaction => {
            // پیدا کردن دسته بندی مربوطه
            const currentCategory = currentCategories.find(cat => cat.id == Number(transaction.category));

            const catColor = currentCategory ? currentCategory.color : '#ccc';
            const catIcon = currentCategory ? currentCategory.icon : '?';

            current_date = new Date()
            current_date.setTime(transaction.id)
            current_date = current_date.toLocaleDateString("fa-IR")

            // اضافه کردن تراکنش به بخش آخرین تراکنش ها
            const div_transaction = document.createElement("div");
            div_transaction.classList.add("transaction");
            
            div_transaction.innerHTML = `
                    <div class="line" style="background-color:${catColor};"></div>
                    <div class="category_logo" style="
                            box-shadow: ${catColor} 0px 0px 5px 1px;">${catIcon}</div>
                    <div class="transaction_content">
                        <div class="transaction_value ${transaction.type}">${transaction.amount}</div>
                        <div class="transaction_title">${transaction.title}</div>
                        <div class="transaction_date">${current_date}</div>
                    </div>
                    <div class="delete_transaction">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </div>`;
            // دکمه حذف
            const deleteBtn = div_transaction.querySelector('.delete_transaction');
            deleteBtn.addEventListener('click', () => {
                this.removeTransaction(transaction.id);
            });
            list_transaction_history.appendChild(div_transaction)
        })
    }

    loadHtml() {
        /**
         * html قرار دادن تراکنش در کد های 
        */

        this.list_transaction_html = document.querySelectorAll(".list_transaction");
        this.list_dates_html = document.querySelector(".list_dates")

        let today = new Date().getTime()
        let today_string = new Date().toDateString()
        let last_day = new Date()
        let day_MS = 86400000
        let date_arr
        let date_option = {
            day : "numeric",
            month: "long",
            weekday: "long"
        }

        let current_month
        let month
        var last_month_transaction = []
        var this_month_transaction = []
        let expence = 0
        let income = 0
        let current_date



        let currentTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        let currentCategories = JSON.parse(localStorage.getItem("categories")) || [];

        // پاک کردن لیست‌ها قبل از رندر مجدد
        if (this.list_transaction_html.length > 0) {
            this.list_transaction_html.forEach(container => container.innerHTML = "");
        }
        this.list_dates_html.innerHTML = ""
        
        // بخش زمان و تاریخچه تراکنش ها
        for (let day = 0; day <= 30; day++) {

            last_day.setTime(today - (day_MS * day))
            date_arr = last_day.toLocaleDateString("fa-IR", date_option).split(' ')

            let div_date_item = document.createElement("div")
            div_date_item.classList.add("date_item")
            div_date_item.innerHTML = `
                <p class="day">${date_arr[1]}</p>
                <p class="weekday">${date_arr[2]}</p>
                <span class="month">${date_arr[0]}</span>
            `
            div_date_item.setAttribute("date",`${last_day.toDateString()}`)

            div_date_item.addEventListener("click", ()=>{
                current_date = div_date_item.getAttribute("date")
                this.history(current_date)
            })
            this.list_dates_html.appendChild(div_date_item)

            // console.log(typeof last_month_transaction)
            
            currentTransactions.map((transaction)=>{
                current_date = div_date_item.getAttribute("date")
               
                if(transaction.date == current_date){
                    last_month_transaction.push(transaction)
                }
            })
        }

        currentTransactions.map((transaction)=>{
                current_month = new Date()
                current_month.setTime(transaction.id)
                current_month = current_month.toLocaleDateString("fa-IR", {month: "long"})
                // console.log(current_month)
                month = new Date()
                month = month.toLocaleDateString("fa-IR", {month: "long"})
        
                if(current_month == month){
                    this_month_transaction.push(transaction)
                }
        })

        this_month_transaction.forEach(transaction => {;
            // برسی درآمد یا خرج و کم یا زیاد کردن موجودی
            if(transaction.type == "value_income"){
                income += Number(transaction.amount)
            }else if(transaction.type == "value_expence"){
                expence += Number(transaction.amount)
            }
        });
        this_month_expence.innerHTML = String(expence)
        this_month_income.innerHTML = String(income)

        income = 0
        expence = 0
        last_month_transaction.forEach(transaction => {;
            // برسی درآمد یا خرج و کم یا زیاد کردن موجودی
            if(transaction.type == "value_income"){
                income += Number(transaction.amount)
            }else if(transaction.type == "value_expence"){
                expence += Number(transaction.amount)
            }
        });
        last_month_expence.innerHTML = String(expence)
        last_month_income.innerHTML = String(income)


        currentTransactions.forEach(transaction => {
            // پیدا کردن دسته بندی مربوطه
            const currentCategory = currentCategories.find(cat => cat.id == Number(transaction.category));

            const catColor = currentCategory ? currentCategory.color : '#ccc';
            const catIcon = currentCategory ? currentCategory.icon : '?';
            current_date = new Date()
            current_date.setTime(transaction.id)
            current_date = current_date.toLocaleDateString("fa-IR")
            // اضافه کردن تراکنش به بخش آخرین تراکنش ها
            this.list_transaction_html.forEach(container => {
                const div_transaction = document.createElement("div");
                div_transaction.classList.add("transaction");
                
                
                div_transaction.innerHTML = `
                    <div class="line" style="background-color:${catColor};"></div>
                    <div class="category_logo" style="
                            box-shadow: ${catColor} 0px 0px 5px 1px;">${catIcon}</div>
                    <div class="transaction_content">
                        <div class="transaction_value ${transaction.type}">${transaction.amount}</div>
                        <div class="transaction_title">${transaction.title}</div>
                        <div class="transaction_date">${current_date}</div>
                    </div>
                    <div class="delete_transaction">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </div>
                `;

                // دکمه حذف
                const deleteBtn = div_transaction.querySelector('.delete_transaction');
                deleteBtn.addEventListener('click', () => {
                    this.removeTransaction(transaction.id);
                });

                container.appendChild(div_transaction);
            });
        });
    }

    removeTransaction(id) {
        let currentTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        
        // حذف تراکنش با شناسه مشخص
        const newTransactions = currentTransactions.filter(transaction => transaction.id !== id);
        
        localStorage.setItem("transactions", JSON.stringify(newTransactions));
        
        // بارگذاری مجدد لیست و اطلاعات
        this.loadHtml()
        this.calculator()
    }
}
const transactionManager = new Transaction();
transactionManager.loadHtml();
transactionManager.calculator();


// ------------variables------------
// مقدار های قسمت نویگیشن پایین
let pages = document.querySelectorAll(".page")
let nav_items = document.querySelectorAll("#bottom_nav a")
let home_page = document.querySelector("#home_page")
let path_icons = document.querySelectorAll("#bottom_nav path")

// مقدار های بخش اضافه کردن تراکنش
let add_transaction_btn = document.querySelectorAll(".add_transaction_btn")
let add_transaction_section = document.querySelector("#add_transaction_section")
let btn_close_add_transaction = document.querySelector("#btn_close_add_transaction")
let add_transaction_submit = document.querySelector("#add_transaction_submit")
let inp_transaction_title
let inp_transaction_category
let inp_transaction_amount
let inp_transaction_type
let transaction_object

// مقدارهای بخش اضافه کردن دسته یندی
let btn_add_category = document.querySelector(".btn_add_category")
let btn_close_add_category = document.querySelector("#btn_close_add_category")
let add_category_section = document.querySelector("#add_category_section")
let add_category_submit = document.querySelector("#add_category_submit")
let inp_category_name
let inp_category_icon
let category_object

// ------------eventlisteners------------

// بخش اضافه کردن دسته بندی
add_category_submit.addEventListener("click",()=>{
    inp_category_name = document.querySelector("#inp_category_name")
    inp_category_icon = document.querySelector(".icons_option input:checked + label")
    category_object = new Category(inp_category_name.value, inp_category_icon.innerHTML)
    add_category_section.classList.add("display-none")
})
btn_add_category.addEventListener("click",()=>{
    add_category_section.classList.remove("display-none")
})
btn_close_add_category.addEventListener("click",()=>{
    add_category_section.classList.add("display-none")
})

// بخش اضافه کردن تراکنش 
add_transaction_submit.addEventListener("click", ()=>{
    inp_transaction_title = document.querySelector("#inp_transaction_title").value
    inp_transaction_category = document.querySelector(".category_option input:checked").value
    inp_transaction_amount = document.querySelector("#inp_among").value
    inp_transaction_type = document.querySelector(".type_options input:checked").value

    transaction_object = new Transaction(inp_transaction_title, inp_transaction_category, inp_transaction_amount, inp_transaction_type)
    add_transaction_section.classList.add("display-none")
})
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
