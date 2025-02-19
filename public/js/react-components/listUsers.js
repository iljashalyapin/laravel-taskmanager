
//Вывод информации о пользователях

class ListUsers extends React.Component {

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
            <div className="maincontainer">
                <div className="container mb-5 mt-5 text-left">      
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Chat ID</th>       
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((result) => {
                                return (        
                                    <tr>
                                        <td>{result.id}</td>              
                                        <td>{result.name}</td>
                                        <td>{result.chat_id}</td>
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

function Show_users() {
    let div = document.getElementsByClassName('menu')[0];
    
    //Очистка старой информации
    let buf = div.innerHTML;
    if (div.innerHTML.includes('<hr>')) div.innerHTML = div.innerHTML.replace(buf.substring(buf.indexOf('<hr>')), '');
    
    let str = '<hr><div id="listUsers"> </div>';
    div.innerHTML += str;
    ReactDOM.render(<ListUsers/>, document.getElementById('listUsers'));
}