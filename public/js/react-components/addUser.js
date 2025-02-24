
//Добавление нового пользователя

class AddUser extends React.Component {
    
    //initialize an object's state in a class
    constructor(props) {
        super(props)
    }

    render() {  
        return ( 
            <div className="maincontainer form">
                <div class="user">
                    <label>Input name of user:</label>
                    <br/>
                    <input maxLength={16} id="username" placeholder="4-16 symbols"/>
                    <br/>
                    <label id="username_error"></label>             
                </div>
                <label>Add Chat ID for user:</label>
                <br/>
                <input maxLength={16} id="chat_id" placeholder="8-16 symbols"/>
                <br/><br/>
                <label>Set password for user:</label>
                <br/>
                <input maxLength={16} type="password" id="password" placeholder="8-16 symbols"/>
                <br/><br/>
                <button class="btn_save">Save</button>
                <br/><br/>
            </div>
        );
    }
} 
   
function Add_user() {
    let div = document.getElementsByClassName('menu')[0];
       
    //Очистка старой информации
    let buf = div.innerHTML;
    if (div.innerHTML.includes('<hr>')) div.innerHTML = div.innerHTML.replace(buf.substring(buf.indexOf('<hr>')), '');
       
    let str = '<hr><div id="addUser"> </div>';
    div.innerHTML += str;
    ReactDOM.render(<AddUser/>, document.getElementById('addUser'));
    
    // Обработчик нажатия на кнопку сохранения нового пользователя в БД
    document.querySelectorAll('.btn_save').forEach(el => el.addEventListener('click', function Save_user() {
           
        document.getElementById('username_error').style.color = "Red";
        document.getElementById('username_error').innerText = "";
                   
        let existing_user = false;
        let session_value = document.getElementById('session').textContent;
        let res = axios.post('/getUsers', JSON.stringify({ session: session_value }), { headers: { 'Content-Type' : 'application/json' } }).then(res =>
        {   
            let _data = [];
            _data = res.data;
            let last_id = 0;
            _data.map((result) => { 
                last_id = result.id;
                if (result.name == document.getElementById('username').value)
                   existing_user = true;
            });
            if (existing_user == true) {
                document.getElementById('username_error').innerText = "User with inputed name already exists.";
            }
            else {
                // Запись в БД
                let new_id = parseInt(last_id) + 1;
                let new_username = document.getElementById('username').value;
                if (!new_username || new_username.length == 0)
                    document.getElementById('username_error').innerText = "Username is empty.";
                else {
                    let new_chat_id = document.getElementById('chat_id').value;
                    let new_password = document.getElementById('password').value;
                    var new_data = {
                        id: new_id,
                        username: new_username,
                        chat_id: new_chat_id,
                        password: new_password
                    };	    
                    let res2 = axios.post('/addUser', JSON.stringify(new_data), { headers: { 'Content-Type' : 'application/json' } })
                    .then(res2 => {
                        Show_users();
                    })
                    .catch(function (error) { console.log(error.message); });
                }
            }
        });
    }));
}