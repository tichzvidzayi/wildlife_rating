import React, { useState } from "react";
import RatingFormModal from "./Rating";

type AnimalProps = {
  animal: {
    name: string;
    characteristics: {
      top_speed: string;
      lifespan: string;
      habitat: string;
      slogan: string;
    };
    locations: string[];
  } | null; // Allow animal to be null
  favorites: any[];
  addToFavorites: (animal: any) => void; // Accept the function as a prop
  removeFromFavorites: (animal: any) => void; // Accept the remove function as a prop
};

const AnimalCard: React.FC<AnimalProps> = ({
  animal,
  favorites,
  addToFavorites,
  removeFromFavorites
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!animal) {
    return <div>No animal data available.</div>;
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isFavorite = favorites.some(
    (favAnimal) => favAnimal.name === animal.name
  );

  return (
    <div className="bg-[#141414] shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-bold mb-2">{animal.name}</h2>
      <p className="italic mb-2">"{animal.characteristics.slogan}"</p>
      <p>Found in: {animal.locations.join(", ")}</p>
      <p>Top Speed: {animal.characteristics.top_speed}</p>
      <p>Lifespan: {animal.characteristics.lifespan}</p>
      <p>Habitat: {animal.characteristics.habitat}</p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => {
            if (isFavorite) {
              removeFromFavorites(animal);
            } else {
              addToFavorites(animal); // Call the add function
            }
          }}
          className={`${
            isFavorite ? "bg-[#C50900]" : "bg-[#229b26]"
          } text-white px-4 py-2 rounded-lg`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        <button
          onClick={toggleModal}
          className="bg-[#273DB4] text-white px-4 py-2 rounded-lg"
        >
          Rate Animal
        </button>
      </div>

      {isModalOpen && <RatingFormModal animal={animal} onClose={toggleModal} />}
    </div>
  );
};

export default AnimalCard;
