const seriveName = "Daily"
let isSubscribed = false;
let submitCount = 0;


function makeSubscribeMessage(email, subscribed) {
    if (subscribed == true) {
        return email + "로 신청이 완료되었습니다."
    }
    
    return "이메일을 입력한 뒤 신청해주세요."
}

const subscribeofrm= document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

function handleSubscribe(event) {
    event.preventDefault();

    const subscriberEmail = emailInput.value.trim();

    if (subscriberEmail === "") {
        subscribeMessage.textContent =
        "이메일을 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }


    isSubscribed = true;
    submitCount += 1;

    subscribeMessage.textContent =
        makeSubscribeMessage(subscriberEmail, isSubscribed);

    
    subscribeMessage.classList.add("is-success");
    
    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;
}


subscribeofrm.addEventListener("submit", handleSubscribe);

const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick() {
    const isDark = document.body.classList.toggle("dark");

    themeButton.textContent = isDark ? "라이트 테마로 바꾸기" : "다크 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

function handleNicknameInput() {
    const maxLength = nicknameInput.maxLength;
    const currentLength = Math.min(nicknameInput.value.length, maxLength);
    nicknameCount.textContent = currentLength + " / " + maxLength;

}

nicknameInput.addEventListener("input", handleNicknameInput);

function handleAgreeChange() {
    const agreed = agreeCheck.checked;

    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed
        ? "Daily 설정을 시작 할수 있습니다"
        : "동의 후 Daily 설정을 시작할수 있습니다.";
    
    if (agreed) {
        agreeMessage.classList.add("is-ready");
    } else {
        agreeMessage.classList.remove("is-ready");
    }


}

agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
    tabs.forEach(function (tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
    });
    panels.forEach(function (panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab) {
    const targetSelector = "#" + clickedTab.dataset.target;
    const targetPanel = document.querySelector(targetSelector);

    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected", "true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(envent) {
    resetTabsAndPanels();
    activateTab(envent.currentTarget);
}

tabs.forEach(function (tab) {
    tab.addEventListener("click", handleTabClick);
});


const trainingFlow = document.querySelector("#training-flow");
const flowSteps = trainingFlow.querySelectorAll(".step");
const progressItems = trainingFlow.querySelectorAll(".progress__item");
const titleInput = document.querySelector("#presentation-title");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
const deadlineinput = document.querySelector("#deadline");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryTitle = document.querySelector("#summary-title");
const summarydeadline = document.querySelector("#summary-deadline");

const formData = {
    title: "", deadline: ""
};

function showStep(index) {
    flowSteps.forEach((step, i) => { step.hidden = i !== index; });
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const taskRecords = [];
const openTaskListButton = document.querySelector("#open-task-list");
const taskListPanel = document.querySelector("#task-list-panel");
const taskCalendarDate = document.querySelector("#task-calendar-date");
const selectedTaskDate = document.querySelector("#selected-task-date");
const taskList = document.querySelector("#task-list");
const taskEmptyMessage = document.querySelector("#task-empty-message");

function handleOpenTaskList() {
    taskListPanel.hidden = !taskListPanel.hidden;

    if (taskListPanel.hidden) {
        openTaskListButton.textContent = "할일 보기";
    } else {
        openTaskListButton.textContent = "할일 숨기기";
    }
}

function renderTaskList() {
    const selectedDate = taskCalendarDate.value;
    let count = 0;

    taskList.innerHTML = "";

    if (selectedDate === "") {
        selectedTaskDate.textContent = "";
        taskEmptyMessage.hidden = true;
        return;
    }

    selectedTaskDate.textContent = selectedDate + "의 할 일";

    taskRecords.forEach(function (task) {
        if (task.deadline === selectedDate) {
            const item = document.createElement("li");
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            const taskText = document.createElement("span");

            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            taskText.textContent = task.title;
            taskText.classList.toggle("task-completed", task.completed);

            checkbox.addEventListener("change", function () {
                task.completed = checkbox.checked;
                taskText.classList.toggle("task-completed", task.completed);
            });

            label.appendChild(checkbox);
            label.appendChild(taskText);
            item.appendChild(label);
            taskList.appendChild(item);
            count += 1;
        }
    });

    taskEmptyMessage.hidden = count > 0;
}

openTaskListButton.addEventListener("click", handleOpenTaskList);
taskCalendarDate.addEventListener("change", renderTaskList);




const recordingDialog = document.querySelector("#recording-dialog");
const recordingCancel = document.querySelector("#recording-cancel");
const recordingConfirm = document.querySelector("#recording-confirm");

function revokeRecordingAgreement() {
    agreeCheck.checked = false;
    trainingFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if (!agreeCheck.checked) return
        recordingDialog.showModal();
});

recordingCancel.addEventListener("click", () => {
    recordingDialog.close();
    revokeRecordingAgreement();
});
recordingDialog.addEventListener("cancel", revokeRecordingAgreement);
recordingConfirm.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    recordingDialog.close();
    trainingFlow.hidden = false;
    showStep(0);
    trainingFlow.scrollIntoView({ behavior: "smooth"});
    titleInput.focus();
});

function validateTitle() {
    const value = titleInput.value.trim();
    if (!value) {
        titleError.textContent = "매일 할일을 입력해 주세요";
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }
    
    titleError.textContent ="";
    titleInput.classList.remove("has-error");
    formData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if (!validateTitle()) return;
    showStep(1);
});




optionPrev.addEventListener("click", () => {showStep(0)});
optionNext.addEventListener("click", () => {
    formData.title = titleInput.value.trim();
    formData.deadline = deadlineinput.value;
    summaryTitle.textContent = formData.title;
    summarydeadline.textContent = formData.deadline;
    showStep(2);
});

summaryPrev.addEventListener("click", () => showStep(1));
finishButton.addEventListener("click", () => {
     if (formData.title.trim()) {
        taskRecords.push({
            title: formData.title,
            deadline: formData.deadline,
            completed: false
        });
    }
    renderTaskList();
    showStep(3);
});
restartButton.addEventListener("click", () => {
    formData.title = "";
    formData.deadline = "";
    titleInput.value = "";
    deadlineinput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error"); 
    summaryTitle.textContent = "";
    summarydeadline.textContent = "마감 날짜 없음";
    showStep(0);
});