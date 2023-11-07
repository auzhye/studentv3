import Skolens from "./skolens";
import Skolotajs from "./skolotajs";

import React from 'react';
import { auth, firestore } from '../../config/firebase';
import {onAuthStateChanged} from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

function Vertejums() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            //const uid = user.uid;
        } else {
            // User is signed o ut
            window.location = '/login';
        }});
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

    return (
        <>
            {isTeacher ? <Skolotajs /> : <Skolens /> }
        </>
    );
}

export default Vertejums;