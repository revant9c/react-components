import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            sortBy: null,
            descending: false,
            edit: null,
            search: false,
            preSearchData: null
        };
        this.log = [];
        this.sortTableData = this.sortTableData.bind(this);
        this.changeSortIcon = this.changeSortIcon.bind(this);
        this.editTableData = this.editTableData.bind(this);
        this.saveData = this.saveData.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.search = this.search.bind(this);
        this.logSetState = this.logSetState.bind(this);
        this.replay = this.replay.bind(this);
    }

    componentDidMount() {
        document.onkeydown = (event) => {
            if (event.altKey && event.shiftKey && event.keyCode === 82) {
                this.replay();
            }
        }
    }

    /**
     * This method will replay all the changes that happen in the state object
     */
    replay() {
        if (this.log.length === 0) {
            console.warn("No state to replay yet");
            return;
        }

        let id = -1,
            interval = setInterval(() => {
                id++;
                if (id === this.log.length - 1) {
                    clearInterval(interval);
                }
                this.setState(this.log[id]);
            }, 1000);

    }

    /**
     * This method adds state to the log array
     * @param newState
     */
    logSetState(newState) {
        this.log.push(JSON.parse(JSON.stringify(
            this.log.length === 0 ? this.state : newState
        )));

        this.setState(newState);
    }

    /**
     * Method to sort table data
     * @param event
     */
    sortTableData(event) {
        const columnName = event.target.cellIndex,
            data = Array.from(this.state.data);
        let descending = this.state.sortBy === columnName && !this.state.descending;

        data.sort((a, b) => descending ? a[columnName] < b[columnName] ? 1 : -1 : a[columnName] > b[columnName] ? 1 : -1);

        this.logSetState({
            data: data,
            sortBy: columnName,
            descending: descending
        })
    }

    /**
     * Method to edit table cell data
     * @param event
     */
    editTableData(event) {
        this.logSetState({
            edit: {
                row: parseInt(event.target.dataset.row, 10),
                cell: event.target.cellIndex
            }
        })
    }

    /**
     * Method to change the icon when table header is clicked
     * @param title
     * @param headerId
     * @returns title
     */
    changeSortIcon(title, headerId) {
        if (this.state.sortBy === headerId) {
            title += this.state.descending ? '\u2193' : '\u2191'
        }
        return title;
    }

    /**
     * Method to save data once you edit the table cell
     * @param event
     */
    saveData(event) {
        event.preventDefault();
        let input = event.target.firstElementChild,
            data  = Array.from(this.state.data);

        data[this.state.edit.row][this.state.edit.cell] = input.value;

        this.logSetState({
            edit: null,
            data: data
        })
    }

    /**
     * Method to enable and disable search
     */
    toggleSearch() {
        if (this.state.search) {
            this.logSetState({
                data: this.preSearchData,
                search: false
            });
            this.preSearchData = null;
        } else {
            this.preSearchData = this.state.data;
            this.logSetState({
                search: true
            })
        }

    }

    /**
     * Method for searching in the table
     * @param event
     */
    search(event) {
        let needle = event.target.value.toLowerCase(),
            id, searchData;

        if(!needle) {
            this.logSetState({data: this.preSearchData});
            return
        }

        id = event.target.dataset.id;
        searchData = this.preSearchData.filter((row) => row[id].toString().toLowerCase().indexOf(needle) > -1);
        this.logSetState({data: searchData});
    }


    render () {
        return (
            <div>
                {this._renderToolbar()}
                {this._renderTable()}
            </div>
        );
    }

    /**
     * Method to add input boxes for each td
     * @returns {*}
     * @private
     */
    _renderSearch() {
        const headers = this.props.headers;
        if (!this.state.search) {
            return null;
        }

        return (
          <tr onChange={this.search}>
              {headers.map((_ignore, id) => <td key={id}><input data-id={id} type="text" /></td>)}
          </tr>
        );
    }

    _renderToolbar() {
        return (
          <div>
              <button onClick={this.toggleSearch}>{(this.state.search) ? "Start searching... " : "Search"}</button>
          </div>
        );
    }

    _renderTable() {
        const headers = this.props.headers;
        return (
            <table>
                <thead onClick={this.sortTableData}>
                    <tr>
                        {headers.map((title, headerId) => <th key={headerId}>{this.changeSortIcon(title, headerId)}</th> )}
                    </tr>
                </thead>
                <tbody onDoubleClick={this.editTableData}>
                    {this._renderSearch()}
                    {this.state.data.map((tRow, rowId) =>
                        <tr key={rowId}>
                            {
                                tRow.map((tData, tdId) => {
                                    let content = tData;
                                    let edit = this.state.edit;
                                    if (edit && edit.row === rowId && edit.cell === tdId) {
                                        content = <form onSubmit={this.saveData}><input type="text" defaultValue={content} /></form>
                                        return <td data-row={rowId} key={tdId}>{content}</td>
                                    }
                                    return <td data-row={rowId} key={tdId}>{content}</td>
                                })
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

}

Excel.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};


export default Excel;