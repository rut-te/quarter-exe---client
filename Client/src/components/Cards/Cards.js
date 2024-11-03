import React, { useEffect, useState } from 'react'
import cardsService from '../../Services/cards.js'
import Card from '../Card/Card.js'
import styles from './Cards.module.css'
import { IoMdAdd } from 'react-icons/io';

function Cards() {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await cardsService.getAllCards();
                setCards(data);
            }
            catch (err) {
                console.log(err.message);
            }
        }

        fetchCards();

    }, []);

    const addCard = async () => {
        try {
            const newCard={text:"new text",  color:"red"};
            const response = await cardsService.createCard(newCard);
            console.log(response);
            
            setCards([ ...response ]);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const updateCard = async (id, updatedCard) => {
        try {
            await cardsService.updateCard(id, updatedCard);
            setCards(prev => prev.map(c => c.id === id ? updatedCard : c));
        }
        catch (error) {
            console.log('Error updating card');
        }
    }

    const updateCardLocali = (id, updatedCard) => {
        setCards(prev => prev.map(c => c.id === id ? updatedCard : c));
    }

    const deleteCard = async (id) => {
        try {
            await cardsService.deleteCard(id);
            setCards(prev => prev.filter(c => c.id !== id));
        }
        catch (error) {
            console.log('Error deleting card');
        }
    }

    return (
        <div className={styles.cards}>
            {cards.map(card =>
                <Card card={card} key={card.id} setCards={setCards}
                    updateCard={updateCard}
                    deleteCard={deleteCard}
                    updateCardLocali={updateCardLocali} />
            )}
            <div className={styles.buttonContainer}>
                <button className={styles.addButton} onClick={addCard} >
                    <IoMdAdd />
                </button>
            </div>
        </div>
    )
}

export default Cards