const search = document.querySelector('button')
search.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('#searchInput')
    const location = document.querySelector('#location')
    const forecast = document.querySelector('#forecast')
    // url changed to give relative address
    const url = '/weather?address=' + (searchInput.value?searchInput.value:'')

    location.innerHTML = 'LOADING...'
    forecast.innerHTML = ''
    if(location.classList.value.search('error-highlight') > -1)
        location.classList.toggle('error-highlight')

    fetch(url)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                if(location.classList.value.search('error-highlight') === -1)
                    location.classList.toggle('error-highlight')
                location.innerHTML = data.error
                forecast.innerHTML = ''
            } else {
                if(location.classList.value.search('error-highlight') > -1)
                    location.classList.toggle('error-highlight')
                location.innerHTML = data.location
                forecast.innerHTML = data.forecast
            }
        })
    })
})