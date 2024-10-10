import React, { useState } from "react";
import AnimalList from "./components/List";
import FavoriteList from "./components/FavouriteList";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        <header className="text-center text-4xl font-bold text-black mb-8 pt-8">
          Earth Wildlife
        </header>

        <div className="flex justify-center mb-4 border-b border-gray-300">
          <div
            onClick={() => setActiveTab("browse")}
            className={`px-4 py-2 mx-2 cursor-pointer ${
              activeTab === "browse"
                ? "border-b-4 border-[#288736] text-white"
                : "text-gray-500"
            } text-lg`}
          >
            Browse Animals
          </div>

          <div
            onClick={() => setActiveTab("favorites")}
            className={`px-4 py-2 mx-2 cursor-pointer ${
              activeTab === "favorites"
                ? "border-b-4 border-[#288736] text-white"
                : "text-gray-500"
            } text-lg`}
          >
            Favorite Animals
          </div>
        </div>

        {/* -- Tab to navigated pages/componets) */}
        <div className="flex-grow overflow-auto">
          {activeTab === "browse" ? <AnimalList /> : <FavoriteList />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
