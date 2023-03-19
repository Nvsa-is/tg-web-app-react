import React from 'react';
import './Form.css';
const Form = () => {
    return (
        <div className={"form"}>
            <h3>Введите Ваши данные</h3>
            <input className={'input'} type="text" placeholder={"Страна"}/>
            <input className={'input'} type="text" placeholder={"Город"}/>
            <input className={'input'} type="text" placeholder={"Улица"}/>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'muhomor_red'}>Мухомор Красный</option>
                <option value={'muhomor_panter'}>Мухомор Пантерный</option>
            </select>
        </div>
    );
};

export default Form;