import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../hooks/useTelegram";
const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('muhomor_red');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(()=>{
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(()=> {
        if (!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите Ваши данные</h3>
            <input className={'input'} type="text" placeholder={"Страна"} value={country} onChange={onChangeCountry}/>
            <input className={'input'} type="text" placeholder={"Улица"} value={street} onChange={onChangeStreet}/>

            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'muhomor_red'}>Мухомор Красный</option>
                <option value={'muhomor_panter'}>Мухомор Пантерный</option>
            </select>
        </div>
    );
};

export default Form;