/*
The MA3 submission for Javascript 1.


Written by Jamie Isaksen for Noroff.

*/


/********************************************* CONFIGURATION **********************************************/


const config = {

  RAWG: `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating`,

};





/********************************************* SETUP FUNCTIONS **********************************************/


/*
Renders content the React way.
+ Appends content to each element.
+ Deletes element from the DOM.
*/
const render = async (content, nodes, props = {}) => {

  //List of all nodes.
  const elements = [...document.querySelectorAll(nodes)];

  //Handle each node.
  elements.forEach((e) => {

    //Return nothing if node already is present.
    if (!e) return;

    //Check if content should be appended.
    if (props.append) return (e.innerHTML += content);

    //Check if content should be deleted.
    if (props.delete) return e.parentNode.removeChild(e);

    //Don't render if content is null.
    if (content !== null) return (e.innerHTML = content);
  });
};





/********************************************* QUESTION 2 **********************************************/


/*
Get games.
*/
const getGames = async () => {
  try {
    //Call the RAWG API endpoint to get games.
    const res = await fetch(config.RAWG);
    const games = await res.json();
    const results = games.results;

    //Remove the loading element once data is present.
    render(null, `.loading`, { delete: true });

    //Handle each result.
    results.slice(0, 8).forEach((r) => {
      //Render content & append it to the list.
      render(
        `
        <li class="col-span-1 p-6 rounded-md shadow-3xl text-center">
          <h3>${r.name}</h3>
          <p><b>${r.rating}</b> rating</p>
          <p><b>${r.tags.length}</b> tags</p>
        </li>
      `,
        `ul`,
        { append: true }
      );
    });
  } catch (e) {
    console.log(e);
    return render(`Oops! Something went wrong... sorry!`, `.loading`);
  }
};

getGames();