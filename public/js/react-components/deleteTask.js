
// Удаление информации о задаче

class DeleteTask extends React.Component {
    
    //initialize an object's state in a class
    constructor(props) {
        super(props)
        this.state = { data: [] }
    }

    //ComponentDidMount is use to Connect a React app to external applications, such as web APIs or JavaScript functions
    componentDidMount() {
        //post request
        let session_value = document.getElementById('session').textContent;
        let res = axios.post('/getTasks', JSON.stringify({ session: session_value }), { headers: { 'Content-Type' : 'application/json' } }).then(res => 
        {   
            this.setState({data: res.data});
        });
    }

    render() {  
        return ( 
            <div className="maincontainer form">
                <div class="find_task">
                    <label>Find the task by ID:</label>
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
                <div class="task">
                    <label>Name of task:</label>
                    <br/>
                    <label id="taskname"></label>             
                </div>
                <br/>
                <button class="btn_delete2" disabled>Delete</button>
                <br/><br/>
            </div>
        );
    }
} 
   
function Delete_task() {
    let div = document.getElementsByClassName('menu')[0];
       
    //Очистка старой информации
    let buf = div.innerHTML;
    if (div.innerHTML.includes('<hr>')) div.innerHTML = div.innerHTML.replace(buf.substring(buf.indexOf('<hr>')), '');
       
    let str = '<hr><div id="deleteTask"> </div>';
    div.innerHTML += str;
    ReactDOM.render(<DeleteTask/>, document.getElementById('deleteTask'));
    
    // Обработчик нажатия на кнопку поиска задачи по идентификатору
    document.querySelectorAll('.btn_ok').forEach(el => el.addEventListener('click', function Find_task() {
        document.getElementById('taskname').style.fontWeight = 'Bold';
        document.getElementsByClassName('btn_delete2')[0].disabled = false;
        let session_value = document.getElementById('session').textContent;
        let res = axios.post('/getTasks', JSON.stringify({ session: session_value }), { headers: { 'Content-Type' : 'application/json' } }).then(res => 
        {   
            let _data = [];
            _data = res.data;
            _data.map((result) => { 
                if (result.id == document.getElementById('identificator').value) {
                    document.getElementById('taskname').innerText = result.taskname;
                }		    
            });
        });
    }));

    // Обработчик нажатия на кнопку удаления задачи
    document.querySelectorAll('.btn_delete2').forEach(el => el.addEventListener('click', function Delete_task() {
    
        // Удаление из БД
        let _id = parseInt(document.getElementById('identificator').value);
        let _taskname = document.getElementById('taskname').innerText;   
        var new_data = {
            id: _id,
            taskname: _taskname
        };
        let res2 = axios.post('/deleteTask', JSON.stringify(new_data), { headers: { 'Content-Type' : 'application/json' } })
            .then(res2 => {
                Show_tasks();
            })
		    .catch(function (error) { console.log(error.message); });
    }));
}