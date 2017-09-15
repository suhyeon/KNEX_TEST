# Node.js Debug
우선 나머지 서버가 켜져있다면 다 꺼야한다.  
## launch.json
```json
 {
      "type": "node",
      "request": "attach",
      "name": "Attach",
      "port": 9229,
      "protocol": "inspector"
    }
```
이렇게 설정한다.
## command
$ node --inspect src/index.js

>성공하면, debugger attached가 출력된다.(터미널)
## breakpoint
url 밑에 포인트를 건다.

## debug complete
chrome에서 url로 접속 하면, 어떠한 동작을 하면, 바로 vscode로 디버그된다.

## 추가
package.json 에서 "debug": "node --inspect src/index.js"설정하면 서버를 끄고 터미널에서 npm run debug를 누르면 디버그를 할 수 있다.

## 인풋 라벨
인풋 태그를 라벨에 넣어주는 이유 : 글씨를 눌러도 인풋이 체크되게 하는 디자인