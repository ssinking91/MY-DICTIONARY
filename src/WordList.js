// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeWordFB } from "./redux/modules/word"

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const WordList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const my_word = useSelector((state) => state.word.list); //(1)state : 전체데이터, (2)state : 리턴되는 값

  console.log(my_word)
  //console.log(my_word[0].word)
  //console.log(my_word[0].explanation)
  //console.log(my_word[0].example)

  return (
    <div className="WordList" >
      <ListStyle>
        {my_word.map((list, index) => {
          return (
            <ItemStyle
              className="word_list"
              key={index}
            >
              <span>단어</span>
              <h4>{my_word[index].word}</h4>

              <span>설명</span>
              <h4>{my_word[index].explanation}</h4>

              <span>예시</span>
              <h4 style={{ color: "slateblue" }}>{my_word[index].example}</h4>
              <DeleteIcon style={{ marginLeft: 270 }} onClick={() => {
                console.log("dispatch updateWord")
                dispatch(removeWordFB(my_word[index].id));
              }} />
            </ItemStyle>
          )
        })}

        <Fab color="primary" aria-label="add" style={{
          position: "sticky", top: 0, left: 250, zIndex: 1
        }}
          onClick={() => {
            history.push("/detail/:index");
          }}
        >
          <AddIcon
            onClick={() => {
              history.push("/detail/:index");
            }}
          />
        </Fab>

      </ListStyle>

    </div>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 75vh;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 75vh;
  border: 10px;
`;

const ItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 10px;
  color: #333;
  background-color: aliceblue;
  & span {
   font-size: 1px;
   text-decoration: underline;
   margin: 5px;
  }
  & h4 {
   width : 290px;
   margin: 0px 5px 10px 5px;
   
  }
`;

export default WordList;
