
//Вывод информации о задачах

class ListTasks extends React.Component {

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
            <div className="maincontainer">
                <div className="container mb-5 mt-5 text-left">      
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Taskname</th>
                                <th>Comment</th>
                                <th>Status</th>
                                <th>Attachments</th>
                                <th>Executor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((result) => {
                                return (        
                                    <tr>
                                        <td>{result.id}</td>              
                                        <td>{result.taskname}</td>
                                        <td>{result.comment}</td>
                                        <td>{result.status}</td>              
                                        <td>{result.attachments}</td>
                                        <td>{result.executor}</td>
                                    </tr>          
                                )
                            })}     
                        </tbody>
                    </table>    
                </div>
            </div>
        );
    }
}

function Show_tasks() {
    let div = document.getElementsByClassName('menu')[0];
    
    //Очистка старой информации
    let buf = div.innerHTML;
    if (div.innerHTML.includes('<hr>')) div.innerHTML = div.innerHTML.replace(buf.substring(buf.indexOf('<hr>')), '');
    
    let str = '<hr><div id="listTasks"> </div>';
    div.innerHTML += str;
    ReactDOM.render(<ListTasks/>, document.getElementById('listTasks'));
}