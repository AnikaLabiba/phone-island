//control spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//control phones result
const toggleSearchResult = displayStyle => {
    document.getElementById('search-results').style.display = displayStyle;
}
const showError = displayStyle => {
    document.getElementById('error-nullArray').style.display = displayStyle;
}

//taking search value
const searchPhone = () => {
    const searchText = document.getElementById('search-field').value
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.textContent = ''
    toggleSpinner('block')
    toggleSearchResult('none')
    showError('none')
    loadPhones(searchText)
    document.getElementById('search-field').value = ''
}
//loading phone info by name
const loadPhones = searchText => {
    if (searchText != '') {

        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data.slice(0, 20)))
    }
    else {
        toggleSpinner('none')
        showError('block')
    }
}
//displaying phones
const displayPhones = phones => {
    const searchresults = document.getElementById('phones')
    searchresults.textContent = ''
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.textContent = ''
    if (phones.length === 0) {
        showError('block')
        toggleSpinner('none')
    }
    else {

        phones.forEach(phone => {

            const div = document.createElement('col')

            div.innerHTML = `
                       <div class="col">
                            <div class="card">
                                <img src="${phone.image}" class="card-img-top w-75 mx-auto pt-3" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                                    <h6 class="card-text">Brand: ${phone.brand}</h6>
                                    <a onclick="loadDetail('${phone.slug}')" href="#" class="btn btn-outline-primary px-5">Details</a>
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
// loading phone details by id
const loadDetail = id => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}
//display phone details
const displayPhoneDetail = phone => {
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.textContent = ''
    const div = document.createElement('div')
    div.innerHTML = `
           <div class="card mb-3 w-75 mx-auto mt-5" style="max-width: 900px;">
                <div class="row g-0">
                    <div class="col-md-5 col-12 mx-auto my-auto ps-5">
                        <img src="${phone.image}" class="img-fluid rounded-start w-75 mx-auto" alt="...">
                    </div>
                    <div class="col-md-7 col-12 pe-3">
                        <div class="card-body">
                            <h5 class="card-title">Name: ${phone.name}</h5>
                            <p class="card-text">Released on: ${phone.releaseDate ? phone.releaseDate : 'not found'}</p>
                            
                            <h6>Main features:</h6>
                            <p class="card-text text-muted">
                               <span class="fw-bold">Storage:</span> ${phone.mainFeatures?.storage ? phone.mainFeatures.storage : 'not found'}<br>
                               <span class="fw-bold">Display size:</span> ${phone.mainFeatures?.displaySize ? phone.mainFeatures.displaySize : 'not found'}<br>
                               <span class="fw-bold">Chip Set:</span> ${phone.mainFeatures?.chipSet ? phone.mainFeatures.chipSet : 'not found'}<br>
                               <span class="fw-bold">Memory:</span> ${phone.mainFeatures?.memory ? phone.mainFeatures.memory : 'not found'}<br>
                               <span class="fw-bold">Sensors:</span> ${phone.mainFeatures?.sensors ? phone.mainFeatures.sensors : 'not found'}
                            </p>

                            <h6>Others:</h6>
                            <p class="card-text text-muted">
                               <span class="fw-bold">WLAN:</span> ${phone.others?.WLAN ? phone.others.WLAN : 'not found'}<br>
                               <span class="fw-bold">Bluetooth:</span> ${phone.others?.Bluetooth ? phone.others.Bluetooth : 'not found'}<br>
                               <span class="fw-bold">GPS:</span> ${phone.others?.GPS ? phone.others.GPS : 'not found'}<br>
                               <span class="fw-bold">NFC:</span> ${phone.others?.NFC ? phone.others.NFC : 'not found'}<br>
                               <span class="fw-bold">Radio:</span> ${phone.others?.Radio ? phone.others.Radio : 'not found'}<br>
                               <span class="fw-bold">USB:</span> ${phone.others?.USB ? phone.others.USB : 'not found'}<br>
                            </p>


                            
                            
                        </div>
                    </div>
                </div>
            </div> `;
    phoneDetails.appendChild(div)
}

