import Login from "../images/mapIcon/login.png";
import Hidden from "../images/mapIcon/hidden.png";
import Symbol from "../images/mapIcon/symbol.png";
import Codeforce from "../images/mapIcon/codeforce.png";
import Guess from "../images/mapIcon/guess.png";

import Heights from "../images/mapIcon/heights.png";
import Sequence from "../images/mapIcon/sequence.png";
import Word from "../images/mapIcon/word.png";
import Birthday from "../images/mapIcon/birthday.png";
import Probability from "../images/mapIcon/probability.png";

import IQtest from "../images/mapIcon/iqtest.png";
import Mountain from "../images/mapIcon/mountain.png";
import Spoun from "../images/mapIcon/spoun.png";
import Last from "../images/mapIcon/last.png";
import Attack from "../images/mapIcon/attack.png";
import Final from "../images/mapIcon/final.png";

const IconList = [
  {
    idx: 1,
    icon: Login,
    x: "-80px",
    y: "170px",
  },
  {
    idx: 2,
    icon: Hidden,
    x: "193px",
    y: "165px",
  },
  {
    idx: 3,
    icon: Symbol,
    x: "75px",
    y: "180px",
  },
  {
    idx: 4,
    icon: Heights,
    x: "390px",
    y: "245px",
  },
  {
    idx: 5,
    icon: Sequence,
    x: "392px",
    y: "55px",
  },
  {
    idx: 6,
    icon: Word,
    x: "330px",
    y: "310px",
  },
  {
    idx: 7,
    icon: Birthday,
    x: "325px",
    y: "165px",
  },
  {
    idx: 8,
    icon: Probability,
    x: "510px",
    y: "40px",
  },
  {
    idx: 9,
    icon: IQtest,
    x: "320px",
    y: "10px",
  },
  {
    idx: 10,
    icon: Mountain,
    x: "510px",
    y: "275px",
  },
  {
    idx: 11,
    icon: Attack,
    x: "510px",
    y: "350px",
  },
  {
    idx: 12,
    icon: Guess,
    x: "460px",
    y: "-40px",
  },
  {
    idx: 13,
    icon: Attack, // 바꿔야함
    x: "652px",
    y: "40px",
  },
  {
    idx: 14,
    icon: Codeforce,
    x: "670px",
    y: "260px",
  },
  {
    idx: 15,
    icon: Last,
    x: "755px",
    y: "160px",
  },
  {
    idx: 16,
    icon: Final,
    x: "910px",
    y: "160px",
  },
];

const connectList = [
  [3],
  [6, 7, 9],
  [2],
  [10],
  [8],
  [11],
  [4, 5],
  [13],
  [12],
  [14],
  [14],
  [13],
  [15],
  [15],
  [16],
  [],
];

export { IconList, connectList };
