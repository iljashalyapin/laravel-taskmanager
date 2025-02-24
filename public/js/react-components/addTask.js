
//Добавление новой задачи

class AddTask extends React.Component {
    
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
                <div class="task">
                    <label>Input name of task:</label>
                    <br/>
                    <input maxLength={254} id="taskname" placeholder="4-254 symbols"></input>
                    <br/>
                    <label id="taskname_error"></label>           
                </div>
                <label>Add comment for task:</label>
                <br/>
                <textarea maxLength={254} id="comment" placeholder="4-254 symbols"></textarea>
                <br/><br/>
                <label>Set status for task:</label>
                <br/>
                <select id="status">
                    <option>New</option>
                    <option>In progress</option>
                    <option>Closed</option>
                    <option>On hold</option>
                    <option>Rejected</option>
                </select>
                <br/><br/>
                <label>Add attachments for task:</label>
                <br/>
                <textarea maxLength={254} id="attachments" placeholder="Input the absolute file paths separated by a character ';'"></textarea>
                <br/><br/>
                <label>Set executor for task:</label>
                <br/>
                <select id="executor">
                    {this.state.data.map((result) => {
                        return (        
                            <option>{result.name}</option>          
                        )
                    })}
                </select>
                <br/><br/>
                <button class="btn_save">Save</button>
                <br/><br/>
            </div>
        );
    }
} 
   
function Add_task() {
    let div = document.getElementsByClassName('menu')[0];
       
    //Очистка старой информации
    let buf = div.innerHTML;
    if (div.innerHTML.includes('<hr>')) div.innerHTML = div.innerHTML.replace(buf.substring(buf.indexOf('<hr>')), '');
       
    let str = '<hr><div id="addTask"> </div>';
    div.innerHTML += str;
    ReactDOM.render(<AddTask/>, document.getElementById('addTask'));
    
    // Обработчик нажатия на кнопку сохранения нового пользователя в БД
    document.querySelectorAll('.btn_save').forEach(el => el.addEventListener('click', function Save_task() {
           
        document.getElementById('taskname_error').style.color = "Red";
        document.getElementById('taskname_error').innerText = "";
                
        let existing_task = false;
        let session_value = document.getElementById('session').textContent;
        let res = axios.post('/getTasks', JSON.stringify({ session: session_value }), { headers: { 'Content-Type' : 'application/json' } }).then(res =>           
		{
            let _data = [];
		    _data = res.data;
		    let last_id = 0;
		    _data.map((result) => { 
		        last_id = result.id;
		        if (result.taskname == document.getElementById('taskname').value)
		            existing_task = true;
		    });
		    if (existing_task == true) {
		        document.getElementById('taskname_error').innerText = "Task with inputed name already exists.";
		    }
		    else {
		        // Запись в БД
		        let new_id = parseInt(last_id) + 1;
		        let new_taskname = document.getElementById('taskname').value;
                if (!new_taskname || new_taskname.length == 0)
                    document.getElementById('taskname_error').innerText = "Taskname is empty.";
                else {
                    let new_comment = document.getElementById('comment').value;
                    let new_status = document.getElementById('status').value;
                    let new_attachments = document.getElementById('attachments').value;
                    let new_executor = document.getElementById('executor').value;
                    var new_data = {
                        id: new_id,
                        taskname: new_taskname,
                        comment: new_comment,
                        status: new_status,
                        attachments: new_attachments,
                        executor: new_executor
                    };
                    let res2 = axios.post('/addTask', JSON.stringify(new_data), { headers: { 'Content-Type' : 'application/json' } })
                    .then(res2 => {
                        Show_tasks();
                    })
                    .catch(function (error) { console.log(error.message); });
                }
            }
        });
    }));
}