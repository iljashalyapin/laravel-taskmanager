<h2>Менеджер задач</h2>

<p>Программа имеет аутентификацию, панели администратора и пользователя.</p>

<h3>Для запуска проекта необходимо:</h3>

<p>1. Запустить установку пакетов через composer</p>
<code>composer install</code>


<p>2. Настроить окружение</p>
<code>DB_DATABASE=new_taskmanager</code>
<code>DB_USERNAME=root</code>
<code>DB_PASSWORD=87654321</code>


<p>3. Выполнить миграции</p>
<code>php artisan migrate --seed</code>


<p>4. Запустить приложение</p>
<code>php artisan serve</code>


