import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import {Nav} from '../pages';

class App extends Component{
    render() {
        return (
            <div>
                <Switch>
                    {/* <Route exact path="/todo/create/:id" component={Nav}/>
                    <Route exact path="/todo/:id" component={Nav}/> */}
                    <Route path="/" component={Nav} />
                </Switch>
            </div>
        );
    }
}

export default App;