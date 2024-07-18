import { useEffect, useState } from 'react';
import { Section1 } from '../components/Sections/Section1/section1';
import { Section2 } from '../components/Sections/Section2/section2';
import { Section4 } from '../components/Sections/Section4/section4';
import { Section5 } from '../components/Sections/Section5/section5';
import { Section6 } from '../components/Sections/Section6/section6';
import '../styles/Home/styles.css';
import axios from 'axios';

export const HomePage = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('https://api-perito.onrender.com/usuarios')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    return (
        <div className='divControllerContent'>
            <main className='mainControllerContent'>            
                <div className='divContent'>
                    <Section2 />
                    <Section4 />
                    <Section6 />                  
                </div>
            </main>
        </div>
    )
}