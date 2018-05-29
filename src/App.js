import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AllComponents from "./components/AllComponents";
import Excel from "./components/Excel";
import Button from "./components/Button";

class App extends Component {
    render() {
        var headers = ["Book", "Author", "Language", "Published", "Sales"],
            data = [
                ["The Lord of the Rings", "Tolkien", "English", "1944-1955", "150 million"],
                ["Dream of Red Chamber", "Cao Xuequin", "Chinese", "1950-1952", "100 million"],
                ["zebra", "Messi", "Spanish", "100-200", "1000 million"]
            ];
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={AllComponents} />
                        <Route exact path="/excel" render={(props) => <Excel data={data} headers={headers} {...props}/>} />
                        <Route exact path="/button" render={(props) => <Button text='Submit' {...props}/>} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
