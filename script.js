"use strict";

// following are the variables to get the elements which are used multiple times in the code below
const stopwatchMillisecondInput = document.getElementById("stopwatchMillisecond");
const stopwatchSecondInput = document.getElementById("stopwatchSecond");
const stopwatchMinuteInput = document.getElementById("stopwatchMinute");
const stopwatchHourInput = document.getElementById("stopwatchHour");

const stopwatchReset = document.getElementById("stopwatchReset");
const stopwatchStartStop = document.getElementById("stopwatchStartStop");
const stopwatchCountLap = document.getElementById("stopwatchCountLap");

const timerHourInput = document.getElementById("timerHour");
const timerMinuteInput = document.getElementById("timerMinute");
const timerSecondInput = document.getElementById("timerSecond");

const timerReset = document.getElementById("timerReset");
const timerStartStop = document.getElementById("timerStartStop");
const timerDelete = document.getElementById("timerDelete");



const time = () => {
  // function for getting the hour, minute, second, date, month, day-name, year and printing them
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const current_date = date.getDate();
  const month = date.getMonth();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[date.getDay()].substr(0, 3).toUpperCase();
  const year = date.getFullYear();

  if (document.getElementById("formatMode").checked) {
    document.getElementById("clockHour").innerHTML = hour;
  } else {
    if (hour > 12) document.getElementById("clockHour").innerHTML = hour - 12;
    else if (hour < 1)
      document.getElementById("clockHour").innerHTML = hour + 12;
    else document.getElementById("clockHour").innerHTML = hour;
  }

  document.getElementById("clockMinute").innerHTML = minute;
  document.getElementById("clockSecond").innerHTML = second;
  document.getElementById("clockDate").innerHTML = current_date;
  document.getElementById("clockMonth").innerHTML = month + 1;
  document.getElementById("clockDayName").innerHTML = dayName;
  document.getElementById("clockYear").innerHTML = year;

  (hour >= 12) ? document.getElementById("meridiem").innerHTML = "PM" : document.getElementById("meridiem").innerHTML = "AM";

};

setInterval(() => {
  // function for updating hour, minute, second, date, month, day-name, year every 1/10 second executing time function every 1/10 second
  time();
}, 100);

const toggleClock = visibility => {
  // function to change the visibility of Clock div
  document.getElementsByClassName("formatMode")[0].style.display = visibility;
  document.getElementById("clock").style.display = visibility;
};

const toggleStopwatch = visibility => {
  // function to change the visibility of Stopwatch div
  document.getElementById("stopwatch").style.display = visibility;
};

const toggleTimer = visibility => {
  // function to change the visibility of Timer div
  document.getElementById("timer").style.display = visibility;
};

window.onload = () => {
  //function to execute following tasks on page load

  document.getElementById("clockHeading").className += "active"; // assigning active class to clockHeading div tag in header tag

  stopwatchReset.disabled = true; // reset button of Stopwatch disabled on page load
  stopwatchCountLap.disabled = true; // lap button of Stopwatch disabled on page load
  timerReset.disabled = true; // reset button of Timer disabled on page load
  timerDelete.disabled = true; // delete button of Timer disabled on page load

  document.getElementById("clockHeading").onclick = () => {
    // following code removes class-name from the elements. Following approach is taken so it can work in all the browsers
    document.getElementById(
      "stopwatchHeading"
    ).className = document
      .getElementById("stopwatchHeading")
      .className.replace(/\bactive\b/g, "");
    document.getElementById("timerHeading").className = document
      .getElementById("timerHeading")
      .className.replace(/\bactive\b/g, "");
    // class-name is removed from the elements

    // following code adds class-name to the element. Following approach is taken so it can work in all the browsers
    document.getElementById("clockHeading").className += " " + "active";
    // class-name is added to the element

    // following code shows Clock and hides Stopwatch and Timer
    toggleClock("block");
    toggleStopwatch("none");
    toggleTimer("none");
    // Clock is visible and Stopwatch-Timer is hidden
  };

  document.getElementById("stopwatchHeading").onclick = () => {
    // following code removes class-name from the elements. Following approach is taken so it can work in all the browsers
    document.getElementById("clockHeading").className = document
      .getElementById("clockHeading")
      .className.replace(/\bactive\b/g, "");
    document.getElementById("timerHeading").className = document
      .getElementById("timerHeading")
      .className.replace(/\bactive\b/g, "");
    // class-name is removed from the elements

    // following code adds class-name to the element. Following approach is taken so it can work in all the browsers
    document.getElementById("stopwatchHeading").className += " " + "active";
    // class-name is added to the element

    // following code shows Stopwatch and hides Clock and Timer
    toggleClock("none");
    toggleStopwatch("block");
    toggleTimer("none");
    // Stopwatch is visible and Clock-Timer is hidden
  };

  document.getElementById("timerHeading").onclick = () => {
    // following code removes class-name from the elements. Following approach is taken so it can work in all the browsers
    document.getElementById(
      "stopwatchHeading"
    ).className = document
      .getElementById("stopwatchHeading")
      .className.replace(/\bactive\b/g, "");
    document.getElementById("clockHeading").className = document
      .getElementById("timerHeading")
      .className.replace(/\bactive\b/g, "");
    // class-name is removed from the elements

    // following code adds class-name to the element. Following approach is taken so it can work in all the browsers
    document.getElementById("timerHeading").className += " " + "active";
    // class-name is added to the element

    // following code shows Timer and hides Clock and Stopwatch
    toggleClock("none");
    toggleStopwatch("none");
    toggleTimer("block");
    // Timer is visible and Clock-Stopwatch
  };

  stopwatchStartStop.onclick = () => {
    // function to execute startStopwatch function when Stopwatch Start/Stop button content is equal to START and execute stopStopwatch function when Stopwatch Start/Stop button content is equal to STOP
    if (stopwatchStartStop.innerHTML == "START") {
      startStopwatch();
    } else if (stopwatchStartStop.innerHTML == "STOP") {
      stopStopwatch();
    }
  };

  stopwatchReset.onclick = () => resetStopwatch(); // to execute resetStopwatch function when clicked on Stopwatch reset button
  stopwatchCountLap.onclick = () => createLap(); // to execute createLap function when clicked on Stopwatch count lap button

  timerHourInput.value = "";
  timerMinuteInput.value = "";
  timerSecondInput.value = "";
  //to assign the values of input to nothing when page is loaded

  timerStartStop.onclick = () => {
    // function to fetch values from Timer inputs and execute startTimer function when Timer Start/Stop button content is equal to START and execute stopTimer function when Timer Start/Stop button content is equal to STOP and also generate an error if fetched values are not valid and also stopping anything from executing if values are not provided or values are equal to zero
    if (timerStartStop.innerHTML == "START") {
      timerHour = Number(timerHourInput.value);
      timerMinute = Number(timerMinuteInput.value);
      timerSecond = Number(timerSecondInput.value);

      if (timerSecond >= 0 && timerMinute >= 0 && timerHour >= 0 && timerSecond <= 60 && timerMinute <= 60 && timerHour <= 99) {
        startTimer();
      }
      else {
        startTimerError();
      }
    } else if (timerStartStop.innerHTML == "STOP") {
      stopTimer();
    }
  };

  timerReset.onclick = () => resetTimer(); // to execute resetTimer function when clicked on Timer reset button
  timerDelete.onclick = () => deleteTimer(); // to execute resetDelete function when clicked on Timer delete button

  timerHourInput.addEventListener("input", timerInputLimitHandler); // to execute timerInputLimitHandler function on timerHour input tag
  timerMinuteInput.addEventListener("input", timerInputLimitHandler); // to execute timerInputLimitHandler function on timerMinute input tag
  timerSecondInput.addEventListener("input", timerInputLimitHandler); // to execute timerInputLimitHandler function on timerSecond input tag
};

// followings are all the variables which are used in following functions for running the Stopwatch
let lapCounter = 0;
let intervalID = null;
let stopwatchHour = 0;
let stopwatchMinute = 0;
let stopwatchSecond = 0;
let stopwatchMillisecond = 0;

const controlStopwatch = () => {
  // function to control the Stopwatch by the main Stopwatch logic of decreasing and assigning values to seconds, minutes and hours and stops when Stopwatch is equal to certain values in milliseconds, seconds, minutes and hours
  stopwatchMillisecond += 1;
  if (stopwatchMillisecond > 99) {
    stopwatchSecond += 1;
    stopwatchMillisecond = 0;
  }
  if (stopwatchSecond > 59) {
    stopwatchMinute += 1;
    stopwatchSecond = 0;
  }
  if (stopwatchMinute > 59) {
    stopwatchHour += 1;
    stopwatchMinute = 0;
  }
  if (stopwatchHour == 23 && stopwatchMinute == 59 && stopwatchSecond == 59 && stopwatchMillisecond == 59) {
    stopStopwatch();
    stopwatchStartStop.disabled = true;
    document.getElementById("stopwatchPause").disabled = true;
    stopwatchReset.disabled = false;
  }
  stopwatchMillisecondInput.innerHTML = stopwatchMillisecond;
  stopwatchSecondInput.innerHTML = stopwatchSecond;
  stopwatchMinuteInput.innerHTML = stopwatchMinute;
  stopwatchHourInput.innerHTML = stopwatchHour;
}

const intervalManager = (flag, controlStopwatch, time) => {
  // function to handle the interval function which is mainly responsible for starting and stopping the Stopwatch
  if (flag) intervalID = setInterval(controlStopwatch, time);
  else clearInterval(intervalID);
}

const startStopwatch = () => {
  // function to start stopwatch after checking the values and assign STOP value to Stopwatch Start/Stop button
  intervalManager(true, controlStopwatch, 10);
  stopwatchStartStop.innerHTML = "STOP";
  stopwatchCountLap.disabled = false;
  stopwatchReset.disabled = false;
}

const stopStopwatch = () => {
  // function to stop Stopwatch and assign START value to Stopwatch Start/Stop button
  intervalManager(false);
  stopwatchStartStop.innerHTML = "START";
  stopwatchStartStop.disabled = false;
  stopwatchCountLap.disabled = true;
}

const resetStopwatch = () => {
  // function to reset Stopwatch to its initial state and assign START value to Stopwatch Start/Stop button
  stopwatchStartStop.innerHTML = "START";
  intervalManager(false);
  stopwatchReset.disabled = true;
  stopwatchStartStop.disabled = false;
  stopwatchCountLap.disabled = true;
  lapCounter = 0;
  stopwatchHour = 0;
  stopwatchMinute = 0;
  stopwatchSecond = 0;
  stopwatchMillisecond = 0;
  stopwatchHourInput.innerHTML = stopwatchHour;
  stopwatchMinuteInput.innerHTML = stopwatchMinute;
  stopwatchSecondInput.innerHTML = stopwatchSecond;
  stopwatchMillisecondInput.innerHTML = stopwatchMillisecond;
  document.getElementById("lap").innerHTML = "";
  const parent = document.getElementsByClassName("stopwatchButton")[0];
  const child = document.getElementsByClassName("lapWarning")[0];
  if (typeof child != "undefined" && child != null) {
    parent.removeChild(child);
  }
}

const createLap = () => {
  // function to create lap by creating nodes assigning them the data retrieved from Stopwatch and appending them to parent node and checking and stopping with alert message if they are more than the 24
  lapCounter++;
  if (lapCounter <= 24) {
    const content = document.createElement("div");
    content.className = "createdLap";
    const hash = document.createElement("span");
    hash.className = "hash";
    const hashContent = document.createTextNode("#" + lapCounter);
    hash.appendChild(hashContent);
    const lap = document.createElement("span");
    lap.className = "lapTime";
    const lapContent = document.createTextNode(stopwatchHour + ":" + stopwatchMinute + ":" + stopwatchSecond + ":" + stopwatchMillisecond);
    lap.appendChild(lapContent);
    content.appendChild(hash);
    content.appendChild(lap);

    const element = document.getElementById("lap");
    const sibling = document.getElementsByClassName("createdLap")[0];

    if (lapCounter <= 1) {
      element.appendChild(content);
    } else if (lapCounter <= 24) {
      element.insertBefore(content, sibling);
    }
  } else if (lapCounter == 25) {
    const warningContent = document.createElement("div");
    warningContent.className = "lapWarning";
    const node = document.createTextNode("Lap Counter Limit Reached");
    warningContent.appendChild(node);
    const element = document.getElementsByClassName("stopwatchButton")[0];
    element.appendChild(warningContent);
  }
}

const timerValidationHandler = event => {
  // function to only return numeric values to input tag
  return event.charCode >= 48 && event.charCode <= 57
}

const timerInputLimitHandler = event => {
  // function to restrict user to input more than 2 characters in input tag
  if (event.target.value.length > event.target.maxLength) {
    event.target.value = event.target.value.slice(0, event.target.maxLength);
  }
}

// followings are all the variables which are used in following functions for running the Timer
let intervalIDTimer = null;
let firstStartTimer = true;
let reset = false;
let timerHour = 0;
let timerMinute = 0;
let timerSecond = 0;
let timerMillisecond;
let timerMillisecondDefaultValue = 99;
let permanentTimerHour;
let permanentTimerMinute;
let permanentTimerSecond;

const beep = (vol, freq, duration) => {
  // function to create a beep sound according to the passed arguements in beep function
  const audio = new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em
  audio.resume();
  const oscillator = audio.createOscillator()
  const gain = audio.createGain()
  oscillator.connect(gain)
  oscillator.frequency.value = freq
  oscillator.type = "square"
  gain.connect(audio.destination)
  gain.gain.value = vol * 0.01
  oscillator.start(audio.currentTime)
  oscillator.stop(audio.currentTime + duration * 0.001)
}

const controlTimer = () => {
  // function to control the Timer by the main Timer logic of decreasing and assigning values to seconds, minutes and hours and stops when Timer is equal to 0 values in seconds, minutes and hours and generate beep sound
  timerMillisecond -= 1;
  if (timerMillisecond < 0) {
    timerSecond -= 1;
    timerMillisecond = timerMillisecondDefaultValue;
  }
  if (timerSecond < 0) {
    timerMinute -= 1;
    timerSecond = 59;
  }
  if (timerMinute < 0) {
    timerHour -= 1;
    timerMinute = 59;
  }
  if (timerHour == 0 && timerMinute == 0 && timerSecond == 0) {
    beep(100, 520, 200);
    firstStartTimer = true;
    timerMillisecond = 99;
    resetTimer();
  }
  document.getElementsByClassName("timerSecondDisplay")[0].innerHTML = timerSecond;
  document.getElementsByClassName("timerMinuteDisplay")[0].innerHTML = timerMinute;
  document.getElementsByClassName("timerHourDisplay")[0].innerHTML = timerHour;
}

const intervalManagerTimer = (flag, controlTimer, time) => {
  // function to handle the interval function which is mainly responsible for starting and stopping the Timer
  if (flag) intervalIDTimer = setInterval(controlTimer, time);
  else clearInterval(intervalIDTimer);
}

const startTimer = () => {
  // function to start Timer after checking the values and assign STOP value to Timer Start/Stop button
  if (firstStartTimer) {
    const parent = document.getElementsByClassName("timerTime")[0];
    const child1 = document.getElementsByClassName("timerContent")[0];
    const child2 = document.getElementsByClassName("timerErrorDisplay")[0];

    if (typeof child1 != "undefined" && child1 != null) {
      parent.removeChild(child1);
    }

    if (typeof child2 != "undefined" && child2 != null) {
      parent.removeChild(child2);
    }

    timerHourInput.disabled = true;
    timerMinuteInput.disabled = true;
    timerSecondInput.disabled = true;

    firstStartTimer = false;
    timerHour = Number(timerHourInput.value);
    timerMinute = Number(timerMinuteInput.value);
    timerSecond = Number(timerSecondInput.value);
    timerMillisecond = 99;
    permanentTimerHour = timerHour;
    permanentTimerMinute = timerMinute;
    permanentTimerSecond = timerSecond;
    const timerContent = document.createElement("div");
    timerContent.className = "timerContent";

    const timerHourDisplay = document.createElement("div");
    timerHourDisplay.className = "timerHourDisplay";
    const timerHourDisplayContent = document.createTextNode(timerHour);
    timerHourDisplay.appendChild(timerHourDisplayContent);

    const timerMinuteDisplay = document.createElement("div");
    timerMinuteDisplay.className = "timerMinuteDisplay";
    const timerMinuteDisplayContent = document.createTextNode(timerMinute);
    timerMinuteDisplay.appendChild(timerMinuteDisplayContent);

    const timerSecondDisplay = document.createElement("div");
    timerSecondDisplay.className = "timerSecondDisplay";
    const timerSecondDisplayContent = document.createTextNode(timerSecond);
    timerSecondDisplay.appendChild(timerSecondDisplayContent);

    timerContent.appendChild(timerHourDisplay);
    timerContent.appendChild(timerMinuteDisplay);
    timerContent.appendChild(timerSecondDisplay);

    const timerElement = document.getElementsByClassName("timerTime")[0];
    timerElement.appendChild(timerContent);

  }
  if (timerHour == 0 && timerMinute == 0 && timerSecond == 0) {
    timerStartStop.innerHTML = "START";
    firstStartTimer = true;
    timerHourInput.disabled = false;
    timerMinuteInput.disabled = false;
    timerSecondInput.disabled = false;
  }
  if (reset) {
    reset = false;
    timerMillisecond = timerMillisecondDefaultValue;
    timerHour = permanentTimerHour;
    timerMinute = permanentTimerMinute;
    timerSecond = permanentTimerSecond;
  }
  if (timerHour !== 0 || timerMinute !== 0 || timerSecond !== 0) {
    intervalManagerTimer(true, controlTimer, 10);
    timerStartStop.innerHTML = "STOP";
  }
  timerReset.disabled = false;
  timerDelete.disabled = false;
}

const stopTimer = () => {
  // function to stop Timer and assign START value to Timer Start/Stop button
  intervalManagerTimer(false);
  timerStartStop.innerHTML = "START";
}

const resetTimer = () => {
  // function to reset Timer to its initial state when the Timer was started at its first place
  reset = true;
  intervalManagerTimer(false);
  timerStartStop.innerHTML = "START";
  document.getElementsByClassName("timerSecondDisplay")[0].innerHTML = permanentTimerSecond;
  document.getElementsByClassName("timerMinuteDisplay")[0].innerHTML = permanentTimerMinute;
  document.getElementsByClassName("timerHourDisplay")[0].innerHTML = permanentTimerHour;
  timerHourInput.disabled = false;
  timerMinuteInput.disabled = false;
  timerSecondInput.disabled = false;
}

const deleteTimer = () => {
  // function to stop Timer and delete if any node exists which is supposed to be deleted
  intervalManagerTimer(false);
  timerMillisecond = timerMillisecondDefaultValue;
  timerHour = 0;
  timerMinute = 0;
  timerSecond = 0;
  firstStartTimer = true;
  timerStartStop.innerHTML = "START";
  timerReset.disabled = true;
  timerDelete.disabled = true;

  timerHourInput.disabled = false;
  timerMinuteInput.disabled = false;
  timerSecondInput.disabled = false;

  const parent = document.getElementsByClassName("timerTime")[0];
  const child = document.getElementsByClassName("timerContent")[0];
  if (typeof child != "undefined" && child != null) {
    parent.removeChild(child);
  }
}

const startTimerError = () => {
  // function which generates an error and deletes if any error/timer div/node exists on its place where it is supposed to be printed according to certain conditions after creating a new div/node to print
  let errorMessage;
  const parent = document.getElementsByClassName("timerTime")[0];
  const child1 = document.getElementsByClassName("timerContent")[0];
  const child2 = document.getElementsByClassName("timerErrorDisplay")[0];

  if (typeof child1 != "undefined" && child1 != null) {
    parent.removeChild(child1);
  }

  if (typeof child2 != "undefined" && child2 != null) {
    parent.removeChild(child2);
  }

  if (timerSecond > 60 || timerMinute > 60 || timerHour > 99) {
    errorMessage = "Error: Value Exceeded";
  } else
    if (timerSecond < 0 || timerMinute < 0 || timerHour < 0) {
      errorMessage = "Error: Inferior Value";
    } else {
      errorMessage = "Error";
    }

  const timerErrorDisplay = document.createElement("div");
  timerErrorDisplay.className = "timerErrorDisplay";
  const timerErrorContent = document.createTextNode(errorMessage);
  const linebreak = document.createElement('br');
  const timerErrorContent2 = document.createTextNode("Enter A Valid Value");
  timerErrorDisplay.appendChild(timerErrorContent);
  timerErrorDisplay.appendChild(linebreak);
  timerErrorDisplay.appendChild(timerErrorContent2);

  const timerElement = document.getElementsByClassName("timerTime")[0];
  timerElement.appendChild(timerErrorDisplay);

  timerReset.disabled = true;
  timerDelete.disabled = true;
}