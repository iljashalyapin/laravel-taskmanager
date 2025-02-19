<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $username = $request->username;
        $password = $request->password;
        $admin_role = $request->admin_role;
        $hash_password = hash('sha256', $password);

        $found = false;

        if ($admin_role == true) {
            $admins = DB::select('select * from admins where name collate utf8mb4_bin = ? and password = ?', [$username, $hash_password]);
            if ($admins && (count($admins) != 0)) {
                $found = true;
                return view('admin_home', ['name' => $username]);
            }
        }
        else {
            $users = DB::select('select * from users where name collate utf8mb4_bin = ? and password = ?', [$username, $hash_password]);
            if ($users && (count($users) != 0)) {
                $found = true;
                return view('user_home', ['name' => $username]);
            }
        }

        return back()->with(
            'error', 'Incorrect username or password!',
        );
    }
}