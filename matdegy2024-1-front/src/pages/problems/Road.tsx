import styled from "styled-components";
import {
  Button,
  Input,
  ProblemEachField,
  Text,
  CodeforcesLink,
  Alert,
  AlertText,
  AlertTitle,
  Title,
} from "../../components";
import { DataLoading } from "../../utils/DataLoading";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Road = () => {
  return (
    <ProblemEachField>
      <Text>
        어? 여기는 뭐지? 이상한 곳으로 왔어. 난 분명히 마지막 문제로 가야
        하는데...
      </Text>
      <Text>
        아! 지금까지 나온 문제들의 링크들이 엄청 쉬운 규칙이 있었잖아!
        <br />
        이걸 통해 마지막 문제의 링크를 찾을 수 있을 것 같아!
      </Text>
      <Text>
        Hint: modular 1,000,000,007을 취해야 할 것 같아!
        <br />
        그런데 링크가 너무 긴데 두 부분으로 쪼개볼까?
      </Text>
    </ProblemEachField>
  );
};

export default Road;
