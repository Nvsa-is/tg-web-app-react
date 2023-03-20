import React, {useCallback, useEffect, useState} from "react";
import './ProductList.css'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../hooks/useTelegram";

const products = [
    {id: '1', title: 'Мухомор(красный)', price: 120, description: '100грамм, шляпки'},
    {id: '2', title: 'Мухомор(пантерный)', price: 180, description: '100грамм, шляпки'},
    {id: '3', title: 'Мухомор(красный)', price: 120, description: '50 шт., капсулы'},
    {id: '4', title: 'Ежовик', price: 140, description: '100грамм, шляпки'},
    {id: '5', title: 'Мухомор(пантерный)', price: 200, description: '50шт., капсулы'},
    {id: '6', title: 'Ежовик', price: 160, description: '50шт., капсулы'},

]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc +=item.price
    }, 0)
}


const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }
        setAddedItems(newItems)

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams( {
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://localhost:8080',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])


    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                        onAdd={onAdd}
                        className={'item'}
                />


                    ))}

        </div>
    );
};

export default ProductList;