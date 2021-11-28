// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createWordFB } from "./redux/modules/word";

import Button from '@mui/material/Button'; 
import SaveIcon from '@mui/icons-material/Save';
//import Box from '@mui/material/Box';



const Detail = (props) => {
    let history = useHistory();
    
    const dispatch = useDispatch();
   
    //console.log(word_index);
    const text1 = React.useRef(null);
    const text2 = React.useRef(null);
    const text3 = React.useRef(null);

    const addWordList = () => {       
        // setList([...list, text.current.value]);
        //dispatch(createWord( {word : text1.current.value, explanation : text2.current.value, example : text3.current.value } 
        dispatch(createWordFB( {word : text1.current.value, explanation : text2.current.value, example : text3.current.value } ));
      };
    
    return (
        <div>
            <WordStyle>
                <h3 style={{ color: "slateblue" }}>단어 추가하기</h3>
                <InputDiv>
                    <span>단어</span>
                    <input type="text" ref={text1}
                    />
                </InputDiv>
                <InputDiv>
                    <span>설명</span>
                    <input type="text" ref={text2}         
                    />
                </InputDiv>
                <InputDiv>
                    <span>예시</span>
                    <input type="text" ref={text3}
                    />
                </InputDiv>

            </WordStyle>
            <div style={{ marginTop: 20, textAlign: "center" }}>
                <Button variant="outlined" color="success" style={{ marginRight: 10 }} startIcon={<SaveIcon />}
                    onClick={() => {
                        addWordList();
                        history.push('/');
                    }}
                >
                    저장하기
                </Button>


                {/* <Button variant="outlined" color="error" style={{ margin: 10 }} startIcon={<DeleteIcon />}
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    삭제하기
                </Button> */}

                <Button variant="outlined"
                    onClick={() => {
                        history.push('/');
                    }}
                >뒤로가기</Button>
            </div>
        </div>
    );
};

const WordStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 55vh;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 55vh;
  border: 10px;
  
  & input{
    border: 1px solid #888;
    width: 90%;
    height: 30px;
    margin: 5px auto;
  }  
  
  & input:focus {
    outline: none;
    border: 3px solid #a673ff;
  }
  & span {
   font-size: 1px;
   text-decoration: underline;
   margin: 10px;
  }
`;

const InputDiv = styled.div`
display: flex; 
flex-direction: column;
height: 13vh;
background-color: aliceblue;
margin: 5px ;
padding: 5px;
`;

export default Detail;
