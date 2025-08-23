// hry sa ukladajú do LocalStorage
let games = JSON.parse(localStorage.getItem("games")) || [];

function saveGames() {
  localStorage.setItem("games", JSON.stringify(games));
}

function renderGames() {
  const list = document.getElementById("gameList");
  if (!list) return;
  list.innerHTML = "";
  games.forEach((game, index) => {
    const li = document.createElement("li");
    li.className = "p-3 bg-slate-800 rounded flex justify-between items-center";
    li.innerHTML = `
      <span>${game.emoji} <strong>${game.title}</strong></span>
      <button onclick="deleteGame(${index})" class="bg-red-500 px-2 py-1 rounded">❌</button>
    `;
    list.appendChild(li);
  });
}

function deleteGame(index) {
  games.splice(index, 1);
  saveGames();
  renderGames();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gameForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const newGame = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        emoji: document.getElementById("emoji").value,
        iframe: document.getElementById("iframe").value,
      };
      games.push(newGame);
      saveGames();
      renderGames();
      form.reset();
    });
  }
  renderGames();
});
