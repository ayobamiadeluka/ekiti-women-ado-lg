```javascript
// ============================================================
// EKITI STATE WOMEN OF INFLUENCE - ADO LG
// STATIC WEBSITE
// ============================================================


// ============================================================
// SITE INFORMATION
// ============================================================

const SITE_NAME =
    "EKITI STATE WOMEN OF INFLUENCE";

const SITE_LOCATION =
    "ADO LG";


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
//
// ONLY PUBLIC NAMES SHOULD BE STORED HERE.
//
// DO NOT PUT:
// - Phone numbers
// - Bank names
// - Account numbers
//
// Example:
//
// const publicWomen = [
//     {
//         name: "Example Name",
//         ward: 0
//     }
// ];
// ============================================================

const publicWomen = [];


// ============================================================
// LOCAL STORAGE
// ============================================================

function getRegistrations() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "ekiti_women_registrations"
            ) || "[]"
        );

    } catch (error) {

        return [];

    }

}


function saveRegistrations(data) {

    localStorage.setItem(
        "ekiti_women_registrations",
        JSON.stringify(data)
    );

}


// ============================================================
// ELEMENTS
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

const closeModal =
    document.getElementById("closeModal");


// ============================================================
// SECURITY HELPER
// ============================================================

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /[&<>"']/g,
            function(character) {

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
// THEME
// ============================================================

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "ekiti_theme"
        ) || "system";


    applyTheme(savedTheme);

}


function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark"
        );

    }

    else if (theme === "light") {

        document.body.classList.remove(
            "dark"
        );

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

}


function changeTheme(theme) {

    localStorage.setItem(
        "ekiti_theme",
        theme
    );

    applyTheme(theme);

}


// ============================================================
// NAVIGATION
// ============================================================

function closeMobileMenu() {

    navigation.classList.remove(
        "open"
    );

}


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function() {

            navigation.classList.toggle(
                "open"
            );

        }
    );

}


navigation.addEventListener(
    "click",
    function(event) {

        if (
            event.target.tagName === "A"
        ) {

            closeMobileMenu();

        }

    }
);


// ============================================================
// HOME
// ============================================================

function renderHome() {

    const registrations =
        getRegistrations();


    const approved =
        registrations.filter(
            woman =>
                woman.approved === true
        );


    let wardCards = "";


    wards.forEach(
        function(ward, index) {

            const count =
                publicWomen.filter(
                    woman =>
                        Number(woman.ward) ===
                        index
                ).length;


            wardCards += `

                <div
                    class="card ward-card"
                    onclick="openWard(${index})"
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
                        Public Names
                    </p>

                </div>

            `;

        }
    );


    app.innerHTML = `

        <section class="hero">

            <img
                src="static/logo.jpeg"
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
                Ward Information and
                EXCO Directory
            </p>

            <br>

            <a
                href="#register"
                class="button"
            >
                📝 Register
            </a>

            <a
                href="#search"
                class="button secondary"
            >
                🔎 Search
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
                    ${approved.length}
                </div>

                <div class="stat-label">
                    Registered
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
                    Ward Offices
                </div>

            </div>


            <div class="stat">

                <div class="stat-icon">
                    📍
                </div>

                <div class="stat-number">
                    ADO
                </div>

                <div class="stat-label">
                    LG
                </div>

            </div>

        </div>


        <div class="card">

            <h2>
                📝 Register as a Woman
            </h2>

            <p>
                Submit your details for registration.
            </p>

            <a
                href="#register"
                class="button"
            >
                Register Now →
            </a>

        </div>


        <h2>
            🏘️ Ado LG Wards
        </h2>

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
        wards.map(
            function(ward, index) {

                return `

                    <option value="${index}">

                        Ward ${index + 1} —
                        ${escapeHTML(ward[0])}
                        —
                        ${escapeHTML(ward[1])}

                    </option>

                `;

            }
        )
        .join("");


    app.innerHTML = `

        <div class="card form-card">

            <img
                src="static/logo.jpeg"
                class="logo"
                alt="Logo"
            >

            <h2>
                EKITI STATE WOMEN OF INFLUENCE
            </h2>

            <h3>
                ADO LG
            </h3>

            <div id="registerMessage"></div>

            <form id="registerForm">

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

                    ${wardOptions}

                </select>


                <label for="registerName">
                    Name
                </label>

                <input
                    id="registerName"
                    type="text"
                    placeholder="Full name"
                    autocomplete="name"
                    required
                >


                <label for="registerPhone">
                    Phone No
                </label>

                <input
                    id="registerPhone"
                    type="tel"
                    placeholder="Phone number"
                    autocomplete="tel"
                    required
                >


                <label for="registerBank">
                    Bank Name
                </label>

                <input
                    id="registerBank"
                    type="text"
                    placeholder="Bank name"
                    required
                >


                <label for="registerAccount">
                    Account No
                </label>

                <input
                    id="registerAccount"
                    type="text"
                    inputmode="numeric"
                    placeholder="Account number"
                    required
                >


                <button
                    type="submit"
                >
                    📝 Submit Registration
                </button>

            </form>

        </div>

    `;


    document
        .getElementById("registerForm")
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


    if (
        ward === "" ||
        !name ||
        !phone ||
        !bank ||
        !account
    ) {

        document.getElementById(
            "registerMessage"
        ).innerHTML = `

            <div class="error">

                Please complete all fields.

            </div>

        `;

        return;

    }


    const registrations =
        getRegistrations();


    registrations.push({

        id:
            Date.now(),

        ward:
            Number(ward),

        name,

        phone,

        bankName:
            bank,

        accountNo:
            account,

        approved:
            false,

        createdAt:
            new Date().toISOString()

    });


    saveRegistrations(
        registrations
    );


    document.getElementById(
        "registerMessage"
    ).innerHTML = `

        <div class="success-box">

            <strong>
                Registration submitted successfully! ✅
            </strong>

            <br><br>

            Your registration has been received
            and is awaiting approval.

        </div>

    `;


    document
        .getElementById(
            "registerForm"
        )
        .reset();

}


// ============================================================
// SEARCH PAGE
// ============================================================

function renderSearch() {

    const wardOptions =
        wards.map(
            function(ward, index) {

                return `

                    <option value="${index}">

                        ${escapeHTML(ward[0])}
                        —
                        ${escapeHTML(ward[1])}

                    </option>

                `;

            }
        )
        .join("");


    app.innerHTML = `

        <div class="card">

            <h2>
                🔎 Search Registered Women
            </h2>

            <p class="privacy">

                Only publicly approved names are
                displayed here.

            </p>

            <label>
                Woman's Name
            </label>

            <input
                id="womanSearch"
                placeholder="Enter name..."
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

            <p class="privacy">
                Enter a name or select a ward.
            </p>

        </div>

    `;


    const searchInput =
        document.getElementById(
            "womanSearch"
        );

    const select =
        document.getElementById(
            "wardSelect"
        );


    searchInput.addEventListener(
        "input",
        searchWomen
    );

    select.addEventListener(
        "change",
        searchWomen
    );


    searchWomen();

}


// ============================================================
// SEARCH WOMEN
// ============================================================

function searchWomen() {

    const searchInput =
        document.getElementById(
            "womanSearch"
        );

    const wardSelect =
        document.getElementById(
            "wardSelect"
        );

    const results =
        document.getElementById(
            "results"
        );


    if (
        !searchInput ||
        !wardSelect ||
        !results
    ) {

        return;

    }


    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedWard =
        wardSelect.value;


    const matches =
        publicWomen.filter(
            function(woman) {

                const name =
                    String(
                        woman.name
                    ).toLowerCase();


                const nameMatches =
                    !query ||
                    name.includes(query);


                const wardMatches =
                    selectedWard === "" ||
                    String(
                        woman.ward
                    ) ===
                    selectedWard;


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

            <h2>
                Search Results
            </h2>

            <p class="privacy">

                No public names have been
                added or no matching name
                was found.

            </p>

        `;

        return;

    }


    results.innerHTML = `

        <h2>
            Search Results
        </h2>

        ${matches
            .map(
                function(woman, index) {

                    const ward =
                        wards[
                            Number(
                                woman.ward
                            )
                        ];


                    return `

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

                                —
                                ${escapeHTML(
                                    ward[1]
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

    let cards = "";


    wards.forEach(
        function(ward, index) {

            cards += `

                <div
                    class="exco-card"
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

        <div class="hero">

            <img
                src="static/logo.jpeg"
                class="logo"
                alt="Logo"
            >

            <h2>
                👥 Ward EXCO
            </h2>

            <p>
                Structured offices for
                all Ado LG wards
            </p>

        </div>


        <div class="card">

            <h2>
                Structured Ward Offices
            </h2>

            <p class="privacy">

                Each ward has eight structured offices.

                Click a ward to view them.

            </p>

        </div>


        <div class="grid">

            ${cards}

        </div>

    `;

}


// ============================================================
// WARD DETAILS
// ============================================================

function openWard(index) {

    const ward =
        wards[index];


    if (!ward) {

        return;

    }


    let html = `

        <small>
            WARD ${index + 1}
        </small>

        <h2>

            ${escapeHTML(
                ward[0]
            )}

            —

            ${escapeHTML(
                ward[1]
            )}

        </h2>

        <p class="privacy">

            Structured ward offices

        </p>

    `;


    offices.forEach(
        function(office) {

            html += `

                <div class="office">

                    <strong>

                        ${escapeHTML(
                            office
                        )}

                    </strong>

                    <span>
                        Not Assigned
                    </span>

                </div>

            `;

        }
    );


    modalBody.innerHTML =
        html;


    modal.classList.remove(
        "hidden"
    );

}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeWardModal() {

    modal.classList.add(
        "hidden"
    );

}


closeModal.addEventListener(
    "click",
    closeWardModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeWardModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeWardModal();

        }

    }
);


// ============================================================
// SETTINGS
// ============================================================

function renderSettings() {

    const savedTheme =
        localStorage.getItem(
            "ekiti_theme"
        ) || "system";


    app.innerHTML = `

        <div class="card form-card">

            <h2>
                ⚙️ Settings
            </h2>

            <div class="settings-row">

                <div>

                    <strong>
                        Appearance
                    </strong>

                    <p class="privacy">
                        Choose the website theme.
                    </p>

                </div>

                <select id="themeSelect">

                    <option
                        value="system"
                        ${savedTheme === "system" ? "selected" : ""}
                    >
                        System
                    </option>

                    <option
                        value="light"
                        ${savedTheme === "light" ? "selected" : ""}
                    >
                        Light
                    </option>

                    <option
                        value="dark"
                        ${savedTheme === "dark" ? "selected" : ""}
                    >
                        Dark
                    </option>

                </select>

            </div>

        </div>

    `;


    document
        .getElementById(
            "themeSelect"
        )
        .addEventListener(
            "change",
            function(event) {

                changeTheme(
                    event.target.value
                );

            }
        );

}


// ============================================================
// ROUTER
// ============================================================

function router() {

    closeMobileMenu();


    let route =
        location.hash
            .replace("#", "")
            .trim()
            .toLowerCase();


    if (!route) {

        route = "home";

    }


    if (
        route === "home"
    ) {

        renderHome();

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


        renderHome();

        setTimeout(
            function() {

                openWard(id);

            },
            0
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
// START WEBSITE
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
