import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


/* ================= ENV CHECK ================= */

if (!process.env.ARVAN_API_KEY) {
  console.error(
    "ARVAN_API_KEY is missing in the .env file."
  );
}

if (!process.env.ARVAN_BASE_URL) {
  console.error(
    "ARVAN_BASE_URL is missing in the .env file."
  );
}


/* ================= OPENAI CLIENT ================= */

const client = new OpenAI({

  apiKey: process.env.ARVAN_API_KEY,

  baseURL: process.env.ARVAN_BASE_URL,

});


/* ================= SERVER TEST ================= */

app.get("/", (req, res) => {

  res.send(
    "Server is running..."
  );

});


/* ================= AI TEST ================= */

app.get("/test-ai", async (req, res) => {

  try {

    const response =
      await client.chat.completions.create({

        model: "GPT-4.1-Mini",

        messages: [
          {
            role: "user",
            content:
              "فقط بنویس سلام دنیا",
          },
        ],

      });


    res.json({

      message:
        response.choices[0]
          .message.content,

    });


  } catch (error) {

    console.error(
      "AI Test Error:"
    );

    console.error(
      error.message
    );


    res.status(500).json({

      error:
        "AI connection failed.",

      details:
        error.message,

    });

  }

});



/* ================= TRANSLATE ================= */

app.post(
  "/api/translate",
  async (req, res) => {

    try {

      const { text } =
        req.body;


      if (
        !text ||
        text.trim() === ""
      ) {

        return res.status(400).json({

          error:
            "Text is required.",

        });

      }


      const response =
        await client.chat.completions.create({

          model:
            "GPT-4.1-Mini",


          messages: [

            {

              role:
                "system",

              content:

`
You are a translator.

Translate the user's manga synopsis into natural Persian.

Return only the Persian translation.
Do not add explanations.
`

            },


            {

              role:
                "user",

              content:
                text,

            }

          ]

        });



      res.json({

        translated:
          response
          .choices[0]
          .message
          .content
          .trim(),

      });



    } catch(error) {


      console.error(
        "Translation Error:"
      );

      console.error(
        error.message
      );


      res.status(500).json({

        error:
          "Translation failed.",

        details:
          error.message,

      });

    }

  }

);



/* ================= CLEAN JSON ================= */

function cleanJsonResponse(content) {

  return content

    .replace(/```json/gi, "")

    .replace(/```/g, "")

    .trim();

}




/* ================= RECOMMENDATION ================= */

app.post(
  "/api/recommend",
  async (req, res) => {


    try {


      const {
        mode,
        mood,
        library
      } = req.body;



      let userMessage = "";

      let recommendationCount = 5;



      /* ---------- Mood Mode ---------- */


      if (mode === "mood") {


        if (
          !mood ||
          mood.trim() === ""
        ) {

          return res.status(400).json({

            error:
              "Mood is required.",

          });

        }



        userMessage =

`
The user described this mood or request:

${mood}

Recommend exactly 5 manga that match this request.
`;

      }




      /* ---------- Library Mode ---------- */


      else if (mode === "library") {


        if (
          !Array.isArray(library) ||
          library.length === 0
        ) {

          return res.status(400).json({

            error:
              "Library is empty.",

          });

        }



        userMessage =

`
The user has these manga in their library:

${library.join(", ")}


Analyze the user's reading taste.


Recommend exactly 5 different manga based on this library.


Do not recommend manga already in the library.
`;

      }




      /* ---------- Random Mode ---------- */


      else if (mode === "random") {


        recommendationCount = 1;


        userMessage =

`
Recommend exactly 1 random manga.

Choose an interesting manga from any genre.

Do not recommend these saved manga:

${
Array.isArray(library)
?
library.join(", ")
:
"No saved manga"
}

`;

      }




      else {


        return res.status(400).json({

          error:
            "Invalid recommendation mode.",

        });

      }




      const response =
        await client.chat.completions.create({


          model:
            "GPT-4.1-Mini",



          response_format: {

            type:
              "json_object",

          },



          messages: [

            {


              role:
                "system",



              content:

`
You are an expert manga recommendation assistant.


Rules:

- Recommend only manga.
- Never recommend anime.
- Use official English or romanized manga titles.
- Titles must exist on MyAnimeList.
- Do not recommend duplicate titles.
- Return only valid JSON.
- Write a short reason for every recommendation.


Use exactly this JSON format:


{
  "recommendations": [
    {
      "title": "Manga title",
      "reason": "Why this manga matches the user."
    }
  ]
}

`

            },


            {


              role:
                "user",

              content:
                userMessage,

            }


          ]

        });




      const content =
        response
        .choices[0]
        .message
        .content;



      if (!content) {


        return res.status(500).json({

          error:
            "AI returned an empty response.",

        });


      }




      const cleanedContent =
        cleanJsonResponse(content);




      const result =
        JSON.parse(cleanedContent);




      if (
        !Array.isArray(
          result.recommendations
        )
      ) {


        return res.status(500).json({

          error:
            "Invalid AI response.",

        });

      }




      const recommendations =

        result.recommendations

        .filter((item) => {

          return (

            item.title &&

            item.title.trim() !== ""

          );

        })


        .slice(
          0,
          recommendationCount
        );





      if (
        recommendations.length === 0
      ) {


        return res.status(500).json({

          error:
            "No manga recommendation found.",

        });


      }




      res.json({

        recommendations,

      });



    } catch(error) {


      console.error(
        "Recommendation Error:"
      );


      console.error(
        error.message
      );



      res.status(500).json({

        error:
          "Recommendation failed.",

        details:
          error.message,

      });


    }


  }

);




/* ================= START SERVER ================= */


const PORT = 3001;


app.listen(PORT, () => {

  console.log(

    `Server running on http://localhost:${PORT}`

  );

});