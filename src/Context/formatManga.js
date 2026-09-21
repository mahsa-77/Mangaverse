export function formatManga(raw) {
  const {
    mal_id,
    title,
    images,
    genres,
    authors,
    demographics,
    status,
    score,
    synopsis,
    members,
    favorites,
  } = raw;

  return {
    id: mal_id,
    title,
    image: images?.jpg?.large_image_url,
    thumbnail: images?.jpg?.image_url,
    genres: genres || [],
    authors: authors || [],
    demographics: demographics?.map((item) => item.name.toLowerCase()) || [],
    status,
    score,
    synopsis,
    members,
    favorites,
  };
}