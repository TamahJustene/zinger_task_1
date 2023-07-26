// function toggleForm(){
//   document.getElementById("form").classList.toggle("active");
  
// }


$(document).ready(function () {
  let mainTodoList = [];
  

  function renderTodoList() {
    $("#mainTodoList").empty();
    mainTodoList.forEach((todo, index) => {
      const todoItem = `
        <div class="card mb-3 ">
        <div class="card-body  row flex flex-wrap">
          <div class="col-md-7">
            <h5 class="card-title">${todo.title}</h5>
            </div>
            <div class ="col-md-5">
            <button class="btn  btn-sm mr-2" data-toggle="modal" data-target="#childTodoModal" data-index="${index}"><i class="fa-thin fa-arrow-turn-down-right"></i>+ </button>
            <button class="btn  btn-sm mr-2 delete-todo" data-index="${index}"><i class="fa fa-trash"></i>
            </button>
            <button class="btn  btn-sm mr-2 edit-todo" data-toggle="modal" data-target="#mainTodoModal" data-index="${index}"><i class="fa fa-pencil"></i></button>
            <button class="btn  btn-sm tick-todo" data-index="${index}"><i class="fa fa-check"></i> </button>
          </div>
          </div>
        </div>
      `;
      $("#mainTodoList").append(todoItem);
    });
   
  }

  function  showTodoDetails(index) {
    const todo = mainTodoList[index];
    const todoDetails = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Details:</h5>
          <p class="card-text">${todo.description}</p>
          <p class="card-text"><strong>Start Date:</strong> ${todo.startDate}</p>
          <p class="card-text"><strong>End Date:</strong> ${todo.endDate}</p>
        </div>
      </div>
    `;
    $("#todoDetails").html(todoDetails);
  }

  function addMainTodo() {
    const title = $("#mainTitle").val();
    const startDate = $("#mainStartDate").val();
    const endDate = $("#mainEndDate").val();
    const description = $("#mainDescription").val();
    
    mainTodoList.push({
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      children: []
    });
    
    renderTodoList();
    $("#mainTodoModal").modal("hide");
  }


 

  function addChildTodo(parentIndex) {
    const title = $("#childTitle").val();
    const startDate = $("#childStartDate").val();
    const endDate = $("#childEndDate").val();
    const description = $("#childDescription").val();
    
    mainTodoList[parentIndex].children.push({
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description
    });
    
    renderTodoList();
    $("#childTodoModal").modal("hide");
  }

  function deleteTodo(index) {
    mainTodoList.splice(index, 1);
    renderTodoList();
  }

  function editTodo(index) {
    const title = $("#mainTitle").val();
    const startDate = $("#mainStartDate").val();
    const endDate = $("#mainEndDate").val();
    const description = $("#mainDescription").val();
    
    // Update the properties of the todo at the specified index
    mainTodoList[index].title = title;
    mainTodoList[index].startDate = startDate;
    mainTodoList[index].endDate = endDate;
    mainTodoList[index].description = description;
    
    // Re-render the updated todo list
    renderTodoList();
    
    // Hide the edit modal
    // $("#mainTodoModal").modal("hide");
  }
  
  function tickTodo(index) {
    mainTodoList[index].completed = true;
    renderTodoList();
  }

  $("#addMainTodo").on("click", function () {
    $("#mainTodoModalLabel").text("Add Main Todo");
    $("#mainTodoForm")[0].reset();
    $("#mainTodoModal").modal("show");
  });

  $("#mainTodoForm").on("submit", function (e) {
    e.preventDefault();
    addMainTodo();
  });

  $("#mainTodoList").on("click", ".btn-primary align-centee justify-center text-center", function () {
    const parentIndex = $(this).data("index");
    $("#childTodoModalLabel").text("Add Child Todo");
    $("#childTodoForm")[0].reset();
    $("#childTodoForm").data("parentIndex", parentIndex);
    $("#childTodoModal").modal("show");
  });

  $("#childTodoForm").on("submit", function (e) {
    e.preventDefault();
    const parentIndex = $(this).data("parentIndex");
    addChildTodo(parentIndex);
  });

  $("#mainTodoList").on("click", ".delete-todo", function () {
    const index = $(this).data("index");
    deleteTodo(index);
  });

  $("#mainTodoList").on("click", ".edit-todo", function () {
    const index = $(this).data("index");
    const todo = mainTodoList[index];
    $("#mainTodoModalLabel").text("Edit Todo");
    $("#mainTitle").val(todo.title);
    $("#mainStartDate").val(todo.startDate);
    $("#mainEndDate").val(todo.endDate);
    $("#mainDescription").val(todo.description);
    $("#mainTodoForm").data("editIndex", index);
  });

  $("#mainTodoForm").on("submit", function (e) {
    e.preventDefault();
    const index = $(this).data("editIndex");
    editTodo(index);
  });

  $("#mainTodoList").on("click", ".tick-todo text-primary bg-primary", function () {
    const index = $(this).data("index");
    tickTodo(index);
  });

  // Show the full details of a todo when clicked
  $("#mainTodoList").on("click", ".card-title", function () {
    const index = $(this).parent().parent().index();
    showTodoDetails(index);
  });

  // Initialize the todo list
  renderTodoList();
});





 const option1 = document.getElementById('Option1');
 const option2 = document.getElementById('Option2');
 const option3 = document.getElementById('Option3');
 const option4 = document.getElementById('Option4');
 const option5 = document.getElementById('Option5');
 
 option1.addEventListener('click', function() {
  option1.classList.toggle('clicked');
});

option2.addEventListener('click', function() {
 option2.classList.toggle('clicked');
});

 
option3.addEventListener('click', function() {
 option3.classList.toggle('clicked');
});

option4.addEventListener('click', function() {
  option4.classList.toggle('clicked');
 });

 option5.addEventListener('click', function() {
  option5.classList.toggle('clicked');
 });