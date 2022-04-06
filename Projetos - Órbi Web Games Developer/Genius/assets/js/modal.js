let btnSaiba = document.querySelector('#saiba')
let divSaiba = document.querySelector('.saibaClass')

btnSaiba.addEventListener('click', function() {
    if (divSaiba.style.display === 'block') {
        divSaiba.style.display = 'none'
    } else {
        divSaiba.style.display = 'block'
    }
})