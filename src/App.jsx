import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_MY_API_KEY,
});

const openai = new OpenAIApi(configuration);

function App() {
  const [image, setImage] = useState("src/assets/react.svg");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
      setImage(response.data.data[0].url);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="mx-auto h-screen bg-slate-200">
      <h1 className="text-black text-7xl font-bold text-center pt-4 py-8">
        Image Generator
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <input
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          className="py-2 px-2 border-2 border-orange-700 rounded-sm m-2"
          placeholder="Enter you prompt"
        />

        <button
          onClick={() => {
            fetchData();
          }}
          className="text-center m-2 py-2 px-2 rounded-sm bg-orange-700 hover:border-2 hover:border-orange-700 hover:cursor-pounter hover:bg-slate-200 hover:text-black"
        >
          Generate
        </button>
      </div>
      <div className="mx-auto h-[512px] w-[512px] border-2 rounded-md items-center justify-center text-center">
        {isLoading ? (
          <div>
            <p>Loading...</p>
            <p>Please wait while we generate your image.</p>
          </div>
        ) : (
          <img src={image} alt="/" />
        )}
      </div>
    </div>
  );
}

export default App;
