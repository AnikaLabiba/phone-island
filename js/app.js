//control spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//control meals result
const toggleSearchResult = displayStyle => {
    document.getElementById('search-results').style.display = displayStyle;
}

//taking search value
const searchPhone = () => {
    const searchText = document.getElementById('search-field').value
    toggleSpinner('block')
    toggleSearchResult('none')
    loadPhones(searchText)
    searchText.value = ''
}
//loading phone info by name
const loadPhones = searchText => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}
//displaying phones
const displayPhones = phones => {
    const searchresults = document.getElementById('phones')
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('col')
        //div.classList.add('phone')
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