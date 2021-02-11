import React, {Component} from 'react';

class Nav extends Component {
    constructor(props){
        super(props);
        this.createData = this.createData.bind(this);
        this.state = {
            todo_date:[]
        }
    }
    componentDidMount(){
        fetch("http://localhost:3001/")
        .then(res=>res.json())
        .then((json)=>{this.setState({todo_date:json.todo_date})})
    }

    render(){
        const data = this.state.todo_date.map((dat,index)=>{
            return(
                <ul key={index}>
                    <li><a href={()=>this.getData(dat.id,dat.create_date.split("T")[0])}>{dat.create_date.split('T')[0]}</a></li>
                </ul>
            )
        });
        return(
            <div className="container">
                <h2>ToDo</h2>
                {data}
                <div>
                    {/* 버튼 클릭시 투두 리스트 날짜 오늘 날짜로 생성됨에 따라 본문에 할일 추가 할 수 있는 페이지가 생성되는것임. */}
                    <button onClick={this.createData}>추가</button>
                </div>
            </div>
        )
    }
    getData(id,date){
        fetch(`http://localhost:3001/todo/get?id=${id}&date=${date}`)
        .then(res=>res.json())
        .then(json =>{
            if(json.todo === 'err'){
                alert("데이터가 없습니다.");
            }
            else{
                this.state.todo
            }
        })
    }
    createData(){
        fetch("http://localhost:3001/add",{method:"POST"})
        .then(res=>res.json())
        .then((json)=>{
            if(json.todo_date === 'err'){
                alert("이미 생성 되어있습니다.");
            }
            else{
                this.setState({todo_date:json.todo_date});
            }
        })
    }
}


export default Nav;