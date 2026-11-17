seriveName = "Daily"
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
const taskForm = document.querySelector("#task-form");
const titleField = document.querySelector("#title-field");
const titleHelp = document.querySelector("#title-help");
const titleCount = document.querySelector("#title-count");
const submitStatus = document.querySelector("#submit-status");
const alarmOption = document.querySelector("#alarm-option");
const alarmOptions = document.querySelector("#alarm-options");
const alarmInputs = document.querySelectorAll('input[name="alarm-time"]');
const summaryAlarm = document.querySelector("#summary-alarm");
const archiveList = document.querySelector("#archive-list");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");
const archiveStatus = document.querySelector("#archive-status");

const navLinks = document.querySelectorAll(".main-nav a");

const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

const filterButtons = document.querySelectorAll(".filter-button");
let currentFilter = "all";

let isSubmitting = false;
let currentStep = 0;

const formData = {
    title: "", deadline: "", alarm: "사용 안 함"
};

function showStep(index) {
    currentStep = index;
    flowSteps.forEach((step, i) => { step.hidden = i !== index; });
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const storageKey = "daily-tasks-v1";

function loadTasks() {
    try {
        const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

const taskRecords = loadTasks();

function saveTasks() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(taskRecords));
        return true;
    } catch {
        return false;
    }
}


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
                saveTasks();
                renderArchive();
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

function getVisibleTasks() {
    return taskRecords.filter(function (task) {
        if (currentFilter === "all") return true;
        if (currentFilter === "done") return task.completed;
        return !task.completed;
    });
}

function renderArchive() {
    const visibleTasks = getVisibleTasks();

    archiveList.replaceChildren();
    emptyState.hidden = visibleTasks.length !== 0;
    archiveList.hidden = visibleTasks.length === 0;

    const emptyTitle = emptyState.querySelector("h3");
    const emptyDescription = emptyState.querySelector("p");
    const emptyAction = emptyState.querySelector("a");

    if (visibleTasks.length === 0) {
        // 전체 목록이 비어 있는 경우와 필터 결과만 없는 경우를 구분
        const filtered = taskRecords.length > 0;
        emptyTitle.textContent = filtered
            ? "선택한 상태의 할일이 없어요."
            : "아직 저장한 할일이 없어요.";
        emptyDescription.textContent = filtered
            ? "다른 상태를 선택해 보세요."
            : "첫 할일을 만들면 이곳에서 다시 볼 수 있습니다.";
        emptyAction.hidden = false;
        emptyAction.textContent = filtered ? "전체 보기" : "할일 만들러 가기";
        emptyAction.href = filtered ? "#archive" : "#event-practice";
    }

    taskCount.textContent = String(visibleTasks.length);
    taskCount.setAttribute("aria-label", "현재 표시 중인 할일 " + visibleTasks.length + "개");

    visibleTasks.forEach(function (task) {
        const item = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const text = document.createElement("span");
        const meta = document.createElement("small");

        item.className = "archive-item";
        if (task.completed) item.classList.add("is-done");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        text.textContent = task.title;
        text.classList.toggle("task-completed", task.completed);

        const deadlineText = task.deadline ? "마감 " + task.deadline : "마감 날짜 없음";
        meta.textContent = deadlineText + " · " + task.alarm;

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            const saved = saveTasks();
            renderArchive();
            renderTaskList();

            const index = getVisibleTasks().indexOf(task);
            const boxes = archiveList.querySelectorAll('input[type="checkbox"]');
            const selectedFilter = document.querySelector('.filter-button[aria-pressed="true"]');
            (boxes[index] || selectedFilter).focus();
            archiveStatus.textContent = saved
                ? "'" + task.title + "' 할일을 " + (task.completed ? "완료했습니다." : "진행 중으로 바꿨습니다.")
                : "상태를 현재 화면에서 바꿨지만, 저장 공간을 사용할 수 없어 새로고침하면 사라질 수 있습니다.";
        });

        label.appendChild(checkbox);
        label.appendChild(text);
        item.appendChild(label);
        item.appendChild(meta);
        archiveList.appendChild(item);
    });
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (item) {
            const selected = item === button;
            item.classList.toggle("is-active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });
        renderArchive();

        const count = getVisibleTasks().length;
        const filterName = button.textContent.trim();
        archiveStatus.textContent = count > 0
            ? filterName + " 할일 " + count + "개가 표시됩니다"
            : filterName + " 할일이 없습니다. 다른조건을 선택해주세요.";
    });
});

emptyState.querySelector("a").addEventListener("click", function (event) {
    if (currentFilter === "all") return;
    event.preventDefault();
    const allButton = document.querySelector('[data-filter="all"]');
    allButton.click();
    allButton.focus();
})

renderArchive();


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

function updateCurrentNav() {
    const currentHash = window.location.hash;

    navLinks.forEach(function (link) {
        const current = currentHash
            ? link.getAttribute("href") === currentHash
            : link === navLinks[0];

        link.classList.toggle("is-current", current);

        if (current) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    const currentLink = document.querySelector('.main-nav a[aria-current="page"]');
    const pagename = currentLink ? currentLink.textContent.trim() : "홈";
    document.title = pagename + " | Daily";
}

window.addEventListener("hashchange", updateCurrentNav);
updateCurrentNav();

menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.textContent = isOpen ? "메뉴 닫기" : "메뉴 열기";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", function (envet) {
    if (envet.key !== "Escape" || !mainNav.classList.contains("is-open")) return;

    mainNav.classList.remove("is-open");
    menuToggle.textContent = "메뉴 열기";
    menuToggle.setAttribute("aria-expanded", "false");
})



navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        menuToggle.textContent = "메뉴 열기";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

function updateTitleExperience() {
    const length = titleInput.value.length;
    const valid = titleInput.value.trim().length >= 2;
    const hasError = titleInput.getAttribute("aria-invalid") === "true";

    titleCount.textContent = length + " / 60자";
    titleField.classList.toggle("has-error", hasError);
    titleField.classList.toggle("is-valid", valid && !hasError);
    titleHelp.textContent = hasError
        ? "할일 입력 조건을 다시 확인해 주세요."
        : valid
            ? "입력 조건을 충족했습니다."
            : "2자 이상 60자 이하로 입력해주세요.";
}

function validateTitle() {
    const value = titleInput.value.trim();
    if (!value) {
        titleError.textContent = "매일 할일을 입력해 주세요";
        titleInput.setAttribute("aria-invalid", "true");
        updateTitleExperience();
        titleInput.focus();
        return false;
    }

    if (value.length < 2) {
        titleError.textContent = "할일을 2자 이상 입력해 주세요";
        titleInput.setAttribute("aria-invalid", "true");
        updateTitleExperience();
        titleInput.focus();
        return false;
    }

    titleError.textContent = "";
    titleInput.removeAttribute("aria-invalid");
    updateTitleExperience();
    formData.title = value;
    return true;
}

titleInput.addEventListener("input", () => {
    if (titleInput.getAttribute("aria-invalid") === "true") {
        validateTitle();
    } else {
        updateTitleExperience();
    }
});
updateTitleExperience();

function setSubmitState(state, message) {
    isSubmitting = state === "loading";
    trainingFlow.setAttribute("aria-busy", String(isSubmitting));
    finishButton.disabled = isSubmitting;
    finishButton.textContent = isSubmitting ? "저장하는 중..." : "설정 완료하기";
    submitStatus.textContent = message;
    submitStatus.classList.toggle("is-success", state === "success");
    submitStatus.classList.toggle("has-error", state === "error");
}

function syncAlarmOptions() {
    const open = alarmOption.checked;
    alarmOption.setAttribute("aria-expanded", String(open));
    alarmOptions.hidden = !open;
    alarmInputs.forEach((input) => {
        input.disabled = !open;
    });
}

alarmOption.addEventListener("change", syncAlarmOptions);
syncAlarmOptions();

function getAlarmText() {
    if (!alarmOption.checked) return "사용 안 함";
    const checked = document.querySelector('input[name="alarm-time"]:checked');
    return checked.value + "일 전 알림";
}

titleNext.addEventListener("click", () => {
    if (!validateTitle()) return;
    showStep(1);
});




optionPrev.addEventListener("click", () => {showStep(0)});
optionNext.addEventListener("click", () => {
    formData.title = titleInput.value.trim();
    formData.deadline = deadlineinput.value;
    formData.alarm = getAlarmText();
    summaryTitle.textContent = formData.title;
    summarydeadline.textContent = formData.deadline;
    summaryAlarm.textContent = formData.alarm;
    showStep(2);
});

summaryPrev.addEventListener("click", () => showStep(1));
function saveCurrentTask() {
    if (!formData.title.trim()) return false;

    taskRecords.push({
        title: formData.title,
        deadline: formData.deadline,
        alarm: formData.alarm,
        completed: false
    });

    if (!saveTasks()) {
        taskRecords.pop();
        return false;
    }

    renderTaskList();
    renderArchive();
    archiveStatus.textContent = "'" + formData.title + "' 할일을 저장했습니다.";
    return true;
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (currentStep === 0) {
        if (validateTitle()) showStep(1);
        return;
    }
    if (currentStep !== 2 || isSubmitting) return;

    if (!validateTitle()) {
        showStep(0);
        titleInput.focus();
        return;
    }

    setSubmitState("loading", "입력한 할일을 저장하고 있습니다.");
    window.setTimeout(() => {
        if (!saveCurrentTask()) {
            setSubmitState("error", "저장하지 못했습니다. 입력 내용을 확인하고 다시 시도해 주세요.");
            return;
        }
        setSubmitState("success", "할일 저장이 완료되었습니다.");
        showStep(3);
    }, 600);
});

restartButton.addEventListener("click", () => {
    taskForm.reset();
    syncAlarmOptions();
    formData.title = "";
    formData.deadline = "";
    formData.alarm = "사용 안 함";
    titleError.textContent = "";
    titleInput.removeAttribute("aria-invalid");
    titleField.classList.remove("is-valid", "has-error");
    updateTitleExperience();
    setSubmitState("idle", "");
    summaryTitle.textContent = "";
    summarydeadline.textContent = "마감 날짜 없음";
    summaryAlarm.textContent = "사용 안 함";
    showStep(0);
});




