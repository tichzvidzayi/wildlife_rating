// calculatePoints.test.ts

import { getFromStorage } from "../../utils/storageHelper"
import { calculatePoints } from '../../components/FavouriteList';


jest.mock("../../utils/storageHelper", () => ({
  getFromStorage: jest.fn(),
}));

describe("calculatePoints", () => {
  it("should return 0 when no ratings are found", () => {
    (getFromStorage as jest.Mock).mockReturnValueOnce({}); 

    const result = calculatePoints("Lion");
    expect(result).toBe(0); 
  });

  it("should return a correct average score when ratings exist", () => {
    const mockRatings = {
      Lion: {
        speed: 8,
        lifespan: 6,
        habitat: 7,
      },
    };

    (getFromStorage as jest.Mock).mockReturnValueOnce(mockRatings); // Mock ratings for "Lion"

    const result = calculatePoints("Lion");
    expect(result).toBe(70); // (8+6+7)/30 * 100 = 70
  });

  it("should return 0 when ratings are incomplete (missing fields)", () => {
    const mockRatings = {
      Lion: {
        speed: 8,
      },
    };

    (getFromStorage as jest.Mock).mockReturnValueOnce(mockRatings); // Mock incomplete ratings for "Lion"

    const result = calculatePoints("Lion");
    expect(result).toBe(0); // NaN due to missing fields, should return 0
  });

  it("should return 0 when the animal has no ratings at all", () => {
    const mockRatings = {
      Tiger: {
        speed: 9,
        lifespan: 9,
        habitat: 9,
      },
    };

    (getFromStorage as jest.Mock).mockReturnValueOnce(mockRatings); // Mock ratings for "Tiger"

    const result = calculatePoints("Lion"); // But querying for "Lion"
    expect(result).toBe(0); // No ratings for "Lion", should return 0
  });

  it("should handle non-numeric ratings gracefully", () => {
    const mockRatings = {
      Lion: {
        speed: "fast" as unknown as number, // Non-numeric value
        lifespan: 6,
        habitat: 7,
      },
    };

    (getFromStorage as jest.Mock).mockReturnValueOnce(mockRatings); // Mock incorrect data

    const result = calculatePoints("Lion");
    expect(result).toBe(0); // Should return 0 if non-numeric values are present
  });
});
