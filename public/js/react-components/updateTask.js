
//Изменение информации о задаче

class UpdateTask extends React.Component {
    
    //initialize an object's state in a class
    constructor(props) {
        super(props)
        this.state = { users_data: [], tasks_data: [] }
    }

    //ComponentDidMount is use to Connect a React app to external applications, such as web APIs or JavaScript functions
    componentDidMount() {
        //post requests
        let session_value = document.getElementById('session').textContent;
        let res = axios.post('/getUsers', JSON.stringify({ session: session_value }), { headers: { 'Content-Type' : 'application/json' } }).then(res => 
        {   
            this.setState({users_data: res.data});
        });
        res = axios.post('/getTasks', JSON.stringify({ session: session_value }), { headers: { 'Content-Type' : 'application/json' } }).then(res => 
        {   
            this.setState({tasks_data: res.data});
        });
    }

    render() {  
        return ( 
            <div className="maincontainer form">
                <div class="find_task">
                    <label>Find the task by ID:</label>
                    &ensp;&nbsp;
                    <select id="identificator">
                        {this.state.tasks_data.map((result) => {
                            return (        
                                <option>{result.id}</option>          
                            )
                        })} 
                    </select>
                    &ensp;&nbsp;
                    <button class="btn_ok">OK</button>
                </div>
                <div class="task">
                    <label>Name of task:</label>
                    <br/>
                    <label id="taskname"></label>             
                </div>
                <label>Change comment for task:</label>
                <br/>
                <textarea maxLength={254} id="comment" placeholder="4-254 symbols" disabled></textarea>
                <br/><br/>
                <label>Change status for task:</label>
                <br/>
                <select id="status" disabled><option>New</option><option>In progress</option><option>Closed</option><option>On hold</option><option>Rejected</option></select>
                <br/><br/>
                <label>Change attachments for task:</label>
                <br/>
                <textarea maxLength={254} id="attachments" placeholder="Input the absolute file paths separated by a character ';'" disabled></textarea>
                <br/><br/>
                <label>Change executor for task:</label>
                <br/>
                <select id="executor" disabled>
                    {this.state.users_data.map((result) => {
                        return (        
                            <option>{result.name}</option>          
                        )
                    })}
                </select>
                <br/><br/>
                <button class="btn_save" disabled>Save</button>
                <br/><br/>
            </div>
        );
    }
} 
   
function Update_task() {
    let div = document.getElementsByClassName('menu')[0];
       
    //Очистка старой информации
    let buf = div.innerHTML;
    if (div.innerHTML.includes('<hr>')) div.innerHTML = div.innerHTML.replace(buf.substring(buf.indexOf('<hr>')), '');
       
    let str = '<hr><div id="updateTask"> </div>';
    div.innerHTML += str;
    ReactDOM.render(<UpdateTask/>, document.getElementById('updateTask'));
    
    let _status = "";
    
    // Обработчик нажатия на кнопку поиска задачи по идентификатору
    document.querySelectorAll('.btn_ok').forEach(el => el.addEventListener('click', function Find_task() {
        document.getElementById('taskname').style.fontWeight = 'Bold';
        document.getElementById('comment').disabled = false;
        document.getElementById('status').disabled = false;
        document.getElementById('attachments').disabled = false;
        document.getElementById('executor').disabled = false;
        document.getElementsByClassName('btn_save')[0].disabled = false;
        let session_value = document.getElementById('session').textContent;
        let res = axios.post('/getTasks', JSON.stringify({ session: session_value }), { headers: { 'Content-Type' : 'application/json' } }).then(res => 
        {   
            let _data = [];
            _data = res.data;
            _data.map((result) => { 
                if (result.id == document.getElementById('identificator').value) {
                    document.getElementById('taskname').innerText = result.taskname;
        	        document.getElementById('comment').value = result.comment;
        	        _status = result.status;
        	        document.getElementById('status').value = _status;
        	        document.getElementById('attachments').value = result.attachments;
        	        document.getElementById('executor').value = result.executor;
                }	    
            });
        });
    }));

    // Обработчик нажатия на кнопку сохранения задачи в БД
    document.querySelectorAll('.btn_save').forEach(el => el.addEventListener('click', function Save_task() {
    
        // Запись в БД
        let _id = parseInt(document.getElementById('identificator').value);
        let _taskname = document.getElementById('taskname').innerText;
        let new_comment = document.getElementById('comment').value;
        let new_status = document.getElementById('status').value;       
        let new_attachments = document.getElementById('attachments').value;
        let new_executor = document.getElementById('executor').value;
        if (_status != new_status) new_status += ":changed";
        var new_data = {
            id: _id,
		    taskname: _taskname,
		    comment: new_comment,
		    status: new_status,
		    attachments: new_attachments,
		    executor: new_executor
        };
        let res2 = axios.post('/updateTask', JSON.stringify(new_data), { headers: { 'Content-Type' : 'application/json' } })
            .then(res2 => {
                Show_tasks();
            })
		    .catch(function (error) { console.log(error.message); });
    }));
}