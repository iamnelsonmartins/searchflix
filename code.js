const results = document.querySelector("#results")
const url = 'https://gist.githubusercontent.com/nelmarti/39f1ba049c8c9c1447db59d39415f9c6/raw/0262f2356ff7326037c82fd5f0cf0ea413c2575a/searchflix.json'

const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

const onSearch = () => {
    const searchTerm = document.querySelector("#searchBar").value
    const buttonLoading = document.querySelector(".button")
    fetch(url)
        .then(response => response.json())
        .then(response => {
            buttonLoading.classList.add("is-loading")
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
            results.innerHTML = list
        });
    buttonLoading.classList.remove("is-loading")
}

