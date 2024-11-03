import http from './http'

const cardsService = {
    async getAllCards() {
        try{
            const response = await http.get('/cards');
            return response.data;
        }
        catch(error){
            throw error;
        } 
    },
    async createCard(cardDetails) {
        try{
            const response = await http.post('/cards', cardDetails);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    async updateCard(cardId, cardDetails) {
        try{
            const response = await http.put(`/cards/${cardId}`, cardDetails);
            return response.data
        }
        catch(error){
            throw error;
        }
    },
    async deleteCard(cardId) {
        try{
            await http.delete(`/cards/${cardId}`);
        }
        catch(error){
            throw error;
        }
    }
}

export default cardsService;