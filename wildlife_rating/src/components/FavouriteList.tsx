import React from "react";
import { getFromStorage } from "../utils/storageHelper";

export const calculatePoints = (animalName: string): number => {
  const ratings =
    getFromStorage("ratings") ||
    ({} as {
      [key: string]: { speed: number; lifespan: number; habitat: number };
    });

  const animalRatings = ratings[animalName as keyof typeof ratings] || {};

  // Sum the ratings (assuming they are rated out of 10 each)
  const totalRating =
    animalRatings.speed + animalRatings.lifespan + animalRatings.habitat;
  // console.log(ratings);
  return isNaN(totalRating) ? 0 : (totalRating / 30) * 100; // if not_a_number return a 0
};

const FavoriteList: React.FC = () => {
  const favorites = getFromStorage("favorites") || [];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((animal: any) => {
            const animalName = animal.name as string; // Ensure it's a string
            const averageScore = calculatePoints(animalName);
            return (
              <div
                key={animalName}
                className="bg-[#141414] rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              >
                <h1 className="text-xl text-center font-semibold text-white mb-2">
                  {animalName}
                </h1>
                <p className="text-gray-600">{animal.characteristics.slogan}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-[#229b26] text-lg font-bold mr-2">
                    Points: {averageScore.toFixed(1) ?? "no_rating"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">
            No favorite animals yet. Browse animals and add them to your list.
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
