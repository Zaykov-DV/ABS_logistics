// slider
$(document).ready(function(){
    // 1st slider
    $('.swiper-slides').slick({
        autoplaySpeed: 3000,
        arrows: false
    });
        $('.swiper__button-prev').click(function(){
        $('.swiper-slides').slick('slickPrev');
    })
        $('.swiper__button-next').click(function(){
        $('.swiper-slides').slick('slickNext');
    })
    // 2nd Slider
    $('.news__cards').slick({
        autoplaySpeed: 3000,
        arrows: false,
        infinite: true,
        loop: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1260,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });
        $('.news__button-prev').click(function(){
        $('.news__cards').slick('slickPrev');
    })
        $('.news__button-next').click(function(){
        $('.news__cards').slick('slickNext');
})
});


// маска телефона
$(".feedback__input-tel").mask("+7(999)999-99-99");


// popup окно
const popup = document.getElementById("popupForm")
const btn = document.getElementById("btnContact")
const span = document.getElementsByClassName("close")[0]

// открытие по клику на кнопку
btn.onclick = () => popup.style.display = "block"
// закрытие
span.onclick = () => popup.style.display = "none"
// закрытие за областью
window.onclick = (event) => {
    if (event.target === popup) popup.style.display = "none";
}


// калькулятор доставки

// SELECT
const fromWhere = document.getElementById('fromWhere')
const whereTo = document.getElementById('whereTo')
// RADIO
const delivery = document.getElementsByClassName('option__input')
// CHECKBOX
const insurance = document.querySelector('#insurance')
// BUTTON
const btnCountTotal = document.getElementById('buttonTotal')
const totalPrice = document.querySelector('#total-price')


// ======== ВЕС ГРУЗА ========
const weight = document.querySelector('#weight')
let weightTotal = document.querySelector('.weight-total').innerHTML = weight.value;

weight.onchange = () => {
    weightTotal = document.querySelector('.weight-total').innerHTML = weight.value;
}

// Расчет стоимости
btnCountTotal.onclick = (event) => {
    event.preventDefault()
    let totalCost
    /// получение данных из селект
    const cityFrom = fromWhere.options[fromWhere.selectedIndex].value;
    const cityTo = whereTo.options[whereTo.selectedIndex].value;
    /// Расстояние
    let distance
    if ((cityFrom === 'ekb' && cityTo === 'msc') || (cityFrom === 'msc' && cityTo === 'ekb')) distance = 1795
    if ((cityFrom === 'spb' && cityTo === 'msc') || (cityFrom === 'msc' && cityTo === 'spb')) distance = 712
    if ((cityFrom === 'ekb' && cityTo === 'spb') || (cityFrom === 'spb' && cityTo === 'ekb')) distance = 2301
    if (cityFrom === cityTo) alert('Поля "откуда" и "куда" не могут быть одинаковыми')

    // доставка из радио
    if (delivery[0].checked) {
        delivery.value = 50 * weightTotal
    } else {
        delivery.value = 0
    }
    // страховка из чекбокс
    (insurance.checked) ? insurance.value = 5 * weightTotal : insurance.value = 0
    // ИТОГО
    totalCost =  (distance * (weightTotal * 0.2)) + (weightTotal * delivery.value ) + (weightTotal * insurance.value)

    console.log (`Расстояние ${distance} Вес ${weightTotal}  доставка ${delivery.value} страховка ${insurance.value}`)
    console.log (`(Расстояние ${distance} * Вес ${weightTotal})  + (Вес ${weightTotal} * доставка ${delivery.value}) + (Вес ${weightTotal} * страховка ${insurance.value})`)
    // Передача в HTML
    totalPrice.innerHTML = Math.round(totalCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

