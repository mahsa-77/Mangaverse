import axios from "axios";
import { searchMangaByTitle } from "../Context/apiOfProgram";

const SERVER_URL = "http://localhost:3001";

/* ================= DELAY ================= */

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/* ================= FALLBACK MANGA ================= */

function createFallbackManga(
  title,
  index = 0,
  reason = "Recommended by AI"
) {
  return {
    id: null,
    fallback_id: `fallback-${title}-${index}`,
    title,
    reason,
    score: null,
    image: null,
    isFallback: true,
  };
}

/* ================= MOOD ================= */

export async function getMoodRecommendations(mood) {
  const response = await axios.post(`${SERVER_URL}/api/recommend`, {
    mode: "mood",
    mood,
  });

  return response.data.recommendations || [];
}

/* ================= LIBRARY ================= */

export async function getLibraryRecommendations(library) {
  const titles = library
    .map((item) => {
      return item.title;
    })
    .filter(Boolean);

  const response = await axios.post(`${SERVER_URL}/api/recommend`, {
    mode: "library",
    library: titles,
  });

  return response.data.recommendations || [];
}


/* ================= SEARCH TITLES ================= */

export async function findMangaByTitles(titles) {
  const mangaList = [];

  for (let index = 0; index < titles.length; index++) {
    const item = titles[index];

    const title = typeof item === "string" ? item : item.title;

    const reason = typeof item === "object" ? item.reason : "Recommended by AI";

    const manga = await searchMangaByTitle(title);

    if (manga) {
      /*
        اطلاعات Jikan + دلیل AI
        با هم نگه داشته می‌شوند.
      */

      mangaList.push({
        ...manga,

        reason,
      });
    } else {
      /*
        اگر Jikan خراب باشد،
        حداقل عنوان و دلیل AI نمایش داده می‌شود.
      */

      mangaList.push(createFallbackManga(title, index, reason));
    }

    await delay(500);
  }

  return mangaList;
}

/* ================= RANDOM ================= */

export async function getRandomManga(library = []) {
  const libraryTitles = library
    .map((item) => {
      return item.title;
    })
    .filter(Boolean);

  const response = await axios.post(`${SERVER_URL}/api/recommend`, {
    mode: "random",
    library: libraryTitles,
  });

  const recommendation = response.data.recommendations?.[0];

  if (!recommendation) {
    return null;
  }

  const title =
    typeof recommendation === "string" ? recommendation : recommendation.title;

  const reason =
    typeof recommendation === "object"
      ? recommendation.reason
      : "Recommended by AI";

  const manga = await searchMangaByTitle(title);

  if (manga) {
    return {
      ...manga,

      reason,
    };
  }

  return createFallbackManga(title, 0, reason);
}
