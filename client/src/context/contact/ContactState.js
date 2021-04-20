import React, {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR

} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // get contacts
    const getContacts = async () => {

        try{
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch(err){
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            });
        }
        
    };

    //Add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try{
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch(err){
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.errors
            });
        }
        
    };

    // Delete contact
    const deleteContact = async id => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try{
            const res = await axios.delete(`/api/contacts/${id}`, config);
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch(err){
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            });
        }

    };

    // clear contacts
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        });
    }

    //set current contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    };

    //clear current contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    };

    // filter contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    };

    // update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try{
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch(err){
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            });
        }
    };

    // clear filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    };


    return (
       <ContactContext.Provider
       value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContacts,
            addContact,
            deleteContact,
            clearContacts,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            loading: state.loading
       }}>
           {props.children}
       </ContactContext.Provider> 
    );
};

export default ContactState;