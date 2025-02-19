<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Telegram\Bot\Laravel\Facades\Telegram;

class AxiosController extends Controller
{
    public function getUsers(Request $request)
    {
        $session = $request->session;
        
        if ($session && (strlen($session) != 0)) {
            $users = array();
            $users = DB::select('select * from users');
            return json_encode($users);
        }
    }

    public function addUser(Request $request)
    {
        $id = $request->id;
        $username = $request->username;
        $chat_id = $request->chat_id;
        $password = $request->password;
        $hash_password = hash('sha256', $password);

        DB::insert('insert into users (id, name, chat_id, password) values (?, ?, ?, ?)', [$id, $username, $chat_id, $hash_password]);
    }

    public function updateUser(Request $request)
    {
        $id = $request->id;
        $username = $request->username;
        $chat_id = $request->chat_id;
        $password = $request->password;
        $hash_password = hash('sha256', $password);

        DB::update('update users set chat_id = ?, password = ? where id = ? and name = ?', [$chat_id, $hash_password, $id, $username]);
    }

    public function deleteUser(Request $request)
    {
        $id = $request->id;
        $username = $request->username;

        DB::delete('delete from users where id = ? and name = ?', [$id, $username]);
    }

    public function getTasks(Request $request)
    {
        $session = $request->session;
        
        if ($session && (strlen($session) != 0)) {
            $tasks = array();
            $tasks = DB::select('select * from tasks');
            return json_encode($tasks);
        }
    }

    public function addTask(Request $request)
    {
        $id = $request->id;
        $taskname = $request->taskname;
        $comment = $request->comment;
        $status = $request->status;
        $attachments = $request->attachments;
        $executor = $request->executor;

        $res = DB::select('select chat_id from users where name = ?', [$executor]);
        $chat_id = $res[0]->chat_id;

        $text = "New task was added.\n\nTaskName: " . $taskname . ".\n\nComment: " . $comment . ".\n\nStatus: " . $status . ".\n\nAttachments: " . $attachments . ".";

        Telegram::sendMessage(['chat_id' => $chat_id, 'text' => $text]);

        DB::insert('insert into tasks (id, taskname, comment, status, attachments, executor) values (?, ?, ?, ?, ?, ?)', [$id, $taskname, $comment, $status, $attachments, $executor]);
    }

    public function updateTask(Request $request)
    {
        $id = $request->id;
        $taskname = $request->taskname;
        $comment = $request->comment;
        $status = $request->status;
        $attachments = $request->attachments;
        $executor = $request->executor;

        $status_arr = explode(":", $status);
        
        if (count($status_arr) > 1) {
            $res = DB::select('select chat_id from users where name = ?', [$executor]);
            $chat_id = $res[0]->chat_id;

            $text = "Task \"" . $taskname . "\" was updated.\n\nNew status: " . $status_arr[0] . ".";

            Telegram::sendMessage(['chat_id' => $chat_id, 'text' => $text]);
        }

        DB::update('update tasks set comment = ?, status = ?, attachments = ?, executor = ? where id = ? and taskname = ?', [$comment, $status_arr[0], $attachments, $executor, $id, $taskname]);
    }

    public function deleteTask(Request $request)
    {
        $id = $request->id;
        $taskname = $request->taskname;

        DB::delete('delete from tasks where id = ? and taskname = ?', [$id, $taskname]);
    }
}