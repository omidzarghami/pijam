
// دیتابیس ترکیبات موجود و قیمت‌ها (هزار تومان)
const combinations = {
    'موز-انبه': 130,
    'موز-توت فرنگی': 130,
    'موز-طالبی': 110,
    'سیب-موز': 110,
    'سیب-هویج': 70,
    'سیب-کرفس': 79,
    'سیب-لیمو': 85,
    'سیب-دارچین': 85,
    'لیمو-کرفس': 89,
    'لیمو-پرتقال': 89,
    'پرتقال-هویج': 75,
    'پرتقال-انار': 60,
    'پرتقال-شاتوت': 85,
    'پرتقال-توت فرنگی': 90,
    'پرتقال-گریپ فروت': 80,
    'انبه-شاتوت': 130,
    'انبه-توت فرنگی': 130,
    'انبه-پرتقال': 140,
    'انبه-طالبی': 120,
    'انبه-آناناس': 130,
    'پرتقال-آناناس': 130,
    'زنجبیل-پرتقال': 120,
    'زنجبیل-سیب': 99,
    'زنجبیل-کرفس': 90,
    'زنجبیل-هویج': 80,
    'انار-آلبالو': 80,
    'انار-ذغال اخته': 75,
    'انار-شاتوت': 85,
    'انار-زرشک': 85,
    'آلبالو-شاتوت': 89,
    'آلبالو-ذغال اخته': 89,
    'شاتوت-توت فرنگی':120,
    'توت فرنگی-هندوانه':99,
    'هویج-کرفس':70,
    'آناناس-نارگیل':150,
};

// استخراج لیست تمام میوه‌های منحصر به فرد
const allFruits = [...new Set([
    ...Object.keys(combinations).flatMap(combo => combo.split('-'))
])].sort();

// پر کردن اولیه لیست‌های انتخاب
function initializeLists() {
    const juice1Select = document.getElementById('juice1');
    const juice2Select = document.getElementById('juice2');

    allFruits.forEach(fruit => {
        const option = document.createElement('option');
        option.value = fruit;
        option.textContent = fruit;
        juice1Select.appendChild(option.cloneNode(true));
        juice2Select.appendChild(option);
    });
}

function updateSelections(changedSelectId, otherSelectId) {
    const changedSelect = document.getElementById(changedSelectId);
    const otherSelect = document.getElementById(otherSelectId);
    const selectedValue = changedSelect.value;

    // ذخیره مقدار انتخاب شده فعلی در لیست دیگر
    const currentOtherValue = otherSelect.value;

    // پاک کردن و بازسازی گزینه‌های لیست دیگر
    otherSelect.innerHTML = '<option value="">انتخاب کنید</option>';

    // اضافه کردن فقط میوه‌هایی که می‌توانند با میوه انتخاب شده ترکیب شوند
    const possibleCombinations = Object.keys(combinations)
        .filter(combo => combo.includes(selectedValue))
        .flatMap(combo => combo.split('-'))
        .filter(fruit => fruit !== selectedValue);

    [...new Set(possibleCombinations)].sort().forEach(fruit => {
        const option = document.createElement('option');
        option.value = fruit;
        option.textContent = fruit;
        otherSelect.appendChild(option);
    });

    // برگرداندن مقدار قبلی اگر هنوز معتبر است
    if (currentOtherValue && possibleCombinations.includes(currentOtherValue)) {
        otherSelect.value = currentOtherValue;
    }

    // بررسی ترکیب جدید
    checkCombination();
}

function checkCombination() {
    const juice1 = document.getElementById('juice1').value;
    const juice2 = document.getElementById('juice2').value;
    const resultDiv = document.getElementById('result');

    if (!juice1 || !juice2) {
        resultDiv.className = '';
        resultDiv.textContent = 'لطفاً هر دو میوه را انتخاب کنید';
        return;
    }

    // بررسی هر دو ترکیب ممکن
    const combination1 = `${juice1}-${juice2}`;
    const combination2 = `${juice2}-${juice1}`;
    const price = combinations[combination1] || combinations[combination2];

    if (price) {
        resultDiv.className = 'available';
        resultDiv.textContent = `قیمت: ${price} هزار تومان`;
    } else {
        resultDiv.className = 'unavailable';
        resultDiv.textContent = 'این ترکیب ناموجود است';
    }
}

// اجرای اولیه
initializeLists();
updateSelections('juice1', 'juice2');





// تعریف محصولات در آرایه‌ای از آبجکت‌ها
const products = [
    {
        id: 1,
        name: "شیرموز ساده",
        price: 69
    },
    {
        id: 2,
        name: "شیرموز پسته",
        price: 130
    },
    {
        id: 3,
        name: "شیرموز نارگیل",
        price: 98
    },
    {
        id: 4,
        name: "شیرموز کره بادام زمینی",
        price: 110
    },
    {
        id: 5,
        name: "شیرموز نوتلا",
        price: 110
    },
    {
        id: 6,
        name: "شیرموز شکلات",
        price: 110
    },
    {
        id: 7,
        name: "شیرموز عسل و کنجد",
        price: 99
    },
    {
        id: 8,
        name: "شیرموز شاتوت",
        price: 85
    },
    {
        id: 9,
        name: "شیرموز توت فرنگی",
        price: 85
    },
    {   id: 10,
        name: "شیرموز طالبی",
        price: 95
    },
    {   id: 11,
        name: "شیرموز فندق",
        price: 99
    },
    {
        id: 12,
        name: "شیرموز انبه",
        price: 120
    },
    {   id: 13,
        name: "شیرموز بزرگ",
        price: 85}
    ];

// تابع برای ایجاد آپشن‌های سلکت باکس
function createSelectOptions() {
    const selector = document.querySelector('.product-selector');
    
    // اضافه کردن آپشن پیش‌فرض
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "نوع شیرموز را انتخاب کنید";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selector.appendChild(defaultOption);
    
    // اضافه کردن محصولات به سلکت باکس
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.price;
        option.textContent = `${product.name} - ${product.price.toLocaleString('fa-IR')} تومان`;
        selector.appendChild(option);
    });
}

// تابع آپدیت قیمت
function updatePrice() {
    const selector = document.querySelector('.product-selector');
    const priceDisplay = document.getElementById('priceDisplay');
    const selectedPrice = selector.value;
    
    if (selectedPrice) {
        const formattedPrice = new Intl.NumberFormat('fa-IR').format(selectedPrice);
        priceDisplay.textContent = `قیمت: ${formattedPrice} تومان`;
        priceDisplay.classList.add('price-update');
        setTimeout(() => {
            priceDisplay.classList.remove('price-update');
        }, 500);
    } else {
        priceDisplay.textContent = 'قیمت: 0 تومان';
    }
}

// اجرای تابع ایجاد آپشن‌ها هنگام لود صفحه
document.addEventListener('DOMContentLoaded', createSelectOptions);




// تعریف محصولات در آرایه‌ای از آبجکت‌ها
const pistachioMilkProducts = [
    {
        id: 'pm001',
        name: "شیر پسته ساده",
        price: 135
    },
    {
        id: 'pm002',
        name: "شیر پسته دابل",
        price: 150
    },
    {
        id: 'pm003',
        name: "شیر پسته انبه",
        price: 150
    },
    {
        id: 'pm004',
        name: "شیر پسته شاتوت",
        price: 150
    }
];

// تابع برای ایجاد آپشن‌های سلکت باکس
function createPistachioDrinkOptions() {
    const selector = document.querySelector('.pistachio-drink-selector');
    
    // اضافه کردن آپشن پیش‌فرض
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "نوع شیر پسته را انتخاب کنید";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selector.appendChild(defaultOption);
    
    // اضافه کردن محصولات به سلکت باکس
    pistachioMilkProducts.forEach(product => {
        const option = document.createElement('option');
        option.value = product.price;
        option.dataset.productId = product.id;
        option.textContent = `${product.name} - ${product.price.toLocaleString('fa-IR')} تومان`;
        selector.appendChild(option);
    });
}

// تابع آپدیت قیمت
function updatePistachioDrinkPrice() {
    const selector = document.querySelector('.pistachio-drink-selector');
    const priceDisplay = document.getElementById('pistachioPriceDisplay');
    const selectedPrice = selector.value;
    
    if (selectedPrice) {
        const formattedPrice = new Intl.NumberFormat('fa-IR').format(selectedPrice);
        priceDisplay.textContent = `قیمت: ${formattedPrice} تومان`;
        priceDisplay.classList.add('price-update');
        setTimeout(() => {
            priceDisplay.classList.remove('price-update');
        }, 500);
    } else {
        priceDisplay.textContent = 'قیمت: 0 تومان';
    }
}

// اجرای تابع ایجاد آپشن‌ها هنگام لود صفحه
document.addEventListener('DOMContentLoaded', createPistachioDrinkOptions);




