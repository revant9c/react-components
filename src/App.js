import React, { Component } from 'react';
import './App.css';
import Excel from './components/Excel';

class App extends Component {
    render() {
        var headers = ["Book", "Author", "Language", "Published", "Sales"],
            data = [
                ["The Lord of the Rings", "Tolkien", "English", "1944-1955", "150 million"],
                ["Dream of Red Chamber", "Cao Xuequin", "Chinese", "1950-1952", "100 million"],
                ["zebra", "Messi", "Spanish", "100-200", "1000 million"]
            ];
        return (
            <div>
                <Excel headers={headers} data={data} />
            </div>
        );
    }
}

export default App;
