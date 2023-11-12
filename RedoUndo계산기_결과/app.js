// input에 숫자를 입력하고 + 버튼을 클릭하면 결과값에 입력한 숫자 만큼 더해지고 input의 값은 없어진다. 
// input에 숫자를 입력하고 - 버튼을 클릭하면 결과값에 입력한 숫자 만큼 빼지고 input의 값은 없어진다. 
// input에 유효하지 않은 숫자를 입력하고 +, - 버튼을 클릭하면 동작은 무되되고 input의 값은 없어진다.
// undo를 클릭하면 이전 값으로 돌아간다.
// redo를 클릭하면 이후 값으로 되돌린다.
// undo와 redo는 동작이 가능할때만 활성화 상태가 된다.



var list    = [];
var index   = -1;
var result  = document.getElementById('value');
var total   = 0;

var undoButton  = document.getElementById("undoButton"),
    addButton   = document.getElementById("addButton"),
    subButton   = document.getElementById("subButton"),
    redoButton  = document.getElementById("redoButton"),
    inputValue  = document.getElementById("inputbox");


// =====  ===== //
function onload() {
  undoButton.onclick  = handleClick;
  addButton.onclick   = handleClick;
  subButton.onclick   = handleClick;
  redoButton.onclick  = handleClick;
}




// ===== handlClick ===== //
function handleClick(event) {

  switch (event.target.id) {

    // === Undo === //
    case "undoButton":
      index--;
      if(index < 0){  
        result.innerHTML = 0;
      }else{
        result.innerHTML = list[index];
      }
    break;
    
    
    // === Add === //
    case "addButton":
      var val = document.getElementById('inputbox').value;
      
      // 입력 예외처리
      if(!val){ 
        return alert('값을 입력해 주세요');
      }

      // 연산
      if(index < list.length-1){ //중간지점에서의 연산 - 값날리기
        if(index<0){ // index가 0미만일 경우
          list = []
          total = Number(val);
        }else{
          total = Number(list[index]) + Number(val);
          list.splice(index+1, list.length-index);
        }
      }else{ //*
        total = Number(total) + Number(val);
      }

      // 인덱스 ++
      index++;
      list.push(total);

      result.innerHTML = list[index];
      inputValue.value = '';
      
    break;
      

    // === Sub === //
    case "subButton":
      var val = document.getElementById('inputbox').value;
      
      // 입력 예외처리
      if(!val){
        return alert('값을 입력해 주세요')
      }

      // 연산
      if(index < list.length-1){
        if(index < 0){ // index가 0미만일 경우
          list = []
          total = 0 - Number(val);
        }else{
          total = Number(list[index]) - Number(val);
          list.splice(index+1, list.length-index)
        }
      }else{
        total = Number(total) - Number(val);
      }
      
      // 인덱스 ++
      index = index + 1; 
      list.push(total)
      
      result.innerHTML = list[index]
      inputValue.value = '';
    break;


    // === Redo === //
    case "redoButton":
      if(index >= list.length-1){
        return; 
      }
      index = index+1;
      result.innerHTML = list[index];
    break;


    default:
      return;
      
  } // switch
  
  
  if(index<0){
    undoButton.setAttribute('disabled', true)
  }else{
    undoButton.removeAttribute('disabled')
  }
  if(index>=list.length-1){
    redoButton.setAttribute('disabled', true)
  }else{
    redoButton.removeAttribute('disabled')
  }

  
  
} // func