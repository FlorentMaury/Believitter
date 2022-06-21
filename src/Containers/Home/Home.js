// Librairies
import React    from 'react';
import classes  from './Home.module.css';
import styled   from 'styled-components';
import { Link } from 'react-router-dom';
import routes   from '../../config/routes';

// Composants
import Owl    from '../../assets/Owl.png';
import Spiral from '../../assets/spirals2.png';
import Button from '../../Components/Button/Button';

// Styled
const StyledOwl = styled.img`
    width: 40%;
`;

const StyledLayout = styled.div`
    display        : flex;
    height         : 100%;
    justify-content: space-around;
    background     : #EFEFEF;
    align-items    : center;    
    padding: 0 20%;
`;

const StyledH1 = styled.h1`
    text-align: start;
    font-size: 5rem;
    line-height: 1em;
    letter-spacing: -3px;
    margin-bottom: 15px;
`;

const StyledSpan = styled.span`
    color: #F66B0E;
`;

const StyledSharedSpace = styled.div`
    width: 50%;
`;

export default function Home() {

    return (
        <StyledLayout className='container'>
            <StyledSharedSpace>
                <StyledH1>Bienvenue <br /> dans votre <StyledSpan>communauté</StyledSpan>.</StyledH1>
            </StyledSharedSpace>
            
            <StyledSharedSpace>
            <StyledOwl src={Owl} />
                {/* <div>
                    <img alt='Spirale' className={classes.spiral1} src={Spiral} />
                    <img alt='Spirale' className={classes.spiral2} src={Spiral} />
                </div> */}
            </StyledSharedSpace>
        </StyledLayout>
    );
};