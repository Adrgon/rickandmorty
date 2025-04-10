export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: Episode[];
}

export interface Episode {
  id: string;
  name: string;
  episode: string;
}

export interface CharactersResponse {
  characters: {
    results: Character[];
  };
}

export interface CharacterResponse {
  character: Character;
}

// Exportación por defecto para satisfacer el requisito de Expo Router
// Este es un objeto vacío ya que las interfaces son solo tipos
const CharacterTypes = {};

export default CharacterTypes; 
