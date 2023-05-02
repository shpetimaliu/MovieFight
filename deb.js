const debounce = (func, delay) => {
    let timeoutID;
    return(...args) => {
        if(timeoutID) {
        clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    };
};

const autoComConfig = {
    renderMov(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `
    },

    inputVal(movie){
        return movie.Title;
    },

    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: '6fef528b',
                s: searchTerm
            }
        });
    
        if(response.data.Error) {
            return [];
        }
    
        let res = response.data.Search;
        return res;
        // console.log(res);
    }
};

autoComplete({
    ...autoComConfig,
    html: document.querySelector('#left-autocomplete'),

    onOptionSec(movie){
        // document.querySelector('.tutorial').classList.add('is-hidden')
        onMovie(movie, document.querySelector('#left-summary'), 'left')
    },
});

autoComplete({
    ...autoComConfig,
    html: document.querySelector('#right-autocomplete'),

    onOptionSec(movie){
        // document.querySelector('.tutorial').classList.add('is-hidden');
        onMovie(movie, document.querySelector('#right-summary'), 'right')
    },
});

let leftMovie;
let rightMovie;

const onMovie = async (movie, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '6fef528b',
            i: movie.imdbID
        }
    });

    summaryElement.innerHTML = movieWidget(response.data);
    // console.log(response.data)

    if(side == 'left'){ 
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie){
        runComp();
    }
};

const runComp = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStats, index) => {
        const rightStats = rightSideStats[index];

        const leftStatsVal = parseInt(leftStats.dataset.value); 
        const rightStatsVal = parseInt(rightStats.dataset.value);

        if(rightStatsVal > leftStatsVal) {
            // Method 1;

            // leftStats.classList.remove('is-warning');
            // leftStats.classList.add('is-danger');
            
            // Method 2;
            leftStats.classList.replace('is-warning', 'is-danger');

        } else {
            // Method 1;

            // rightStats.classList.remove('is-warning');
            // rightStats.classList.add('is-danger');
            
            // Method 2;
            
            rightStats.classList.replace('is-warning', 'is-danger');
        }
    }); 
};


const movieWidget = (movDetail) => {

    const dollars = parseInt(
        movDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
    );
    const metascore = parseInt(movDetail.Metascore);
    const imdbRating = parseFloat(movDetail.imdbRating);
    const imdbVotes = parseInt(movDetail.imdbVotes.replace(/,/g, ''));
    const Awards = movDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);

        if(isNaN(value)) {
            return prev; 
        } else {
            return prev + value;
        }
    }, 0);

    console.log(Awards);
    // const MovAwards = movDetail.Awards === 'N/A' ? 'Not Found!' : movDetail.Awards;  = From N/A to Not Found!

    return `
        <article class="media" > 
         <figure class="media-left">
            <p class="image">
                <img src="${movDetail.Poster}" />
            </p>
         </figure>
            <div class="media-body">
                <div class="content">
                    <h1>${movDetail.Title}</h1>
                    <h4>${movDetail.Genre}</h4>
                    <p>${movDetail.Plot}</p>
                    <p>Actor: <b>${movDetail.Actors}</b></p>
                </div>
             </div>
        </article>

        <article data-value=${Awards} class="notification is-warning">
            <p class="title">${movDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-warning">
            <p class="title">${movDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-warning">
            <p class="title">${movDetail.Metascore}</p>
            <p class="subtitle">Meta Score</p>
        </article>
        <article data-value=${imdbRating} class="notification is-warning">
            <p class="title">${movDetail.imdbRating}</p>
            <p class="subtitle">imdb Rating</p>
        </article>
        <article class="notification is-warning">
            <p class="title">${movDetail.imdbVotes}</p>
            <p class="subtitle">imdb Votes</p>
        </article>
    `
    console.log(dollars, metascore, imdbRating, imdbVotes); 

}



