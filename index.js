
$(document).ready(function () {
  let mainTodoList = [];
  let editIndex = null;
  let parentIndex = null;
  let childIndex = null;

  function renderTodoList(category = null) {
    $("#mainTodoList").empty();
    const filteredList = category
      ? mainTodoList.filter((todo) => todo.category === category)
      : mainTodoList;

    if (filteredList.length === 0) {
      $("#mainTodoList").html(`<p>No task ${category}.</p>`);
    } else {
      console.log("I click on this")
      filteredList.forEach((todo, index) => {
        const parentTodo = `
          <div class="card main-todo transparent ${todo.completed ? 'completed' : ''} ${todo.important ? 'important' : ''}">
            <div class="card-body row flex flex-wrap">
              <div class="col-md-7">
                <h5 class="card-title">${todo.title}</h5>
              </div>
              <div class="col-md-5 text-end">
                <button class="btn btn-sm mr-2 btn-add-child-todo" data-toggle="modal" data-target="#childTodoModal"
                  data-index="${index}">
                  <img src="assets/arrow-long-right-c.svg" alt="">
                </button>
                <button class="btn btn-sm mr-2 delete-todo" data-index="${index}" data-type="main">
                <img src="assets/delete.svg" alt="">
              </button>
                <button class="btn btn-sm mr-2 edit-todo" data-toggle="modal" data-target="#mainTodoModal" data-index="${index}">
                  <img src="assets/edit.svg" alt="">
                </button>
                <button class="btn btn-sm tick-todo ${todo.completed ? 'completed' : ''}" data-index="${index}">
                <i class="fa-sharp fa-solid fa-circle-check fa-xl"></i>
                </button>
                <button class="btn btn-sm star star-original  ${todo.important ? 'important' : ''}" data-index="${index}">
                <i class="fas fa-star fa-2x"></i>
                </button>
              </div>
            </div>
          </div>
        

        ${
          // Check if there are child todos
          todo.children.length > 0
            ? `<div class="arrow-line">
         
            <img src="assets/Path 18 (1).svg" alt="">
        
            </div>`
            : ''
          }




        `;

        $("#mainTodoList").append(parentTodo);


        // Check if there are child todos
        if (todo.children.length > 0) {
          const childTodoList = $("<div class='ml-3 mt-n10 child-render-negative'></div>"); // Add left margin and top margin
          todo.children.forEach((child) => {
            const childTodo = `
            
              <div class="card  transparent ml-3  offset-md-1 p-0 ${child.completed ? 'completed' : ''}">
                <div class="card-body row flex flex-wrap mb-">
                  <div class="col-md-7">
                    <h6 class="card-title">${child.title}</h6>
                  </div>
                  <div class="col-md-5 text-end">
                    <button class="btn btn-sm mr-2 btn-add-child-todo" data-toggle="modal" data-target="#childTodoModal" data-index="${index}">
                    <img src="assets/arrow-long-right-c.svg" alt="">
                    </button>
                    <button class="btn btn-sm mr-2 delete-todo" data-index="${index}" data-type="child">
                      <img src="assets/delete.svg" alt="">
                    </button>
                    <button class="btn btn-sm edit-child-todo" data-toggle="modal" data-target="#childTodoModal" data-index="${index}">
                    <img src="assets/edit.svg" alt="">
                    </button>
                    <button class="btn btn-sm tick-todo  ${child.completed ? 'completed' : ''}" data-index="${index}">
                    <img src="assets/checkmark-circled.svg" alt="">
                    </button>
                    <button class="btn btn-sm star star-original ${todo.important ? 'important' : ''}" data-index="${index}">
                    <i class="fas fa-star fa-2x"></i>
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
  }

  function categorizeTasks() {
    const today = new Date().toLocaleDateString();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toLocaleDateString();

    mainTodoList.forEach((todo) => {
      const startDate = new Date(todo.startDate).toLocaleDateString();
      if (today === startDate) {
        todo.category = "today";
      } else if (tomorrowString === startDate) {
        todo.category = "tomorrow";
      } else if (new Date() > new Date(todo.endDate)) {
        todo.category = "archive";
      } else {
        todo.category = "future";
      }
    });
  }


  function saveToLocalStorage() {
    localStorage.setItem("mainTodoList", JSON.stringify(mainTodoList));
  }

  function loadFromLocalStorage() {
    const data = localStorage.getItem("mainTodoList");
    if (data) {
      mainTodoList = JSON.parse(data);
    }
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
      children: [],
      completed: false,
      important: false
    });

    renderTodoList();
    saveToLocalStorage();
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
      description: description,
      completed: false,
      important: false
    });

    renderTodoList();
    saveToLocalStorage();
    $("#childTodoModal").modal("hide");
  }

  // function deleteTodo(index) {
  //   mainTodoList.splice(index, 1);
  //   renderTodoList();
  //   saveToLocalStorage();
  // }

  // function deleteChildTodo(parentIndex, childIndex) {
  //   mainTodoList[parentIndex].children.splice(childIndex, 1);
  //   renderTodoList();
  //   saveToLocalStorage();
  // }



  // ... Your existing code ...

// Update the deleteTodo function to accept a type parameter
function deleteTodo(index, type) {
  if (type === 'main') {
    mainTodoList.splice(index, 1);
  } else if (type === 'child') {
    const parentIndex = $(this).closest('.card.main-todo').data('index');
    mainTodoList[parentIndex].children.splice(index, 0);
  }
  renderTodoList();
  saveToLocalStorage();
}

// ... Rest of your code ...

// Add event listener for the "Delete" buttons
$('#mainTodoList').on('click', '.delete-todo', function () {
  const index = $(this).data('index');
  const type = $(this).data('type');
  deleteTodo(index, type);
});


// ... Rest of your code ...



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
    saveToLocalStorage();

    // Hide the edit modal
    $("#mainTodoModal").modal("hide");
  }





  $("#mainTodoList").on("click", ".card.main-todo", function () {
    // Remove the "clicked" class from all main todos
    $(".card.main-todo").removeClass("clicked");

    // Add the "clicked" class to the clicked main todo
    $(this).addClass("clicked");
  });









  function editMainTodoForm(index) {
    const todo = mainTodoList[index];
    $("#mainTodoModalLabel").text("Edit Main Todo");
    $("#mainTitle").val(todo.title);
    $("#mainStartDate").val(todo.startDate);
    $("#mainEndDate").val(todo.endDate);
    $("#mainDescription").val(todo.description);
    editIndex = index;
    parentIndex = null;
    childIndex = null;
    renderTodoList();
    $("#mainTodoModal").modal("hide");
  }



  function editChildTodoForm(parentIndex, childIndex) {
    const todo = mainTodoList[parentIndex].children[childIndex];
    $("#childTodoModalLabel").text("Edit Child Todo");
    $("#childTitle").val(todo.title);
    $("#childStartDate").val(todo.startDate);
    $("#childEndDate").val(todo.endDate);
    $("#childDescription").val(todo.description);
    editIndex = null;
    parentIndex = parentIndex;
    childIndex = childIndex;
  }
  function tickTodo(index) {
    mainTodoList[index].completed = !mainTodoList[index].completed;
    const todo = mainTodoList[index];
    $(`[data-index="${index}"]`).toggleClass('completed', todo.completed);
    $(`[data-index="${index}"] button`).toggleClass('active', todo.completed);
    todo.category = todo.completed ? "completed" : "today"; // Update the category based on completed status
    renderTodoList();
    saveToLocalStorage();
  }

  function starTodo(index) {
    mainTodoList[index].important = !mainTodoList[index].important;
    const todo = mainTodoList[index];
    $(`[data-index="${index}"] i`)
      .toggleClass('fa-star')
      .toggleClass('fa-star-o', !todo.important); // Update the star icon class
    $(`[data-index="${index}"]`).toggleClass('important', todo.important);
    todo.category = todo.important ? "important" : "today"; // Update the category based on important status
    console.log(todo)
    renderTodoList();
    saveToLocalStorage();
  }

  // Add event listener for the "Add Main Todo" button


  $("#mainTodoList").on("click", ".edit-todo", function () {
    const index = $(this).data("index");
    editMainTodoForm(index);
    $("#mainTodoModal").modal("show");
  });

  $("#mainTodoList").on("click", ".edit-child-todo", function () {
    parentIndex = $(this).data("index");
    childIndex = $(this).data("child-index");
    editChildTodoForm(parentIndex, childIndex);
    $("#childTodoModal").modal("show");
  });
  $("#addMainTodo").on("click", function () {
    addMainTodoForm();
    $("#mainTodoModal").modal("show");
  });

  $("#mainTodoList").on("click", ".star", function () {
    const index = $(this).data("index");
    starTodo(index);
  });

  $("#mainTodoList").on("click", ".tick-todo", function () {
    const index = $(this).data("index");
    tickTodo(index);
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

  $(".category-btn").on("click", function () {
    const category = $(this).data("category");
    renderTodoList(category);
  });

  $("#mainTodoList").on("click", ".btn-add-child-todo", function () {
    const parentIndex = $(this).data("index");
    $("#childTodoModal").data("parent-index", parentIndex);
  });

  $("#childTodoForm").on("submit", function (e) {
    e.preventDefault();
    const parentIndex = $("#childTodoModal").data("parent-index");
    addChildTodo(parentIndex);
  });

  $("#mainTodoList").on("click", ".delete-todo", function () {
    const index = $(this).data("index");
    const type = $(this).data("type");

    if (type === "main") {
      deleteTodo(index);
    } else if (type === "child") {
      const parentIndex = $(this).closest(".card").data("parent-index");
      deleteChildTodo(parentIndex, index);
    }
  });

  $("#mainTodoList").on("click", ".edit-todo", function () {
    const index = $(this).data("index");
    editTodoForm(index);
    $("#mainTodoModal").modal("show");
  });

  // Show the full details of a todo when clicked
  $("#mainTodoList").on("click", ".card-title", function () {
    const index = $(this).closest(".card").index();
    showTodoDetails(index);
  });

  // Initialize the todo list
  loadFromLocalStorage();
  categorizeTasks();
  renderTodoList();

  // function showTodoDetails(index) {
  //   const todo = mainTodoList[index];
  //   const todoDetails = `
  //     <div >
  //       <div class = "details-heading">
  //         <h5 class="text-dark .font-weight-bold">Details:</h5>
  //         <p >${todo.description}</p>

  //         <div class="row detials-dates">
  //           <div class="col-md-6">
  //             <p class="card-text"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="green"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zm96 384V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32zm192-384H64V75c0-25.5 10.1-49.9 28.1-67.9L192 14.7l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11z"/></svg> ${todo.startDate}</p>
  //           </div>
  //           <div class="col-md-6">
  //             <p class="card-text"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="red"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zm96 384V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32zm192-384H64V75c0-25.5 10.1-49.9 28.1-67.9L192 14.7l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11z"/></svg> ${todo.endDate}</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   `;

  //   $("#todoDetailsModal").html(todoDetails);

  // }


  function showTodoDetails(index) {
    console.log("Showing details for index:", index);
    const todo = mainTodoList[index];
    const todoDetailsModal = document.getElementById("todoDetailsModal");

    // Check if todoDetailsModal is empty
    if (todoDetailsModal.innerHTML.trim() === "") {
      // Append todo details directly
      todoDetailsModal.innerHTML = `
        
      <div>
         <h5>Details:</h5>
          <p> ${todo.description}</p>
    </div>
    <div class="row">
    <div class="col-md-6">
    <p> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="green"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zm96 384V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32zm192-384H64V75c0-25.5 10.1-49.9 28.1-67.9L192 14.7l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11z"/></svg>       ${todo.startDate}</p></div>
     <div class="col-md-6">
     <p> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="red"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zm96 384V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32zm192-384H64V75c0-25.5 10.1-49.9 28.1-67.9L192 14.7l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11z"/></svg> ${todo.endDate}</p>
     </div>
 </div>
      `;
    } else {
      // Clear previous details
      todoDetailsModal.innerHTML = "";

      // Append todo details
      todoDetailsModal.innerHTML = `
      <div>
          <h5>Details:</h5>
          <p> ${todo.description}</p>
      </div>
       <div class="row">
         <div class="col-md-6">
         <p> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="green"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zm96 384V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32zm192-384H64V75c0-25.5 10.1-49.9 28.1-67.9L192 14.7l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11z"/></svg>       ${todo.startDate}</p></div>
          <div class="col-md-6">
          <p> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="red"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zm96 384V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32zm192-384H64V75c0-25.5 10.1-49.9 28.1-67.9L192 14.7l67.9 67.9c18 18 28.1 42.4 28.1 67.9v11z"/></svg> ${todo.endDate}</p>
          </div>
      </div>
      `;
    }
  }


});










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


const main_todo = document.querySelectorAll()