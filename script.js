// ============================================================
// EKITI STATE WOMEN OF INFLUENCE - ADO LG
// FINAL STATIC VERSION
// ============================================================


// ============================================================
// SITE CONFIGURATION
// ============================================================

const SITE_NAME =
    "EKITI STATE WOMEN OF INFLUENCE";

const SITE_LOCATION =
    "ADO LG";

const LOGO =
    "static/logo.jpeg";


// ============================================================
// ADMIN
// ============================================================
//
// IMPORTANT:
// This is a STATIC GitHub Pages application.
//
// Anything stored in JavaScript can be inspected
// by someone who knows how to use browser developer tools.
//
// Therefore this is suitable for a prototype/demo,
// NOT for protecting real sensitive financial information.
//
// ============================================================

const ADMIN_USERNAME =
    "admin";

const ADMIN_PASSWORD =
    "admin123";


// ============================================================
// OLLAMA
// ============================================================

const DEFAULT_OLLAMA_URL =
    "http://localhost:11434";

const DEFAULT_OLLAMA_MODEL =
    "qwen2.5-coder:7b";


// ============================================================
// 13 WARDS
// ============================================================

const WARDS = [

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

const OFFICES = [

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
// DOM HELPERS
// ============================================================

const app =
    document.getElementById("app");

const navigation =
    document.getElementById("navigation");

const menuBtn =
    document.getElementById("menuBtn");

const modal =
    document.getElementById("modal");

const modalBody =
    document.getElementById("modalBody");

const modalTitle =
    document.getElementById("modalTitle");

const closeModal =
    document.getElementById("closeModal");

const toast =
    document.getElementById("toast");

const aiModal =
    document.getElementById("aiModal");

const closeAIButton =
    document.getElementById("closeAI");


// ============================================================
// STORAGE
// ============================================================

function getWomen() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "ekiti_women"
            ) || "[]"
        );

    } catch {

        return [];

    }

}


function saveWomen(women) {

    localStorage.setItem(
        "ekiti_women",
        JSON.stringify(women)
    );

}


function getExcos() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "ekiti_excos"
            ) || "[]"
        );

    } catch {

        return [];

    }

}


function saveExcos(excos) {

    localStorage.setItem(
        "ekiti_excos",
        JSON.stringify(excos)
    );

}


// ============================================================
// SETTINGS STORAGE
// ============================================================

function getSettings() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "ekiti_settings"
            ) || "{}"
        );

    } catch {

        return {};

    }

}


function saveSettings(settings) {

    localStorage.setItem(
        "ekiti_settings",
        JSON.stringify(settings)
    );

}


// ============================================================
// INITIALIZE SETTINGS
// ============================================================

function initializeSettings() {

    const settings =
        getSettings();

    if (!settings.ollamaURL) {

        settings.ollamaURL =
            DEFAULT_OLLAMA_URL;

    }

    if (!settings.ollamaModel) {

        settings.ollamaModel =
            DEFAULT_OLLAMA_MODEL;

    }

    if (!settings.theme) {

        settings.theme =
            "system";

    }

    saveSettings(settings);

    applyTheme(settings.theme);

}


// ============================================================
// INITIALIZE EXCO DATA
// ============================================================

function initializeExcos() {

    let excos =
        getExcos();

    let changed =
        false;


    WARDS.forEach(
        (ward, wardId) => {

            OFFICES.forEach(
                position => {

                    const exists =
                        excos.some(
                            exco =>
                                Number(
                                    exco.wardId
                                ) === wardId &&
                                exco.position ===
                                    position
                        );


                    if (!exists) {

                        excos.push({

                            id:
                                Date.now() +
                                Math.random(),

                            wardId:

                                wardId,

                            position:

                                position,

                            name:

                                "Not Assigned"

                        });

                        changed =
                            true;

                    }

                }
            );

        }
    );


    if (changed) {

        saveExcos(excos);

    }

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    return String(
        value ?? ""
    ).replace(
        /[&<>"']/g,
        character => {

            const map = {

                "&":
                    "&amp;",

                "<":
                    "&lt;",

                ">":
                    "&gt;",

                '"':
                    "&quot;",

                "'":
                    "&#039;"

            };

            return map[
                character
            ];

        }
    );

}


// ============================================================
// TOAST
// ============================================================

let toastTimer = null;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


// ============================================================
// ADMIN CHECK
// ============================================================

function isAdmin() {

    return (
        sessionStorage.getItem(
            "ekiti_admin"
        ) === "true"
    );

}


// ============================================================
// NAVIGATION
// ============================================================

function renderNavigation() {

    if (!navigation) return;


    navigation.innerHTML = `

        <a href="#home">
            🏠 Home
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

        <a href="#login">
            🔐 Admin
        </a>

    `;

}


// ============================================================
// CLOSE MOBILE MENU
// ============================================================

function closeMenu() {

    if (navigation) {

        navigation.classList.remove(
            "open"
        );

    }

}


// ============================================================
// HOME
// ============================================================

function renderHome() {

    const women =
        getWomen();

    const approved =
        women.filter(
            woman =>
                woman.approved === true
        );


    const excos =
        getExcos();


    const assignedExcos =
        excos.filter(
            exco =>
                exco.name &&
                exco.name !==
                    "Not Assigned"
        );


    let wardCards =
        "";


    WARDS.forEach(
        (ward, index) => {

            const count =
                approved.filter(
                    woman =>
                        Number(
                            woman.wardId
                        ) === index
                ).length;


            wardCards += `

                <div
                    class="ward-card"
                    onclick="openWard(${index})"
                >

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

                        ${count}

                    </strong>

                    <p class="small">

                        Approved Women

                    </p>

                </div>

            `;

        }
    );


    app.innerHTML = `

        <section class="hero">

            <img
                src="${LOGO}"
                class="logo"
                alt="Logo"
            >

            <h2>

                ${SITE_NAME}

            </h2>

            <h3>

                ${SITE_LOCATION}

            </h3>

            <p>

                Women Registration,
                Ward Information &
                Structured EXCO Management

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
                🔎 Search
            </a>

        </section>


        <section class="stats">

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
                    ✅
                </div>

                <div class="stat-number">
                    ${approved.length}
                </div>

                <div class="stat-label">
                    Approved Women
                </div>

            </div>


            <div class="stat">

                <div class="stat-icon">
                    👥
                </div>

                <div class="stat-number">
                    ${assignedExcos.length}
                </div>

                <div class="stat-label">
                    EXCO Members
                </div>

            </div>

        </section>


        <section class="card">

            <h2>
                📝 Register
            </h2>

            <p>

                Register a woman under
                her Ado LG ward.

            </p>

            <a
                href="#register"
                class="button"
            >
                📝 Register Now
            </a>

        </section>


        <section class="card">

            <h2>
                🏘️ Ado LG Wards
            </h2>

            <p class="small">

                Select a ward to view
                its structured offices
                and approved public names.

            </p>

        </section>


        <div class="grid">

            ${wardCards}

        </div>

    `;

}


// ============================================================
// REGISTER PAGE
// ============================================================

function renderRegister() {

    const wardOptions =
        WARDS.map(
            (ward, index) => `

                <option value="${index}">

                    ${escapeHTML(
                        ward[0]
                    )}

                    –

                    ${escapeHTML(
                        ward[1]
                    )}

                </option>

            `
        ).join("");


    app.innerHTML = `

        <div class="card form-card">

            <img
                src="${LOGO}"
                class="logo"
                alt="Logo"
            >

            <h2>
                📝 Woman Registration
            </h2>

            <p class="small">

                EKITI STATE WOMEN OF
                INFLUENCE, ADO LG

            </p>


            <div
                id="registerMessage"
            ></div>


            <form
                id="registerForm"
            >

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
                    placeholder="Full name"
                    autocomplete="name"
                    required
                >


                <label>
                    Phone No
                </label>

                <input
                    id="registerPhone"
                    type="tel"
                    placeholder="Phone number"
                    autocomplete="tel"
                    required
                >


                <label>
                    Bank Name
                </label>

                <input
                    id="registerBank"
                    placeholder="Bank name"
                    required
                >


                <label>
                    Account No
                </label>

                <input
                    id="registerAccount"
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


    document
        .getElementById(
            "registerForm"
        )
        .addEventListener(
            "submit",
            submitRegistration
        );

}


// ============================================================
// SUBMIT REGISTRATION
// ============================================================

function submitRegistration(event) {

    event.preventDefault();


    const wardId =
        Number(
            document
                .getElementById(
                    "registerWard"
                )
                .value
        );


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


    const bankName =
        document
            .getElementById(
                "registerBank"
            )
            .value
            .trim();


    const accountNo =
        document
            .getElementById(
                "registerAccount"
            )
            .value
            .trim();


    if (
        Number.isNaN(wardId) ||
        !name ||
        !phone ||
        !bankName ||
        !accountNo
    ) {

        showToast(
            "Please complete all fields."
        );

        return;

    }


    const women =
        getWomen();


    women.push({

        id:
            Date.now() +
            Math.random(),

        wardId:

            wardId,

        name:

            name,

        phone:

            phone,

        bankName:

            bankName,

        accountNo:

            accountNo,

        approved:

            false,

        createdAt:

            new Date()
                .toISOString()

    });


    saveWomen(
        women
    );


    document.getElementById(
        "registerMessage"
    ).innerHTML = `

        <div class="success-box">

            ✅ Registration submitted successfully.

            <br><br>

            Your registration is waiting
            for administrator approval.

        </div>

    `;


    document
        .getElementById(
            "registerForm"
        )
        .reset();


    showToast(
        "Registration submitted."
    );

}


// ============================================================
// SEARCH PAGE
// ============================================================

function renderSearch() {

    const wardOptions =
        WARDS.map(
            (ward, index) => `

                <option value="${index}">

                    ${escapeHTML(
                        ward[0]
                    )}

                    –

                    ${escapeHTML(
                        ward[1]
                    )}

                </option>

            `
        ).join("");


    app.innerHTML = `

        <div class="card">

            <h2>
                🔎 Search Women
            </h2>

            <p class="small">

                Only approved public names
                are displayed.

            </p>


            <form
                id="searchForm"
            >

                <label>
                    Woman's Name
                </label>

                <input
                    id="searchName"
                    placeholder="Enter name"
                >


                <label>
                    Ward
                </label>

                <select
                    id="searchWard"
                >

                    <option value="all">
                        All Wards
                    </option>

                    ${wardOptions}

                </select>


                <br><br>

                <button
                    type="submit"
                    class="primary"
                >
                    🔎 Search
                </button>

            </form>

        </div>


        <div
            class="card"
            id="searchResults"
        >

            <h2>
                Search Results
            </h2>

            <p class="small">

                Enter a name or select a ward.

            </p>

        </div>

    `;


    document
        .getElementById(
            "searchForm"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();

                showSearchResults();

            }
        );

}


// ============================================================
// SHOW SEARCH RESULTS
// ============================================================

function showSearchResults() {

    const women =
        getWomen().filter(
            woman =>
                woman.approved === true
        );


    const query =
        document
            .getElementById(
                "searchName"
            )
            .value
            .trim()
            .toLowerCase();


    const ward =
        document
            .getElementById(
                "searchWard"
            )
            .value;


    const results =
        women.filter(
            woman => {

                const name =
                    String(
                        woman.name
                    ).toLowerCase();


                const nameMatch =
                    !query ||
                    name.includes(
                        query
                    );


                const wardMatch =
                    ward === "all" ||
                    Number(
                        woman.wardId
                    ) ===
                    Number(
                        ward
                    );


                return (
                    nameMatch &&
                    wardMatch
                );

            }
        );


    const box =
        document.getElementById(
            "searchResults"
        );


    if (!results.length) {

        box.innerHTML = `

            <h2>
                Search Results
            </h2>

            <div class="notice">

                No approved woman matched
                your search.

            </div>

        `;

        return;

    }


    let html = `

        <h2>
            Search Results
        </h2>

    `;


    results.forEach(
        (woman, index) => {

            const wardData =
                WARDS[
                    Number(
                        woman.wardId
                    )
                ];


            html += `

                <div class="result">

                    <div class="result-name">

                        ${index + 1}.
                        ${escapeHTML(
                            woman.name
                        )}

                    </div>

                    <div>

                        🏘️

                        ${escapeHTML(
                            wardData[0]
                        )}

                        –

                        ${escapeHTML(
                            wardData[1]
                        )}

                    </div>

                </div>

            `;

        }
    );


    box.innerHTML =
        html;

}


// ============================================================
// EXCO PAGE
// ============================================================

function renderExco() {

    let cards =
        "";


    WARDS.forEach(
        (ward, index) => {

            cards += `

                <div
                    class="ward-card"
                    onclick="openWard(${index})"
                >

                    <div class="ward-number">

                        ${index + 1}

                    </div>

                    <h3>

                        ${escapeHTML(
                            ward[0]
                        )}

                    </h3>

                    <p>

                        ${escapeHTML(
                            ward[1]
                        )}

                    </p>

                    <strong>

                        8 Structured Offices

                    </strong>

                </div>

            `;

        }
    );


    app.innerHTML = `

        <div class="card">

            <h2>
                👥 Ward EXCO
            </h2>

            <p>

                Each ward has the following
                structured offices:

            </p>


            <div class="grid">

                ${OFFICES.map(
                    office => `

                        <div class="card">

                            <strong>

                                ${escapeHTML(
                                    office
                                )}

                            </strong>

                        </div>

                    `
                ).join("")}

            </div>

        </div>


        <h2>
            🏘️ Select a Ward
        </h2>

        <div class="grid">

            ${cards}

        </div>

    `;

}


// ============================================================
// OPEN WARD
// ============================================================

function openWard(wardId) {

    const ward =
        WARDS[
            Number(
                wardId
            )
        ];


    if (!ward) return;


    location.hash =
        `ward-${wardId}`;

}


// ============================================================
// RENDER WARD DETAILS
// ============================================================

function renderWard(wardId) {

    const ward =
        WARDS[
            Number(
                wardId
            )
        ];


    if (!ward) {

        renderHome();

        return;

    }


    const excos =
        getExcos();


    const women =
        getWomen().filter(
            woman =>
                woman.approved === true &&
                Number(
                    woman.wardId
                ) ===
                Number(
                    wardId
                )
        );


    modalTitle.textContent =
        `WARD ${Number(wardId) + 1} — ${ward[0]}`;


    let html = `

        <p class="privacy">

            ${escapeHTML(
                ward[1]
            )}

        </p>


        <h3>
            👥 Structured Ward Offices
        </h3>

    `;


    OFFICES.forEach(
        office => {

            const exco =
                excos.find(
                    item =>
                        Number(
                            item.wardId
                        ) ===
                        Number(
                            wardId
                        ) &&
                        item.position ===
                            office
                );


            html += `

                <div class="office">

                    <strong>

                        ${escapeHTML(
                            office
                        )}

                    </strong>

                    <span>

                        ${escapeHTML(
                            exco?.name ||
                            "Not Assigned"
                        )}

                    </span>

                </div>

            `;

        }
    );


    html += `

        <hr>

        <h3>
            👩 Approved Women
        </h3>

        <p class="small">

            Only approved public names
            are shown.

        </p>

    `;


    if (!women.length) {

        html += `

            <div class="notice">

                No approved women have been
                added to this ward yet.

            </div>

        `;

    } else {

        women.forEach(
            (woman, index) => {

                html += `

                    <div class="exco">

                        <strong>

                            ${index + 1}.
                            ${escapeHTML(
                                woman.name
                            )}

                        </strong>

                    </div>

                `;

            }
        );

    }


    modalBody.innerHTML =
        html;


    modal.classList.remove(
        "hidden"
    );

}


// ============================================================
// LOGIN
// ============================================================

function renderLogin() {

    app.innerHTML = `

        <div class="card form-card">

            <img
                src="${LOGO}"
                class="logo"
                alt="Logo"
            >

            <h2>
                🔐 Administrator Login
            </h2>

            <p class="small">

                Administrator access only.

            </p>


            <div
                id="loginMessage"
            ></div>


            <form
                id="loginForm"
            >

                <label>
                    Username
                </label>

                <input
                    id="adminUsername"
                    autocomplete="username"
                    required
                >


                <label>
                    Password
                </label>

                <input
                    id="adminPassword"
                    type="password"
                    autocomplete="current-password"
                    required
                >


                <br><br>

                <button
                    class="primary"
                    type="submit"
                >
                    🔐 Login
                </button>

            </form>

        </div>

    `;


    document
        .getElementById(
            "loginForm"
        )
        .addEventListener(
            "submit",
            adminLogin
        );

}


// ============================================================
// ADMIN LOGIN
// ============================================================

function adminLogin(event) {

    event.preventDefault();


    const username =
        document
            .getElementById(
                "adminUsername"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "adminPassword"
            )
            .value;


    if (
        username ===
            ADMIN_USERNAME &&
        password ===
            ADMIN_PASSWORD
    ) {

        sessionStorage.setItem(
            "ekiti_admin",
            "true"
        );


        showToast(
            "Administrator login successful."
        );


        location.hash =
            "admin";


        return;

    }


    document
        .getElementById(
            "loginMessage"
        )
        .innerHTML = `

            <div class="error">

                Incorrect username
                or password.

            </div>

        `;

}


// ============================================================
// ADMIN DASHBOARD
// ============================================================

function renderAdmin() {

    if (!isAdmin()) {

        location.hash =
            "login";

        return;

    }


    const women =
        getWomen();


    const approved =
        women.filter(
            woman =>
                woman.approved
        );


    const pending =
        women.filter(
            woman =>
                !woman.approved
        );


    const excos =
        getExcos();


    let womenRows =
        "";


    women.forEach(
        woman => {

            womenRows += `

                <tr>

                    <td>
                        ${escapeHTML(
                            woman.name
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            woman.phone
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            woman.bankName
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            woman.accountNo
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            WARDS[
                                Number(
                                    woman.wardId
                                )
                            ][0]
                        )}
                    </td>

                    <td>

                        ${
                            woman.approved

                                ? "✅ Approved"

                                : "⏳ Pending"

                        }

                    </td>

                    <td>

                        <div class="actions">

                            ${
                                woman.approved

                                    ?

                                `<button
                                    class="danger"
                                    onclick="
                                        rejectWoman('${woman.id}')
                                    "
                                >
                                    Reject
                                </button>`

                                    :

                                `<button
                                    class="success"
                                    onclick="
                                        approveWoman('${woman.id}')
                                    "
                                >
                                    Approve
                                </button>`
                            }


                            <button
                                onclick="
                                    editWoman('${woman.id}')
                                "
                            >
                                Edit
                            </button>


                            <button
                                class="danger"
                                onclick="
                                    deleteWoman('${woman.id}')
                                "
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }
    );


    if (!womenRows) {

        womenRows = `

            <tr>

                <td colspan="7">

                    No registrations yet.

                </td>

            </tr>

        `;

    }


    let excoRows =
        "";


    excos.forEach(
        exco => {

            excoRows += `

                <tr>

                    <td>

                        ${escapeHTML(
                            WARDS[
                                Number(
                                    exco.wardId
                                )
                            ][0]
                        )}

                    </td>

                    <td>

                        ${escapeHTML(
                            exco.position
                        )}

                    </td>

                    <td>

                        ${escapeHTML(
                            exco.name
                        )}

                    </td>

                    <td>

                        <button
                            onclick="
                                editExco('${exco.id}')
                            "
                        >
                            Edit
                        </button>

                    </td>

                </tr>

            `;

        }
    );


    app.innerHTML = `

        <div class="hero">

            <img
                src="${LOGO}"
                class="logo"
                alt="Logo"
            >

            <h2>
                🔐 ADMIN DASHBOARD
            </h2>

            <p>
                ${SITE_NAME}
            </p>

            <button
                class="secondary"
                onclick="logout()"
            >
                Logout
            </button>

        </div>


        <div class="stats">

            <div class="stat">

                <div class="stat-number">
                    ${women.length}
                </div>

                <div class="stat-label">
                    Total
                </div>

            </div>


            <div class="stat">

                <div class="stat-number">
                    ${approved.length}
                </div>

                <div class="stat-label">
                    Approved
                </div>

            </div>


            <div class="stat">

                <div class="stat-number">
                    ${pending.length}
                </div>

                <div class="stat-label">
                    Pending
                </div>

            </div>

        </div>


        <div class="card">

            <h2>
                👥 Assign EXCO
            </h2>


            <form
                id="excoForm"
            >

                <label>
                    Ward
                </label>

                <select
                    id="excoWard"
                    required
                >

                    <option value="">
                        Select Ward
                    </option>

                    ${WARDS.map(
                        (ward, index) => `

                            <option
                                value="${index}"
                            >

                                ${escapeHTML(
                                    ward[0]
                                )}

                                –

                                ${escapeHTML(
                                    ward[1]
                                )}

                            </option>

                        `
                    ).join("")}

                </select>


                <label>
                    Office
                </label>

                <select
                    id="excoPosition"
                    required
                >

                    <option value="">
                        Select Office
                    </option>

                    ${OFFICES.map(
                        office => `

                            <option
                                value="${escapeHTML(
                                    office
                                )}"
                            >

                                ${escapeHTML(
                                    office
                                )}

                            </option>

                        `
                    ).join("")}

                </select>


                <label>
                    Name
                </label>

                <input
                    id="excoName"
                    placeholder="EXCO member name"
                    required
                >


                <br><br>

                <button
                    class="primary"
                    type="submit"
                >
                    Save EXCO
                </button>

            </form>

        </div>


        <div class="card">

            <h2>
                👥 Ward EXCO
            </h2>

            <div class="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Ward
                            </th>

                            <th>
                                Office
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${excoRows}

                    </tbody>

                </table>

            </div>

        </div>


        <div class="card">

            <h2>
                👩 Registered Women
            </h2>

            <div class="notice">

                🔐 Private registration details
                are visible only inside this
                administrator dashboard.

            </div>

            <div class="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Name
                            </th>

                            <th>
                                Phone
                            </th>

                            <th>
                                Bank
                            </th>

                            <th>
                                Account
                            </th>

                            <th>
                                Ward
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${womenRows}

                    </tbody>

                </table>

            </div>

        </div>

    `;


    document
        .getElementById(
            "excoForm"
        )
        .addEventListener(
            "submit",
            saveExco
        );

}


// ============================================================
// SAVE EXCO
// ============================================================

function saveExco(event) {

    event.preventDefault();


    const wardId =
        Number(
            document
                .getElementById(
                    "excoWard"
                )
                .value
        );


    const position =
        document
            .getElementById(
                "excoPosition"
            )
            .value;


    const name =
        document
            .getElementById(
                "excoName"
            )
            .value
            .trim();


    if (
        Number.isNaN(wardId) ||
        !position ||
        !name
    ) {

        showToast(
            "Complete all EXCO fields."
        );

        return;

    }


    const excos =
        getExcos();


    const existing =
        excos.find(
            exco =>
                Number(
                    exco.wardId
                ) === wardId &&
                exco.position ===
                    position
        );


    if (existing) {

        existing.name =
            name;

    } else {

        excos.push({

            id:
                Date.now() +
                Math.random(),

            wardId,

            position,

            name

        });

    }


    saveExcos(
        excos
    );


    showToast(
        "EXCO saved successfully."
    );


    renderAdmin();

}


// ============================================================
// APPROVE WOMAN
// ============================================================

function approveWoman(id) {

    const women =
        getWomen();


    const woman =
        women.find(
            item =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (!woman) return;


    woman.approved =
        true;


    saveWomen(
        women
    );


    renderAdmin();

}


// ============================================================
// REJECT WOMAN
// ============================================================

function rejectWoman(id) {

    const women =
        getWomen();


    const woman =
        women.find(
            item =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (!woman) return;


    woman.approved =
        false;


    saveWomen(
        women
    );


    renderAdmin();

}


// ============================================================
// DELETE WOMAN
// ============================================================

function deleteWoman(id) {

    if (
        !confirm(
            "Delete this registration?"
        )
    ) {

        return;

    }


    let women =
        getWomen();


    women =
        women.filter(
            woman =>
                String(
                    woman.id
                ) !==
                String(
                    id
                )
        );


    saveWomen(
        women
    );


    showToast(
        "Registration deleted."
    );


    renderAdmin();

}


// ============================================================
// EDIT WOMAN
// ============================================================

function editWoman(id) {

    const women =
        getWomen();


    const woman =
        women.find(
            item =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (!woman) return;


    const name =
        prompt(
            "Name:",
            woman.name
        );


    if (name === null)
        return;


    const phone =
        prompt(
            "Phone:",
            woman.phone
        );


    if (phone === null)
        return;


    const bank =
        prompt(
            "Bank name:",
            woman.bankName
        );


    if (bank === null)
        return;


    const account =
        prompt(
            "Account number:",
            woman.accountNo
        );


    if (account === null)
        return;


    woman.name =
        name.trim();

    woman.phone =
        phone.trim();

    woman.bankName =
        bank.trim();

    woman.accountNo =
        account.trim();


    saveWomen(
        women
    );


    showToast(
        "Registration updated."
    );


    renderAdmin();

}


// ============================================================
// EDIT EXCO
// ============================================================

function editExco(id) {

    const excos =
        getExcos();


    const exco =
        excos.find(
            item =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (!exco) return;


    const name =
        prompt(
            "EXCO member name:",
            exco.name
        );


    if (name === null)
        return;


    exco.name =
        name.trim();


    saveExcos(
        excos
    );


    renderAdmin();

}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    sessionStorage.removeItem(
        "ekiti_admin"
    );


    showToast(
        "Logged out."
    );


    location.hash =
        "home";

}


// ============================================================
// SETTINGS PAGE
// ============================================================

function renderSettings() {

    const settings =
        getSettings();


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
                    ${
                        settings.theme ===
                        "system"
                            ? "selected"
                            : ""
                    }
                >
                    System
                </option>

                <option
                    value="light"
                    ${
                        settings.theme ===
                        "light"
                            ? "selected"
                            : ""
                    }
                >
                    Light
                </option>

                <option
                    value="dark"
                    ${
                        settings.theme ===
                        "dark"
                            ? "selected"
                            : ""
                    }
                >
                    Dark
                </option>

            </select>


            <label>
                Ollama URL
            </label>

            <input
                id="ollamaURL"
                value="${escapeHTML(
                    settings.ollamaURL ||
                    DEFAULT_OLLAMA_URL
                )}"
            >


            <label>
                Ollama Model
            </label>

            <input
                id="ollamaModel"
                value="${escapeHTML(
                    settings.ollamaModel ||
                    DEFAULT_OLLAMA_MODEL
                )}"
            >


            <br><br>

            <button
                id="saveSettingsButton"
                class="primary"
                type="button"
            >
                💾 Save Settings
            </button>


            <button
                id="openAIButton"
                type="button"
            >
                🤖 Open AI Assistant
            </button>

        </div>

    `;


    document
        .getElementById(
            "themeSelect"
        )
        .addEventListener(
            "change",
            event => {

                applyTheme(
                    event.target.value
                );

            }
        );


    document
        .getElementById(
            "saveSettingsButton"
        )
        .addEventListener(
            "click",
            saveSettingsFromPage
        );


    document
        .getElementById(
            "openAIButton"
        )
        .addEventListener(
            "click",
            openAI
        );

}


// ============================================================
// SAVE SETTINGS FROM PAGE
// ============================================================

function saveSettingsFromPage() {

    const settings =
        getSettings();


    settings.theme =
        document
            .getElementById(
                "themeSelect"
            )
            .value;


    settings.ollamaURL =
        document
            .getElementById(
                "ollamaURL"
            )
            .value
            .trim()
            .replace(
                /\/+$/,
                ""
            );


    settings.ollamaModel =
        document
            .getElementById(
                "ollamaModel"
            )
            .value
            .trim();


    saveSettings(
        settings
    );


    applyTheme(
        settings.theme
    );


    showToast(
        "Settings saved."
    );

}


// ============================================================
// THEME
// ============================================================

function applyTheme(theme) {

    if (
        theme ===
        "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

        return;

    }


    if (
        theme ===
        "light"
    ) {

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


// ============================================================
// SYSTEM THEME CHANGES
// ============================================================

const mediaQuery =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


mediaQuery.addEventListener(
    "change",
    () => {

        const settings =
            getSettings();


        if (
            settings.theme ===
            "system"
        ) {

            applyTheme(
                "system"
            );

        }

    }
);


// ============================================================
// AI MODAL
// ============================================================

function openAI() {

    aiModal.classList.remove(
        "hidden"
    );


    updateAIStatus(
        "🟡 Ready"
    );

}


function closeAI() {

    aiModal.classList.add(
        "hidden"
    );

}


// ============================================================
// AI STATUS
// ============================================================

function updateAIStatus(
    message
) {

    const status =
        document.getElementById(
            "aiStatus"
        );


    if (status) {

        status.textContent =
            message;

    }

}


// ============================================================
// AI MESSAGE
// ============================================================

function addAIMessage(
    role,
    message
) {

    const container =
        document.getElementById(
            "aiMessages"
        );


    const div =
        document.createElement(
            "div"
        );


    div.className =
        `ai-message ${role}`;


    const strong =
        document.createElement(
            "strong"
        );


    strong.textContent =
        role === "user"
            ? "👤 You"
            : "🤖 AI";


    const p =
        document.createElement(
            "p"
        );


    p.textContent =
        message;


    div.appendChild(
        strong
    );


    div.appendChild(
        p
    );


    container.appendChild(
        div
    );


    container.scrollTop =
        container.scrollHeight;


    return p;

}


// ============================================================
// AI CONNECTION
// ============================================================

async function testAIConnection() {

    const settings =
        getSettings();


    const baseURL =
        settings.ollamaURL ||
        DEFAULT_OLLAMA_URL;


    updateAIStatus(
        "🟡 Testing..."
    );


    try {

        const response =
            await fetch(
                `${baseURL}/api/tags`,
                {
                    method:
                        "GET"
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
            data.models ||
            [];


        updateAIStatus(
            `🟢 Connected (${models.length} models)`
        );


        showToast(
            "Ollama connection successful."
        );


    } catch (error) {

        console.error(
            "Ollama connection error:",
            error
        );


        updateAIStatus(
            "🔴 Not connected"
        );


        showToast(
            "Could not connect to Ollama."
        );

    }

}


// ============================================================
// AI REQUEST
// ============================================================

let aiController =
    null;


async function sendAIMessage() {

    const input =
        document.getElementById(
            "aiInput"
        );


    const message =
        input.value.trim();


    if (!message) {

        return;

    }


    const settings =
        getSettings();


    const baseURL =
        settings.ollamaURL ||
        DEFAULT_OLLAMA_URL;


    const model =
        settings.ollamaModel ||
        DEFAULT_OLLAMA_MODEL;


    addAIMessage(
        "user",
        message
    );


    input.value =
        "";


    updateAIStatus(
        "🟡 AI is thinking..."
    );


    const assistantElement =
        addAIMessage(
            "assistant",
            "..."
        );


    try {

        aiController =
            new AbortController();


        const response =
            await fetch(
                `${baseURL}/api/generate`,
                {
                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            model:
                                model,

                            prompt:
                                message,

                            stream:
                                true

                        }),

                    signal:
                        aiController.signal

                }
            );


        if (!response.ok) {

            throw new Error(
                `Ollama returned HTTP ${response.status}`
            );

        }


        if (!response.body) {

            throw new Error(
                "Streaming is not supported by this response."
            );

        }


        const reader =
            response.body.getReader();


        const decoder =
            new TextDecoder();


        let fullText =
            "";


        assistantElement.textContent =
            "";


        while (true) {

            const {
                value,
                done
            } =
                await reader.read();


            if (done) {

                break;

            }


            const chunk =
                decoder.decode(
                    value,
                    {
                        stream:
                            true
                    }
                );


            const lines =
                chunk
                    .split("\n")
                    .filter(
                        line =>
                            line.trim()
                    );


            for (
                const line of lines
            ) {

                try {

                    const data =
                        JSON.parse(
                            line
                        );


                    if (
                        data.response
                    ) {

                        fullText +=
                            data.response;


                        assistantElement.textContent =
                            fullText;

                    }


                    if (
                        data.done
                    ) {

                        break;

                    }

                } catch {

                    // Ignore incomplete JSON chunks.

                }

            }


            const container =
                document.getElementById(
                    "aiMessages"
                );


            container.scrollTop =
                container.scrollHeight;

        }


        updateAIStatus(
            "🟢 Ready"
        );


    } catch (error) {

        if (
            error.name ===
            "AbortError"
        ) {

            assistantElement.textContent =
                "⛔ Response stopped.";

            updateAIStatus(
                "🟡 Stopped"
            );

            return;

        }


        console.error(
            "AI Error:",
            error
        );


        assistantElement.textContent =
            `❌ AI Error: ${error.message}`;


        updateAIStatus(
            "🔴 AI connection failed"
        );

    } finally {

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


    messages.innerHTML = `

        <div class="ai-message assistant">

            <strong>
                🤖 AI
            </strong>

            <p>
                Chat cleared. How can I help?
            </p>

        </div>

    `;


    updateAIStatus(
        "🟢 Ready"
    );

}


// ============================================================
// ROUTER
// ============================================================

function router() {

    renderNavigation();

    closeMenu();


    let route =
        location.hash
            .replace(
                "#",
                ""
            )
            .trim();


    if (!route) {

        route =
            "home";

    }


    if (
        route ===
        "home"
    ) {

        renderHome();

    }

    else if (
        route ===
        "register"
    ) {

        renderRegister();

    }

    else if (
        route ===
        "search"
    ) {

        renderSearch();

    }

    else if (
        route ===
        "exco"
    ) {

        renderExco();

    }

    else if (
        route ===
        "login"
    ) {

        renderLogin();

    }

    else if (
        route ===
        "admin"
    ) {

        renderAdmin();

    }

    else if (
        route ===
        "settings"
    ) {

        renderSettings();

    }

    else if (
        route.startsWith(
            "ward-"
        )
    ) {

        const wardId =
            Number(
                route.replace(
                    "ward-",
                    ""
                )
            );


        renderWard(
            wardId
        );

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
// MODAL EVENTS
// ============================================================

closeModal.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "hidden"
        );

    }
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modal
        ) {

            modal.classList.add(
                "hidden"
            );

        }

    }
);


closeAIButton.addEventListener(
    "click",
    closeAI
);


aiModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            aiModal
        ) {

            closeAI();

        }

    }
);


// ============================================================
// ESCAPE KEY
// ============================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            modal.classList.add(
                "hidden"
            );

            closeAI();

        }

    }
);


// ============================================================
// MOBILE MENU
// ============================================================

menuBtn.addEventListener(
    "click",
    () => {

        navigation.classList.toggle(
            "open"
        );

    }
);


// ============================================================
// AI BUTTONS
// ============================================================

document
    .getElementById(
        "testAI"
    )
    .addEventListener(
        "click",
        testAIConnection
    );


document
    .getElementById(
        "clearAI"
    )
    .addEventListener(
        "click",
        clearAIChat
    );


document
    .getElementById(
        "stopAI"
    )
    .addEventListener(
        "click",
        stopAI
    );


document
    .getElementById(
        "sendAI"
    )
    .addEventListener(
        "click",
        sendAIMessage
    );


document
    .getElementById(
        "aiInput"
    )
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                    "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendAIMessage();

            }

        }
    );


// ============================================================
// START APPLICATION
// ============================================================

initializeSettings();

initializeExcos();

window.addEventListener(
    "hashchange",
    router
);

window.addEventListener(
    "DOMContentLoaded",
    router
);


// Run immediately too,
// in case the script loads
// after DOMContentLoaded.

router();
