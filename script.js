// ==========================================
// EKITI STATE WOMEN OF INFLUENCE - ADO LG
// ==========================================


// ==========================================
// 13 WARDS
// ==========================================

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


// ==========================================
// STRUCTURED WARD OFFICES
// ==========================================

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


// ==========================================
// WOMEN DIRECTORY
// ==========================================
//
// Add PUBLIC names here later.
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
// ward 0 = Ado A
// ward 1 = Ado B
// ward 2 = Ado C
//
// DO NOT put phone numbers,
// bank names or account numbers here.
//

const women = [];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

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


// ==========================================
// DISPLAY THE 13 WARDS
// ==========================================

function displayWards(filter = "") {

    wardGrid.innerHTML = "";

    wards.forEach((ward, index) => {

        const wardName =
            ward[0];

        const area =
            ward[1];

        const searchText =
            `${wardName} ${area}`
                .toLowerCase();

        // Filter wards
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


        // Open ward details
        card.addEventListener(
            "click",
            function () {
                openWard(index);
            }
        );


        wardGrid.appendChild(card);

    });
}


// ==========================================
// CREATE WARD SELECT OPTIONS
// ==========================================

function populateWardSelect() {

    wards.forEach(
        (ward, index) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                index;

            option.textContent =
                `${ward[0]} – ${ward[1]}`;

            wardSelect.appendChild(
                option
            );

        }
    );
}


// ==========================================
// DISPLAY EXCO
// ==========================================

function displayExco() {

    excoGrid.innerHTML = "";

    wards.forEach(
        (ward, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "exco-card";


            card.innerHTML = `

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


            excoGrid.appendChild(card);

        }
    );
}


// ==========================================
// OPEN WARD DETAILS
// ==========================================

function openWard(index) {

    const ward =
        wards[index];

    const wardName =
        ward[0];

    const area =
        ward[1];


    let html = `

        <small>
            WARD ${index + 1}
        </small>

        <h2>
            ${escapeHTML(wardName)}
            –
            ${escapeHTML(area)}
        </h2>

        <p class="privacy">
            Structured ward offices
        </p>

    `;


    // Add all 8 offices

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


    modalBody.innerHTML =
        html;


    modal.classList.add(
        "show"
    );

}


// ==========================================
// SEARCH WOMEN
// ==========================================

function searchWomen() {

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
                    name.includes(query);


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


    // No results

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


    // Display results

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


                    return `

                        <div class="result">

                            <strong>
                                ${escapeHTML(
                                    woman.name
                                )}
                            </strong>

                            <br>

                            <span>

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


// ==========================================
// SECURITY:
// PREVENT HTML IN USER NAMES
// ==========================================

function escapeHTML(value) {

    return String(value)
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

                return characters[
                    character
                ];

            }
        );

}


// ==========================================
// CLOSE MODAL
// ==========================================

closeModal.addEventListener(
    "click",
    function () {

        modal.classList.remove(
            "show"
        );

    }
);


// ==========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==========================================

modal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === modal
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


// ==========================================
// CLOSE WITH ESCAPE KEY
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


// ==========================================
// WARD SEARCH
// ==========================================

wardSearch.addEventListener(
    "input",
    function (event) {

        displayWards(
            event.target.value
        );

    }
);


// ==========================================
// WOMEN SEARCH
// ==========================================

womanSearch.addEventListener(
    "input",
    function () {

        searchWomen();

    }
);


// ==========================================
// FILTER WOMEN BY WARD
// ==========================================

wardSelect.addEventListener(
    "change",
    function () {

        searchWomen();

    }
);


// ==========================================
// START WEBSITE
// ==========================================

displayWards();

populateWardSelect();

displayExco();

searchWomen();
