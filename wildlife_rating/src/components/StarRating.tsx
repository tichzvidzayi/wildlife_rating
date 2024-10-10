import React from "react";

type StarRatingProps = {
  name: string;
  rating: number;
  onRatingChange: (name: string, value: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({
  name,
  rating,
  onRatingChange
}) => {
  const handleClick = (index: number) => {
    onRatingChange(name, index + 1);
  };

  return (
    <div className="flex">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <span
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer text-2xl ${
              index < rating ? "text-green-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
    </div>
  );
};

export default StarRating;
