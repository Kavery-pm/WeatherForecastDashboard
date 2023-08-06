const FAVORITES_KEY = 'favorites';

export const getFavorites = (): string[] => {
  const favoritesStr = localStorage.getItem(FAVORITES_KEY);
  return favoritesStr ? JSON.parse(favoritesStr) : [];
};

export const saveFavorites = (favorites: string[]): void => {
  const favoritesStr = JSON.stringify(favorites);
  localStorage.setItem(FAVORITES_KEY, favoritesStr);
};