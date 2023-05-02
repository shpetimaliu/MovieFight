const autoComplete = ({ html, renderMov, onOptionSec, inputVal, fetchData }) => {
      
         html.innerHTML = `
            <label><b>Search for movie:</b></label>
            <input class="input" />
            <div class="dropdown">
                <div class="dropdown-menu">
                    <div class="dropdown-content results"></div>
                </div>
            </div>
        `;


        const input = html.querySelector('input');
        const dropdown = html.querySelector('.dropdown');
        const resultWrapp = html.querySelector('.results');

        const onInput = async event => {
            const movies = await fetchData(event.target.value);
         
             if(!movies.length) {
                 dropdown.classList.remove('is-active');
                 return;
             }
         
            resultWrapp.innerHTML = '';
            dropdown.classList.add('is-active');
             for (let movie of movies) {
                 const option = document.createElement('a');
         
                 option.classList.add('dropdown-item');
                 option.innerHTML = renderMov(movie);
         
                //  console.log(movie)
                 option.addEventListener('click', () => {
                     option.classList.remove('is-active');
                     input.value = inputVal(movie);
                     onOptionSec(movie);
                 })
         
                 resultWrapp.appendChild(option);
             }
         };

        input.addEventListener('input', debounce(onInput, 500));


        document.addEventListener('click', event => {
            if (!html.contains(event.target)) {
                dropdown.classList.remove('is-active');
            } 
        })
};