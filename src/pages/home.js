import React, {useState, useContext} from 'react';
import { auth, firestore } from '../config/firebase';
import firebase from 'firebase/compat/app';
import {signOut, onAuthStateChanged} from "firebase/auth";
import Form3 from "../components/form3";
import {useCollectionData} from 'react-firebase-hooks/firestore';

function Home() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
    } else {
      // User is signed o ut
      window.location = '/login';
    }
  });
  const playlists = firestore.collection('playlists');
  
  const query = playlists.orderBy('createdAt', "desc");
  const [playlists_data] = useCollectionData(query, {idField:'id'});
  const [formValue, setFormValue] = useState('');
  const [formValue2, setFormValue2] = useState('');
  const formChanged = formValue.includes("https://open.spotify.com/playlist/") || formValue.includes("http://open.spotify.com/playlist/") ? formValue.split("/playlist/")[0] + "/embed/playlist/" + formValue.split("/playlist/")[1] : formValue;
  const playlists2 = firestore.collection("playlists")
  .where("name", "==", formChanged);
  
  const update = async (e) => {
    e.preventDefault();
    const {uid, photoURL, displayName} = auth.currentUser;
    function isValidHttpUrl(string) {
      let url;
      
      try {
        url = new URL(string);
      } catch (_) {
        return false;  
      }
    
      return url.protocol === "http:" || url.protocol === "https:";
    }
    const isInsideDb = await   
    playlists2.get().then((querySnapshot) => {
        const ret = [];
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            ret.push(doc.data());
        });
        if (ret.length !== 0) {
          return true;
        } else {
          return false;
        }
    })
    const isSpotify = () => {
      if (formValue.includes("https://open.spotify.com/playlist/") || formValue.includes("http://open.spotify.com/playlist/")) {
        return true;
      } else {
        return false;
      }
    }
   await playlists.add({
     name: formValue,
     createdAt:firebase.firestore.FieldValue.serverTimestamp(),
     uid,
     photoURL,
     displayName
   });
  }
    return (
       <Form3 />
    );
  }
  export default Home;