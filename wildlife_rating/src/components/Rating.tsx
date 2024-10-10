import React, { useState } from "react";
import { setToStorage, getFromStorage } from "../utils/storageHelper";
import StarRating from "./StarRating";

type RatingFormModalProps = {
  animal: {
    name: string;
  };
  onClose: () => void;
};

const RatingFormModal: React.FC<RatingFormModalProps> = ({
  animal,
  onClose
}) => {
  const [attributes, setAttributes] = useState({
    speed: 0,
    lifespan: 0,
    habitat: 0
  });

  const handleRatingChange = (name: string, value: number) => {
    setAttributes({ ...attributes, [name]: value });
  };

  const submitRating = () => {
    //- fetch rating from browser storage
    const ratings = getFromStorage("ratings") || {};

    // -update ratings
    ratings[animal.name] = {
      speed: attributes.speed,
      lifespan: attributes.lifespan,
      habitat: attributes.habitat
    };

    //console.log("Updated Ratings: ", ratings);
    setToStorage("ratings", ratings);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-[#273DB4] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="font-bold text-3xl mb-4">Rate {animal.name}</h3>
        <div className="flex flex-col mb-4">
          <label>Speed:</label>
          <StarRating
            name="speed"
            rating={attributes.speed}
            onRatingChange={handleRatingChange}
          />
          <label>Lifespan:</label>
          <StarRating
            name="lifespan"
            rating={attributes.lifespan}
            onRatingChange={handleRatingChange}
          />
          <label>Habitat:</label>
          <StarRating
            name="habitat"
            rating={attributes.habitat}
            onRatingChange={handleRatingChange}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={submitRating}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit Rating
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingFormModal;
