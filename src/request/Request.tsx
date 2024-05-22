export const fetchData = async (page: number) => {
  const API_URL = `https://swapi.py4e.com/api/people/?page=${page}`;
  try {
    const response = await fetch(API_URL);
    console.log('response', response);
    const data = await response.json();
    return {results: data.results, count: data.count};
  } catch (err) {
    console.log(err);
  }
};
