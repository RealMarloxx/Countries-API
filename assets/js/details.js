const cardsArea = document.querySelector('.cards');
const countryName = localStorage.getItem('countryName');
const countryAPI = 'https://restcountries.com/v3.1/all';

let cardInfos = {
    img:'img', 
    countryName:'countryName', 
    countryPopulation: 'countryPopulation', 
    countryRegion: 'countryRegion',
    countrySubRegion: 'subRegion',
    countryCapital: 'countryCapital',
    domain: 'domain',
    currencies: 'currencies',
    languanges: 'languanges'
    }

const getAPI = async url => {
    const response = await fetch(url)
    try {
        if(!response.ok){
            throw new Error('Fetch Unsuccessful')
        }
        const json = await response.json()
        return json;
    } catch ({ name, message }) {
        alert(`${name} ${message}`)
    }
}

const openAPI = async url => {
    const api = await getAPI(url);
    return api;
}

const createElement = (tag, className) => {
    const el = document.createElement(tag);
    el.className = (className);
    return el;
}

const createCard = ({ img, countryName, countryPopulation, countryRegion, countrySubRegion, countryCapital, domain, currencies, languages }) => {
    const imgArea = createElement('div', 'img-area');
    const cardImg = createElement('img', 'card-img');
    const infosArea = createElement('div', 'card-area flex-column flex-wrap');
    const countrytitle = createElement('h2', 'common-name');
    const nativeName = createElement('p', 'name');
    const population = createElement('p', 'population');
    const region = createElement('p', 'region');
    const subRegion = createElement('p', 'sub-region');
    const capital = createElement('p', 'capital');
    const countryDomain = createElement('p','domain');
    const countryCurrencies = createElement('p', 'currencies');
    const countryLanguages = createElement('p', 'languages');

    
    cardImg.setAttribute('src', img);

    countrytitle.innerHTML = `<strong>${countryName}</strong>`
    nativeName.innerHTML = textInfo('Native Name', countryName);
    population.innerHTML = textInfo('Population', countryPopulation);
    region.innerHTML = textInfo('Region', countryRegion);
    subRegion.innerHTML = textInfo('Sub-Region', countrySubRegion);
    capital.innerHTML = textInfo('Capital', countryCapital);
    countryCurrencies.innerHTML = `<strong>Currencies</strong>: ${currencies}`;
    countryLanguages.innerHTML = `<strong>Languages</strong>: ${languages}`;
    countryDomain.innerHTML = `<strong>Top Level Domain</strong>: ${domain}`

    imgArea.style.width = '30%';
    imgArea.style.heigth = '16rem';

    infosArea.style.maxHeight = '50px';
    infosArea.style.width = '60%';



    infosArea.appendChild(countrytitle);
    infosArea.appendChild(nativeName);
    infosArea.appendChild(population);
    infosArea.appendChild(region);
    infosArea.appendChild(subRegion);
    infosArea.appendChild(capital);
    infosArea.appendChild(countryDomain);
    infosArea.appendChild(countryCurrencies);
    infosArea.appendChild(countryLanguages);

    imgArea.appendChild(cardImg);
    cardsArea.appendChild(imgArea);
    cardsArea.append(infosArea);
}

const textInfo = (textTile, info) => {
    const el = `<strong>${textTile}</strong>: ${info}`
    return el;
}

const onload = async (api) => {
    const responses = await openAPI(api);
    const cardInEvidency = responses.filter((_, index) => responses[index].name.common === countryName);
    const data = cardInEvidency[0];

    data.languages = responses.filter((_, index) => responses[index].name.common === countryName);
    data.languages.forEach((_,index) => {
        for (const key in responses[index].languages) {
            data.languages[key] = responses[index].languages[key];
        }
    });

    let languages = "";
    for (const key in data.languages) {
        languages = data.languages[key];
    }

    data.currencies = responses[0].currencies;
    for (const key in responses[0].currencies) {
        data.currencies[key] = responses[0].currencies[key];
    }

    let currencies = "";
    for (const key in data.currencies) {
        currencies += data.currencies[key].name;
    }


    console.log(data);

    createCard({
        img:data.flags.svg,
        countryName:data.name.common, 
        countryPopulation:data.population,
        countryRegion:data.region,
        countrySubRegion:data.subregion,
        countryCapital:data.capital,
        domain: data.tld,
        currencies:currencies,
        languages:languages
    })
}

onload(countryAPI);


