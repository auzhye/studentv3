import React from 'react';
import {useState} from 'react';
import { auth} from '../../config/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Form2 from '../../components/form2';

function Skolens() {
    const [user, loading] = useAuthState(auth);
    const skola = firebase.firestore().collection('vertejumi');
    var query;
    if (!loading) {
        query = firebase.firestore().collection('skolotaji');
    }
    const [skola_data] = useCollectionData(query, {idField:'id'});
    const [star, setStar] = useState(5);

    const onChange=(nextValue)=>{
        setStar(nextValue)
    }
    const [formValue, setFormValue] = useState('');
    const [formValue3, setFormValue3] = useState('');
    const update = async (e) => {
        e.preventDefault();
        document.getElementById("pieteikties").disabled = true;
        const {uid, displayName} = auth.currentUser;
        await skola.add({
            skolnieka_uid:uid,
            skolnieks:displayName,
            skolotajs_uid:formValue,
            vertejums:star,
            saite:formValue3,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        });
        document.getElementById("success").classList.toggle("visible");
        setTimeout(() => {
            document.getElementById("success").classList.toggle("visible");
            document.getElementById("pieteikties").disabled = false;
        }, 4000);
    }
    return (
        <>
        <Form2 />
        </>
    );

}

export default Skolens;