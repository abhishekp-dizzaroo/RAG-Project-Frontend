import axios from '../config/axios';

const apiService = {
  async generate_response(query) {
    console.log('Sending query:', query);
    
    try {
    
      const response = await axios.post('/api/search/generate', { query });
      console.log('Received response:', response);
      return response.data.generated_text;
    } catch (error) {
      console.error('Error sending query:', error);
      throw new Error('Failed to get response from server');
    }
  }
};

export default apiService;