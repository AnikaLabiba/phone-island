//control spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//control phones result
const toggleSearchResult = displayStyle => {
    document.getElementById('search-results').style.display = displayStyle;
}
const showError = displayStyle => {
    document.getElementById('error').style.display = displayStyle;
}

//taking search value
const searchPhone = () => {
    const searchText = document.getElementById('search-field').value
    toggleSpinner('block')
    toggleSearchResult('none')
    showError('none')
    loadPhones(searchText)
    document.getElementById('search-field').value = ''
}
//loading phone info by name
const loadPhones = searchText => {
    if (searchText == '') {
        console.log('sorry')
    }
    else {
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
    }

}
//displaying phones
const displayPhones = phones => {
    console.log(phones)
    const searchresults = document.getElementById('phones')
    searchresults.textContent = ''
    if (phones.length === 0) {
        showError('block')
        toggleSpinner('none')
    }
    else {

        phones.forEach(phone => {
            //console.log(phone)
            const div = document.createElement('col')

            div.innerHTML = `
                       <div class="col">
                            <div class="card">
                                <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                                    <h6 class="card-text">Brand: ${phone.brand}</h6>
                                    <a href="#" class="btn btn-outline-primary px-5">Details</a>
                                </div>
                            </div>
                        </div>
                        `;
            searchresults.appendChild(div)
        })

        toggleSearchResult('block')
        toggleSpinner('none')
    }

}