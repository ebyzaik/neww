const Home = {
    template: `
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Автор</th>
                        <th scope="col">Наличие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book) in books">
                        <th scope="row">{{ book.id }}</th>
                        <td>{{ book.title }}</td>
                        <td>{{ book.author }}</td>
                        <td>{{ book.availability ? 'Доступна' : 'Выдана' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data: function(){
        return {
            books: []
        }
    },
    methods: {
        loadBookList(){
            axios.get('/api/book/all')
                .then((response) => {
                    this.books = response.data;
                    Home.books = response.data;
                    console.log(this.books); 
                })
                .catch((error) => {
                    alert('Ошибка загрузки данных. Попробуйте перезагрузить страницу!')
                });
        }
    },
    created(){
        this.loadBookList();
    }
};