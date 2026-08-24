from flask import Flask, request, redirect, url_for, session
import sqlite3
from functools import wraps
from html import escape
from datetime import datetime

app = Flask(__name__)

app.secret_key = "CHANGE_THIS_SECRET_KEY"

DATABASE = "ekiti_women.db"

SITE_NAME = "EKITI STATE WOMEN OF INFLUENCE"
SITE_LOCATION = "ADO LG"

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"


# ============================================================
# WARDS
# ============================================================

WARDS = [
    ("Ado 'A'", "Idofin"),
    ("Ado 'B'", "Inisa"),
    ("Ado 'C'", "Idolofin"),
    ("Ado 'D'", "Ijigbo"),
    ("Ado 'E'", "Ijoka / Orereowu"),
    ("Ado 'F'", "Okeyinmi"),
    ("Ado 'G'", "Oke Ila"),
    ("Ado 'H'", "Ereguru"),
    ("Ado 'I'", "Dallimore"),
    ("Ado 'J'", "Okesa"),
    ("Ado 'K'", "Irona"),
    ("Ado 'L'", "Igbehin"),
    ("Ado 'M'", "Farm Settlement"),
]


# ============================================================
# EXCO POSITIONS
# ============================================================

EXCO_POSITIONS = [
    "Ward Coordinator",
    "Deputy Ward Coordinator",
    "Secretary",
    "Mobilization Officer",
    "Women Empowerment Officer",
    "Media/Publicity Officer",
    "Welfare Officer",
    "Polling Unit Officer",
]


# ============================================================
# DATABASE
# ============================================================

def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db


def create_database():

    db = get_db()

    db.execute("""
        CREATE TABLE IF NOT EXISTS wards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            area TEXT NOT NULL
        )
    """)

    db.execute("""
        CREATE TABLE IF NOT EXISTS women (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            bank_name TEXT NOT NULL,
            account_no TEXT NOT NULL,
            ward_id INTEGER NOT NULL,
            approved INTEGER DEFAULT 0,
            created_at TEXT NOT NULL,
            FOREIGN KEY (ward_id)
                REFERENCES wards(id)
        )
    """)

    db.execute("""
        CREATE TABLE IF NOT EXISTS excos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position TEXT NOT NULL,
            ward_id INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (ward_id)
                REFERENCES wards(id),

            UNIQUE (ward_id, position)
        )
    """)

    for ward_name, area in WARDS:

        db.execute("""
            INSERT OR IGNORE INTO wards
            (name, area)
            VALUES (?, ?)
        """, (
            ward_name,
            area
        ))

    db.commit()

    # Make sure every ward has all 8 EXCO offices.

    wards = db.execute("""
        SELECT id
        FROM wards
        ORDER BY id
    """).fetchall()

    for ward in wards:

        for position in EXCO_POSITIONS:

            existing = db.execute("""
                SELECT id
                FROM excos

                WHERE ward_id = ?
                AND position = ?
            """, (
                ward["id"],
                position
            )).fetchone()

            if existing is None:

                db.execute("""
                    INSERT INTO excos
                    (
                        name,
                        position,
                        ward_id,
                        created_at
                    )

                    VALUES (?, ?, ?, ?)
                """, (
                    "Not Assigned",
                    position,
                    ward["id"],
                    datetime.now().strftime(
                        "%Y-%m-%d %H:%M:%S"
                    )
                ))

    db.commit()
    db.close()


# ============================================================
# ADMIN
# ============================================================

def admin_required(function):

    @wraps(function)
    def wrapper(*args, **kwargs):

        if not session.get("admin"):
            return redirect(
                url_for("login")
            )

        return function(*args, **kwargs)

    return wrapper


# ============================================================
# PAGE TEMPLATE
# ============================================================

def page(title, content):

    return f"""
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>
    {escape(title)}
    |
    {SITE_NAME}
</title>

<style>

* {{
    box-sizing: border-box;
}}

body {{
    margin: 0;

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    background:
        #f6f7fb;

    color:
        #222;
}}

header {{
    background:
        linear-gradient(
            135deg,
            #7b1fa2,
            #9c27b0
        );

    color:
        white;

    padding:
        25px 15px;

    text-align:
        center;
}}

.logo {{
    width:
        100px;

    height:
        100px;

    object-fit:
        contain;

    background:
        white;

    padding:
        5px;

    border-radius:
        50%;

    display:
        block;

    margin:
        auto;
}}

header h1 {{
    margin:
        12px 0 5px;

    font-size:
        27px;
}}

nav {{
    margin-top:
        18px;
}}

nav a {{
    color:
        white;

    text-decoration:
        none;

    font-weight:
        bold;

    margin:
        5px 8px;

    display:
        inline-block;
}}

.container {{
    width:
        94%;

    max-width:
        1250px;

    margin:
        auto;

    padding:
        30px 0;
}}

.hero {{
    background:
        white;

    padding:
        30px;

    border-radius:
        18px;

    text-align:
        center;

    margin-bottom:
        25px;

    box-shadow:
        0 5px 20px
        rgba(0,0,0,0.07);
}}

.hero h2 {{
    color:
        #7b1fa2;
}}

.grid {{
    display:
        grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(220px, 1fr)
        );

    gap:
        20px;
}}

.card {{
    background:
        white;

    padding:
        24px;

    border-radius:
        16px;

    box-shadow:
        0 5px 20px
        rgba(0,0,0,0.06);

    margin-bottom:
        22px;
}}

.ward-card {{
    transition:
        transform 0.2s,
        box-shadow 0.2s;

    text-align:
        center;
}}

.ward-card:hover {{
    transform:
        translateY(-5px);

    box-shadow:
        0 10px 25px
        rgba(0,0,0,0.10);
}}

.ward-card a {{
    text-decoration:
        none;

    color:
        inherit;
}}

.ward-card h2 {{
    color:
        #7b1fa2;
}}

.ward-number {{
    width:
        55px;

    height:
        55px;

    border-radius:
        50%;

    background:
        #7b1fa2;

    color:
        white;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    margin:
        auto;

    font-size:
        20px;

    font-weight:
        bold;
}}

.stats {{
    display:
        grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(180px, 1fr)
        );

    gap:
        18px;

    margin-bottom:
        28px;
}}

.stat {{
    background:
        white;

    border-radius:
        15px;

    padding:
        23px;

    text-align:
        center;

    box-shadow:
        0 5px 18px
        rgba(0,0,0,0.06);
}}

.stat-icon {{
    font-size:
        30px;
}}

.stat-number {{
    color:
        #7b1fa2;

    font-size:
        34px;

    font-weight:
        bold;

    margin:
        5px;
}}

.stat-label {{
    color:
        #666;
}}

.button,
button {{
    border:
        none;

    background:
        #7b1fa2;

    color:
        white;

    padding:
        11px 17px;

    border-radius:
        8px;

    text-decoration:
        none;

    font-weight:
        bold;

    cursor:
        pointer;

    display:
        inline-block;
}}

.button:hover,
button:hover {{
    background:
        #5e1680;
}}

.success {{
    background:
        #2e7d32;
}}

.danger {{
    background:
        #c62828;
}}

.secondary {{
    background:
        #555;
}}

.search-box {{
    display:
        flex;

    gap:
        10px;

    flex-wrap:
        wrap;
}}

.search-box input {{
    flex:
        1;

    min-width:
        200px;
}}

input,
select {{
    width:
        100%;

    padding:
        13px;

    border:
        1px solid #ccc;

    border-radius:
        8px;

    font-size:
        16px;

    margin:
        7px 0 15px;
}}

label {{
    font-weight:
        bold;
}}

.form-card {{
    max-width:
        650px;

    margin:
        0 auto 25px;
}}

.exco {{
    padding:
        16px 0;

    border-bottom:
        1px solid #eee;
}}

.exco-position {{
    color:
        #7b1fa2;

    font-weight:
        bold;

    margin-bottom:
        5px;
}}

.table-container {{
    overflow-x:
        auto;
}}

table {{
    width:
        100%;

    border-collapse:
        collapse;

    min-width:
        850px;
}}

th,
td {{
    padding:
        12px;

    border-bottom:
        1px solid #ddd;

    text-align:
        left;
}}

th {{
    background:
        #7b1fa2;

    color:
        white;
}}

.notice {{
    background:
        #e3f2fd;

    padding:
        15px;

    border-radius:
        8px;

    margin:
        15px 0;
}}

.error {{
    background:
        #ffebee;

    color:
        #b71c1c;

    padding:
        15px;

    border-radius:
        8px;

    margin:
        15px 0;
}}

.result {{
    padding:
        18px 0;

    border-bottom:
        1px solid #eee;
}}

.result-name {{
    font-size:
        18px;

    font-weight:
        bold;

    color:
        #7b1fa2;
}}

footer {{
    background:
        #222;

    color:
        white;

    text-align:
        center;

    padding:
        25px;

    margin-top:
        30px;
}}

.small {{
    color:
        #666;

    font-size:
        14px;
}}

@media(max-width:600px) {{

    header h1 {{
        font-size:
            21px;
    }}

    .logo {{
        width:
            80px;

        height:
            80px;
    }}

    .container {{
        width:
            96%;
    }}

    .hero,
    .card {{
        padding:
            19px;
    }}

    .search-box {{
        display:
            block;
    }}

    .search-box input,
    .search-box button {{
        width:
            100%;

        margin-bottom:
            10px;
    }}

}}

</style>

</head>

<body>

<header>

<img
    src="/static/logo.jpeg"
    class="logo"
    alt="Logo"
>

<h1>
    {SITE_NAME}
</h1>

<p>
    {SITE_LOCATION}
</p>

<nav>

<a href="/">
    🏠 Home
</a>

<a href="/register">
    📝 Register
</a>

<a href="/search">
    🔎 Search
</a>

<a href="/admin">
    🔐 Admin
</a>

</nav>

</header>

<main class="container">

{content}

</main>

<footer>

<strong>
    {SITE_NAME}
</strong>

<br>

{SITE_LOCATION}

<br><br>

© 2026

</footer>

</body>

</html>
"""


# ============================================================
# HOME / DASHBOARD
# ============================================================

@app.route("/")
def home():

    db = get_db()

    total_women = db.execute("""
        SELECT COUNT(*)
        FROM women
    """).fetchone()[0]

    approved_women = db.execute("""
        SELECT COUNT(*)
        FROM women
        WHERE approved = 1
    """).fetchone()[0]

    pending_women = db.execute("""
        SELECT COUNT(*)
        FROM women
        WHERE approved = 0
    """).fetchone()[0]

    total_exco = db.execute("""
        SELECT COUNT(*)
        FROM excos
        WHERE name != 'Not Assigned'
    """).fetchone()[0]

    wards = db.execute("""
        SELECT
            wards.*,

            COUNT(
                CASE
                    WHEN women.approved = 1
                    THEN women.id
                END
            ) AS women_count

        FROM wards

        LEFT JOIN women
            ON women.ward_id = wards.id

        GROUP BY wards.id

        ORDER BY wards.id
    """).fetchall()

    db.close()

    # --------------------------------------------------------
    # STATISTICS
    # --------------------------------------------------------

    stats = f"""

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
                {total_women}
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
                {approved_women}
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
                {total_exco}
            </div>

            <div class="stat-label">
                EXCO Members
            </div>

        </div>

    </div>

    """

    # --------------------------------------------------------
    # WARD CARDS
    # --------------------------------------------------------

    ward_cards = ""

    for index, ward in enumerate(
        wards,
        start=1
    ):

        ward_cards += f"""

        <div class="card ward-card">

            <a href="/ward/{ward['id']}">

                <div class="ward-number">
                    {index}
                </div>

                <h2>
                    {escape(ward['name'])}
                </h2>

                <p>
                    {escape(ward['area'])}
                </p>

                <strong>
                    {ward['women_count']}
                </strong>

                <p class="small">
                    Approved Women
                </p>

            </a>

        </div>

        """

    # --------------------------------------------------------
    # HOME PAGE
    # --------------------------------------------------------

    content = f"""

    <div class="hero">

        <img
            src="/static/logo.jpeg"
            class="logo"
            alt="Logo"
        >

        <h2>
            {SITE_NAME}
        </h2>

        <h3>
            {SITE_LOCATION}
        </h3>

        <p>
            Women Registration,
            Ward Information &
            EXCO Management Portal
        </p>

        <br>

        <a
            href="/register"
            class="button"
        >
            📝 Register a Woman
        </a>

        &nbsp;

        <a
            href="/search"
            class="button secondary"
        >
            🔎 Search
        </a>

    </div>


    {stats}


    <div class="card">

        <h2>
            🔎 Find a Registered Woman
        </h2>

        <form
            method="GET"
            action="/search"
            class="search-box"
        >

            <input
                name="q"
                placeholder="Enter woman's name"
                required
            >

            <button>
                Search
            </button>

        </form>

    </div>


    <h2>
        🏘️ Ado LG Wards
    </h2>

    <div class="grid">

        {ward_cards}

    </div>

    """

    return page(
        "Dashboard",
        content
    )


# ============================================================
# REGISTER
# ============================================================

@app.route(
    "/register",
    methods=["GET", "POST"]
)
def register():

    db = get_db()

    wards = db.execute("""
        SELECT *
        FROM wards
        ORDER BY id
    """).fetchall()

    message = ""

    if request.method == "POST":

        name = request.form.get(
            "name",
            ""
        ).strip()

        phone = request.form.get(
            "phone",
            ""
        ).strip()

        bank_name = request.form.get(
            "bank_name",
            ""
        ).strip()

        account_no = request.form.get(
            "account_no",
            ""
        ).strip()

        ward_id = request.form.get(
            "ward_id",
            ""
        ).strip()

        if not all([
            name,
            phone,
            bank_name,
            account_no,
            ward_id
        ]):

            message = """
            <div class="error">
                Please complete every field.
            </div>
            """

        else:

            db.execute("""
                INSERT INTO women
                (
                    name,
                    phone,
                    bank_name,
                    account_no,
                    ward_id,
                    approved,
                    created_at
                )

                VALUES (?, ?, ?, ?, ?, 0, ?)
            """, (
                name,
                phone,
                bank_name,
                account_no,
                ward_id,
                datetime.now().strftime(
                    "%Y-%m-%d %H:%M:%S"
                )
            ))

            db.commit()

            message = """
            <div class="notice">

                Registration submitted successfully.

                <br><br>

                Your registration is now waiting
                for administrator approval.

            </div>
            """

    db.close()

    options = ""

    for ward in wards:

        options += f"""
        <option value="{ward['id']}">

            {escape(ward['name'])}
            –
            {escape(ward['area'])}

        </option>
        """

    content = f"""

    <div class="card form-card">

        <img
            src="/static/logo.jpeg"
            class="logo"
            alt="Logo"
        >

        <h2>
            📝 Woman Registration
        </h2>

        {message}

        <form method="POST">

            <label>
                Ward
            </label>

            <select
                name="ward_id"
                required
            >

                <option value="">
                    Select Ward
                </option>

                {options}

            </select>


            <label>
                Name
            </label>

            <input
                name="name"
                placeholder="Full name"
                required
            >


            <label>
                Phone No
            </label>

            <input
                name="phone"
                placeholder="Phone number"
                required
            >


            <label>
                Bank Name
            </label>

            <input
                name="bank_name"
                placeholder="Bank name"
                required
            >


            <label>
                Account No
            </label>

            <input
                name="account_no"
                placeholder="Account number"
                required
            >


            <button>
                Submit Registration
            </button>

        </form>

    </div>

    """

    return page(
        "Register",
        content
    )


# ============================================================
# SEARCH
# ============================================================

@app.route("/search")
def search():

    query = request.args.get(
        "q",
        ""
    ).strip()

    ward_filter = request.args.get(
        "ward",
        "all"
    )

    db = get_db()

    wards = db.execute("""
        SELECT *
        FROM wards
        ORDER BY id
    """).fetchall()

    results = []

    if query or ward_filter != "all":

        sql = """
            SELECT
                women.name,
                wards.id AS ward_id,
                wards.name AS ward_name,
                wards.area

            FROM women

            JOIN wards
                ON women.ward_id = wards.id

            WHERE women.approved = 1
        """

        parameters = []

        if query:

            sql += """
                AND women.name LIKE ?
            """

            parameters.append(
                f"%{query}%"
            )

        if ward_filter != "all":

            sql += """
                AND women.ward_id = ?
            """

            parameters.append(
                ward_filter
            )

        sql += """
            ORDER BY women.name
        """

        results = db.execute(
            sql,
            parameters
        ).fetchall()

    db.close()

    # --------------------------------------------------------
    # WARD OPTIONS
    # --------------------------------------------------------

    ward_options = """
    <option value="all">
        All Wards
    </option>
    """

    for ward in wards:

        selected = ""

        if str(ward["id"]) == str(ward_filter):
            selected = "selected"

        ward_options += f"""

        <option
            value="{ward['id']}"
            {selected}
        >

            {escape(ward['name'])}
            –
            {escape(ward['area'])}

        </option>

        """

    # --------------------------------------------------------
    # RESULTS
    # --------------------------------------------------------

    result_html = ""

    for number, woman in enumerate(
        results,
        start=1
    ):

        result_html += f"""

        <div class="result">

            <div class="result-name">

                {number}.
                {escape(woman['name'])}

            </div>

            <div>

                🏘️
                {escape(woman['ward_name'])}

                –
                {escape(woman['area'])}

            </div>

        </div>

        """

    if (query or ward_filter != "all") and not result_html:

        result_html = """

        <div class="notice">

            No approved woman matched your search.

        </div>

        """

    content = f"""

    <div class="card">

        <h2>
            🔎 Search Women
        </h2>

        <form method="GET">

            <label>
                Woman's Name
            </label>

            <input
                name="q"
                value="{escape(query)}"
                placeholder="Enter name"
            >


            <label>
                Ward
            </label>

            <select name="ward">

                {ward_options}

            </select>


            <button>
                🔎 Search
            </button>

        </form>

    </div>


    <div class="card">

        <h2>
            Search Results
        </h2>

        {result_html}

    </div>

    """

    return page(
        "Search",
        content
    )


# ============================================================
# WARD PAGE
# ============================================================

@app.route("/ward/<int:ward_id>")
def ward(ward_id):

    db = get_db()

    ward_data = db.execute("""
        SELECT *
        FROM wards
        WHERE id = ?
    """, (
        ward_id,
    )).fetchone()

    if not ward_data:

        db.close()

        return "Ward not found", 404

    excos = db.execute("""
        SELECT *
        FROM excos

        WHERE ward_id = ?

        ORDER BY id
    """, (
        ward_id,
    )).fetchall()

    women = db.execute("""
        SELECT name
        FROM women

        WHERE ward_id = ?
        AND approved = 1

        ORDER BY name
    """, (
        ward_id,
    )).fetchall()

    db.close()

    exco_html = ""

    for exco in excos:

        exco_html += f"""

        <div class="exco">

            <div class="exco-position">

                {escape(exco['position'])}

            </div>

            <strong>

                {escape(exco['name'])}

            </strong>

        </div>

        """

    women_html = ""

    for number, woman in enumerate(
        women,
        start=1
    ):

        women_html += f"""

        <div class="exco">

            <strong>

                {number}.
                {escape(woman['name'])}

            </strong>

        </div>

        """

    if not women_html:

        women_html = """

        <div class="notice">

            No approved women registered yet.

        </div>

        """

    content = f"""

    <a
        href="/"
        class="button secondary"
    >
        ← Back
    </a>


    <div class="hero">

        <img
            src="/static/logo.jpeg"
            class="logo"
            alt="Logo"
        >

        <h2>
            {escape(ward_data['name'])}
        </h2>

        <p>
            {escape(ward_data['area'])}
        </p>

    </div>


    <div class="card">

        <h2>
            👥 Ward EXCO
        </h2>

        {exco_html}

    </div>


    <div class="card">

        <h2>
            👩 Registered Women
        </h2>

        <p class="small">

            Only approved names are displayed publicly.

        </p>

        {women_html}

    </div>

    """

    return page(
        ward_data["name"],
        content
    )


# ============================================================
# LOGIN
# ============================================================

@app.route(
    "/login",
    methods=["GET", "POST"]
)
def login():

    error = ""

    if request.method == "POST":

        username = request.form.get(
            "username",
            ""
        )

        password = request.form.get(
            "password",
            ""
        )

        if (
            username == ADMIN_USERNAME
            and
            password == ADMIN_PASSWORD
        ):

            session["admin"] = True

            return redirect(
                url_for("admin")
            )

        error = """

        <div class="error">

            Incorrect username or password.

        </div>

        """

    content = f"""

    <div class="card form-card">

        <img
            src="/static/logo.jpeg"
            class="logo"
            alt="Logo"
        >

        <h2>
            🔐 Admin Login
        </h2>

        {error}

        <form method="POST">

            <label>
                Username
            </label>

            <input
                name="username"
                required
            >


            <label>
                Password
            </label>

            <input
                type="password"
                name="password"
                required
            >


            <button>
                Login
            </button>

        </form>

    </div>

    """

    return page(
        "Admin Login",
        content
    )


# ============================================================
# ADMIN DASHBOARD
# ============================================================

@app.route("/admin")
@admin_required
def admin():

    db = get_db()

    selected_ward = request.args.get(
        "ward",
        "all"
    )

    wards = db.execute("""
        SELECT *
        FROM wards
        ORDER BY id
    """).fetchall()

    # --------------------------------------------------------
    # STATISTICS
    # --------------------------------------------------------

    if selected_ward == "all":

        total = db.execute("""
            SELECT COUNT(*)
            FROM women
        """).fetchone()[0]

        approved = db.execute("""
            SELECT COUNT(*)
            FROM women
            WHERE approved = 1
        """).fetchone()[0]

        pending = db.execute("""
            SELECT COUNT(*)
            FROM women
            WHERE approved = 0
        """).fetchone()[0]

    else:

        total = db.execute("""
            SELECT COUNT(*)
            FROM women
            WHERE ward_id = ?
        """, (
            selected_ward,
        )).fetchone()[0]

        approved = db.execute("""
            SELECT COUNT(*)
            FROM women
            WHERE ward_id = ?
            AND approved = 1
        """, (
            selected_ward,
        )).fetchone()[0]

        pending = db.execute("""
            SELECT COUNT(*)
            FROM women
            WHERE ward_id = ?
            AND approved = 0
        """, (
            selected_ward,
        )).fetchone()[0]

    # --------------------------------------------------------
    # WOMEN
    # --------------------------------------------------------

    if selected_ward == "all":

        women = db.execute("""
            SELECT
                women.*,
                wards.name AS ward_name,
                wards.area

            FROM women

            JOIN wards
                ON women.ward_id = wards.id

            ORDER BY women.id DESC
        """).fetchall()

    else:

        women = db.execute("""
            SELECT
                women.*,
                wards.name AS ward_name,
                wards.area

            FROM women

            JOIN wards
                ON women.ward_id = wards.id

            WHERE women.ward_id = ?

            ORDER BY women.id DESC
        """, (
            selected_ward,
        )).fetchall()

    # --------------------------------------------------------
    # EXCO
    # --------------------------------------------------------

    if selected_ward == "all":

        excos = db.execute("""
            SELECT
                excos.*,
                wards.name AS ward_name

            FROM excos

            JOIN wards
                ON excos.ward_id = wards.id

            ORDER BY wards.id, excos.id
        """).fetchall()

    else:

        excos = db.execute("""
            SELECT
                excos.*,
                wards.name AS ward_name

            FROM excos

            JOIN wards
                ON excos.ward_id = wards.id

            WHERE excos.ward_id = ?

            ORDER BY excos.id
        """, (
            selected_ward,
        )).fetchall()

    db.close()

    # --------------------------------------------------------
    # WARD OPTIONS
    # --------------------------------------------------------

    ward_options = """
    <option value="all">
        All Wards
    </option>
    """

    for ward in wards:

        selected = ""

        if str(ward["id"]) == str(selected_ward):
            selected = "selected"

        ward_options += f"""

        <option
            value="{ward['id']}"
            {selected}
        >

            {escape(ward['name'])}
            –
            {escape(ward['area'])}

        </option>

        """

    # --------------------------------------------------------
    # WOMEN TABLE
    # --------------------------------------------------------

    women_rows = ""

    for woman in women:

        if woman["approved"]:

            status = "Approved"

            action = f"""

            <form
                method="POST"
                action="/admin/reject/{woman['id']}"
            >

                <button>
                    Reject
                </button>

            </form>

            """

        else:

            status = "Pending"

            action = f"""

            <form
                method="POST"
                action="/admin/approve/{woman['id']}"
            >

                <button class="success">
                    Approve
                </button>

            </form>

            """

        women_rows += f"""

        <tr>

            <td>
                {escape(woman['name'])}
            </td>

            <td>
                {escape(woman['phone'])}
            </td>

            <td>
                {escape(woman['bank_name'])}
            </td>

            <td>
                {escape(woman['account_no'])}
            </td>

            <td>
                {escape(woman['ward_name'])}
            </td>

            <td>
                {status}
            </td>

            <td>

                {action}

                <br>

                <a
                    class="button"
                    href="/admin/edit-woman/{woman['id']}"
                >
                    Edit
                </a>

                <br><br>

                <form
                    method="POST"
                    action="/admin/delete-woman/{woman['id']}"
                    onsubmit="
                        return confirm(
                            'Delete this record?'
                        )
                    "
                >

                    <button class="danger">
                        Delete
                    </button>

                </form>

            </td>

        </tr>

        """

    if not women_rows:

        women_rows = """

        <tr>

            <td colspan="7">

                No women registered.

            </td>

        </tr>

        """

    # --------------------------------------------------------
    # EXCO TABLE
    # --------------------------------------------------------

    exco_rows = ""

    for exco in excos:

        exco_rows += f"""

        <tr>

            <td>
                {escape(exco['ward_name'])}
            </td>

            <td>
                {escape(exco['position'])}
            </td>

            <td>
                {escape(exco['name'])}
            </td>

            <td>

                <a
                    class="button"
                    href="/admin/edit-exco/{exco['id']}"
                >
                    Edit
                </a>

            </td>

        </tr>

        """

    if not exco_rows:

        exco_rows = """

        <tr>

            <td colspan="4">
                No EXCO records.
            </td>

        </tr>

        """

    # --------------------------------------------------------
    # EXCO POSITIONS
    # --------------------------------------------------------

    position_options = ""

    for position in EXCO_POSITIONS:

        position_options += f"""

        <option value="{escape(position)}">

            {escape(position)}

        </option>

        """

    # --------------------------------------------------------
    # DASHBOARD
    # --------------------------------------------------------

    content = f"""

    <div class="hero">

        <img
            src="/static/logo.jpeg"
            class="logo"
            alt="Logo"
        >

        <h2>
            🔐 ADMIN DASHBOARD
        </h2>

        <p>
            {SITE_NAME}
        </p>

        <a
            href="/logout"
            class="button secondary"
        >
            Logout
        </a>

    </div>


    <div class="card">

        <h2>
            🏘️ Ward Filter
        </h2>

        <form
            method="GET"
            action="/admin"
        >

            <select name="ward">

                {ward_options}

            </select>

            <button>
                View Ward
            </button>

        </form>

    </div>


    <div class="stats">

        <div class="stat">

            <div class="stat-number">
                {total}
            </div>

            <div class="stat-label">
                Total
            </div>

        </div>


        <div class="stat">

            <div class="stat-number">
                {approved}
            </div>

            <div class="stat-label">
                Approved
            </div>

        </div>


        <div class="stat">

            <div class="stat-number">
                {pending}
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
            method="POST"
            action="/admin/add-exco"
        >

            <label>
                Ward
            </label>

            <select
                name="ward_id"
                required
            >

                <option value="">
                    Select Ward
                </option>

                {ward_options}

            </select>


            <label>
                Office
            </label>

            <select
                name="position"
                required
            >

                <option value="">
                    Select Office
                </option>

                {position_options}

            </select>


            <label>
                Name
            </label>

            <input
                name="name"
                placeholder="EXCO member name"
                required
            >


            <button>
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

                {exco_rows}

            </table>

        </div>

    </div>


    <div class="card">

        <h2>
            👩 Registered Women
        </h2>

        <div class="notice">

            🔐 Private information is available
            only inside the administrator dashboard.

        </div>

        <div class="table-container">

            <table>

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

                {women_rows}

            </table>

        </div>

    </div>

    """

    return page(
        "Admin Dashboard",
        content
    )


# ============================================================
# ADD EXCO
# ============================================================

@app.route(
    "/admin/add-exco",
    methods=["POST"]
)
@admin_required
def add_exco():

    ward_id = request.form.get(
        "ward_id"
    )

    position = request.form.get(
        "position"
    )

    name = request.form.get(
        "name",
        ""
    ).strip()

    if not ward_id or not position or not name:

        return redirect(
            url_for("admin")
        )

    db = get_db()

    existing = db.execute("""
        SELECT id
        FROM excos

        WHERE ward_id = ?
        AND position = ?
    """, (
        ward_id,
        position
    )).fetchone()

    if existing:

        db.execute("""
            UPDATE excos

            SET name = ?

            WHERE id = ?
        """, (
            name,
            existing["id"]
        ))

    else:

        db.execute("""
            INSERT INTO excos
            (
                name,
                position,
                ward_id,
                created_at
            )

            VALUES (?, ?, ?, ?)
        """, (
            name,
            position,
            ward_id,
            datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            )
        ))

    db.commit()
    db.close()

    return redirect(
        url_for("admin")
    )


# ============================================================
# APPROVE
# ============================================================

@app.route(
    "/admin/approve/<int:woman_id>",
    methods=["POST"]
)
@admin_required
def approve(woman_id):

    db = get_db()

    db.execute("""
        UPDATE women

        SET approved = 1

        WHERE id = ?
    """, (
        woman_id,
    ))

    db.commit()
    db.close()

    return redirect(
        request.referrer or
        url_for("admin")
    )


# ============================================================
# REJECT
# ============================================================

@app.route(
    "/admin/reject/<int:woman_id>",
    methods=["POST"]
)
@admin_required
def reject(woman_id):

    db = get_db()

    db.execute("""
        UPDATE women

        SET approved = 0

        WHERE id = ?
    """, (
        woman_id,
    ))

    db.commit()
    db.close()

    return redirect(
        request.referrer or
        url_for("admin")
    )


# ============================================================
# DELETE WOMAN
# ============================================================

@app.route(
    "/admin/delete-woman/<int:woman_id>",
    methods=["POST"]
)
@admin_required
def delete_woman(woman_id):

    db = get_db()

    db.execute("""
        DELETE FROM women

        WHERE id = ?
    """, (
        woman_id,
    ))

    db.commit()
    db.close()

    return redirect(
        request.referrer or
        url_for("admin")
    )


# ============================================================
# EDIT WOMAN
# ============================================================

@app.route(
    "/admin/edit-woman/<int:woman_id>",
    methods=["GET", "POST"]
)
@admin_required
def edit_woman(woman_id):

    db = get_db()

    woman = db.execute("""
        SELECT *
        FROM women

        WHERE id = ?
    """, (
        woman_id,
    )).fetchone()

    wards = db.execute("""
        SELECT *
        FROM wards
        ORDER BY id
    """).fetchall()

    if not woman:

        db.close()

        return "Woman not found", 404

    if request.method == "POST":

        name = request.form.get(
            "name",
            ""
        ).strip()

        phone = request.form.get(
            "phone",
            ""
        ).strip()

        bank_name = request.form.get(
            "bank_name",
            ""
        ).strip()

        account_no = request.form.get(
            "account_no",
            ""
        ).strip()

        ward_id = request.form.get(
            "ward_id"
        )

        if all([
            name,
            phone,
            bank_name,
            account_no,
            ward_id
        ]):

            db.execute("""
                UPDATE women

                SET
                    name = ?,
                    phone = ?,
                    bank_name = ?,
                    account_no = ?,
                    ward_id = ?

                WHERE id = ?

            """, (
                name,
                phone,
                bank_name,
                account_no,
                ward_id,
                woman_id
            ))

            db.commit()

        db.close()

        return redirect(
            url_for("admin")
        )

    db.close()

    options = ""

    for ward in wards:

        selected = ""

        if ward["id"] == woman["ward_id"]:
            selected = "selected"

        options += f"""

        <option
            value="{ward['id']}"
            {selected}
        >

            {escape(ward['name'])}
            –
            {escape(ward['area'])}

        </option>

        """

    content = f"""

    <div class="card form-card">

        <h2>
            Edit Woman
        </h2>

        <form method="POST">

            <label>
                Ward
            </label>

            <select
                name="ward_id"
                required
            >

                {options}

            </select>


            <label>
                Name
            </label>

            <input
                name="name"
                value="{escape(woman['name'])}"
                required
            >


            <label>
                Phone
            </label>

            <input
                name="phone"
                value="{escape(woman['phone'])}"
                required
            >


            <label>
                Bank Name
            </label>

            <input
                name="bank_name"
                value="{escape(woman['bank_name'])}"
                required
            >


            <label>
                Account No
            </label>

            <input
                name="account_no"
                value="{escape(woman['account_no'])}"
                required
            >


            <button>
                Save Changes
            </button>

        </form>

        <br>

        <a
            href="/admin"
            class="button secondary"
        >
            Cancel
        </a>

    </div>

    """

    return page(
        "Edit Woman",
        content
    )


# ============================================================
# EDIT EXCO
# ============================================================

@app.route(
    "/admin/edit-exco/<int:exco_id>",
    methods=["GET", "POST"]
)
@admin_required
def edit_exco(exco_id):

    db = get_db()

    exco = db.execute("""
        SELECT *
        FROM excos

        WHERE id = ?
    """, (
        exco_id,
    )).fetchone()

    wards = db.execute("""
        SELECT *
        FROM wards
        ORDER BY id
    """).fetchall()

    if not exco:

        db.close()

        return "EXCO not found", 404

    if request.method == "POST":

        name = request.form.get(
            "name",
            ""
        ).strip()

        position = request.form.get(
            "position"
        )

        ward_id = request.form.get(
            "ward_id"
        )

        if name and position and ward_id:

            db.execute("""
                UPDATE excos

                SET
                    name = ?,
                    position = ?,
                    ward_id = ?

                WHERE id = ?

            """, (
                name,
                position,
                ward_id,
                exco_id
            ))

            db.commit()

        db.close()

        return redirect(
            url_for("admin")
        )

    db.close()

    ward_options = ""

    for ward in wards:

        selected = ""

        if ward["id"] == exco["ward_id"]:
            selected = "selected"

        ward_options += f"""

        <option
            value="{ward['id']}"
            {selected}
        >

            {escape(ward['name'])}
            –
            {escape(ward['area'])}

        </option>

        """

    position_options = ""

    for position in EXCO_POSITIONS:

        selected = ""

        if position == exco["position"]:
            selected = "selected"

        position_options += f"""

        <option
            value="{escape(position)}"
            {selected}
        >

            {escape(position)}

        </option>

        """

    content = f"""

    <div class="card form-card">

        <h2>
            Edit EXCO
        </h2>

        <form method="POST">

            <label>
                Ward
            </label>

            <select
                name="ward_id"
                required
            >

                {ward_options}

            </select>


            <label>
                Office
            </label>

            <select
                name="position"
                required
            >

                {position_options}

            </select>


            <label>
                Name
            </label>

            <input
                name="name"
                value="{escape(exco['name'])}"
                required
            >


            <button>
                Save Changes
            </button>

        </form>

    </div>

    """

    return page(
        "Edit EXCO",
        content
    )


# ============================================================
# LOGOUT
# ============================================================

@app.route("/logout")
def logout():

    session.clear()

    return redirect(
        url_for("home")
    )


# ============================================================
# START
# ============================================================

if __name__ == "__main__":

    create_database()

    print()
    print("=" * 60)
    print(SITE_NAME)
    print(SITE_LOCATION)
    print("=" * 60)

    print()
    print(
        "Website: "
        "http://127.0.0.1:5000"
    )

    print()
    print(
        "Admin: "
        "http://127.0.0.1:5000/admin"
    )

    print()
    print(
        "Username:",
        ADMIN_USERNAME
    )

    print(
        "Password:",
        ADMIN_PASSWORD
    )

    print()
    print("=" * 60)

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )