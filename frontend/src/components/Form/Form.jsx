import { useEffect, useState } from 'react';
import './form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [subject, setSubject] = useState('individual');

    const { tg } = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send Message'
        });
    }, []);

    useEffect(() => {
        if (!city || !email) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [city]);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className='form'>
            <h3>Enter your contact info</h3>
            <input type="text" className='input' placeholder='Your name' value={name} onChange={onChangeName} />
            <input type="text" className='input' placeholder='Your email' value={email} onChange={onChangeEmail} />
            <input type="text" className='input' placeholder='Your city' value={city} onChange={onChangeCity} />

            <select className='select' value={subject} onChange={onChangeSubject}>
                <option value="company">Company</option>
                <option value="individual">Individual</option>
            </select>
        </div>
    );
}

export default Form;