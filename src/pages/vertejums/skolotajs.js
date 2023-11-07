import React from 'react';
import { auth, firestore } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Tabler from '../../components/table';

function Skolotajs() {
    const [user, loading] = useAuthState(auth);
    var query;
    if (!loading) {
        query = firestore.collection('vertejumi').where("skolotajs_uid", "==", user.uid);
    }
    const [skola_data, loadingData] = useCollectionData(query, {idField:'id'});
    var total = 0;
    const videjais = loadingData ? null : Object.values(skola_data).forEach(val => total += val.vertejums);
    const videjais2 = loadingData ? null : Math.round(total / skola_data.length);
    return (
        <>
        <Tabler />
        </>
    );

}

export default Skolotajs;