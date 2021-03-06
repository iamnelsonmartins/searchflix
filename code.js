const results = document.querySelector("#results")
const url = 'https://gist.githubusercontent.com/iamnelsonmartins/39f1ba049c8c9c1447db59d39415f9c6/raw/0262f2356ff7326037c82fd5f0cf0ea413c2575a/searchflix.json'

const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

const onSearch = () => {
    const searchTerm = document.querySelector("#searchBar").value
    const buttonLoading = document.querySelector(".search")
    const input = document.querySelector("#searchBar")

    fetch(url)
        .then(response => response.json(),
            buttonLoading.classList.add("is-loading"),
            input.setAttribute("readonly", ""))
        .then(response => {
            const list = response.filter(isSearched(searchTerm)).map(data => {
                results.style.visibility = 'visible'
                return `
                    <div key=${data.id}>
                        <span>
                            <a href="${data.url}" target="_blank" rel="noopener noreferrer">${data.title}</a>
                        </span>
                    </div>
                `
            }).join('')
            buttonLoading.classList.remove("is-loading")
            input.removeAttribute("readonly", "")
            results.innerHTML = list;
        });
}


/* begin begin Back to Top button  */
const goTopBtn = document.querySelector('.backToTop');

const trackScroll = () => {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        goTopBtn.style.visibility = "visible"
    }
    if (scrolled < coords) {
        goTopBtn.style.visibility = "hidden"
    }
}

const backToTop = () => {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -window.innerHeight);
        setTimeout(backToTop, 0);
    }
}

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);
