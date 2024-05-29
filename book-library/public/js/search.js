document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchQuery = document.getElementById("search-query");
  const resultsDiv = document.getElementById("results");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    resultsDiv.innerHTML = "";

    try {
      const response = await fetch(
        `/api/users/search?query=${encodeURIComponent(searchQuery.value)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data.length === 0) {
          resultsDiv.innerHTML = "<p>No users found</p>";
        } else {
          data.forEach((user) => {
            const userDiv = document.createElement("div");
            userDiv.classList.add("user-result");
            userDiv.innerHTML = `
                            <h3>${user.username} (${user.email})</h3>
                            ${
                              user.privacy === "public"
                                ? `<button onclick="viewBookshelf('${user._id}')">View Bookshelf</button>`
                                : "<p>Profile is private</p>"
                            }
                        `;
            resultsDiv.appendChild(userDiv);
          });
        }
      } else {
        resultsDiv.innerHTML = `<p>${data.msg || "Failed to search users"}</p>`;
      }
    } catch (err) {
      console.error("Error:", err);
      resultsDiv.innerHTML = "<p>Error occurred while searching users</p>";
    }
  });
});

const viewBookshelf = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}/books`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      const bookshelfDiv = document.createElement("div");
      bookshelfDiv.classList.add("bookshelf");
      bookshelfDiv.innerHTML = `
                <h4>Bookshelf</h4>
                <ul>
                    ${data.books
                      .map(
                        (book) =>
                          `<li>${book.title} by ${book.author} (${book.genre}) - ${book.rating}/5</li>`
                      )
                      .join("")}
                </ul>
            `;
      document
        .querySelector(
          `.user-result button[onclick="viewBookshelf('${userId}')"]`
        )
        .replaceWith(bookshelfDiv);
    } else {
      alert(data.msg || "Failed to fetch bookshelf");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

