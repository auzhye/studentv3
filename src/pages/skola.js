import React from 'react';
import {useState} from 'react';
import { auth, firestore } from '../config/firebase';
import firebase from 'firebase/compat/app';
import {onAuthStateChanged} from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Form from "../components/form";
import { ToastContainer, toast } from 'react-toastify';

function Skola() {
    const [user, loading] = useAuthState(auth);
    var isTeacher;
    var query;
    if (!loading) {
        query = user ? firestore.collection('skolotaji').where("uid", "==", user.uid) : null;
    }
    const [skolotaji_data] = useCollectionData(query, {idField:'id'});
    if (!Array.isArray(skolotaji_data) || !skolotaji_data.length) {
        isTeacher = false;
    } else {
        isTeacher = true;
    }
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            //const uid = user.uid;
        } else {
            // User is signed o ut
            window.location = '/login';
        }});

    return (
        <div className='content_wrap'>
            {isTeacher ? <SkolotajsPage /> : <SkolnieksPage />}
        </div>
    );
}

function SkolotajsPage() {
    const [user, loading] = useAuthState(auth); // loading - when firestore is loading data
    var query;
    if (!loading) {
        
        query = firebase.firestore().collection('skola').where("skolotajs_uid", "==", user.uid).orderBy("when", "asc");
    }
        const [skola_data] = useCollectionData(query, {idField:'id'});
        return (
            <div>
                <h3>Skolotaja lapa</h3>
                <p>Pieteikušies skolnieki: </p>
                <ul>
                {skola_data && skola_data.map(msg => <li key={msg.uid} value={msg.uid}>{msg.skolnieks} ir pieteicis uz tēmu {msg.tema}. Datums: {msg.when.toDate().toDateString()}</li>)}
                </ul>
            </div>
        );
}

function SkolnieksPage() {
    const notify = () => toast("Veiksmigi pietecies uz konsultaciju!");
    const skola = firestore.collection('skolotaji');
    const skola3 = firestore.collection('skola');
    const query = skola;
    const [skola_data] = useCollectionData(query, {idField:'id'});
    const [formValue, setFormValue] = useState('');
    const [formValue2, setFormValue2] = useState('');
    const [formValue3, setFormValue3] = useState('');
    const update = async (e) => {
        const datums = new Date(document.getElementById("datums").value);
        e.preventDefault();
        document.getElementById("pieteikties").disabled = true;
        const {uid, displayName} = auth.currentUser;
        await skola3.add({
        skolnieka_uid:uid,
        skolnieks:displayName,
        skolotajs_uid:formValue,
        when:Timestamp.fromDate(datums), //toDate
        tema:formValue3,
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
    return (
     <>
      <Form />

     </>

 );
}
  
export default Skola;