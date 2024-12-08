import axios from 'axios';

const NASA_API_URL = 'https://images-api.nasa.gov/search';

const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(NASA_API_URL, {
      params: {
        q: query,
        page: page,
      },
    });

    return response.data.collection.items || [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

export default {
  fetchImages,
};
