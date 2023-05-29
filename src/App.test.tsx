import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedPokemonData = [
  {
    id: 1,
    name: "bulbasaur",
  },
  {
    id: 2,
    name: "ivysaur",
  },
  {
    id: 3,
    name: "venusaur",
  },
];

describe("App", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockedPokemonData });
  });

  it("should render a list of Pokemon", async () => {
    const { getByText } = render(<App />);

    // Wait for the Pokemon data to be fetched and displayed
    await waitFor(() => {
      mockedPokemonData.forEach((pokemon) => {
        const pokemonElement = getByText(pokemon.name);
        expect(pokemonElement).toBeInTheDocument();
      });
    });
  });
});
