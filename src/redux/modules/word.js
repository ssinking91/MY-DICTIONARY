// word.js
import {db} from "../../firebase"
import { 
    collection, 
    getDoc, 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc  
} from "firebase/firestore";

// Actions
const LOAD = 'word/LOAD';
const CREATE = 'word/CREATE';
const REMOVE = 'word/REMOVE';

const initioalState = {
    list: [
        
    ],
};

// Action Creators
export function loadWord(word_list) {
    console.log("loadWord 액션 생성")
    return { type: LOAD, word_list };
}

export function createWord(word) {
    console.log("createWord 액션 생성")
    return { type: CREATE, word };
}

export function removeWord(index) {
    console.log("updateWord 액션 생성")
    console.log(index)
    return { type: REMOVE, index };
}

//middlewares
export const loadWordFB = () => {
    return async function(dispatch) {
        const word_data = await getDocs(collection(db, "word"));
        console.log(word_data);

        let word_list = [];

        word_data.forEach((doc)=>{
            console.log(doc.data());
            word_list.push({ id: doc.id, ...doc.data() });
        });
        console.log(word_list);
        dispatch(loadWord(word_list));
    };
};

export const createWordFB = ((word) => {
    return async function(dispatch) {
        const docRef = await addDoc(collection(db, "word"), word);
        //console.log((await getDoc(docRef)).data());
        const _word = await getDoc(docRef);
        const word_data = {id: _word.id, ..._word.data()};
        
        //console.log(word_data);

        dispatch(createWord(word_data)); 
    };
});

export const removeWordFB = ((word_id) => {
    return async function(dispatch, getState) {
        if(!word_id) {
            window.alert("아이디가 없네요!")
            return;
        }
        const docRef = doc(db, "word", word_id);
        await deleteDoc(docRef);

        const _word_list = getState().word.list;
        const word_index = _word_list.findIndex((b) => {
            return b.id === word_id;
        });

        dispatch(removeWord(word_index));
    };
});

// Reducer
export default function reducer(state = initioalState, action = {}) {
    switch (action.type) {
        case "word/LOAD": {
            console.log(state, action)
            console.log("LOAD 리듀서 생성")
            
            return { list: action.word_list };
        }
        case "word/CREATE": {
            console.log(state, action)
            console.log("CREATE 리듀서 생성")
            
            const new_word_list = [...state.list, action.word];
            return { list: new_word_list };
        }
        case "word/REMOVE": {
            console.log(state, action)
            console.log("REMOVE 리듀서 생성")

            const new_word_list = state.list.filter((l, index) => {
                console.log(action.index !== index, action.index, index)
                return parseInt(action.index) !== index
            });
            return { list: new_word_list };
        }

        default: return state;
    }
}
