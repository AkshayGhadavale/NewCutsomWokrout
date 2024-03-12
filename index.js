let timearray = [
  ["cobera", 2, 0, "/images/coach-coach-josh-wood.gif"],
  ["pushups", 4, 0, "./images/pushup.gif"],
  ["Crunches", 0, 10, "./images/abdominal-supra-abdominal.gif"],
  ["Boxing", 0, 10, "./images/pov-boxing.gif"],
];



let mainworkoutarr = [
  ["cobera", 2, 0, "./images/coach-coach-josh-wood.gif"],
  ["pushups", 4, 0, "./images/pushup.gif"],
  ["Crunches", 0, 10, "./images/abdominal-supra-abdominal.gif"],
  ["Boxing", 0, 10, "./images/pov-boxing.gif"],
];



function showmaimarr() {
  const listElement = document.getElementById("workout-list");
  listElement.innerHTML = ""; // Clear the existing listffff

  const searchText = document.getElementById("Searchbox").value.toLowerCase();

  for (let i = 0; i < mainworkoutarr.length; i++) {
      const workoutName = mainworkoutarr[i][0].toLowerCase();
      if (workoutName.startsWith(searchText)) {
          let itemli = document.createElement("li");
          itemli.className = "maimlist";
          itemli.setAttribute("data-index", i);
          itemli.id = `mainexercisename${i}`;
          let span = document.createElement("span");
          span.className = "imgsec";

          let img = document.createElement("img");
          img.src = mainworkoutarr[i][3];

          let text1 = document.createElement("h4");
          text1.innerText = mainworkoutarr[i][0];

          let chkbbox = document.createElement("input");
          chkbbox.type = "checkbox";
          chkbbox.value = mainworkoutarr[i][0];
          chkbbox.id = `checkbox${i}`;

          span.appendChild(img);

          itemli.appendChild(span);
          itemli.appendChild(text1);
          itemli.appendChild(chkbbox);

          listElement.appendChild(itemli);
      }
  }
}

// Event listener for search box input
document.getElementById("Searchbox").addEventListener("input", showmaimarr);

// Initial rendering
showmaimarr();




function addCheckedValues() {
  const checkboxes = document.querySelectorAll(
    ".maimlist input[type='checkbox']"
  );
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      timearray.push(mainworkoutarr[index]);
      mainworkoutarr.splice(index, 1);
    }
  });
  console.log("Selected workouts:", timearray);
  showmaimarr();
  showeex();
}

showmaimarr();

// Event listener for button click
document
  .getElementById("addworkouts")
  .addEventListener("click", addCheckedValues);

let currentIndex = 0;
let timer;
let count2;

function showeex() {
  const listElement = document.getElementById("list");
  listElement.innerHTML = ""; // Clear the existing list

  for (let i = 0; i < timearray.length; i++) {
    let item = document.createElement("li");
    item.className = "exerciseitem";
    item.draggable = true;
    item.setAttribute("data-index", i);

    let img = document.createElement("img");
    img.src = timearray[i][3];
    img.className='imgsec';

    let name = document.createElement("input");
    name.type = "text";
    name.className = "exitemname";
    name.id = `exercisename${i}`;
    name.value = timearray[i][0];
    name.readOnly = true;

    let minnum = document.createElement("input");
    minnum.type = "text";
    minnum.id = `time${i}`;
    minnum.value = timearray[i][1];
    minnum.readOnly = true;

    let secnum = document.createElement("input");
    secnum.type = "text";
    secnum.id = `timesec${i}`;
    secnum.value = timearray[i][2];
    secnum.readOnly = true;

    let timex = document.createElement("div");
    timex.className = "exitemtime";

    timex.appendChild(minnum);
    timex.appendChild(secnum);
    // item.appendChild(img)
    item.appendChild(name);
    item.appendChild(timex);

    // Add Edit button
    let editButton = document.createElement("div");
    editButton.value = "edit";
    editButton.style.width = "20px";
    editButton.style.height = "20px";
    editButton.style.backgroundImage = "url(./images/icons8-edit-96.png)";
    editButton.style.backgroundPosition = "center";
    editButton.style.backgroundSize = "cover";
    editButton.style.backgroundRepeat = "norepeat";

    editButton.id = `editbutton${i}`;
    editButton.addEventListener("click", () => {
      if (editButton.value === "edit") {
        editButton.value = "Save";
        editButton.style.width = "20px";
        editButton.style.fontSize = "0";
        editButton.style.height = "20px";
        editButton.style.backgroundImage = "url(./images/icons8-save-96.png)";
        editButton.style.backgroundPosition = "center";
        editButton.style.backgroundSize = "cover";
        editButton.style.backgroundRepeat = "norepeat";
        editItem(i);
      } else {
        arrayupdate();
        editButton.style.width = "20px";
        editButton.style.height = "20px";
        editButton.style.backgroundImage = "url(./images/icons8-edit-96.png)";
        editButton.style.backgroundPosition = "center";
        editButton.style.backgroundSize = "cover";
        editButton.style.backgroundRepeat = "norepeat";
        editButton.value = "edit";

        document.getElementById(`exercisename${i}`).style.backgroundColor =
          "transparent";
        document.getElementById(`time${i}`).style.backgroundColor =
          "transparent";
        document.getElementById(`timesec${i}`).style.backgroundColor =
          "transparent";
        document.getElementById(`exercisename${i}`).readOnly = true;
        document.getElementById(`time${i}`).readOnly = true;
        document.getElementById(`timesec${i}`).readOnly = true;
      }
    });

    // Add Delete button
    let deleteButton = document.createElement("div");
    deleteButton.value = "Delete";
    deleteButton.id = `deletebutton${i}`;
    deleteButton.style.width = "20px";
    deleteButton.style.height = "20px";
    deleteButton.style.backgroundImage = "url(./images/icons8-delete-64.png)";
    deleteButton.style.backgroundPosition = "center";
    deleteButton.style.backgroundSize = "cover";
    deleteButton.style.backgroundRepeat = "norepeat";

    deleteButton.addEventListener("click", () => {
      deleteItem(i);
    });

    let buttons = document.createElement("div");
    buttons.className = "buttons";

    buttons.appendChild(deleteButton);
    buttons.appendChild(editButton);
    item.appendChild(buttons);

    listElement.appendChild(item);
  }
  listElement.addEventListener("dragstart", handleDragStart);
  listElement.addEventListener("dragover", handleDragOver);
  listElement.addEventListener("drop", handleDrop);
}

function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.index);
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
  const toIndex = parseInt(e.target.dataset.index);

  // Update the array
  const [draggedItem] = timearray.splice(fromIndex, 1);
  timearray.splice(toIndex, 0, draggedItem);

  // Redraw the list
  showeex();
}

function editItem(i) {
  // Implement the logic to handle editing the item at the specified index

  document.getElementById(`exercisename${i}`).readOnly = false;
  document.getElementById(`time${i}`).readOnly = false;
  document.getElementById(`timesec${i}`).readOnly = false;
  document.getElementById(`exercisename${i}`).style.backgroundColor = "#ffffff";
  document.getElementById(`time${i}`).style.backgroundColor = "#ffffff";
  document.getElementById(`timesec${i}`).style.backgroundColor = "#ffffff";

  let newName = document.getElementById(`exercisename${i}`).value;
  let newMin = document.getElementById(`time${i}`).value;
  let newSec = document.getElementById(`timesec${i}`).value;

  document.getElementById(`editbutton${i}`).innerText = "save";

  if (newName !== null && newMin !== null && newSec !== null) {
    timearray[index] = [newName, Number(newMin), Number(newSec)];
    showeex(); // Refresh the list after editing
  }
}

function deleteItem(index) {
  // Implement the logic to handle deleting the item at the specified index
  mainworkoutarr.push(timearray[index]);
  timearray.splice(index, 1);

  showeex(); // Refresh the list after deletion
  showmaimarr();
}

document.getElementById("nextbutton").addEventListener("click", () => {
  if (currentIndex >= timearray.length - 1) {
    alert("Workouts finish");
    document.getElementById("min").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    currentIndex = 0;
    timer = 0;
    count2 = 0;
    document.getElementById("wkimg").src="./images/Customworkout.jpg"
  } else {
    console.log(`this is array length ${timearray.length}`);
    clearInterval(timer);
    loopmain(timearray[currentIndex + 1]);
    currentIndex++;
    console.log(`this is current index ${currentIndex}`);
  }
});
document.getElementById("previousbutton").addEventListener("click", () => {
  loopmain(timearray[currentIndex - 1]);
  currentIndex--;
});

function showPopupWithTimer(timerDuration, callback) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  popup.style.display = "block";
  let countdown = timerDuration;

  function updateCountdown() {
    popupText.innerText = `Next exercise in ${countdown} seconds`;
    document.getElementById("count").style.visibility = "hidden";
    if (countdown === 0) {
      document.getElementById("count").style.visibility = "visible";
      popup.style.display = "none";

      callback();
    } else {
      countdown--;
      setTimeout(updateCountdown, 1000);
    }
  }

  updateCountdown();
}

function loopmain(data) {
  console.log(`get data form nextbutton ${data}`);

  document.getElementById("text1").innerText = data[0];
  // console.log(`main data ${data[1]}`);
  // console.log(`${data[2]}`);
  document.getElementById("wkimg").src = data[3];

  let start = 60;
  let min = data[1];
  console.log(min);
  let sec = data[2];
  let breaktime = 10;
  //   if(min>0){

  //     //
  //     min=0;
  //  sec = data[1]*100;
  //  console.log("smaller")
  //   }
  //   else{
  //     sec=60;
  //     min= data[1] - 1;
  //     console.log("greater")

  //   }
  console.log(min);
  count2 = function count1(countx) {
    if (!isPaused) {
      document.getElementById("min").innerText = min;
      document.getElementById("seconds").innerText = sec;

      if (countx == 0) {
        start = 60;
        sec--;

        if (sec === 0 && min === 0) {
          if (currentIndex >= timearray.length - 1) {
            alert("All exercises completed auto");
            document.getElementById("wkimg").src="./images/Customworkout.jpg"

            currentIndex = 0;
            timer = 0;
            count2 = 0;
            clearInterval(timer);
            document.getElementById("min").innerText = "00";
            document.getElementById("seconds").innerText = "00";
          } else {
            clearInterval(timer);
            showPopupWithTimer(10, () => {
              if (currentIndex < timearray.length - 1) {
                currentIndex++;
                loopmain(timearray[currentIndex]);
              } else {
                //               alert("All exercises completed");
                //               document.getElementById("min").innerText = '00';
                //               document.getElementById("seconds").innerText = '00';
                //                currentIndex = 0;
                //  timer=0;
                //  count2=0;
              }
            });
          }
        }
      }

      if (sec == 0) {
        sec = 60;
        start = 60;
        if (currentIndex >= timearray.length - 1) {
          document.getElementById("min").innerText = "00";
          currentIndex = 0;
          timer = 0;
          count2 = 0;
        } else {
          // min--;
        }

        document.getElementById("min").innerText = min;

        if (min < 0) {
          min = 0;
          clearInterval(timer);
        }
      }
    }
  };
  let isPaused = false; // Variable to track if the timer is paused

  document.getElementById("stopButton").addEventListener("click", () => {
    if (isPaused) {
      // If already paused, resume the timer
      document.getElementById("stopButton").innerText = "Stop";
      timer = setInterval(function () {
        count2(start--);
      }, 10);
      isPaused = false;
    } else {
      document.getElementById("stopButton").innerText = "Resume";
      // If not paused, stop the timer
      clearInterval(timer);
      isPaused = true;
    }
  });

  timer = setInterval(function () {
    count2(start--);
  }, 10);
}

document.getElementById("startButton").addEventListener("click", () => {
  if (currentIndex < timearray.length) {
    loopmain(timearray[currentIndex]);
  } else {
    alert("All exercises completed");
  }
});

showeex();

// document.getElementById("arraybtn").addEventListener("click", () => {
//   arrayupdate();
// });

function arrayupdate() {
  console.log("click");
  for (let i = 0; timearray.length > i; i++) {
    timearray[i][0] = document.getElementById(`exercisename${i}`).value;
    timearray[i][1] = document.getElementById(`time${i}`).value;
    timearray[i][2] = document.getElementById(`timesec${i}`).value;
  }
  console.log(timearray);
}

document.getElementById("addrow").addEventListener("click", () => {
  addex();
});

function addex() {
  let exname = document.getElementById("nameex").value;
  let minex = document.getElementById("minex").value;
  let secex = document.getElementById("secex").value;
  let fileInput = document.getElementById("imagelink");

  if (exname === "" || minex === "" || secex === "") {
      alert("Something is missing");
  } else if (fileInput.files.length === 0) {
      alert("Please select an image file");
  } else {
      let imgFile = fileInput.files[0];
      let imgReader = new FileReader();

      imgReader.onload = function(event) {
          let imgDataUrl = event.target.result;
          mainworkoutarr.push([exname, Number(minex), Number(secex), imgDataUrl]);
          console.log(mainworkoutarr);

          // Remove all child elements from the "list" element
          let listElement = document.getElementById("list");
          while (listElement.firstChild) {
              listElement.removeChild(listElement.firstChild);
          }

          // Reshow the list
          showeex();
          showmaimarr();
      };

      imgReader.readAsDataURL(imgFile);
  }
}