<h2>Менеджер задач</h2>

<p>Программа имеет аутентификацию, панели администратора и пользователя.</p>

<h3>Для запуска проекта необходимо:</h3>

<p>1. Запустить установку пакетов через composer</p>
<code>composer install</code><br>

<p>2. Настроить окружение</p>
<code>DB_DATABASE=new_taskmanager</code><br>
<code>DB_USERNAME=root</code><br>
<code>DB_PASSWORD=87654321</code><br>

<p>3. Выполнить миграции</p>
<code>php artisan migrate --seed</code><br>

<p>4. Запустить приложение</p>
<code>php artisan serve</code>


