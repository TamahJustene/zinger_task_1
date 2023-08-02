$(document).ready(function () {
  let mainTodoList = [];
  let editIndex = null;

  function renderTodoList() {
    $("#mainTodoList").empty();
    mainTodoList.forEach((todo, index) => {
      const parentTodo = `
        <div class="card  transparent ">
          <div class="card-body row flex flex-wrap">
            <div class="col-md-7">
              <h5 class="card-title">${todo.title}</h5>
            </div>
            <div class="col-md-5 text-end">
              <button class="btn btn-sm mr-2 btn-add-child-todo" data-toggle="modal" data-target="#childTodoModal" data-index="${index}">
                <i class="fa-thin fa-arrow-turn-down-right"></i>+
              </button>
              <button class="btn btn-sm mr-2 delete-todo" data-index="${index}">
                <i class="fa fa-trash"></i>
              </button>
              <button class="btn btn-sm mr-2 edit-todo" data-toggle="modal" data-target="#mainTodoModal" data-index="${index}">
                <i class="fa fa-pencil"></i>
              </button>
              <button class="btn btn-sm tick-todo" data-index="${index}">
                <i class="fa fa-check"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      $("#mainTodoList").append(parentTodo);

      // Check if there are child todos
      if (todo.children.length > 0) {
        const childTodoList = $("<div class='ml-3 mt-2'></div>"); // Add left margin and top margin
        todo.children.forEach((child) => {
          const childTodo = `
            <div class="card  transparent ml-3 offset-md-1">
              <div class="card-body row flex flex-wrap">
                <div class="col-md-7">
                  <h6 class="card-title">${child.title}</h6>
                </div>
                <div class="col-md-5 text-end">
                <button class="btn btn-sm mr-2 btn-add-child-todo" data-toggle="modal" data-target="#childTodoModal" data-index="${index}">
                <i class="fa-thin fa-arrow-turn-down-right"></i>+
              </button>
              <button class="btn btn-sm mr-2 delete-todo" data-index="${index}">
                <i class="fa fa-trash"></i>
              </button>
              <button class="btn btn-sm mr-2 edit-todo" data-toggle="modal" data-target="#mainTodoModal" data-index="${index}">
                <i class="fa fa-pencil"></i>
              </button>
              <button class="btn btn-sm tick-todo" data-index="${index}">
                <i class="fa fa-check"></i>
              </button>
                </div>
              </div>
            </div>
          `;
          childTodoList.append(childTodo);
        });
        $("#mainTodoList").append(childTodoList);
      }
    });
  }


  function showTodoDetails(index) {
    const todo = mainTodoList[index];
    const todoDetails = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Details:</h5>
          <p class="card-text">${todo.description}</p>
          
          <div class="row">
          <div class="col-md-6">
            <p class="card-text"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="green"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zM96 64V75c0 25.5 10.1 49.9 28.1 67.9L192 210.7l67.9-67.9c18-18 28.1-42.4 28.1-67.9V64H96zm0 384H288V437c0-25.5-10.1-49.9-28.1-67.9L192 301.3l-67.9 67.9c-18 18-28.1 42.4-28.1 67.9v11z"/></svg> ${todo.startDate}</p>
          </div>
        
          <div class="col-md-6">
            <p class="card-text"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="red"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zM96 64V75c0 25.5 10.1 49.9 28.1 67.9L192 210.7l67.9-67.9c18-18 28.1-42.4 28.1-67.9V64H96zm0 384H288V437c0-25.5-10.1-49.9-28.1-67.9L192 301.3l-67.9 67.9c-18 18-28.1 42.4-28.1 67.9v11z"/></svg> ${todo.endDate}</p>
          </div>
        </div>
        

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

  function editTodoForm(index) {
    const todo = mainTodoList[index];
    $("#mainTodoModalLabel").text("Edit Todo");
    $("#mainTitle").val(todo.title);
    $("#mainStartDate").val(todo.startDate);
    $("#mainEndDate").val(todo.endDate);
    $("#mainDescription").val(todo.description);
    editIndex = index;
  }

  function addMainTodoForm() {
    $("#mainTodoModalLabel").text("Add Main Todo");
    $("#mainTodoForm")[0].reset();
    editIndex = null;
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
    $("#mainTodoModal").modal("hide");
  }

  function tickTodo(index) {
    mainTodoList[index].completed = true;
    renderTodoList();
  }

  // Add event listener for the "Add Main Todo" button
  $("#addMainTodo").on("click", function () {
    addMainTodoForm();
    $("#mainTodoModal").modal("show");
  });

  $("#mainTodoForm").on("submit", function (e) {
    e.preventDefault();
    const index = $(this).data("editIndex");
    if (editIndex === null) {
      addMainTodo();
    } else {
      editTodo(editIndex);
    }
  });

  $("#mainTodoList").on("click", ".btn-add-child-todo", function () {
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
    editTodoForm(index);
  });

  $("#mainTodoList").on("click", ".tick-todo", function () {
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
function toggleTick(index) {
  mainTodoList[index].completed = !mainTodoList[index].completed;
  renderTodoList();
}

// Add event listener for the "Tick Todo" button
$("#mainTodoList").on("click", ".tick-todo", function () {
  const index = $(this).data("index");
  toggleTick(index);
});

// ... (existing code)







const options = document.querySelectorAll('.option');

options.forEach((option) => {
  option.addEventListener('click', function () {
    options.forEach((otherOption) => {
      if (otherOption !== option) {
        otherOption.classList.remove('clicked');
      }
    });
    option.classList.toggle('clicked');
  });
});
