import axios from "axios";
import { formatManga } from "./formatManga";

const BASE_URL = "https://api.jikan.moe/v4";

/* ================= REQUEST WITH RETRY ================= */
/*
  این تابع کمکی، مسئول فرستادن درخواست به Jikan همراه با
  قابلیت تلاش دوباره (retry) در صورت بروز خطاست.
  همه‌ی توابع پایین از همین یک تابع استفاده می‌کنند.
*/

async function requestWithRetry(url, params = {}, retries = 2) {
  try {
    const res = await axios.get(url, {
      params,
      timeout: 15000,
    });

    return res.data;
  } catch (error) {
    console.log("Jikan request failed:", error.message);

    if (retries > 0) {
      console.log(`Retrying... ${retries} attempt(s) left`);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      return requestWithRetry(url, params, retries - 1);
    }

    throw error;
  }
}

/* ================= SEARCH MANGA ================= */
/*
  جستجوی منگا بر اساس یک متن.
  استفاده می‌شود در: SearchBox.jsx و Search.jsx
*/

export async function searchManga(query, limit) {
  const data = await requestWithRetry(`${BASE_URL}/manga`, {
    q: query,
    limit,
  });

  return data.data.map(formatManga);
}

/* ================= GET MANGA BY ID ================= */
/*
  گرفتن اطلاعات کامل یک منگای خاص با شناسه‌ی (id) آن.
  استفاده می‌شود در: MangaDetail.jsx
*/

export async function getMangaById(id) {
  const data = await requestWithRetry(`${BASE_URL}/manga/${id}`);

  return formatManga(data.data);
}

/* ================= GET TRENDING MANGA ================= */
/*
  گرفتن لیست منگاهای ترند بر اساس فیلتر و شماره صفحه.
  استفاده می‌شود در: Trendings.jsx
*/

export async function getTrendingManga(filter, page) {
  let apiUrl = "";

  if (filter === "completed") {
    apiUrl = `${BASE_URL}/manga?status=complete&page=${page}&limit=20`;
  } else if (filter === "popular") {
    apiUrl = `${BASE_URL}/manga?order_by=popularity&page=${page}&limit=20`;
  } else if (filter === "oneshot") {
    apiUrl = `${BASE_URL}/manga?type=oneshot&page=${page}&limit=20`;
  }

  const data = await requestWithRetry(apiUrl);

  return {
    manga: data.data?.map(formatManga) || [],
    totalPages: data.pagination?.last_visible_page || 1,
  };
}

/* ================= SEARCH SINGLE TITLE ================= */
/*
  جستجوی یک عنوان خاص و گرفتن فقط اولین نتیجه.
  استفاده می‌شود در: ai.js (برای پیدا کردن منگای پیشنهادی AI)
*/

export async function searchMangaByTitle(title) {
  try {
    const data = await requestWithRetry(
      `${BASE_URL}/manga`,
      {
        q: title,
        limit: 1,
      },
      0,
    );

    const manga = data.data?.[0];

    if (!manga) {
      return null;
    }

    return {
      ...formatManga(manga),
      isFallback: false,
    };
  } catch (error) {
    console.error(`Jikan search failed for "${title}".`);

    return null;
  }
}