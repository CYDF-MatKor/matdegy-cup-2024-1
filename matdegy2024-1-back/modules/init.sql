CREATE DATABASE IF NOT EXISTS `matdegy2024_1`;
USE matdegy2024_1;

CREATE TABLE IF NOT EXISTS `users` (
  `uid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nickname` varchar(20) NOT NULL UNIQUE,
  `code` INT(8) NOT NULL,
  `login` varchar(2),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `problems` (
  `pid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `number` INT NOT NULL,
  `title` varchar(100) NOT NULL,
  `answer` varchar(100),
  `message` TEXT
);

CREATE TABLE IF NOT EXISTS `solve` (
  `uid` INT NOT NULL REFERENCES `users`(`uid`),
  `pid` INT NOT NULL REFERENCES `problems`(`pid`),
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `elapsed_time` INT,
  CONSTRAINT `solve_unique` UNIQUE (`uid`, `pid`),
  FOREIGN KEY (`uid`) REFERENCES `users`(`uid`),
  FOREIGN KEY (`pid`) REFERENCES `problems`(`pid`)
);

CREATE TABLE IF NOT EXISTS `api_log` (
  `lid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `log` TEXT NOT NULL,
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `problems` (`number`, `title`, `answer`, `message`) VALUES
  (1, 'login', '3nj0y_53c0nd_matd38y_cup', '제2회 MatDegy Cup에 오신 여러분 환영합니다'),
  (2, 'hidden', NULL, 'F12를 누르거나 페이지소스보기를 통해 웹페이지의 HTML 구조를 확인할 수 있습니다'),
  (3, 'symbol', 'Furiosa', '글꼴이 깨지게 되면 Tofu Font가 나오지 않도록 주의해주세요'),
  (4, 'heights', '273372', 'LCM을 구할 때는 항상 overflow를 주의해야 합니다'),
  (5, 'sequence', '130j', '여러 알고리즘을 알고 적절하게 적용시키는 것은 매우 중요합니다'),
  (6, 'word', 'sejong_is_god_like', '암호화된 문자열을 해독하셨나요?'),
  (7, 'birthday', '2022-05-02 19:00', '오늘은 사국 23학번 지수환의 생일입니다. 모두 축하해주세요!'),
  (8, 'probability', NULL, '설정한 확률변수가 따르는 확률분포가 있나요?'), 
  (9, 'iqtest', 'IQ_avg_is_100', '머리가 나쁘면 눈이 고생한다'),
  (10, 'mountatain', 'm0untain_picture', '개발시 console.log를 통해 디버깅 한다면, 배포시에는 꼭 지워주세요'),
  (11, 'attack', 'm4td3gy_1s_4w3s0m3', '웹 개발시 적어도 SQL Injection은 주의합시다'),
  (12, 'guess', '밥솥', '꼬맨틀은 Cosine Similarity를 사용합니다'),
  (13, 'sponsorship', NULL, 'Jane Street는 실제로 해당 문제를 입사 시험에 사용한 적이 있습니다'),
  (14, 'codeforces', NULL, '모두 Codeforces Rating을 올려보아요!'),
  (501, 'sequence1', 'hall', ''),
  (502, 'sequence2', 'recursion', ''),
  (503, 'sequence3', 'physics', ''),
  (504, 'sequence4', 'duality', ''),
  (505, 'sequence5', 'matroid', '여러 알고리즘을 알고 적절하게 적용시키는 것은 중요합니다'),
  (601, 'word1', '해볼게', ''),
  (602, 'word2', '보석', ''),
  (603, 'word3', '알파카', ''),
  (604, 'word4', '볼수록', ''),
  (605, 'word5', '쥐포', ''),
  (606, 'word6', '역삼역', ''),
  (607, 'word7', '안전구역', ''),
  (608, 'word8', '보문역', ''),
  (609, 'word9', '입체적인물', ''),
  (610, 'word10', '조직적행동', ''),
  (611, 'word11', '현대모비스', '암호화된 문자열을 해독하셨나요?');