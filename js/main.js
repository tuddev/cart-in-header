const GOOD_TEASPOT = {
    name: 'teaspot',
    price: 23456,
    imgUrl: 'https://galamart.ru/images_1000/58AIRAD.jpg',
    count: 1,
    decription: 'convenient multifunctional kettle 5 liters'
}

const GOOD_BEAUTIFUL_TEASPOT = {
    name: 'beautiful teaspot',
    price: 234,
    imgUrl: 'https://fissman.ru/upload/resize_cache/webp/upload/iblock/034/CHaynikzavarochnyy800mlsbambukovoykryshkoyistalnymfiltromsteklo.webp',
    count: 1,
    decription: 'convenient beautiful kettle 5 liters'
}

let GOOD_LIST = [GOOD_TEASPOT, GOOD_BEAUTIFUL_TEASPOT, {
    ...GOOD_BEAUTIFUL_TEASPOT,
    price: 1000
}];

const cartGoodCounterInBadge = document.querySelector('#cart-badge');
const cartGoodPrice = document.querySelector('#cart-price');
const cartGoodPriceInTitle = document.querySelector('#cart-popup-title');
const cartGoodFinalPrice = document.querySelector('#cart-popup-final-price');
const cartGoodImg = document.querySelector('#catr-img');
const resetGoodListButton = document.querySelector('#reset-list-button');

/**
 * Util for update element id
 */
function updateElementId(element, postfix) {
    element.id = `${element.id}-${postfix}`;
}

/**
 * Create and append good item
 */
function createAndAppendGoodItem(value, index) {
    const goodTemplate = document.querySelector('#cart-popup-product-template').cloneNode(true);

    updateElementId(goodTemplate, index);
    goodTemplate.classList.remove('cart__popup-product--template');

    const goodTemplateImg = goodTemplate.querySelector('#cart-popup-product-img');
    goodTemplateImg.src = value.imgUrl;
    updateElementId(goodTemplateImg, index);

    const goodTemplatePrice = goodTemplate.querySelector('#cart-popup-price');
    goodTemplatePrice.innerHTML = value.price;
    updateElementId(goodTemplatePrice, index)

    const goodTemplateDescription = goodTemplate.querySelector('#cart-popup-description');
    goodTemplateDescription.innerHTML = value.decription;
    updateElementId(goodTemplateDescription, index)

    const counterDecrement = goodTemplate.querySelector('#cart-popup-products-smaller');
    const counterNumber = goodTemplate.querySelector('#cart-popup-products-number');
    const counterIncrement = goodTemplate.querySelector('#cart-popup-products-bigger');
 
    counterNumber.value = value.count;

    updateElementId(counterIncrement, index);
    updateElementId(counterNumber, index);
    updateElementId(counterDecrement, index);
    
    /**
     * Callback for decrement count of good
     */
    function handleClickCounterDecrement() {
        if (counterNumber.value <= 1) return;

        counterNumber.value = --counterNumber.value;
        GOOD_LIST[index].count--;

        cartGoodFinalPrice.innerHTML = +cartGoodFinalPrice.innerHTML - GOOD_LIST[index].price;
        cartGoodPrice.innerHTML = cartGoodFinalPrice.innerHTML; 

        counterNumber.dispatchEvent(new Event('change')); 
    }
    
    counterDecrement.addEventListener('click', handleClickCounterDecrement); 

    /**
     * Callback for increment count of good
     */
    function handleClickCounterIncrement() {
        counterNumber.value = ++counterNumber.value;
        GOOD_LIST[index].count++;

        cartGoodFinalPrice.innerHTML = +cartGoodFinalPrice.innerHTML + GOOD_LIST[index].price;
        cartGoodPrice.innerHTML = cartGoodFinalPrice.innerHTML;

        counterNumber.dispatchEvent(new Event('change'));
    }
    
    counterIncrement.addEventListener('click', handleClickCounterIncrement);
   
    /**
     * Callback for change good count by input value
     */
    function handleCounterInput(event) {
        GOOD_LIST[index].count = event.target.value;

        event.target.dispatchEvent(new Event('change'));
    }

    counterNumber.addEventListener('input', handleCounterInput);
    
    /**
     * Callback for good price(count * price of good)
     */
    function handleCounterChange() {
        goodTemplatePrice.innerHTML = GOOD_LIST[index].count * GOOD_LIST[index].price;
    }

    counterNumber.addEventListener('change', handleCounterChange);

    const deleteItem = goodTemplate.querySelector('#cart-popup-del-product-icon');

    /**
     * Callback for delete good from goods list
     */
    function handleClickDeleteItem() {
        GOOD_LIST.splice(index, 1);
        render(GOOD_LIST);
    }
    
    deleteItem.addEventListener('click', handleClickDeleteItem);

    document.querySelector('#cart-popup-products-container').append(goodTemplate);
}

/**
 * Calculate final sum from prices of goods list 
 */
function calcFinalSum(arr) {
    let finalSum = 0;

    arr.forEach((goodItem) => {
        finalSum += goodItem.price;
    })

    return finalSum;
}

/**
 * Render goods list
 */
function render(goods) {
    const finalSum = calcFinalSum(goods);

    let container = document.querySelector('#cart-popup-products-container');

    container.innerHTML = '';

    cartGoodCounterInBadge.innerHTML = goods.length; 
    cartGoodPrice.innerHTML = finalSum;

    cartGoodPriceInTitle.innerHTML = goods.length;
    cartGoodFinalPrice.innerHTML = finalSum;

    goods.forEach(createAndAppendGoodItem);
}

/**
 * Add good to goods list
 */
function addItem(good) {
    GOOD_LIST.push({...good});
    render(GOOD_LIST);
}

/**
 * Callback on reset goods list button click
 */
const handleGoodListReset = () => {
    GOOD_LIST = [];
    render(GOOD_LIST);
}

resetGoodListButton.addEventListener('click', handleGoodListReset);

render(GOOD_LIST);

addItem(GOOD_TEASPOT);
