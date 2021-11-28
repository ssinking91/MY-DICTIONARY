import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
//import {db} from "./firebase"
import { loadWordFB } from "./redux/modules/word";
// useDispatch는 데이터를 업데이트할 때,
// useSelector는 데이터를 가져올 때 씁니다.
import WordList from "./WordList";
import Detail from "./Detail";
//import { collection, getDoc, getDocs, addDoc, doc, updateDoc, deleteDoc  } from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  
  React.useEffect(async() => {
    //console.log(db);
    dispatch(loadWordFB());
  },[]);
  
  return (
    <div className="App" >
      
      <Container>
        <Title>MY DICTIONARY</Title>
        <Line />
        
          <Route exact path="/" component={WordList} />
          
          <Route exact path="/detail/:index" component={Detail} />

      </Container>

    </div>
  );
}

const Container = styled.div`
  max-width: 350px;
  min-height: 80vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;


export default App;
