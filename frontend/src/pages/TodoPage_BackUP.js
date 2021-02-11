import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import './todopage.css';

class TodoPage extends Component {
    constructor(props){
        super(props);
        this.state={
            todo_date:[],
        };
    }

    componentDidMount(){
        fetch("http://localhost:3001/todo")
        .then(res=>res.json())
        .then((json)=>{this.setState({todo_date:json.todo_date})})
    }

    render(){
        const data = this.state.todo_date.map((item, index)=>{
            return (
                <ul key={index}>
                    <Link to={`/todo/${item.id}`}>
                    <li><button>{item.create_date.split('T')[0]}</button></li>
                    </Link>
                </ul>
            )
        });
        return(
            <div className="body">
                <div className="top">
                    <div className="container">
                        <div className="logo">
                            <h1>ToDo</h1>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="nav">
                        <div className="container">
                            <h3>날짜</h3>
                            {data}
                            <button>추가</button>
                        </div>
                    </div>
                    <div className="main_detail">
                        <div className="container">
                            <form action="/" method="POST">
                            <ul>
                                <li><label>ToDo</label></li>
                                <li><input type="text"/></li>
                                <li><label>Color</label></li>
                                <li><input type="text"/></li>
                                <button type="submit">저장</button>
                                <button type="cancel">취소</button>
                            </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoPage;