// ============================================================
// EKITI STATE WOMEN OF INFLUENCE - ADO LG
// STATIC WEBSITE VERSION
// ============================================================
//
// Expected structure:
//
// index.html
// style.css
// script.js
// static/
//     logo.jpeg
//
// ============================================================


// ============================================================
// SITE INFORMATION
// ============================================================

const SITE_NAME =
    "EKITI STATE WOMEN OF INFLUENCE";

const SITE_LOCATION =
    "ADO LG";

const LOGO_PATH =
    "static/logo.jpeg";


// ============================================================
// 13 WARDS
// ============================================================

const wards = [

    ["Ado 'A'", "Idofin"],

    ["Ado 'B'", "Inisa"],

    ["Ado 'C'", "Idolofin"],

    ["Ado 'D'", "Ijigbo"],

    ["Ado 'E'", "Ijoka / Orereowu"],

    ["Ado 'F'", "Okeyinmi"],

    ["Ado 'G'", "Oke Ila"],

    ["Ado 'H'", "Ereguru"],

    ["Ado 'I'", "Dallimore"],

    ["Ado 'J'", "Okesa"],

    ["Ado 'K'", "Irona"],

    ["Ado 'L'", "Igbehin"],

    ["Ado 'M'", "Farm Settlement"]

];


// ============================================================
// STRUCTURED WARD OFFICES
// ============================================================

const offices = [

    "Ward Coordinator",

    "Deputy Ward Coordinator",

    "Secretary",

    "Mobilization Officer",

    "Women Empowerment Officer",

    "Media/Publicity Officer",

    "Welfare Officer",

    "Polling Unit Officer"

];


// ============================================================
// PUBLIC WOMEN DIRECTORY
// ============================================================
//
// ONLY PUBLIC INFORMATION should be placed here.
//
// DO NOT put:
// - Phone numbers
// - Bank names
// - Account numbers
//
// Example:
//
// const women = [
//     {
//         name: "Example Name",
//         ward: 0
//     }
// ];
//
// ============================================================

const women = [];


// ============================================================
// GET HTML ELEMENTS
// ============================================================

const wardGrid =
    document.getElementById("wardGrid");

const wardSearch =
    document.getElementById("wardSearch");

const wardSelect =
    document.getElementById("wardSelect");

const womanSearch =
    document.getElementById("womanSearch");

const results =
    document.getElementById("results");

const excoGrid =
    document.getElementById("excoGrid");

const modal =
    document.getElementById("modal");

const modalBody =
    document.getElementById("modalBody");

const closeModal =
    document.getElementById("closeModal");

const registerBtn =
    document.getElementById("registerBtn");


// ============================================================
// SAFE HTML ESCAPE
// ============================================================

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /[&<>"']/g,
            function (character) {

                const characters = {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"

                };

                return characters[character];

            }
        );

}


// ============================================================
// LOGO HELPER
// ============================================================

function getLogoHTML(className = "logo") {

    return `

        <img
            src="${LOGO_PATH}"
            class="${className}"
            alt="${escapeHTML(SITE_NAME)} Logo"
            onerror="this.style.display='none'"
        >

    `;

}


// ============================================================
// DISPLAY THE 13 WARDS
// ============================================================

function displayWards(filter = "") {

    if (!wardGrid) {
        return;
    }

    wardGrid.innerHTML = "";

    wards.forEach(
        function (ward, index) {

            const wardName =
                ward[0];

            const area =
                ward[1];

            const searchText =
                `${wardName} ${area}`
                    .toLowerCase();


            if (
                filter &&
                !searchText.includes(
                    filter.toLowerCase()
                )
            ) {

                return;

            }


            const card =
                document.createElement("div");

            card.className =
                "ward-card";


            card.innerHTML = `

                <div class="number">

                    ${index + 1}

                </div>

                <h3>

                    ${escapeHTML(wardName)}

                </h3>

                <p>

                    ${escapeHTML(area)}

                </p>

            `;


            card.addEventListener(
                "click",
                function () {

                    openWard(index);

                }
            );


            wardGrid.appendChild(card);

        }
    );

}


// ============================================================
// CREATE WARD SELECT OPTIONS
// ============================================================

function populateWardSelect() {

    if (!wardSelect) {
        return;
    }

    wardSelect.innerHTML = `

        <option value="">
            All Wards
        </option>

    `;


    wards.forEach(
        function (ward, index) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                index;


            option.textContent =
                `WARD ${index + 1} - ${ward[0]} – ${ward[1]}`;


            wardSelect.appendChild(
                option
            );

        }
    );

}


// ============================================================
// DISPLAY EXCO
// ============================================================

function displayExco() {

    if (!excoGrid) {
        return;
    }

    excoGrid.innerHTML = "";


    wards.forEach(
        function (ward, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "exco-card";


            card.innerHTML = `

                <div class="number">

                    ${index + 1}

                </div>

                <h3>

                    ${escapeHTML(ward[0])}

                </h3>

                <p>

                    ${escapeHTML(ward[1])}

                </p>

                <p>

                    <strong>
                        8 Structured Offices
                    </strong>

                </p>

            `;


            card.addEventListener(
                "click",
                function () {

                    openWard(index);

                }
            );


            excoGrid.appendChild(
                card
            );

        }
    );

}


// ============================================================
// OPEN WARD DETAILS
// ============================================================

function openWard(index) {

    const ward =
        wards[index];


    if (!ward) {
        return;
    }


    const wardName =
        ward[0];

    const area =
        ward[1];


    let html = `

        ${getLogoHTML("logo")}

        <small>
            WARD ${index + 1}
        </small>

        <h2>

            ${escapeHTML(wardName)}
            –
            ${escapeHTML(area)}

        </h2>

        <p class="privacy">

            EKITI STATE WOMEN OF INFLUENCE
            - ADO LG

        </p>

        <h3>
            Structured Ward Offices
        </h3>

    `;


    offices.forEach(
        function (office) {

            html += `

                <div class="office">

                    <strong>

                        ${escapeHTML(office)}

                    </strong>

                    <span>

                        Not Assigned

                    </span>

                </div>

            `;

        }
    );


    if (
        modalBody &&
        modal
    ) {

        modalBody.innerHTML =
            html;

        modal.classList.add(
            "show"
        );

    }

}


// ============================================================
// SEARCH WOMEN
// ============================================================

function searchWomen() {

    if (
        !womanSearch ||
        !wardSelect ||
        !results
    ) {

        return;

    }


    const query =
        womanSearch.value
            .trim()
            .toLowerCase();


    const selectedWard =
        wardSelect.value;


    const matches =
        women.filter(
            function (woman) {

                const name =
                    String(
                        woman.name
                    ).toLowerCase();


                const nameMatches =
                    !query ||
                    name.includes(
                        query
                    );


                const wardMatches =
                    selectedWard === "" ||
                    String(
                        woman.ward
                    ) === selectedWard;


                return (
                    nameMatches &&
                    wardMatches
                );

            }
        );


    if (
        matches.length === 0
    ) {

        results.innerHTML = `

            <p class="privacy">

                No public names have been
                added or no matching name
                was found.

            </p>

        `;

        return;

    }


    results.innerHTML =
        matches
            .map(
                function (woman) {

                    const ward =
                        wards[
                            Number(
                                woman.ward
                            )
                        ];


                    if (!ward) {
                        return "";
                    }


                    return `

                        <div class="result">

                            <strong>

                                ${escapeHTML(
                                    woman.name
                                )}

                            </strong>

                            <br>

                            <span>

                                WARD
                                ${Number(woman.ward) + 1}

                                -
                                ${escapeHTML(
                                    ward[0]
                                )}

                                –

                                ${escapeHTML(
                                    ward[1]
                                )}

                            </span>

                        </div>

                    `;

                }
            )
            .join("");

}


// ============================================================
// REGISTRATION STORAGE
// ============================================================
//
// Private registration data is stored separately from
// the public women directory.
//
// ============================================================

function getRegistrations() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "ekitiWomenRegistrations"
            ) || "[]"
        );

    }

    catch (error) {

        console.error(
            "Could not read registrations:",
            error
        );

        return [];

    }

}


function saveRegistrations(
    registrations
) {

    localStorage.setItem(
        "ekitiWomenRegistrations",
        JSON.stringify(
            registrations
        )
    );

}


// ============================================================
// CREATE REGISTRATION MODAL
// ============================================================

function createRegistrationModal() {

    let existing =
        document.getElementById(
            "registerModal"
        );


    if (existing) {

        existing.classList.add(
            "show"
        );

        return;

    }


    const registerModal =
        document.createElement(
            "div"
        );


    registerModal.id =
        "registerModal";


    registerModal.className =
        "modal";


    registerModal.innerHTML = `

        <div class="modal-content">

            <div class="modal-header">

                <div>

                    <h2>
                        📝 Registration
                    </h2>

                    <p class="small">

                        EKITI STATE WOMEN OF
                        INFLUENCE - ADO LG

                    </p>

                </div>

                <button
                    type="button"
                    id="closeRegister"
                >
                    ✕
                </button>

            </div>


            <div id="registrationMessage"></div>


            <form
                id="registrationForm"
            >

                <label for="registerWard">

                    Ward

                </label>

                <select
                    id="registerWard"
                    required
                >

                    <option value="">

                        Select Ward

                    </option>

                    ${wards.map(
                        function (
                            ward,
                            index
                        ) {

                            return `

                                <option
                                    value="${index}"
                                >

                                    WARD
                                    ${index + 1}
                                    -
                                    ${escapeHTML(
                                        ward[0]
                                    )}
                                    –
                                    ${escapeHTML(
                                        ward[1]
                                    )}

                                </option>

                            `;

                        }
                    ).join("")}

                </select>


                <label for="registerName">

                    Name

                </label>

                <input
                    id="registerName"
                    type="text"
                    placeholder="Full Name"
                    autocomplete="name"
                    required
                >


                <label for="registerPhone">

                    Phone No

                </label>

                <input
                    id="registerPhone"
                    type="tel"
                    placeholder="Phone Number"
                    autocomplete="tel"
                    required
                >


                <label for="registerBank">

                    Bank Name

                </label>

                <input
                    id="registerBank"
                    type="text"
                    placeholder="Bank Name"
                    required
                >


                <label for="registerAccount">

                    Account No

                </label>

                <input
                    id="registerAccount"
                    type="text"
                    inputmode="numeric"
                    placeholder="Account Number"
                    maxlength="10"
                    required
                >


                <br><br>

                <button
                    type="submit"
                    class="primary"
                >

                    📝 Submit Registration

                </button>

            </form>

        </div>

    `;


    document.body.appendChild(
        registerModal
    );


    const closeRegister =
        document.getElementById(
            "closeRegister"
        );


    closeRegister.addEventListener(
        "click",
        function () {

            registerModal.classList.remove(
                "show"
            );

        }
    );


    registerModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                registerModal
            ) {

                registerModal.classList.remove(
                    "show"
                );

            }

        }
    );


    document
        .getElementById(
            "registrationForm"
        )
        .addEventListener(
            "submit",
            submitRegistration
        );


    registerModal.classList.add(
        "show"
    );

}


// ============================================================
// SUBMIT REGISTRATION
// ============================================================

function submitRegistration(
    event
) {

    event.preventDefault();


    const ward =
        document
            .getElementById(
                "registerWard"
            )
            .value;


    const name =
        document
            .getElementById(
                "registerName"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "registerPhone"
            )
            .value
            .trim();


    const bank =
        document
            .getElementById(
                "registerBank"
            )
            .value
            .trim();


    const account =
        document
            .getElementById(
                "registerAccount"
            )
            .value
            .trim();


    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (!ward) {

        alert(
            "Please select a ward."
        );

        return;

    }


    if (!name) {

        alert(
            "Please enter the woman's name."
        );

        return;

    }


    if (!phone) {

        alert(
            "Please enter a phone number."
        );

        return;

    }


    if (!bank) {

        alert(
            "Please enter the bank name."
        );

        return;

    }


    if (
        !/^\d{10}$/.test(
            account
        )
    ) {

        alert(
            "Account number must contain exactly 10 digits."
        );

        return;

    }


    // ------------------------------------------
    // LOAD REGISTRATIONS
    // ------------------------------------------

    const registrations =
        getRegistrations();


    // ------------------------------------------
    // CREATE REGISTRATION
    // ------------------------------------------

    const registration = {

        id:
            Date.now() +
            Math.random(),

        name:
            name,

        phone:
            phone,

        bankName:
            bank,

        accountNo:
            account,

        ward:
            Number(ward),

        status:
            "pending",

        createdAt:
            new Date().toISOString()

    };


    registrations.push(
        registration
    );


    saveRegistrations(
        registrations
    );


    // ------------------------------------------
    // SUCCESS MESSAGE
    // ------------------------------------------

    const message =
        document.getElementById(
            "registrationMessage"
        );


    if (message) {

        message.innerHTML = `

            <div class="success-box">

                ✅ Registration submitted
                successfully.

                <br><br>

                Your registration is now
                waiting for approval.

            </div>

        `;

    }


    // ------------------------------------------
    // RESET
    // ------------------------------------------

    document
        .getElementById(
            "registrationForm"
        )
        .reset();

}


// ============================================================
// OPEN REGISTRATION
// ============================================================

function openRegistration() {

    createRegistrationModal();

}


// ============================================================
// REGISTER BUTTON
// ============================================================

if (registerBtn) {

    registerBtn.addEventListener(
        "click",
        openRegistration
    );

}


// ============================================================
// CLOSE MAIN MODAL
// ============================================================

if (closeModal) {

    closeModal.addEventListener(
        "click",
        function () {

            if (modal) {

                modal.classList.remove(
                    "show"
                );

            }

        }
    );

}


// ============================================================
// CLOSE MAIN MODAL OUTSIDE
// ============================================================

if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                modal
            ) {

                modal.classList.remove(
                    "show"
                );

            }

        }
    );

}


// ============================================================
// ESCAPE KEY
// ============================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (modal) {

            modal.classList.remove(
                "show"
            );

        }


        const registerModal =
            document.getElementById(
                "registerModal"
            );


        if (registerModal) {

            registerModal.classList.remove(
                "show"
            );

        }


        const aiModal =
            document.getElementById(
                "aiModal"
            );


        if (aiModal) {

            aiModal.classList.add(
                "hidden"
            );

        }


        const settingsModal =
            document.getElementById(
                "settingsModal"
            );


        if (settingsModal) {

            settingsModal.classList.add(
                "hidden"
            );

        }

    }
);


// ============================================================
// WARD SEARCH
// ============================================================

if (wardSearch) {

    wardSearch.addEventListener(
        "input",
        function (event) {

            displayWards(
                event.target.value
            );

        }
    );

}


// ============================================================
// WOMEN SEARCH
// ============================================================

if (womanSearch) {

    womanSearch.addEventListener(
        "input",
        searchWomen
    );

}


// ============================================================
// WARD FILTER
// ============================================================

if (wardSelect) {

    wardSelect.addEventListener(
        "change",
        searchWomen
    );

}


// ============================================================
// MOBILE MENU
// ============================================================

function toggleMenu() {

    const navigation =
        document.getElementById(
            "navigation"
        );


    if (!navigation) {
        return;
    }


    navigation.classList.toggle(
        "open"
    );

}


// ============================================================
// DARK MODE / SETTINGS
// ============================================================

function changeTheme(theme) {

    if (
        theme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

    }

    else if (
        theme === "light"
    ) {

        document.body.classList.remove(
            "dark"
        );

    }

    else {

        const prefersDark =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;


        document.body.classList.toggle(
            "dark",
            prefersDark
        );

    }


    localStorage.setItem(
        "ekiti_theme",
        theme
    );

}


function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "ekiti_theme"
        ) || "system";


    changeTheme(
        savedTheme
    );


    const select =
        document.getElementById(
            "themeSelect"
        );


    if (select) {

        select.value =
            savedTheme;

    }

}


function openSettings() {

    const settingsModal =
        document.getElementById(
            "settingsModal"
        );


    if (!settingsModal) {
        return;
    }


    settingsModal.classList.remove(
        "hidden"
    );

}


function closeSettings() {

    const settingsModal =
        document.getElementById(
            "settingsModal"
        );


    if (!settingsModal) {
        return;
    }


    settingsModal.classList.add(
        "hidden"
    );

}


// ============================================================
// OLLAMA SETTINGS
// ============================================================

function getOllamaURL() {

    return (
        localStorage.getItem(
            "ollamaURL"
        ) ||
        "http://localhost:11434"
    );

}


function getOllamaModel() {

    return (
        localStorage.getItem(
            "ollamaModel"
        ) ||
        "qwen2.5-coder:7b"
    );

}


function saveSettings() {

    const urlInput =
        document.getElementById(
            "ollamaURL"
        );

    const modelInput =
        document.getElementById(
            "ollamaModel"
        );


    if (urlInput) {

        localStorage.setItem(
            "ollamaURL",
            urlInput.value.trim()
        );

    }


    if (modelInput) {

        localStorage.setItem(
            "ollamaModel",
            modelInput.value.trim()
        );

    }


    const themeSelect =
        document.getElementById(
            "themeSelect"
        );


    if (themeSelect) {

        changeTheme(
            themeSelect.value
        );

    }


    closeSettings();


    showToast(
        "Settings saved successfully."
    );

}


// ============================================================
// LOAD OLLAMA SETTINGS INTO FORM
// ============================================================

function loadOllamaSettings() {

    const urlInput =
        document.getElementById(
            "ollamaURL"
        );

    const modelInput =
        document.getElementById(
            "ollamaModel"
        );


    if (urlInput) {

        urlInput.value =
            getOllamaURL();

    }


    if (modelInput) {

        modelInput.value =
            getOllamaModel();

    }

}


// ============================================================
// AI MODAL
// ============================================================

function openAI() {

    const aiModal =
        document.getElementById(
            "aiModal"
        );


    if (!aiModal) {
        return;
    }


    aiModal.classList.remove(
        "hidden"
    );


    const input =
        document.getElementById(
            "aiInput"
        );


    if (input) {

        setTimeout(
            function () {

                input.focus();

            },
            100
        );

    }

}


function closeAI() {

    const aiModal =
        document.getElementById(
            "aiModal"
        );


    if (!aiModal) {
        return;
    }


    aiModal.classList.add(
        "hidden"
    );

}


// ============================================================
// AI STATUS
// ============================================================

function setAIStatus(
    text
) {

    const status =
        document.getElementById(
            "aiStatus"
        );


    if (status) {

        status.textContent =
            text;

    }

}


// ============================================================
// AI CONNECTION TEST
// ============================================================

async function testAIConnection() {

    setAIStatus(
        "🟡 Connecting..."
    );


    try {

        const response =
            await fetch(
                `${getOllamaURL()}/api/tags`,
                {
                    method: "GET"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        const models =
            data.models || [];


        const modelExists =
            models.some(
                function (model) {

                    return (
                        model.name ===
                        getOllamaModel()
                    );

                }
            );


        if (modelExists) {

            setAIStatus(
                "🟢 Ollama connected"
            );

        }

        else {

            setAIStatus(
                "🟠 Connected, model not found"
            );

        }

    }

    catch (error) {

        console.error(
            "AI connection error:",
            error
        );


        setAIStatus(
            "🔴 Ollama unavailable"
        );

    }

}


// ============================================================
// AI CHAT
// ============================================================

let aiController =
    null;


async function sendAIMessage() {

    const input =
        document.getElementById(
            "aiInput"
        );


    const messages =
        document.getElementById(
            "aiMessages"
        );


    if (
        !input ||
        !messages
    ) {

        return;

    }


    const prompt =
        input.value.trim();


    if (!prompt) {
        return;
    }


    // User message
    const userMessage =
        document.createElement(
            "div"
        );


    userMessage.className =
        "ai-message user";


    userMessage.innerHTML = `

        <strong>
            You
        </strong>

        <p>
            ${escapeHTML(prompt)}
        </p>

    `;


    messages.appendChild(
        userMessage
    );


    input.value = "";


    // Assistant message
    const assistantMessage =
        document.createElement(
            "div"
        );


    assistantMessage.className =
        "ai-message assistant";


    assistantMessage.innerHTML = `

        <strong>
            🤖 AI
        </strong>

        <p class="ai-response">
            Thinking...
        </p>

    `;


    messages.appendChild(
        assistantMessage
    );


    messages.scrollTop =
        messages.scrollHeight;


    const responseElement =
        assistantMessage.querySelector(
            ".ai-response"
        );


    setAIStatus(
        "🟡 AI is thinking..."
    );


    aiController =
        new AbortController();


    try {

        const response =
            await fetch(
                `${getOllamaURL()}/api/generate`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        model:
                            getOllamaModel(),

                        prompt:
                            prompt,

                        stream:
                            true

                    }),

                    signal:
                        aiController.signal

                }
            );


        if (!response.ok) {

            throw new Error(
                `Ollama error: HTTP ${response.status}`
            );

        }


        if (!response.body) {

            throw new Error(
                "No response body received."
            );

        }


        responseElement.textContent =
            "";


        const reader =
            response.body.getReader();


        const decoder =
            new TextDecoder(
                "utf-8"
            );


        let buffer = "";


        while (true) {

            const {
                value,
                done
            } =
                await reader.read();


            if (done) {
                break;
            }


            buffer +=
                decoder.decode(
                    value,
                    {
                        stream: true
                    }
                );


            const lines =
                buffer.split("\n");


            buffer =
                lines.pop() || "";


            for (
                const line of lines
            ) {

                if (!line.trim()) {
                    continue;
                }


                try {

                    const data =
                        JSON.parse(
                            line
                        );


                    if (data.response) {

                        responseElement.textContent +=
                            data.response;


                        messages.scrollTop =
                            messages.scrollHeight;

                    }


                }

                catch (
                    parseError
                ) {

                    console.warn(
                        "Could not parse Ollama response:",
                        line
                    );

                }

            }

        }


        setAIStatus(
            "🟢 Ready"
        );

    }

    catch (error) {

        if (
            error.name ===
            "AbortError"
        ) {

            responseElement.textContent =
                "⛔ Response stopped.";

            setAIStatus(
                "⛔ Stopped"
            );

        }

        else {

            console.error(
                "AI Error:",
                error
            );


            responseElement.textContent =
                `❌ AI Error: ${error.message}`;


            setAIStatus(
                "🔴 AI Error"
            );

        }

    }

    finally {

        aiController =
            null;

    }

}


// ============================================================
// STOP AI
// ============================================================

function stopAI() {

    if (aiController) {

        aiController.abort();

        aiController =
            null;

    }

}


// ============================================================
// CLEAR AI CHAT
// ============================================================

function clearAIChat() {

    const messages =
        document.getElementById(
            "aiMessages"
        );


    if (!messages) {
        return;
    }


    messages.innerHTML = `

        <div class="ai-message assistant">

            <strong>
                🤖 AI
            </strong>

            <p>

                Hello! I'm your AI assistant.
                How can I help?

            </p>

        </div>

    `;


    setAIStatus(
        "🟢 Ready"
    );

}


// ============================================================
// TOAST
// ============================================================

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


// ============================================================
// INITIALIZE
// ============================================================

function initializeWebsite() {

    displayWards();

    populateWardSelect();

    displayExco();

    searchWomen();

    loadTheme();

    loadOllamaSettings();

}


// ============================================================
// DOM READY
// ============================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite
    );

}

else {

    initializeWebsite();

}


// ============================================================
// GLOBAL FUNCTIONS
// ============================================================
//
// These make the functions available to
// onclick="" attributes in index.html.
//

window.toggleMenu =
    toggleMenu;

window.openWard =
    openWard;

window.openRegistration =
    openRegistration;

window.openAI =
    openAI;

window.closeAI =
    closeAI;

window.sendAIMessage =
    sendAIMessage;

window.testAIConnection =
    testAIConnection;

window.clearAIChat =
    clearAIChat;

window.stopAI =
    stopAI;

window.openSettings =
    openSettings;

window.closeSettings =
    closeSettings;

window.saveSettings =
    saveSettings;

window.changeTheme =
    changeTheme;
