import axios from 'axios';

const apiUrl = 'https://api.alegra.com/api/v1';
const apiKey = 'OdEn1CQk9g-LeTxbLAzZ9cGU0cReN3kyFUFCHvyw_ZI';
const authorization = btoa('juandiegoalegra@gmail.com:31fc404cb3a48035f140');

export const getAlegraSellers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/sellers`, {
            headers: {
                'Authorization': `Basic ${authorization}`,
            }
        });
        return response.data;
    } catch (error) {
        alert(error.response.data)
        console.error(error.response.data);
        throw error;
    }
};

export const searchImages = async (query) => {
    const randomPage = Math.random() * 10;
    const url = `https://api.unsplash.com/search/collections/?client_id=${apiKey}&query=${query}&page=${randomPage}`;

    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
};

export const generateInvoice = async (winner) => {
    const invoiceData = {
      client: { id: 1 },
      items: [
        {
          discount: 0,
          name: winner.name,
          id: 1,
          quantity: winner.score,
          price: winner.score,
          description: "Ganador concurso Imágenes del Mundo"
        }
      ],
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      seller: winner.id,
      total: winner.score,
      subtotal: winner.score
    };
  
    try {
      const response = await axios.post(`${apiUrl}/invoices`, invoiceData, {
        headers: {
          'Authorization': `Basic ${authorization}`,
        }
      });

      return response.data;
    } catch (error) {
      alert(error.response.data);
      console.error(error.response.data);
      throw error;
    }
  };
  