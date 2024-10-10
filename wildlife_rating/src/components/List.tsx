import React, { useState, useEffect } from "react"; // React word can be skipped
import useFetchAnimals from "../customHooks/useFetchAnimals";
import AnimalCard from "./Card";
import { setToStorage, getFromStorage } from "../utils/storageHelper";

const AnimalList: React.FC = () => {
  const { animals, error, loading } = useFetchAnimals();
  const [favorites, setFavorites] = useState<any[]>([]);

  // fetch favourites from browser's local storage
  useEffect(() => {
    const storedFavorites = getFromStorage("favorites");
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const addToFavorites = (animal: any) => {
    const isAlreadyFavourite = favorites.some(
      (favoriteAnimal) => favoriteAnimal.name === animal.name
    );
    // update favourites with new animal object
    if (!isAlreadyFavourite) {
      const updatedFavorites = [...favorites, animal];
      setFavorites(updatedFavorites);
      setToStorage("favorites", updatedFavorites);
      console.log(`Added ${animal.name} to favorites`, updatedFavorites);
    } else {
      alert(`Oops ${animal.name} is already in your favorites`);
    }
  };

  const removeFromFavorites = (animal: any) => {
    const updatedFavorites = favorites.filter(
      (favoriteAnimal) => favoriteAnimal.name !== animal.name
    );
    setFavorites(updatedFavorites);
    setToStorage("favorites", updatedFavorites);
    console.log(`Removed ${animal.name} from favorites`, updatedFavorites);
  };

  if (error)
    return <p className="text-red-500 text-2xl"> API Error: {error}</p>;

  return (
    <div className="w-full h-screen py-8 px-4">
      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <h1 className="text-3xl font-bold text-white text-center">
            Fetching some lovely animals...
          </h1>
        ) : animals.length > 0 ? (
          animals.map((animal: any) => (
            <AnimalCard
              key={animal.name} // populate cards (30 cards) using fetched data
              animal={animal}
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          ))
        ) : (
          <p>No animals found.</p>
        )}
      </div>
    </div>
  );
};

export default AnimalList;
