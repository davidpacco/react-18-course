/* eslint-disable react/prop-types */
export function Movies({ movies }) {
  return (
    <>
      <div className="movies">
        {
          movies?.map(movie => (
            <div className="movie" key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={`${movie.title} poster`} />
            </div>
          ))
        }
      </div>
    </>
  )
}