// ============================================================
// EKITI STATE WOMEN OF INFLUENCE - ADO LG
// FULL STATIC SCRIPT
// ============================================================


// ============================================================
// SITE CONFIGURATION
// ============================================================

const SITE_NAME = "EKITI STATE WOMEN OF INFLUENCE";
const SITE_LOCATION = "ADO LG";

const LOGO_PATH = "static/logo.jpeg";


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
// STORAGE KEYS
// ============================================================

const WOMEN_KEY = "ekiti_women_directory";
const EXCO_KEY = "ekiti_exco_directory";
const THEME_KEY = "ekiti_theme";


// ============================================================
// PUBLIC WOMEN DIRECTORY
//
// IMPORTANT:
// Public directory stores ONLY names and wards.
//
// Phone numbers
// Bank names
// Account numbers
//
// are NOT displayed publicly.
// ============================================================

function getWomen() {

    try {

        return JSON.parse(
            localStorage.getItem(WOMEN_KEY) || "[]"
        );

    } catch {

        return [];

    }
}


function saveWomen(data) {

    localStorage.setItem(
        WOMEN_KEY,
        JSON.stringify(data)
    );

}


// ============================================================
// EXCO STORAGE
// ============================================================

function getExco() {

    try {

        return JSON.parse(
            localStorage.getItem(EXCO_KEY) || "[]"
        );

    } catch {

        return [];

    }

}


function saveExco(data) {

    localStorage.setItem(
        EXCO_KEY,
        JSON.stringify(data)
    );

}


// ============================================================
// SECURITY
// ============================================================

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ============================================================
// FIND WARD
// ============================================================

function getWard(index) {

    return wards[Number(index)] || null;

}


function getWardName(index) {

    const ward = getWard(index);

    return ward
        ? ward[0]
        : "Unknown Ward";

}


function getWardArea(index) {

    const ward = getWard(index);

    return ward
        ? ward[1]
        : "";

}


// ============================================================
// DOM HELPERS
// ============================================================

function getElement(id) {

    return document.getElementById(id);

}


// ============================================================
// NAVIGATION
// ============================================================

function setupNavigation() {

    const navigation =
        getElement("navigation");

    if (!navigation) return;


    navigation.innerHTML = `

        <a href="#home">
            🏠 Home
        </a>

        <a href="#wards">
            🏘️ Wards
        </a>

        <a href="#register">
            📝 Register
        </a>

        <a href="#search">
            🔎 Search
        </a>

        <a href="#exco">
            👥 EXCO
        </a>

        <a href="#settings">
            ⚙️ Settings
        </a>

    `;

}


// ============================================================
// MOBILE MENU
// ============================================================

function toggleMenu() {

    const navigation =
        getElement("navigation");

    if (!navigation) return;

    navigation.classList.toggle("open");

}


// ============================================================
// CLOSE MOBILE MENU
// ============================================================

document.addEventListener(
    "click",
    function(event) {

        const navigation =
            getElement("navigation");

        const menuButton =
            document.querySelector(".menu-btn");

        if (!navigation) return;

        if (
            navigation.classList.contains("open") &&
            !navigation.contains(event.target) &&
            !menuButton?.contains(event.target)
        ) {

            navigation.classList.remove("open");

        }

    }
);


// ============================================================
// HOME PAGE
// ============================================================

function renderHome() {

    const app =
        getElement("app");

    if (!app) return;


    const women =
        getWomen();


    app.innerHTML = `

        <section class="hero">

            <img
                src="${LOGO_PATH}"
                class="logo"
                alt="Ekiti State Women of Influence Logo"
            >

            <h2>
                ${SITE_NAME}
            </h2>

            <h3>
                ${SITE_LOCATION}
            </h3>

            <p>
                Women registration, ward directory
                and structured ward leadership.
            </p>

            <br>

            <a
                href="#register"
                class="button"
            >
                📝 Register a Woman
            </a>

            <a
                href="#search"
                class="button secondary"
            >
                🔎 Search Directory
            </a>

        </section>


        <div class="stats">

            <div class="stat">

                <div class="stat-icon">
                    🏘️
                </div>

                <div class="stat-number">
                    13
                </div>

                <div class="stat-label">
                    Wards
                </div>

            </div>


            <div class="stat">

                <div class="stat-icon">
                    👩
                </div>

                <div class="stat-number">
                    ${women.length}
                </div>

                <div class="stat-label">
                    Registered Women
                </div>

            </div>


            <div class="stat">

                <div class="stat-icon">
                    👥
                </div>

                <div class="stat-number">
                    104
                </div>

                <div class="stat-label">
                    Ward Offices
                </div>

            </div>


            <div class="stat">

                <div class="stat-icon">
                    🏛️
                </div>

                <div class="stat-number">
                    8
                </div>

                <div class="stat-label">
                    Offices / Ward
                </div>

            </div>

        </div>


        <section class="card">

            <h2>
                📝 Register With Us
            </h2>

            <p>
                Register your information under
                your appropriate ward.
            </p>

            <a
                href="#register"
                class="button"
            >
                Register Now →
            </a>

        </section>


        <section class="card">

            <h2>
                🏘️ Ado LG Ward Directory
            </h2>

            <p>
                View the 13 wards and their
                structured offices.
            </p>

            <a
                href="#wards"
                class="button"
            >
                View Wards
            </a>

        </section>

    `;

}


// ============================================================
// WARDS PAGE
// ============================================================

function renderWards() {

    const app =
        getElement("app");

    if (!app) return;


    app.innerHTML = `

        <div class="card">

            <h2>
                🏘️ Ado LG Wards
            </h2>

            <input
                id="wardSearch"
                placeholder="Search wards..."
            >

        </div>


        <div
            id="wardGrid"
            class="grid"
        ></div>

    `;


    displayWards();


    const search =
        getElement("wardSearch");


    if (search) {

        search.addEventListener(
            "input",
            function() {

                displayWards(
                    search.value
                );

            }
        );

    }

}


// ============================================================
// DISPLAY WARDS
// ============================================================

function displayWards(filter = "") {

    const grid =
        getElement("wardGrid");

    if (!grid) return;


    grid.innerHTML = "";


    wards.forEach(
        function(ward, index) {

            const searchText =
                `${ward[0]} ${ward[1]}`
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
                "card ward-card";


            card.innerHTML = `

                <div class="ward-number">
                    ${index + 1}
                </div>

                <h2>
                    ${escapeHTML(ward[0])}
                </h2>

                <p>
                    ${escapeHTML(ward[1])}
                </p>

                <p class="small">
                    8 Structured Offices
                </p>

                <button>
                    View Ward →
                </button>

            `;


            card.addEventListener(
                "click",
                function() {

                    openWard(index);

                }
            );


            grid.appendChild(card);

        }
    );

}


// ============================================================
// REGISTER PAGE
// ============================================================

function renderRegister() {

    const app =
        getElement("app");

    if (!app) return;


    const wardOptions =
        wards
            .map(
                function(ward, index) {

                    return `

                        <option value="${index}">

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
            )
            .join("");


    app.innerHTML = `

        <div class="card form-card">

            <img
                src="${LOGO_PATH}"
                class="logo"
                alt="Logo"
            >

            <h2>
                📝 WOMAN REGISTRATION
            </h2>

            <p>
                ${SITE_NAME}, ${SITE_LOCATION}
            </p>

            <div id="registerMessage"></div>


            <form id="registerForm">

                <label>
                    Ward
                </label>

                <select
                    id="registerWard"
                    required
                >

                    <option value="">
                        Select Ward
                    </option>

                    ${wardOptions}

                </select>


                <label>
                    Name
                </label>

                <input
                    id="registerName"
                    type="text"
                    placeholder="Full name"
                    required
                >


                <label>
                    Phone No
                </label>

                <input
                    id="registerPhone"
                    type="tel"
                    placeholder="Phone number"
                    required
                >


                <label>
                    Bank Name
                </label>

                <input
                    id="registerBank"
                    type="text"
                    placeholder="Bank name"
                    required
                >


                <label>
                    Account No
                </label>

                <input
                    id="registerAccount"
                    type="text"
                    inputmode="numeric"
                    placeholder="Account number"
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


    getElement("registerForm")
        ?.addEventListener(
            "submit",
            submitRegistration
        );

}


// ============================================================
// SUBMIT REGISTRATION
// ============================================================

function submitRegistration(event) {

    event.preventDefault();


    const ward =
        getElement("registerWard")?.value;


    const name =
        getElement("registerName")
            ?.value
            .trim();


    const phone =
        getElement("registerPhone")
            ?.value
            .trim();


    const bank =
        getElement("registerBank")
            ?.value
            .trim();


    const account =
        getElement("registerAccount")
            ?.value
            .trim();


    if (
        ward === "" ||
        !name ||
        !phone ||
        !bank ||
        !account
    ) {

        showRegisterMessage(
            "Please complete all fields.",
            "error"
        );

        return;

    }


    const women =
        getWomen();


    const newWoman = {

        id:
            Date.now(),

        name,

        ward:
            Number(ward),

        // Private fields
        phone,

        bank,

        account,

        createdAt:
            new Date().toISOString()

    };


    women.push(
        newWoman
    );


    saveWomen(
        women
    );


    showRegisterMessage(
        `
            Registration submitted successfully.
            <br><br>
            Your information has been recorded.
        `,
        "success"
    );


    getElement("registerForm")
        ?.reset();

}


// ============================================================
// REGISTER MESSAGE
// ============================================================

function showRegisterMessage(
    message,
    type = "success"
) {

    const box =
        getElement("registerMessage");

    if (!box) return;


    box.innerHTML = `

        <div class="${
            type === "success"
                ? "success-box"
                : "error"
        }">

            ${message}

        </div>

    `;

}


// ============================================================
// SEARCH PAGE
// ============================================================

function renderSearch() {

    const app =
        getElement("app");

    if (!app) return;


    const wardOptions =
        wards
            .map(
                function(ward, index) {

                    return `

                        <option value="${index}">

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
            )
            .join("");


    app.innerHTML = `

        <div class="card">

            <h2>
                🔎 Search Women
            </h2>

            <p class="small">

                Public search displays names
                and wards only.

            </p>


            <label>
                Woman's Name
            </label>

            <input
                id="womanSearch"
                placeholder="Search by woman's name..."
            >


            <label>
                Ward
            </label>

            <select id="wardSelect">

                <option value="">
                    All Wards
                </option>

                ${wardOptions}

            </select>

        </div>


        <div
            class="card"
            id="results"
        >

            <h2>
                Search Results
            </h2>

            <p class="privacy small">

                Search for a registered woman.

            </p>

        </div>

    `;


    getElement("womanSearch")
        ?.addEventListener(
            "input",
            searchWomen
        );


    getElement("wardSelect")
        ?.addEventListener(
            "change",
            searchWomen
        );


    searchWomen();

}


// ============================================================
// SEARCH WOMEN
// ============================================================

function searchWomen() {

    const results =
        getElement("results");

    const search =
        getElement("womanSearch");

    const wardSelect =
        getElement("wardSelect");


    if (
        !results ||
        !search ||
        !wardSelect
    ) {

        return;

    }


    const query =
        search.value
            .trim()
            .toLowerCase();


    const selectedWard =
        wardSelect.value;


    const women =
        getWomen();


    const matches =
        women.filter(
            function(woman) {

                const name =
                    String(
                        woman.name
                    )
                    .toLowerCase();


                const nameMatch =
                    !query ||
                    name.includes(query);


                const wardMatch =
                    selectedWard === "" ||
                    Number(woman.ward) ===
                    Number(selectedWard);


                return (
                    nameMatch &&
                    wardMatch
                );

            }
        );


    if (!matches.length) {

        results.innerHTML = `

            <h2>
                Search Results
            </h2>

            <div class="notice">

                No matching public name
                was found.

            </div>

        `;

        return;

    }


    results.innerHTML = `

        <h2>
            Search Results
        </h2>

        ${matches
            .map(
                function(woman) {

                    return `

                        <div class="result">

                            <div class="result-name">

                                ${escapeHTML(
                                    woman.name
                                )}

                            </div>

                            <div>

                                🏘️
                                ${escapeHTML(
                                    getWardName(
                                        woman.ward
                                    )
                                )}

                                –

                                ${escapeHTML(
                                    getWardArea(
                                        woman.ward
                                    )
                                )}

                            </div>

                        </div>

                    `;

                }
            )
            .join("")}

    `;

}


// ============================================================
// EXCO PAGE
// ============================================================

function renderExco() {

    const app =
        getElement("app");

    if (!app) return;


    app.innerHTML = `

        <div class="card">

            <h2>
                👥 WARD LEADERSHIP
            </h2>

            <p>
                Structured Ward Offices
            </p>

            <p class="small">

                8 offices are structured
                for every ward.

            </p>

        </div>


        <div
            id="excoGrid"
            class="grid"
        ></div>

    `;


    displayExco();

}


// ============================================================
// DISPLAY EXCO
// ============================================================

function displayExco() {

    const grid =
        getElement("excoGrid");

    if (!grid) return;


    grid.innerHTML = "";


    wards.forEach(
        function(ward, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card ward-card";


            card.innerHTML = `

                <div class="ward-number">

                    ${index + 1}

                </div>


                <h2>

                    ${escapeHTML(
                        ward[0]
                    )}

                </h2>


                <p>

                    ${escapeHTML(
                        ward[1]
                    )}

                </p>


                <strong>

                    8 Structured Offices

                </strong>


                <br><br>


                <button>

                    View EXCO →

                </button>

            `;


            card.addEventListener(
                "click",
                function() {

                    openWard(index);

                }
            );


            grid.appendChild(
                card
            );

        }
    );

}


// ============================================================
// OPEN WARD
// ============================================================

function openWard(index) {

    if (!wards[index]) return;


    const ward =
        wards[index];


    const savedExco =
        getExco();


    const wardExco =
        savedExco.filter(
            function(item) {

                return Number(
                    item.ward
                ) === Number(index);

            }
        );


    let officeHTML = "";


    offices.forEach(
        function(office) {

            const found =
                wardExco.find(
                    function(item) {

                        return (
                            item.office ===
                            office
                        );

                    }
                );


            officeHTML += `

                <div class="exco">

                    <div class="exco-position">

                        ${escapeHTML(
                            office
                        )}

                    </div>

                    <strong>

                        ${escapeHTML(
                            found
                                ? found.name
                                : "Not Assigned"
                        )}

                    </strong>

                </div>

            `;

        }
    );


    const women =
        getWomen()
            .filter(
                function(woman) {

                    return Number(
                        woman.ward
                    ) === Number(index);

                }
            );


    let womenHTML = "";


    if (!women.length) {

        womenHTML = `

            <div class="notice">

                No public names registered
                for this ward yet.

            </div>

        `;

    } else {

        womenHTML =
            women
                .map(
                    function(woman, number) {

                        return `

                            <div class="exco">

                                <strong>

                                    ${number + 1}.
                                    ${escapeHTML(
                                        woman.name
                                    )}

                                </strong>

                            </div>

                        `;

                    }
                )
                .join("");

    }


    const app =
        getElement("app");


    app.innerHTML = `

        <div class="top-actions">

            <a
                href="#wards"
                class="button secondary"
            >
                ← Back to Wards
            </a>

        </div>


        <div class="hero">

            <img
                src="${LOGO_PATH}"
                class="logo"
                alt="Logo"
            >

            <h2>

                ${escapeHTML(
                    ward[0]
                )}

            </h2>

            <p>

                ${escapeHTML(
                    ward[1]
                )}

            </p>

        </div>


        <div class="card">

            <h2>
                👥 Ward EXCO
            </h2>

            <p class="small">

                Structured offices for Ward
                ${index + 1}.

            </p>


            ${officeHTML}

        </div>


        <div class="card">

            <h2>
                👩 Registered Women
            </h2>

            <p class="small">

                Public directory displays
                names only.

            </p>


            ${womenHTML}

        </div>

    `;


    window.scrollTo(
        0,
        0
    );

}


// ============================================================
// SETTINGS PAGE
// ============================================================

function renderSettings() {

    const app =
        getElement("app");

    if (!app) return;


    const savedTheme =
        localStorage.getItem(
            THEME_KEY
        ) || "system";


    app.innerHTML = `

        <div class="card form-card">

            <h2>
                ⚙️ Settings
            </h2>


            <label>
                Appearance
            </label>


            <select
                id="themeSelect"
            >

                <option
                    value="system"
                    ${savedTheme === "system"
                        ? "selected"
                        : ""}
                >
                    System
                </option>


                <option
                    value="light"
                    ${savedTheme === "light"
                        ? "selected"
                        : ""}
                >
                    Light
                </option>


                <option
                    value="dark"
                    ${savedTheme === "dark"
                        ? "selected"
                        : ""}
                >
                    Dark
                </option>

            </select>


            <br><br>


            <button
                id="saveThemeButton"
                class="primary"
            >
                Save Appearance
            </button>


            <hr>


            <h3>
                🤖 AI Assistant
            </h3>


            <p class="small">

                Test your local Ollama
                connection.

            </p>


            <label>
                Ollama URL
            </label>


            <input
                id="ollamaURL"
                value="http://localhost:11434"
            >


            <label>
                Model
            </label>


            <input
                id="ollamaModel"
                value="qwen2.5-coder:7b"
            >


            <br>


            <button
                id="testAIButton"
                class="primary"
            >
                🔌 Test AI Connection
            </button>


            <div
                id="aiResult"
                class="notice"
            >
                AI connection has not been tested.
            </div>

        </div>

    `;


    getElement(
        "saveThemeButton"
    )?.addEventListener(
        "click",
        function() {

            const theme =
                getElement(
                    "themeSelect"
                ).value;


            localStorage.setItem(
                THEME_KEY,
                theme
            );


            applyTheme(
                theme
            );

        }
    );


    getElement(
        "testAIButton"
    )?.addEventListener(
        "click",
        testAIConnection
    );

}


// ============================================================
// DARK MODE
// ============================================================

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark"
        );

        return;

    }


    if (theme === "light") {

        document.body.classList.remove(
            "dark"
        );

        return;

    }


    const dark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;


    document.body.classList.toggle(
        "dark",
        dark
    );

}


function loadTheme() {

    const theme =
        localStorage.getItem(
            THEME_KEY
        ) || "system";


    applyTheme(
        theme
    );

}


// ============================================================
// AI CONNECTION
// ============================================================

async function testAIConnection() {

    const result =
        getElement("aiResult");


    const urlInput =
        getElement("ollamaURL");


    const modelInput =
        getElement("ollamaModel");


    const url =
        (
            urlInput?.value ||
            "http://localhost:11434"
        )
        .trim()
        .replace(/\/+$/, "");


    const model =
        (
            modelInput?.value ||
            "qwen2.5-coder:7b"
        )
        .trim();


    if (result) {

        result.innerHTML =
            "🔄 Testing Ollama connection...";

    }


    try {

        const response =
            await fetch(
                `${url}/api/tags`
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        const models =
            Array.isArray(
                data.models
            )
                ? data.models
                : [];


        const exists =
            models.some(
                function(item) {

                    return (
                        item.name === model
                    );

                }
            );


        if (result) {

            result.innerHTML = exists

                ? `
                    🟢 <strong>Connected!</strong>
                    <br>
                    Model <strong>${escapeHTML(
                        model
                    )}</strong> is available.
                `

                : `
                    🟡 Ollama is connected,
                    but <strong>${escapeHTML(
                        model
                    )}</strong>
                    was not found.
                `;

        }


    } catch(error) {

        if (result) {

            result.innerHTML = `

                🔴 <strong>
                    AI connection failed.
                </strong>

                <br><br>

                ${escapeHTML(
                    error.message
                )}

                <br><br>

                Make sure Ollama is running.

            `;

        }

    }

}


// ============================================================
// AI CHAT
// ============================================================

async function askAI(prompt) {

    const url =
        localStorage.getItem(
            "ollama_url"
        ) ||
        "http://localhost:11434";


    const model =
        localStorage.getItem(
            "ollama_model"
        ) ||
        "qwen2.5-coder:7b";


    try {

        const response =
            await fetch(
                `${url}/api/generate`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            model,

                            prompt,

                            stream: false

                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                `Ollama HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        return (
            data.response ||
            "No response received."
        );


    } catch(error) {

        return `
            ❌ AI Error:
            ${error.message}
        `;

    }

}


// ============================================================
// SAVE AI SETTINGS
// ============================================================

function saveAISettings() {

    const url =
        getElement("ollamaURL")
            ?.value
            .trim();


    const model =
        getElement("ollamaModel")
            ?.value
            .trim();


    if (url) {

        localStorage.setItem(
            "ollama_url",
            url.replace(/\/+$/, "")
        );

    }


    if (model) {

        localStorage.setItem(
            "ollama_model",
            model
        );

    }

}


// ============================================================
// ROUTER
// ============================================================

function router() {

    const route =
        location.hash
            .replace("#", "")
            .trim()
            .toLowerCase();


    setupNavigation();


    if (!route) {

        renderHome();

    }

    else if (
        route === "home"
    ) {

        renderHome();

    }

    else if (
        route === "wards"
    ) {

        renderWards();

    }

    else if (
        route === "register"
    ) {

        renderRegister();

    }

    else if (
        route === "search"
    ) {

        renderSearch();

    }

    else if (
        route === "exco"
    ) {

        renderExco();

    }

    else if (
        route === "settings"
    ) {

        renderSettings();

    }

    else if (
        route.startsWith("ward-")
    ) {

        const id =
            Number(
                route.replace(
                    "ward-",
                    ""
                )
            );


        if (
            Number.isInteger(id) &&
            id >= 0 &&
            id < wards.length
        ) {

            openWard(id);

        } else {

            renderHome();

        }

    }

    else {

        renderHome();

    }


    window.scrollTo(
        0,
        0
    );

}


// ============================================================
// SYSTEM THEME CHANGE
// ============================================================

window
    .matchMedia(
        "(prefers-color-scheme: dark)"
    )
    .addEventListener(
        "change",
        function() {

            const theme =
                localStorage.getItem(
                    THEME_KEY
                ) || "system";


            if (
                theme === "system"
            ) {

                applyTheme(
                    "system"
                );

            }

        }
    );


// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadTheme();

        setupNavigation();

        router();

    }
);


window.addEventListener(
    "hashchange",
    router
);
