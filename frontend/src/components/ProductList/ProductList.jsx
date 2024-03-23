import React, { useCallback, useEffect, useState } from 'react';
import './productList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';


const productsData = [
    { id: 1, title: 'Product 1', price: 100, description: 'Lorem ipsum' },
    { id: 2, title: 'Product 2', price: 200, description: 'Lorem ipsum' },
    { id: 3, title: 'Product 3', price: 300, description: 'Lorem ipsum' },
    { id: 4, title: 'Product 4', price: 400, description: 'Lorem ipsum' },
    { id: 5, title: 'Product 5', price: 500, description: 'Lorem ipsum' },
    { id: 6, title: 'Product 6', price: 600, description: 'Lorem ipsum' },
    { id: 7, title: 'Product 7', price: 700, description: 'Lorem ipsum' },
    { id: 8, title: 'Product 8', price: 800, description: 'Lorem ipsum' },
    { id: 9, title: 'Product 9', price: 900, description: 'Lorem ipsum' },
    { id: 10, title: 'Product 10', price: 1000, description: 'Lorem ipsum' },
];

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price;
    }, 0);
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);

    const { tg, queryId } = useTelegram();


    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        };

        fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    }, []);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData]);


    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Buy for $ ${getTotalPrice(newItems)}`
            });
        }
    }

    return (
        <div className='list'>
            {productsData.map((item) => (
                <ProductItem product={item} key={item} onAdd={onAdd} />
            ))}
        </div>
    );
}

export default ProductList;
