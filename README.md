<h2>Менеджер задач</h2>

<p>Программа имеет аутентификацию, панели администратора и пользователя.</p>

<h3>Для запуска проекта необходимо:</h3>

<p>1. Запустить установку пакетов через composer</p>
<p><code>composer install</code></p>

<p>2. Настроить окружение</p>

<p><pre>DB_DATABASE=new_taskmanager
DB_USERNAME=root
DB_PASSWORD=87654321</pre></p>

<p>3. Выполнить миграции</p>
<p><code>php artisan migrate --seed</code></p>

<p>4. Запустить приложение</p>
<p><code>php artisan serve</code></p>

<p>Логин и пароль адмнинстратора по умолчанию: в файле <code>database/seeders/DatabaseSeeder.php</code></p>

<h3>Сторонние библиотеки:</h3>
<p><b>irazasyed/telegram-bot-sdk</b> - использован для отправки сообщений через Telegram API</p>

<h3>Используемые телеграм-боты:</h3>
<p><b>@get_id_bot</b> - для получения Chat ID пользователей</p>
<p><b>@Taskmanager_newBot</b> - для получения пользователями сообщений из основного приложения</p>

