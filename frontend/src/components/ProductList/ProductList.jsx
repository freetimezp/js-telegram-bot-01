import React, { useState } from 'react';
import './productList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';


const productsData = [
    { id: 1, title: 'Product 1', prict: 100, description: 'Lorem ipsum' },
    { id: 2, title: 'Product 2', prict: 200, description: 'Lorem ipsum' },
    { id: 3, title: 'Product 3', prict: 300, description: 'Lorem ipsum' },
    { id: 4, title: 'Product 4', prict: 400, description: 'Lorem ipsum' },
    { id: 5, title: 'Product 5', prict: 500, description: 'Lorem ipsum' },
    { id: 6, title: 'Product 6', prict: 600, description: 'Lorem ipsum' },
    { id: 7, title: 'Product 7', prict: 700, description: 'Lorem ipsum' },
    { id: 8, title: 'Product 8', prict: 800, description: 'Lorem ipsum' },
    { id: 9, title: 'Product 9', prict: 900, description: 'Lorem ipsum' },
    { id: 10, title: 'Product 10', prict: 1000, description: 'Lorem ipsum' },
];

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price;
    }, 0);
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);

    const { tg } = useTelegram();

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
                text: `Buy $${getTotalPrice(newItems)}`
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
