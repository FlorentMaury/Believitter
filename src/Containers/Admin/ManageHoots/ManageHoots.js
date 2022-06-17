// Librairies
import React, { useState } from 'react';
import { useLocation, useNavigate }   from 'react-router-dom';
import axios                          from '../../../config/axios-firebase';
import routes                         from '../../../config/routes';
import { checkValidity, genSlug }     from '../../../shared/utility';
import fire                           from '../../../config/firebase';
import { toast }                      from 'react-toastify';

// Composants
import Input from '../../../Components/UI/Input/Input';

export default function ManageHoots() {

    const navigate  = useNavigate();
    const location  = useLocation();
    const hootState = location.state;

    const userEmail = fire.auth().currentUser.email;

    // States
    const [inputs, setInputs] = useState({
        contenu: {
            elementType  : 'textarea',
            elementConfig: {},
            value        : hootState !== null ? hootState.hoot.contenu : '',
            label        : 'Contenu de l\'article',
            valid        : hootState !== null && hootState.hoot ? true : false,
            validation   : {
                required: true,
                maxLength: 280
            },
            touched     : false,
            errorMessage: 'Le contenu ne doit pas être vide, ni dépasser 280 caractères.'
        }
    });

    const [valid, setValid] = useState(hootState !== null && hootState.hoot ? true : false);

    // Méthodes
        // checkValidity

    const inputChangedHandler = (event, id) => {

        // Change la valeur
        const newInputs = {...inputs};
        newInputs[id].value = event.target.value;
        newInputs[id].touched = true;

        // Vérification de la valeur
        newInputs[id].valid = checkValidity(event.target.value, newInputs[id].validation);

        setInputs(newInputs);

        // Vérification du formulaire
        let formIsValid = true;
        for (let input in newInputs) {
            formIsValid = newInputs[input].valid && formIsValid;
        };
        setValid(formIsValid);
    };

    // Envoyer les données sur FireBase
    const formHandler = event => {

        event.preventDefault();

        let date = new Date();

        const slug = genSlug(userEmail) + Math.floor(Math.random() * 10000) + '_hoot';

        const hoot = {
            contenu     : inputs.contenu.value,
            auteur      : fire.auth().currentUser.displayName,
            proprietaire: fire.auth().currentUser.uid,
            date        : date.toLocaleString(navigator.language, {
                year  : 'numeric',
                month : 'numeric',
                day   : 'numeric',
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }),
            slug: slug
        };

        const token = fire.auth().currentUser.getIdToken()
            .then(token => {

                if(hootState !== null && hootState.hoot) {
                    axios.put('/hoots/' + hootState.hoot.id + '.json?auth=' + token, hoot)
                    .then(() => {
                        toast.success('Hoot modifié avec succès !', {position: 'bottom-right'});
                        navigate(routes.DASHBOARD);
                    })
                    .catch(error => {
                        console.log(error);
                    }); 
                } else {
                    axios.post('/hoots.json?auth=' + token, hoot)
                    .then(() => {
                        window.location.reload()
                        toast.success('Hoot ajouté avec succès !');
                    })
                    .catch(error => {
                        console.log(error);
                    }); 
                }
                })
            .catch(error => {
                console.log(error);
            });
    };

    // Variables
    const formElementArray = [];

    for (let key in inputs) {
        formElementArray.push({
            id    : key,
            config: inputs[key]
        });
    };

    let form = (
        <form onSubmit={(e) => formHandler(e)}>
            {formElementArray.map(formElement => (
                <Input
                    key          = {formElement.id}
                    id           = {formElement.id}
                    value        = {formElement.config.value}
                    label        = {formElement.config.label}
                    type         = {formElement.config.elementType}
                    config       = {formElement.config.elementConfig}
                    valid        = {formElement.config.valid}
                    touched      = {formElement.config.touched}
                    errorMessage = {formElement.config.errorMessage}
                    changed      = {(e) => inputChangedHandler(e, formElement.id)}
                />
            ))}
            <div>
                <input 
                    type     = 'submit'
                    value    = {hootState !== null && hootState.hoot ? 'Modifier un article' : 'Ajouter un article'}
                    disabled = {!valid}
                />
            </div>
        </form>
    );

    return (
        <div className='container'>
            {hootState !== null ? 
            <h2>Modifier</h2>
            :
            <h2>Ajouter</h2>
            }
            {form}
        </div>
    );
};