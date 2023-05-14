## MovieFight

[![ALIU|Shpetim](https://bdesign-agency.com/wp-content/uploads/2023/04/dTxpPi9lDf.thumb_-1.png)](https://codepen.io/shpetimaliu)

This project consists of a JavaScript code that implements a movie comparison web application. The application fetches data from the OMDb API (Open Movie Database) using Axios library and displays it in a visually pleasing manner using Bulma CSS framework.

The main function is `autoComplete` which provides auto-complete functionality for the search bar using a debounce function to limit the number of API requests. The debounce function takes in two arguments, `func` which is the function to execute and `delay` which is the time in milliseconds to wait before executing the function.

The `autoComplete` function takes in an object that specifies the configuration for the auto-complete feature. The object contains three functions, `renderMov`, `inputVal`, and `fetchData`. The `renderMov` function returns the HTML markup for the movie result, `inputVal` function returns the title of the movie, and `fetchData` function retrieves data from the OMDb API.

The code then calls `autoComplete` function twice with different configurations and attaches them to separate HTML elements to create two separate search bars. Whenever a user selects a movie from the auto-complete results, the `onMovie` function is called with the selected movie's details as a parameter. This function retrieves the selected movie's details from the OMDb API and displays the movie's details on the webpage. It then updates the leftMovie or rightMovie variable depending on the `side` parameter passed in.

The `runComp` function compares the two movies' data and highlights the data with the higher value using CSS. Finally, the `movieWidget` function takes the OMDb API's data as a parameter and generates HTML code to display the selected movie's details.
