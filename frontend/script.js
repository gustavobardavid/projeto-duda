const apiUrl = 'http://localhost:3000';
let contadorLivros = 0 
let contadorUsers = 0
// Function to fetch and display books
async function fetchBooks() {
    try {
        const response = await fetch(`${apiUrl}/books`);
        const data = await response.json();
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';
        data.forEach(book => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `${book.title} by ${book.author} - Código do Livro: ${book.id}`;
            bookList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Function to fetch and display users
async function fetchUsers() {
    try {
        const response = await fetch(`${apiUrl}/users`);
        const data = await response.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `UserName: ${user.name} - ID do Usuário: ${user.id} `;
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Function to fetch and display loans
async function fetchLoans() {
    try {
        const response = await fetch(`${apiUrl}/loans`);
        const data = await response.json();
        const loanList = document.getElementById('loanList');
        loanList.innerHTML = '';
        data.forEach(loan => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `Book ID: ${loan.bookId}, User ID: ${loan.userId}`;
            loanList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching loans:', error);
    }
}

// Handle book form submission
document.getElementById('bookForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const book = {
        id: contadorLivros,
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value
    };
    try {
        await fetch(`${apiUrl}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        fetchBooks();
        contadorLivros++
        this.reset();
    } catch (error) {
        console.error('Error adding book:', error);
    }
});

// Handle user form submission
document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const user = {
        id: contadorUsers,
        name: document.getElementById('userName').value
    };
    try {
        await fetch(`${apiUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        fetchUsers();
        contadorUsers++
        this.reset();
    } catch (error) {
        console.error('Error adding user:', error);
    }
});

// Handle loan form submission
document.getElementById('loanForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const loan = {
        bookId: parseInt(document.getElementById('loanBookId').value),
        userId: parseInt(document.getElementById('loanUserId').value)
    };
    try {
        await fetch(`${apiUrl}/loans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loan)
        });
        fetchLoans();
        this.reset();
    } catch (error) {
        console.error('Error adding loan:', error);
    }
});

// Fetch initial data
fetchBooks();
fetchUsers();
fetchLoans();