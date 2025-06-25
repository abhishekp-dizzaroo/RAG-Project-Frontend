import axios from '../config/axios';

const apiService = {
  async generate_response(query, backend = 'weaviate') {
    console.log('Sending query:', query, 'Backend:', backend);
    try {
      if (backend === 'weaviate') {
        const response = await axios.post('/api/search/generate', { query });
        console.log('Received response:', response);
        return response.data.generated_text;
      } else if (backend === 'neo4j') {
        // For demo, treat input as Cypher if it looks like one, else use a default query
        const cypherQuery = query.trim().toLowerCase().startsWith('match') ? query : 'MATCH (n) RETURN n LIMIT 5';
        const response = await axios.post('/api/neo4j/query', {
          query: cypherQuery,
          parameters: {}
        });
        console.log('Received Neo4j response:', response);
        // Format Neo4j results as a string
        if (response.data.results && response.data.results.length > 0) {
          return (
            'Neo4j Results:\n' +
            response.data.results.map((r, i) => `${i + 1}. ${JSON.stringify(r, null, 2)}`).join('\n')
          );
        } else {
          return 'No results found in Neo4j.';
        }
      } else {
        throw new Error('Unknown backend selected');
      }
    } catch (error) {
      console.error('Error sending query:', error);
      throw new Error('Failed to get response from server');
    }
  }
};

export default apiService;