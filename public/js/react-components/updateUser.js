
//Изменение информации о пользователе

class UpdateUser extends React.Component {
    
    //initialize an object's state in a class
    constructor(props) {
        super(props)
        this.state = { data: [] }
    }

    //ComponentDidMount is use to Connect a React app to external applications, such as web APIs or JavaScript functions
    componentDidMount() {
        //post request
        let session_value = document.getElementById('session').textContent;
        let res = axios.post('/getUsers', JSON.stringify({ session: session_value }), { headers: { 'Content-Type' : 'application/json' } }).then(res => 
        {   
            this.setState({data: res.data});
        });
    }

    render() {  
        return ( 
            <div className="maincontainer form">
                <div class="find_user">
                    <label>Find the user by ID:</label>
                    &ensp;&nbsp;
                    <select id="identificator">
                        {this.state.data.map((result) => {
                            return (        
                                <option>{result.id}</option>          
                            )
                        })} 
                    </select>
                    &ensp;&nbsp;
                    <button class="btn_ok">OK</button>
                </div>
                <div class="user">
                    <label>Name of user:</label>
                    <br/>
                    <label id="username"></label>             
                </div>
                <label>Change Chat ID for user:</label>
                <br/>
                <input maxLength={16} id="chat_id" placeholder="8-16 symbols" disabled/>
                <br/><br/>
                <label>Change password for user:</label>
                <br/>
                <input maxLength={16} type="password" id="password" placeholder="8-16 symbols" disabled/>
                <br/><br/>
                <button class="btn_save" disabled>Save</button>
                <br/><br/>
            </div>
        );
    }
} 
   
function Update_user() {
    let div = document.getElementsByClassName('menu')[0];
       
    //Очистка старой информации
    let buf = div.innerHTML;
    if (div.innerHTML.includes('<hr>')) div.innerHTML = div.innerHTML.replace(buf.substring(buf.indexOf('<hr>')), '');
       
    let str = '<hr><div id="updateUser"> </div>';
    div.innerHTML += str;
    ReactDOM.render(<UpdateUser/>, document.getElementById('updateUser'));
    
    // Обработчик нажатия на кнопку поиска пользователя по идентификатору
    document.querySelectorAll('.btn_ok').forEach(el => el.addEventListener('click', function Find_user() {
        document.getElementById('username').style.fontWeight = 'Bold';
        document.getElementById('chat_id').disabled = false;
        document.getElementById('password').disabled = false;
        document.getElementsByClassName('btn_save')[0].disabled = false;
        let session_value = document.getElementById('session').textContent;
        let res = axios.post('/getUsers', JSON.stringify({ session: session_value }), { headers: { 'Content-Type' : 'application/json' } }).then(res => 
        {   
            let _data = [];
            _data = res.data;
            _data.map((result) => { 
                if (result.id == document.getElementById('identificator').value) {
                    document.getElementById('username').innerText = result.name;
                    document.getElementById('chat_id').value = result.chat_id;
                }		    
            });
        });
    }));

    // Обработчик нажатия на кнопку сохранения пользователя в БД
    document.querySelectorAll('.btn_save').forEach(el => el.addEventListener('click', function Save_user() {
    
        // Запись в БД
        let _id = parseInt(document.getElementById('identificator').value);
        let _username = document.getElementById('username').innerText;
        let new_chat_id = document.getElementById('chat_id').value;
        let new_password = document.getElementById('password').value;       
        var new_data = {
            id: _id,
            username: _username,
            chat_id: new_chat_id,
            password: new_password
        };
        let res2 = axios.post('/updateUser', JSON.stringify(new_data), { headers: { 'Content-Type' : 'application/json' } })
            .then(res2 => {
                Show_users();
            })
		    .catch(function (error) { console.log(error.message); });
    }));
}