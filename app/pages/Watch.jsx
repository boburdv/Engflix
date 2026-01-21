// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// export default function Watch() {
//   const router = useRouter();
//   const { guid } = router.query;

//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!guid) return;

//     async function fetchMovie() {
//       try {
//         const bunnyRes = await fetch("/api/bunny");
//         const videos = await bunnyRes.json();
//         const video = videos.find((v) => v.guid === guid);

//         const tmdbRes = await fetch(`/api/tmdb?guid=${guid}`);
//         const tmdb = await tmdbRes.json();

//         const runtime = tmdb.runtime;
//         let duration = "N/A";
//         if (runtime) {
//           const hours = Math.floor(runtime / 60);
//           const minutes = runtime % 60;
//           duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
//         }

//         const cast = tmdb.credits?.cast?.slice(0, 5) || [];
//         const trailer = tmdb.videos?.results?.find((v) => v.type === "Trailer" && v.site === "YouTube");

//         setMovie({
//           title: tmdb.title,
//           year: tmdb.release_date ? tmdb.release_date.slice(0, 4) : "N/A",
//           duration,
//           rating: tmdb.vote_average ? tmdb.vote_average.toFixed(1) : "N/A",
//           overview: tmdb.overview,
//           poster: tmdb.poster_path ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}` : "",
//           cast,
//           trailer: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
//           bunnyVideo: video ? `https://iframe.mediadelivery.net/play/582908/${video.guid}` : null,
//         });

//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     }

//     fetchMovie();
//   }, [guid]);

//   if (loading) return <div>Loading...</div>;
//   if (!movie) return <div>Movie not found</div>;

//   return (
//     <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
//       {movie.poster && <img src={movie.poster} alt={movie.title} style={{ width: "100%", borderRadius: "8px" }} />}
//       <h1>
//         {movie.title} ({movie.year})
//       </h1>
//       <p>Duration: {movie.duration}</p>
//       <p>Rating: {movie.rating}</p>
//       <p>{movie.overview}</p>

//       {movie.cast.length > 0 && (
//         <div>
//           <h3>Cast:</h3>
//           <ul>
//             {movie.cast.map((actor) => (
//               <li key={actor.id}>
//                 {actor.name} as {actor.character}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {movie.trailer && (
//         <div>
//           <h3>Trailer:</h3>
//           <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
//             Watch on YouTube
//           </a>
//         </div>
//       )}

//       {movie.bunnyVideo && (
//         <div style={{ marginTop: "1rem" }}>
//           <h3>Bunny Video:</h3>
//           <iframe src={movie.bunnyVideo} width="100%" height="500" allowFullScreen title={movie.title}></iframe>
//         </div>
//       )}
//     </div>
//   );
// }
