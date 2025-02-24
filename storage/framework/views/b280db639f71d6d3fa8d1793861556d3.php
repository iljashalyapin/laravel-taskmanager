<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Home</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
        
        <style>
            .navbar {
                padding: 10px 60px;
            }
            hr {
                clear: both;
                visibility: hidden;
            }
            label {
                font-size: 20px;
            }
            input, select {
                height: 40px;
                width: 300px;
                font-size: 20px;
            }
            textarea {
                height: 100px;
                width: 300px;
                font-size: 20px;
            }
            button {
                font-size: 20px;
                font-weight: 700;
                color: White;         
            }
            .menu {
                margin-top: 60px;
                font-family: 'Figtree';
                font-size: 30px;
                text-align: center;
                background-color: transparent;
            }
            .menu .menu_options{
                margin-top: 40px;
                margin-bottom: 50px;
            }
            .menu .menu_options button{
                width: 150px;
                height: 42px;
            }
            .btn_show {
                background-color: Gray;
            }
            .btn_add {
                background-color: LimeGreen;
            }
            .btn_update {
                background-color: Blue;   	
            }
            .btn_delete, .btn_delete2{
                background-color: Red;
            }
            .btn_delete2 {
                width: 120px;
                height: 42px;
            }
            .btn_save {
                width: 100px;
                height: 42px;
                background-color: SaddleBrown;
            }
            .btn_ok {
                width: 100px;
                height: 42px;
                background-color: DarkOrange;
            }
            .find_task {
                padding-bottom: 30px;
                margin-bottom: 20px;
                border-bottom: 2px dashed;
            }
            .table {
                margin-top: -10px;
                font-size: 16px;
            }
            .form {
                padding-top: 30px;
                margin: auto;
                width: 540px;
                border: 2px solid;
            }
            #identificator {
                width: 100px;
            }
        </style>

        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://unpkg.com/axios@1.7.9/dist/axios.min.js"></script>

    </head>
    <body>
        
    <div class="site-index">
        <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="#">User Panel</a>
            <ul class="navbar-nav navbar-right">
                <li class="nav-item">
                    <a class="nav-link" href="/login">Logout (<?php echo e($name); ?>)</a>
                </li>
            </ul>
        </nav>
        <label id="session" hidden>user</label>  
        <div class="menu">
            <p class="menu_header">Please, select the necessary action:</p>
            <div class="menu_options">
                <button class="btn_show" onclick="Show_tasks()">Show tasks</button>
                &ensp;
                <button class="btn_add" onclick="Add_task()">Add new task</button>
                &ensp;
                <button class="btn_update" onclick="Update_task()">Update task</button>
                &ensp;
                <button class="btn_delete" onclick="Delete_task()">Delete task</button>
            </div>           
        </div>  
    </div>

    <script type="text/jsx" src="js/react-components/listTasks.js" ></script>
    <script type="text/jsx" src="js/react-components/addTask.js" ></script>
    <script type="text/jsx" src="js/react-components/updateTask.js" ></script>
    <script type="text/jsx" src="js/react-components/deleteTask.js" ></script>
    
</body>
</html>
<?php /**PATH /home/ubuntu/new-taskmanager/resources/views/user_home.blade.php ENDPATH**/ ?>