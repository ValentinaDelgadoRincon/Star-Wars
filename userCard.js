class UserCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    set user(data) {
      this.shadowRoot.innerHTML = `
        <div>
          <h3>${data.name}</h3>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Compañía:</strong> ${data.company.name}</p>
        </div>
      `;
    }
  }

  customElements.define("user-card", UserCard);


  const userList = document.getElementById("user-list");
    let usersData = [];

    async function loadUsers() {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      usersData = await response.json();
      renderUsers(usersData);
    }

    function renderUsers(users) {
      userList.innerHTML = "";
      users.forEach(user => {
        const card = document.createElement("user-card");
        card.user = user;
        userList.appendChild(card);
      });
    }
    
    
    document.querySelector("search-bar").addEventListener("busqueda", (evento) => {
      const aBuscar = evento.detail;
      console.log('Estoy recibiendo: ', aBuscar);
      const filtered = usersData.filter(user => user.name.toLowerCase().includes(aBuscar));
      console.log(filtered);
      
      renderUsers(filtered);
    });

    loadUsers();