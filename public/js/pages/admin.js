const Admin = {
    template: `
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Автор</th>
                        <th scope="col">Наличие</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book) in books">
                        <th scope="row">{{ book.id }}</th>
                        <td>{{ book.title }}</td>
                        <td>{{ book.author }}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary" v-on:click="changeBookAvailability(book.id)">
                                {{ book.availability ? 'Доступна' : 'Выдана' }}
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger" v-on:click="deleteBook(book.id)">Удалить</button>
                        </td>
                    </tr>
                    <!-- Строка с полями для добавления новой книги -->
                    <tr>
                        <th scope="row">Добавить</th>
                        <td><input type="text" class="form-control" v-model="bookAddTitle"></td>
                        <td><input type="text" class="form-control" v-model="bookAddAuthor"></td>
                        <td></td>
                        <td><button type="button" class="btn btn-outline-success" v-on:click="addBook">Добавить</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data: function () {
        return {
            books: [],
            bookAddTitle: '',
            bookAddAuthor: '',
        }
    },
    methods: {
        loadBookList() {
            axios.get('/api/book/all')
                .then((response) => {
                    this.books = response.data;
                    console.log(this.books);
                })
                .catch((error) => {
                    alert('Ошибка загрузки данных. Попробуйте перезагрузить страницу!')
                });
        },
        addBook() {
            axios.post('/api/book/add', {
                title: this.bookAddTitle,
                author: this.bookAddAuthor
            })
            .then((response) => {
                this.books.push(
                        {
                            title: this.bookAddTitle,
                            author: this.bookAddAuthor,
                            availability: 1
                        }
                    );
                this.bookAddTitle = '';
                this.bookAddAuthor = '';
            })
            .catch((error) => {
                alert('Ошибка отправки данных. Попробуйте перезагрузить страницу!')
            });
        },
        deleteBook(id) {
            axios.get('/api/book/delete/' + id)
                .then((response) => {
                    this.loadBookList();
                })
                .catch((error) => {
                    alert('Ошибка отправки данных. Попробуйте перезагрузить страницу!')
                });
        },
        changeBookAvailability(id) {
            axios.get('/api/book/change_availabilty/' + id)
                .then((response) => {
                    this.loadBookList();
                })
                .catch((error) => {
                    alert('Ошибка отправки данных. Попробуйте перезагрузить страницу!')
                });
        }
    },
    mounted: function () {
        this.loadBookList();
    }
};