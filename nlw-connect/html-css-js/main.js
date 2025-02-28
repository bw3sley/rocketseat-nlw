const app = document.getElementById("app");

const users = [
    {
        email: "bw3sley@gmail.com",
        phone: "(99) 9 9999-9999",
        ref: 100,
        refBy: null
    },

    {
        email: "mayk-brito@rocketseat.com",
        phone: "(99) 9 9999-9999",
        ref: 200,
        refBy: 100
    },

    {
        email: 'diego-schell@rocketseat.com',
        phone: '(99) 9 9999-9999',
        ref: 300,
        refBy: 200
    }
] || JSON.parse(localStorage.getItem("@nlw-connect:users"));

function getUser(data) {
    return users.find(user => user.email === data.email);
}

function getTotalSubscribers(data) {
    const subs = users.filter(user => user.refBy === data.ref);

    console.log(subs);

    return subs.length;
}

function showInvite(data) {
    app.innerHTML = `
        <main>
            <h3>Inscrição confirmada!</h3>

            <p>
                Convide mais pessoas e concorra a prêmios! <br/>
                Compartilhe o link e acompanhe as inscrições:
            </p>

            <div class="input-group">
                <label for="link">
                    <img src="link.svg" alt="Link icon">
                </label>
            
                <input type="text" id="link" value="https://evento.com?ref=${data.ref}" disabled>
            </div>
        </main>

        <section class="stats">
            <h4>${getTotalSubscribers(data)}</h4>

            <p>Inscrições feitas!</p>
        </section>
    `;

    app.setAttribute("class", "page-invite");

    updateImageLinks();
}

function saveUser(data) {
    const newUser = {
        ...data,

        ref: Math.floor(Math.random() * 4000),
        refBy: 100
    }

    users.push(newUser);

    localStorage.setItem("@nlw-connect:users", JSON.stringify(users));

    return newUser;
}

function formAction() {
    const form = document.getElementById("form");

    form.onsubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const userData = {
            email: formData.get("email"),
            phone: formData.get("phone")
        }

        const user = getUser(userData);

        if (user) {
            showInvite(user);
        }

        else {
            const newUser = saveUser(userData);

            showInvite(newUser);
        }
    }
}

function updateImageLinks() {
    document.querySelectorAll("img").forEach(img => {
        const src = img.getAttribute("src");

        if (src && !src.startsWith("http")) {
            img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
        }
    })
}

function startApp() {
    const content = `
        <main>
            <section class="about">
                <div class="section-header">
                    <h2>Sobre o evento</h2>

                    <span class="badge">AO VIVO</span>
                </div>

                <p>
                    Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
                    <br/><br/>Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito 
                </p>
            </section>

            <section class="registration">
                <h2>Inscrição</h2>

                <form id="form">
                    <div class="input-wrapper">
                        <div class="input-group">
                            <label for="email">
                                <img src="mail.svg" alt="Email icon">
                            </label>
                            
                            <input type="email" id="email" name="email" required placeholder="E-mail">
                        </div>

                        <div class="input-group">
                            <label for="phone">
                                <img src="phone.svg" alt="Phone icon">
                            </label>

                            <input type="text" id="phone" name="phone" required placeholder="Telefone">
                        </div>
                    </div>

                    <button>
                        Confirmar
                        
                        <img src="arrow.svg" alt="Arrow right">
                    </button>
                </form>
            </section>
        </main>
    `;

    app.innerHTML = content;

    app.setAttribute("class", "page-start");

    updateImageLinks();

    formAction();
}

startApp();

document.querySelector("header").onClick = () => startApp();