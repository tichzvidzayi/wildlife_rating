import { useState, useEffect } from "react";

// can use .env file
const API_KEY = "vtFsdMhKA1rVEps9JnXtZg==dDlJOqxwqimPgra8";
// Sample animals list
const ANIMALS_LIST = [
  "dog",
  "monkey",
  "giraffe",
  "cheetah",
  "rhino",
  "tiger",
  "zebra",
  "jaguar",
  "bison",
  "buffalo",
  "camel",
  "dolphin",
  "shark",
  "falcon",
  "baboon",
  "ant",
  "cow",
  "meerkat",
  "moose",
  "penguin",
  "rabit",
  "cat",
  "bear",
  "crocodile",
  "hippopotamus"
];

const useFetchAnimals = () => {
  const [animals, setAnimals] = useState<any[]>(() => {
    const storedAnimals = localStorage.getItem("animals");
    return storedAnimals ? JSON.parse(storedAnimals) : [];
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const animalData: any[] = [];

        //- fetch data for all animals
        for (const animal of ANIMALS_LIST) {
          const response = await fetch(
            `https://api.api-ninjas.com/v1/animals?name=${animal}`,
            {
              headers: {
                "X-Api-Key": API_KEY
              }
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch animal: ${animal}`);
          }

          const data = await response.json();
          if (data.length > 0) {
            animalData.push(data[0]);
          }
        }

        setAnimals(animalData);
        localStorage.setItem("animals", JSON.stringify(animalData));
        console.log(animalData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (animals.length === 0) {
      fetchAnimals();
    } else {
      setLoading(false);
    }
  }, [animals.length]);

  return { animals, error, loading };
};

export default useFetchAnimals;
