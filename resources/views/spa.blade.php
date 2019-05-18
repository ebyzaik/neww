<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>
    @verbatim
    <div id="app">
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
       	<div class="container">
       	<div class="navbar-brand">Библиотека</div>
        	<div class="navbar-nav">
        	<router-link to="/main" class="nav-item nav-link">Главная</router-link>
        	<router-link to="/admin" class="nav-item nav-link">Админ-панель</router-link>
        	</div>
       	</div>
       </nav>
        <div class="container mt-5">
			<router-view></router-view>
        </div>
    </div>
    @endverbatim

    <!--Подключаем axios для динамических вызовов api -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>

    <!--Подключаем Vue.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js"></script>
    
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    
    <script src="/js/pages/admin.js"></script>
    
    <script src="/js/pages/main.js"></script>

    <script>
		let routesArr =[
			{path : '/admin', component: Admin},
            {path : '/main', component: Home}
			]

			let routerObj = new  VueRouter({
			mode:'history',
			routes:routesArr
			})

        let vm = new Vue({
            el: '#app',
			router: routerObj,
            data: {
                books:[],
                bookAddTitle:'',
                bookAddAuthor:'',
            },
            methods: {
                loadBookList(){
                    axios.get('/api/book/all')
                        .then((response) => {
                            this.books = response.data;
                            console.log(this.books); 
                        })
                        .catch((error) => {
                            alert('Ошибка загрузки данных. Попробуйте перезагрузить страницу!')
                        });
                },
                addBook(){
                    axios.post('/api/book/add', {
                        title: this.bookAddTitle,
                        author: this.bookAddAuthor
                    }).then((response) => {
                            this.loadBookList();
                        })
                        .catch((error) => {
                            alert('Ошибка отправки данных. Попробуйте перезагрузить страницу!')
                        });
                },
                deleteBook(id){
                    axios.get('/api/book/delete/'+id)
                        .then((response) => {
                            this.loadBookList();
                        })
                        .catch((error) => {
                            alert('Ошибка отправки данных. Попробуйте перезагрузить страницу!')
                        });
                },
                changeBookAvailability(id){
                    axios.get('/api/book/change_availabilty/'+id)
                        .then((response) => {
                            this.loadBookList();
                        })
                        .catch((error) => {
                            alert('Ошибка отправки данных. Попробуйте перезагрузить страницу!')
                        });
                }
            },
            mounted(){
                this.loadBookList();
            }
        });
    </script>
</body>
</html>