function createCard(object) {
    let baseUrl = window.location.href
    console.log(baseUrl)
    let detailsPagePath;
    if (baseUrl.includes('index.html')) {
        detailsPagePath = './assets/pages/details.html';
    } else {
        detailsPagePath = './details.html';
    }
    
    return `<div class="col">
            <div class="card h-100" style="width: 17rem!important">
            <img src="${object.image}" class="card-img-top object-fit-cover" alt="img">
            <div class="card-body">
                <h5 class="card-title">${object.name}</h5>
                <p class="card-text">${object.description}</p>
                <div class="info">
                    <p>$${object.price}</p>
                    <a href="${detailsPagePath}?id=${object._id}" class="details">Details</a>
                </div>
            </div>
            </div>
            </div>`
}

export function printTemplate(array, elementoHTML) {
    let template = ""
    for (let event of array) {
        template += createCard(event)
    }

    elementoHTML.innerHTML += template
}

function createCheckbox(category) {
    return ` <label for="${category}">${category}</label>
            <input type="checkbox" name="category" id="${category}" value="${category}">
            `
}

export function showCheckbox(array, elementoHTML) {

    for (let category of array) {
        elementoHTML.innerHTML += createCheckbox(category)
    }

}

export function clear(elementoHTML) {
    elementoHTML.innerHTML = ""
}

export function displayError(elementoHTML) {
    elementoHTML.innerHTML = `<H5>There Are No Coincidences</H5>`
}