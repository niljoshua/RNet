import { Section2 } from '../components/Sections/Section2/section2';
import { Section4 } from '../components/Sections/Section4/section4';
import { Section6 } from '../components/Sections/Section6/section6';

import '../styles/Home/styles.css';

export const HomePage = () => {

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