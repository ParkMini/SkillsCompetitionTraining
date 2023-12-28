// input에 숫자를 입력하고 + 버튼을 클릭하면 결과값에 입력한 숫자 만큼 더해지고 input의 값은 없어진다.
// input에 숫자를 입력하고 - 버튼을 클릭하면 결과값에 입력한 숫자 만큼 빼지고 input의 값은 없어진다.
// input에 유효하지 않은 숫자를 입력하고 +, - 버튼을 클릭하면 동작은 무되되고 input의 값은 없어진다.
// undo를 클릭하면 이전 값으로 돌아간다.
// redo를 클릭하면 이후 값으로 되돌린다.
// undo와 redo는 동작이 가능할때만 활성화 상태가 된다.

/**
 * list = [];
 * pointer = 0 (Default);
 * Plus, Minus Function -> curCount++;
 * if (len(list) === 0) { noUndo, noRedo }
 * if (len(list) >= 1) { Undo, noRedo }
 * if (len(list) === curCount) { Undo, Redo }
 */

let valueElem = document.getElementById("value"); // 결과 값 출력 Elem
let resultArr = [0];
let total = 0;
let pointer = 0;

const undoButton = document.getElementById("undoButton"),
  addButton = document.getElementById("addButton"),
  subButton = document.getElementById("subButton"),
  redoButton = document.getElementById("redoButton"),
  inputValue = document.getElementById("inputbox");

// =====  ===== //
function onload() {
  undoButton.onclick = handleClick;
  addButton.onclick = handleClick;
  subButton.onclick = handleClick;
  redoButton.onclick = handleClick;
}

// ===== handlClick ===== //
function handleClick(event) {
  const eventType = event.target.id;
  const num = Number(inputValue.value); // Type(Number)를 명시하지 않을 경우 String + Number가 되어버림

  if ((eventType === "addButton" || eventType === "subButton")) {
    resultArr = resultArr.slice(0, pointer + 1); // 현재 포인터까지 배열 자르기
    pointer++; // 포인터 증가

    if (eventType === "addButton") {
      total += num;
    } else {
      total -= num;
    }
    resultArr.push(total); // 연산 결과를 resultArr에 추가
    valueElem.innerText = total; // total 값 출력
  }
  inputValue.value = ""; // <input> 값 지우기

  // Undo Event
  if (eventType === "undoButton" && pointer > 0) {
    pointer--; // 포인터 감소
    total = resultArr[pointer]; // 이전 값을 total에 저장
    valueElem.innerText = total; // total 값 출력
  }

  // Redo Event
  if (eventType === "redoButton" && pointer < resultArr.length - 1) {
    pointer++; // 포인터 증가
    total = resultArr[pointer]; // 다음 값을 total에 저장
    valueElem.innerText = total; // total 값 출력
  }

  // Undo, Redo 버튼 비활성 상태 변경
  undoButton.disabled = pointer === 0;
  redoButton.disabled = pointer >= resultArr.length - 1;
}

//승주 최고