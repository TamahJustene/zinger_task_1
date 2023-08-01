$(document).ready(function () {
  let mainTodoList = [];
  let editIndex = null;

  function renderTodoList() {
    $("#mainTodoList").empty();
    mainTodoList.forEach((todo, index) => {
      const parentTodo = `
        <div class="card mb-3">
          <div class="card-body row flex flex-wrap">
            <div class="col-md-7">
              <h5 class="card-title">${todo.title}</h5>
            </div>
            <div class="col-md-5">
              <button class="btn btn-sm mr-2 btn-add-child-todo" data-toggle="modal" data-target="#childTodoModal"
                data-index="${index}">
                <i class="fa-thin fa-arrow-turn-down-right"></i>+
              </button>
              <button class="btn btn-sm mr-2 delete-todo" data-index="${index}">
                <i class="fa fa-trash"></i>
              </button>
              <button class="btn btn-sm mr-2 edit-todo" data-toggle="modal" data-target="#mainTodoModal"
                data-index="${index}">
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
        const childTodoCard = `
          <div class="card mb-3 child-todo-card bg-transparent">
            <div class="card-body">
              ${todo.children.map((child, childIndex) => `
                <div class="card mb-4 child-todo">
                  <div class="card-body">
                    <h6 class="card-title">${child.title}</h6>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;

        $("#mainTodoList").append(childTodoCard);
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
