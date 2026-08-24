```javascript
// ============================================================
// EKITI STATE WOMEN OF INFLUENCE - ADO LG
// FULL STATIC WEBSITE SCRIPT
// ============================================================


// ============================================================
// CONFIGURATION
// ============================================================

const SITE_NAME = "EKITI STATE WOMEN OF INFLUENCE";
const SITE_LOCATION = "ADO LG";

const LOGO_PATH = "static/logo.jpeg";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


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

let women = JSON.parse(
    localStorage.getItem("ekiti_public_women") || "[]"
);


// ============================================================
// PRIVATE REGISTRATIONS
// ============================================================

let registrations = JSON.parse(
    localStorage.getItem("ekiti_registrations") || "[]"
);


// ============================================================
// EXCO DATA
// ============================================================

let excoData = JSON.parse(
    localStorage.getItem("ekiti_exco") || "[]"
);


// ============================================================
// DOM HELPERS
// ============================================================

function $(id) {
    return document.getElementById(id);
}


// ============================================================
// ESCAPE HTML
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
// SAVE DATA
// ============================================================

function saveRegistrations() {

    localStorage.setItem(
        "ekiti_registrations",
        JSON.stringify(registrations)
    );
}


function saveWomen() {

    localStorage.setItem(
        "ekiti_public_women",
        JSON.stringify(women)
    );
}


function saveExco() {

    localStorage.setItem(
        "ekiti_exco",
        JSON.stringify(excoData)
    );
}


// ============================================================
// ADMIN STATUS
// ============================================================

function isAdmin() {

    return sessionStorage.getItem(
        "ekiti_admin"
    ) === "true";
}


// ============================================================
// THEME
// ============================================================

function changeTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

    }

    else if (theme === "light") {

        document.body.classList.remove("dark");

    }

    else {

        const dark =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        document.body.classList.toggle(
            "dark",
            dark
        );
    }

    localStorage.setItem(
        "ekiti_theme",
        theme
    );
}


function loadTheme() {

    const theme =
        localStorage.getItem(
            "ekiti_theme"
        ) || "system";

    changeTheme(theme);
}


// ============================================================
// MOBILE MENU
// ============================================================

function toggleMenu() {

    const nav =
        $("navigation");

    if (!nav) return;

    nav.classList.toggle("open");
}


// ============================================================
// NAVIGATION
// ============================================================

function renderNavigation() {

    const nav =
        $("navigation");

    if (!nav) return;


    nav.innerHTML = `

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

        ${
            isAdmin()

                ? `
                    <a href="#admin">
                        🔐 Admin
                    </a>
                  `

                : `
                    <a href="#login">
                        🔐 Admin
                    </a>
                  `
        }

        <a href="#settings">
            ⚙️ Settings
        </a>

    `;
}


// ============================================================
// HOME PAGE
// ============================================================

function renderHome() {

    const app =
        $("app");

    if (!app) return;


    const approved =
        women.length;


    let wardCards = "";


    wards.forEach(
        (ward, index) => {

            const count =
                women.filter(
                    woman =>
                        Number(
                            woman.ward
                        ) === index
                ).length;


            wardCards += `

                <div
                    class="card ward-card"
                    onclick="location.hash='ward-${index}'"
                >

                    <div class="ward-number">
                        ${index + 1}
                    </div>

                    <h2>
                        ${escapeHTML(ward[0])}
                    </h2>

                    <p>
                        ${escapeHTML(ward[1])}
                    </p>

                    <strong>
                        ${count}
                    </strong>

                    <p class="small">
                        Registered Women
                    </p>

                </div>

            `;
        }
    );


    app.innerHTML = `

        <section class="hero">

            <img
                src="${LOGO_PATH}"
                class="logo"
                alt="${SITE_NAME}"
            >

            <h2>
                ${SITE_NAME}
            </h2>

            <h3>
                ${SITE_LOCATION}
            </h3>

            <p>
                Women registration,
                ward directory and
                structured ward leadership.
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
                    👥
                </div>

                <div class="stat-number">
                    8
                </div>

                <div class="stat-label">
                    EXCO Offices / Ward
                </div>

            </div>


            <div class="stat">

                <div class="stat-icon">
                    🏢
                </div>

                <div class="stat-number">
                    104
                </div>

                <div class="stat-label">
                    Total Ward Offices
                </div>

            </div>


            <div class="stat">

                <div class="stat-icon">
                    👩
                </div>

                <div class="stat-number">
                    ${approved}
                </div>

                <div class="stat-label">
                    Public Names
                </div>

            </div>

        </section>


        <section class="card">

            <h2>
                📝 Register With Ekiti State Women of Influence
            </h2>

            <p>
                Register your name, phone number,
                bank details and ward information.
            </p>

            <a
                href="#register"
                class="button"
            >
                Register Now →
            </a>

        </section>


        <h2>
            🏘️ Ado LG Wards
        </h2>

        <div class="grid">

            ${wardCards}

        </div>

    `;
}


// ============================================================
// WARDS PAGE
// ============================================================

function renderWards() {

    const app =
        $("app");

    if (!app) return;


    let html = `

        <div class="card">

            <h2>
                🏘️ Ado LG Ward Directory
            </h2>

            <p>
                Select a ward to view its
                structured offices.
            </p>

            <input
                id="wardSearchInput"
                placeholder="Search wards..."
            >

        </div>

        <div
            id="wardsContainer"
            class="grid"
        ></div>

    `;


    app.innerHTML =
        html;


    displayWards();


    $("wardSearchInput")
        .addEventListener(
            "input",
            function () {

                displayWards(
                    this.value
                );

            }
        );
}


function displayWards(
    filter = ""
) {

    const container =
        $("wardsContainer");

    if (!container) return;


    container.innerHTML = "";


    wards.forEach(
        (ward, index) => {

            const text =
                `${ward[0]} ${ward[1]}`
                    .toLowerCase();


            if (
                filter &&
                !text.includes(
                    filter
                        .toLowerCase()
                )
            ) {
                return;
            }


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

                <button>
                    View Ward →
                </button>

            `;


            card.addEventListener(
                "click",
                function () {

                    location.hash =
                        `ward-${index}`;

                }
            );


            container.appendChild(
                card
            );

        }
    );
}


// ============================================================
// REGISTRATION PAGE
// ============================================================

function renderRegister() {

    const app =
        $("app");

    if (!app) return;


    const wardOptions =
        wards.map(
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
                📝 Woman Registration
            </h2>

            <p>
                EKITI STATE WOMEN OF INFLUENCE,
                ADO LG
            </p>

            <div
                id="registerMessage"
            ></div>


            <form
                id="registrationForm"
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


    $("registrationForm")
        .addEventListener(
            "submit",
            submitRegistration
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
        $("registerWard")
            .value;


    const name =
        $("registerName")
            .value
            .trim();


    const phone =
        $("registerPhone")
            .value
            .trim();


    const bank =
        $("registerBank")
            .value
            .trim();


    const account =
        $("registerAccount")
            .value
            .trim();


    if (
        !ward ||
        !name ||
        !phone ||
        !bank ||
        !account
    ) {

        $("registerMessage")
            .innerHTML = `

                <div class="error">

                    Please complete
                    all fields.

                </div>

            `;

        return;
    }


    const registration = {

        id:
            Date.now(),

        ward:
            Number(ward),

        name,

        phone,

        bank,

        account,

        approved:
            false,

        createdAt:
            new Date()
                .toISOString()

    };


    registrations.push(
        registration
    );


    saveRegistrations();


    $("registerMessage")
        .innerHTML = `

            <div class="success-box">

                <strong>
                    Registration submitted successfully! ✅
                </strong>

                <br><br>

                Your information has been
                submitted for administrator
                review.

                <br><br>

                Your phone number, bank name
                and account number will not
                appear in the public directory.

            </div>

        `;


    $("registrationForm")
        .reset();
}


// ============================================================
// SEARCH PAGE
// ============================================================

function renderSearch() {

    const app =
        $("app");

    if (!app) return;


    const wardOptions =
        wards.map(
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
        )
        .join("");


    app.innerHTML = `

        <div class="card">

            <h2>
                🔎 Search Women
            </h2>

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

            <select
                id="searchWard"
            >

                <option value="">
                    All Wards
                </option>

                ${wardOptions}

            </select>

        </div>


        <div
            class="card"
            id="searchResults"
        >

            <h2>
                Search Results
            </h2>

            <p class="privacy small">
                Public results contain names
                and ward information only.
            </p>

        </div>

    `;


    $("womanSearch")
        .addEventListener(
            "input",
            searchWomen
        );


    $("searchWard")
        .addEventListener(
            "change",
            searchWomen
        );


    searchWomen();
}


// ============================================================
// SEARCH WOMEN
// ============================================================

function searchWomen() {

    const search =
        $("womanSearch");


    const wardSelect =
        $("searchWard");


    const resultBox =
        $("searchResults");


    if (
        !search ||
        !wardSelect ||
        !resultBox
    ) {
        return;
    }


    const query =
        search.value
            .trim()
            .toLowerCase();


    const selectedWard =
        wardSelect.value;


    const matches =
        women.filter(
            woman => {

                const name =
                    String(
                        woman.name
                    )
                    .toLowerCase();


                const nameMatch =
                    !query ||
                    name.includes(
                        query
                    );


                const wardMatch =
                    selectedWard === "" ||
                    String(
                        woman.ward
                    ) === selectedWard;


                return (
                    nameMatch &&
                    wardMatch
                );

            }
        );


    if (!matches.length) {

        resultBox.innerHTML = `

            <h2>
                Search Results
            </h2>

            <div class="notice">

                No public name matched
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


    matches.forEach(
        (woman, index) => {

            const ward =
                wards[
                    Number(
                        woman.ward
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
                            ward[0]
                        )}

                        –

                        ${escapeHTML(
                            ward[1]
                        )}

                    </div>

                </div>

            `;

        }
    );


    resultBox.innerHTML =
        html;
}


// ============================================================
// EXCO PAGE
// ============================================================

function renderExco() {

    const app =
        $("app");

    if (!app) return;


    app.innerHTML = `

        <div class="card">

            <h2>
                👥 Structured Ward Offices
            </h2>

            <p>
                Each of the 13 wards has
                8 structured offices.
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
        $("excoGrid");

    if (!grid) return;


    grid.innerHTML = "";


    wards.forEach(
        (ward, index) => {

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
                    View Offices →
                </button>

            `;


            card.addEventListener(
                "click",
                function () {

                    location.hash =
                        `ward-${index}`;

                }
            );


            grid.appendChild(
                card
            );

        }
    );
}


// ============================================================
// WARD DETAILS
// ============================================================

function renderWard(
    wardId
) {

    const app =
        $("app");


    const ward =
        wards[
            Number(wardId)
        ];


    if (!ward) {

        renderHome();

        return;
    }


    let officeHTML = "";


    offices.forEach(
        office => {

            const assigned =
                excoData.find(
                    item =>
                        Number(
                            item.ward
                        ) ===
                        Number(
                            wardId
                        ) &&
                        item.office ===
                        office
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
                            assigned
                                ? assigned.name
                                : "Not Assigned"
                        )}

                    </strong>

                </div>

            `;

        }
    );


    const wardWomen =
        women.filter(
            woman =>
                Number(
                    woman.ward
                ) ===
                Number(
                    wardId
                )
        );


    let womenHTML = "";


    if (!wardWomen.length) {

        womenHTML = `

            <div class="notice">

                No public names have been
                added to this ward yet.

            </div>

        `;

    }

    else {

        wardWomen.forEach(
            (woman, index) => {

                womenHTML += `

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
                WARD ${Number(wardId) + 1}
            </h2>

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

        </div>


        <div class="card">

            <h2>
                👥 Ward Leadership
            </h2>

            ${officeHTML}

        </div>


        <div class="card">

            <h2>
                👩 Registered Women
            </h2>

            <p class="small">

                Only public names are
                displayed here.

            </p>

            ${womenHTML}

        </div>

    `;
}


// ============================================================
// LOGIN
// ============================================================

function renderLogin() {

    const app =
        $("app");


    app.innerHTML = `

        <div class="card form-card">

            <img
                src="${LOGO_PATH}"
                class="logo"
                alt="Logo"
            >

            <h2>
                🔐 Administrator Login
            </h2>

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
                    required
                >


                <label>
                    Password
                </label>

                <input
                    id="adminPassword"
                    type="password"
                    required
                >


                <br><br>

                <button
                    type="submit"
                >
                    🔐 Login
                </button>

            </form>

        </div>

    `;


    $("loginForm")
        .addEventListener(
            "submit",
            adminLogin
        );
}


// ============================================================
// ADMIN LOGIN
// ============================================================

function adminLogin(
    event
) {

    event.preventDefault();


    const username =
        $("adminUsername")
            .value
            .trim();


    const password =
        $("adminPassword")
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


        location.hash =
            "admin";


        renderNavigation();

        return;
    }


    $("loginMessage")
        .innerHTML = `

            <div class="error">

                Incorrect login details.

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


    const app =
        $("app");


    const pending =
        registrations.filter(
            item =>
                !item.approved
        );


    const approved =
        registrations.filter(
            item =>
                item.approved
        );


    let rows = "";


    registrations.forEach(
        person => {

            const ward =
                wards[
                    Number(
                        person.ward
                    )
                ];


            rows += `

                <tr>

                    <td>
                        ${escapeHTML(
                            person.name
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            person.phone
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            person.bank
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            person.account
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            ward[0]
                        )}
                    </td>

                    <td>

                        ${
                            person.approved

                                ? "✅ Approved"

                                : "⏳ Pending"
                        }

                    </td>

                    <td>

                        <div class="actions">

                            ${
                                person.approved

                                    ? ""

                                    : `
                                        <button
                                            class="success"
                                            onclick="approveRegistration(${person.id})"
                                        >
                                            Approve
                                        </button>
                                      `
                            }


                            <button
                                onclick="editRegistration(${person.id})"
                            >
                                Edit
                            </button>


                            <button
                                class="danger"
                                onclick="deleteRegistration(${person.id})"
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }
    );


    if (!rows) {

        rows = `

            <tr>

                <td colspan="7">

                    No registrations yet.

                </td>

            </tr>

        `;
    }


    app.innerHTML = `

        <div class="hero">

            <img
                src="${LOGO_PATH}"
                class="logo"
                alt="Logo"
            >

            <h2>
                🔐 ADMIN DASHBOARD
            </h2>

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
                    ${registrations.length}
                </div>

                <div class="stat-label">
                    Total Registrations
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


            <div class="stat">

                <div class="stat-number">
                    ${approved.length}
                </div>

                <div class="stat-label">
                    Approved
                </div>

            </div>

        </div>


        <div class="card">

            <h2>
                👩 Registration Management
            </h2>

            <div class="notice">

                🔒 This information is private
                and visible only to administrators.

            </div>


            <div class="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Phone</th>
                            <th>Bank</th>
                            <th>Account</th>
                            <th>Ward</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${rows}

                    </tbody>

                </table>

            </div>

        </div>


        <div class="card">

            <h2>
                👥 Assign Ward EXCO
            </h2>

            <form
                id="excoForm"
            >

                <label>
                    Ward
                </label>

                <select
                    id="adminExcoWard"
                    required
                >

                    <option value="">
                        Select Ward
                    </option>

                    ${
                        wards.map(
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
                        ).join("")
                    }

                </select>


                <label>
                    Office
                </label>

                <select
                    id="adminExcoOffice"
                    required
                >

                    <option value="">
                        Select Office
                    </option>

                    ${
                        offices.map(
                            office => `

                                <option>
                                    ${escapeHTML(
                                        office
                                    )}
                                </option>

                            `
                        ).join("")
                    }

                </select>


                <label>
                    Name
                </label>

                <input
                    id="adminExcoName"
                    placeholder="EXCO member name"
                    required
                >


                <br><br>

                <button>
                    Save EXCO
                </button>

            </form>

        </div>

    `;


    $("excoForm")
        .addEventListener(
            "submit",
            saveExcoMember
        );
}


// ============================================================
// APPROVE REGISTRATION
// ============================================================

function approveRegistration(
    id
) {

    const registration =
        registrations.find(
            item =>
                Number(
                    item.id
                ) === Number(id)
        );


    if (!registration) return;


    registration.approved =
        true;


    // Add ONLY the public information
    // to the public directory.

    const alreadyExists =
        women.some(
            woman =>
                Number(
                    woman.sourceId
                ) === Number(id)
        );


    if (!alreadyExists) {

        women.push({

            sourceId:
                registration.id,

            name:
                registration.name,

            ward:
                registration.ward

        });

    }


    saveRegistrations();
    saveWomen();


    renderAdmin();
}


// ============================================================
// EDIT REGISTRATION
// ============================================================

function editRegistration(
    id
) {

    const registration =
        registrations.find(
            item =>
                Number(
                    item.id
                ) === Number(id)
        );


    if (!registration) return;


    const name =
        prompt(
            "Name:",
            registration.name
        );


    if (name === null) return;


    const phone =
        prompt(
            "Phone number:",
            registration.phone
        );


    if (phone === null) return;


    const bank =
        prompt(
            "Bank name:",
            registration.bank
        );


    if (bank === null) return;


    const account =
        prompt(
            "Account number:",
            registration.account
        );


    if (account === null) return;


    registration.name =
        name.trim();


    registration.phone =
        phone.trim();


    registration.bank =
        bank.trim();


    registration.account =
        account.trim();


    const publicWoman =
        women.find(
            woman =>
                Number(
                    woman.sourceId
                ) === Number(id)
        );


    if (publicWoman) {

        publicWoman.name =
            registration.name;

    }


    saveRegistrations();
    saveWomen();


    renderAdmin();
}


// ============================================================
// DELETE REGISTRATION
// ============================================================

function deleteRegistration(
    id
) {

    if (
        !confirm(
            "Delete this registration?"
        )
    ) {
        return;
    }


    registrations =
        registrations.filter(
            item =>
                Number(
                    item.id
                ) !== Number(id)
        );


    women =
        women.filter(
            woman =>
                Number(
                    woman.sourceId
                ) !== Number(id)
        );


    saveRegistrations();
    saveWomen();


    renderAdmin();
}


// ============================================================
// SAVE EXCO
// ============================================================

function saveExcoMember(
    event
) {

    event.preventDefault();


    const ward =
        Number(
            $("adminExcoWard")
                .value
        );


    const office =
        $("adminExcoOffice")
            .value;


    const name =
        $("adminExcoName")
            .value
            .trim();


    if (
        Number.isNaN(ward) ||
        !office ||
        !name
    ) {

        alert(
            "Please complete all EXCO fields."
        );

        return;
    }


    const existing =
        excoData.find(
            item =>
                Number(
                    item.ward
                ) === ward &&
                item.office === office
        );


    if (existing) {

        existing.name =
            name;

    }

    else {

        excoData.push({

            id:
                Date.now(),

            ward,

            office,

            name

        });

    }


    saveExco();


    renderAdmin();
}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    sessionStorage.removeItem(
        "ekiti_admin"
    );


    renderNavigation();


    location.hash =
        "home";
}


// ============================================================
// SETTINGS PAGE
// ============================================================

function renderSettings() {

    const app =
        $("app");


    const currentTheme =
        localStorage.getItem(
            "ekiti_theme"
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
                id="themeSetting"
            >

                <option
                    value="system"
                    ${
                        currentTheme === "system"
                            ? "selected"
                            : ""
                    }
                >
                    System
                </option>

                <option
                    value="light"
                    ${
                        currentTheme === "light"
                            ? "selected"
                            : ""
                    }
                >
                    Light
                </option>

                <option
                    value="dark"
                    ${
                        currentTheme === "dark"
                            ? "selected"
                            : ""
                    }
                >
                    Dark
                </option>

            </select>


            <br><br>

            <button
                onclick="
                    changeTheme(
                        document
                            .getElementById('themeSetting')
                            .value
                    )
                "
            >
                Save Appearance
            </button>


            <hr>


            <h2>
                🤖 AI Assistant
            </h2>

            <label>
                Ollama URL
            </label>

            <input
                id="ollamaURL"
                value="${
                    escapeHTML(
                        localStorage.getItem(
                            "ollama_url"
                        ) ||
                        "http://localhost:11434"
                    )
                }"
            >


            <label>
                Ollama Model
            </label>

            <input
                id="ollamaModel"
                value="${
                    escapeHTML(
                        localStorage.getItem(
                            "ollama_model"
                        ) ||
                        "qwen2.5-coder:7b"
                    )
                }"
            >


            <br><br>

            <button
                onclick="saveAISettings()"
            >
                💾 Save AI Settings
            </button>


            <button
                class="secondary"
                onclick="testAIConnection()"
            >
                🔌 Test AI Connection
            </button>


            <div
                id="aiConnectionResult"
            ></div>

        </div>

    `;
}


// ============================================================
// SAVE AI SETTINGS
// ============================================================

function saveAISettings() {

    localStorage.setItem(
        "ollama_url",
        $("ollamaURL").value.trim()
    );


    localStorage.setItem(
        "ollama_model",
        $("ollamaModel").value.trim()
    );


    const result =
        $("aiConnectionResult");


    result.innerHTML = `

        <div class="success-box">

            AI settings saved successfully.

        </div>

    `;
}


// ============================================================
// TEST OLLAMA CONNECTION
// ============================================================

async function testAIConnection() {

    const result =
        $("aiConnectionResult");


    if (!result) {

        alert(
            "Open Settings first."
        );

        return;
    }


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


    result.innerHTML = `

        <div class="notice">

            🔄 Testing Ollama connection...

        </div>

    `;


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


        const found =
            data.models &&
            data.models.some(
                item =>
                    item.name === model
            );


        result.innerHTML = `

            <div class="success-box">

                🟢 Ollama is connected.

                <br><br>

                Model:

                <strong>
                    ${escapeHTML(
                        model
                    )}
                </strong>

                <br><br>

                ${
                    found

                        ? "Model found on this computer. ✅"

                        : "Ollama is running, but the selected model was not found. ⚠️"
                }

            </div>

        `;

    }

    catch (error) {

        result.innerHTML = `

            <div class="error">

                🔴 Could not connect to Ollama.

                <br><br>

                ${escapeHTML(
                    error.message
                )}

                <br><br>

                Make sure Ollama is running
                on the computer.

            </div>

        `;

    }
}


// ============================================================
// AI CHAT
// ============================================================

async function askAI(
    prompt
) {

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


    return data.response ||
        "No response received.";
}


// ============================================================
// ROUTER
// ============================================================

function router() {

    renderNavigation();


    const route =
        location.hash
            .replace(
                "#",
                ""
            )
            .trim();


    if (
        !route ||
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
        route === "login"
    ) {

        renderLogin();

    }

    else if (
        route === "admin"
    ) {

        renderAdmin();

    }

    else if (
        route === "settings"
    ) {

        renderSettings();

    }

    else if (
        route.startsWith(
            "ward-"
        )
    ) {

        const id =
            Number(
                route.replace(
                    "ward-",
                    ""
                )
            );


        renderWard(id);

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
// INITIALIZE
// ============================================================

loadTheme();


window.addEventListener(
    "hashchange",
    router
);


window.addEventListener(
    "DOMContentLoaded",
    router
);
```
