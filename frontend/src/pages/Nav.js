import React, {Component} from 'react';
import {Link,Route,Switch, withRouter} from 'react-router-dom';
import {TodoList,Mytt,TodoCreate,TodoTimer} from '../pages';
import './style.css';

class Nav extends Component {
    constructor(props){
        super(props);
        this.parentFunction=this.parentFunction.bind(this);
        this.timerFunction=this.timerFunction.bind(this);
        this.state={
            todo_date:[],
            id:0,
            date:null,
            saveData:null,
            timerData:null,
        };
    }

    parentFunction(data){
        this.setState({saveData:data});
    }

    timerFunction(data){
        this.setState({timerData:data});
    }

    componentDidMount(){
        fetch("http://localhost:3001/todo")
        .then(res=>res.json())
        .then((json)=>{this.setState({todo_date:json.todo_date})});
    }

    setData(id,date){
        let get_id = id;
        let get_date = date;
        this.setState({id:get_id,date:get_date});
    }

    render(){
        // Body 들어갈 컴포넌트
        const data = this.state.todo_date.map((item, index)=>{
            let button = null;
            button = 
            <li><Link to={"/todo/"+item.id}><button onClick={()=>this.setData(item.id,item.create_date.split("T")[0])}>{item.create_date.split("T")[0]}</button></Link></li>
            return (
            <ul key={index}>
                {button}
            </ul>
            )
        });
        return(
            <div clasName="body">
                <div className="top">
                    <div className="container">
                        <div className="logo">
                            <h1><a href="/">ToDo</a></h1>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="nav">
                        <div className="container">
                            <h3>날짜</h3>
                            {data}
                            <button onClick={this.createData}>추가</button>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path={"/todo/create"}>
                            <TodoCreate id={this.state.saveData}/>
                        </Route>
                        <Route exact path={"/todo/:id"}>
                            <TodoList id={this.state.id} date={this.state.date} parentFunction={this.parentFunction} timerFunction={this.timerFunction}/>
                        </Route>
                        <Route exact path={"/todo/:id/timer"}>
                            <TodoTimer data={this.state.timerData}/>
                        </Route>
                        <Route exact path={"/"}>
                            <Mytt/>
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
    
    createData(){
        fetch("http://localhost:3001/add")
        .then(res=>res.json())
        .then((json)=>{
            if(json.todo_date === 'err'){
                alert("이미 생성 되어있습니다.");
            }
            else{
                this.setState({todo_date:json.todo_date});
                window.location.reload();
            }
        })
    }

}

export default withRouter(Nav);