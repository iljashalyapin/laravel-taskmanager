<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Login</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <style>
            html {
                background-color: #214c84;
                background-blend-mode: overlay;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: blue;
                height: 100%;
            }

            body {
                background-color: transparent;
            }

            .registration-cssave{
                padding: 50px 0;
                text-align: center;
            }

            .registration-cssave form {
                width: 320px;
                padding: 50px 70px;
                border-radius: 10px;
                box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
                background-color: #fff;
            }

            .registration-cssave form h2 {
                font-weight: bold;
                margin-bottom: 30px;
            }

            .registration-cssave .item {
                border-radius: 10px;
                margin: 0 12% 25px;
                padding: 10px 20px;
                font-size: 15px;
            }

            .registration-cssave .checkbox_label {
                display: flex;
                align-items: center;
                margin: 0 18% 25px;
            }

            .registration-cssave input[type = checkbox] {
                height: 20px;
                width: 20px;
                margin-right: 10px;
            }

            .registration-cssave .btn-primary {
                border-radius: 30px;
                margin-top: 10px;
                padding: 10px 20px;
                font-size: 18px;
                font-weight: bold;
                background-color: #3f93ff;
                border: none;
                color: white;              
            }

            .alert-danger {
                color: red;
                font-size: 15px;
                font-weight: bold;
                text-align: center;
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        
    <div class="registration-cssave">
        <form action="/profile" method="POST">
            <?php echo csrf_field(); ?>
            <h2>Login</h2>
            <div class="form-group">
                <input class="form-control item" type="text" name="username" minlength="4" maxlength="16" id="username" placeholder="Username" required>
            </div>
            <div class="form-group">
                <input class="form-control item" type="password" name="password" minlength="8" maxlength="16" id="password" placeholder="Password" required>
            </div>
            <div class="form-group">
                <label class="checkbox_label">
                    <input type="checkbox" name="admin_role" id="admin_role">
                    I'm an administator
                </label>
            </div>
            <div class="form-group">
                <button class="btn-primary" type="submit">Sign in</button>
            </div>
            <?php if(session()->has('error')): ?>
                <div class="alert alert-danger">
                    <?php echo e(session()->get('error')); ?>

                </div>
            <?php endif; ?>
        </form>
    </div>

    </body>
</html>
<?php /**PATH /home/ubuntu/new-taskmanager/resources/views/login.blade.php ENDPATH**/ ?>