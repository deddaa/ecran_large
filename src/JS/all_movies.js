fetch("./data/films.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((movie) => {
      addArr(movie);
    });
    initApp()
  })
  .catch((error) => {
    console.error("Erreur de chargement du fichier JSON :", error);
  });

  function initApp() {
    const groupeMovies = triGender()

    carouselContainer(groupeMovies)

    allMovies()
}