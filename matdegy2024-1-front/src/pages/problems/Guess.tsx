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

const Guess = () => {
  return (
    <ProblemEachField>
      <Title>Guess</Title>
    </ProblemEachField>
  );
};

export default Guess;
