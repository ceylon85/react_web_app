import React, {Component} from 'react';
import Subject from './component/Subject';
import TOC from './component/TOC';
import ReadContent from './component/ReadContent';
import CreateContent from './component/CreateContent';
import UpdateContent from './component/UpdateContent';
import Control from './component/Control';
import './App.css';

class App extends Component {
    constructor(props) { //component가 실행될 때 construnctor가 있으면 먼저 실행되서 초기화함
        super(props);
        this.max_content_id = 3;
        this.state = { //app의 내부적 상태
            mode: 'create',
            selected_content_id: 2,
            subject: {
                title: 'WEB',
                sub: 'World Wide Web'
            },
            welcome: {
                title: 'Welcome',
                desc: 'Hello React'
            },
            contents: [
                {
                    id: 1,
                    title: 'HTML',
                    desc: 'HTML is for Information'
                }, {
                    id: 2,
                    title: 'CSS',
                    desc: 'CSS is for Design'
                }, {
                    id: 3,
                    title: 'JavaScript',
                    desc: 'JavaScript is for interactive'
                }
            ]
        }
    }
    getReadContent() {
        var i = 0;
        while (i < this.state.contents.length) {
            var data = this.state.contents[i];
            if (data.id === this.state.selected_content_id) {
                return data;
                break;
            }
            i = i + 1;
        }
    }
    getContent() {
        var _title,
            _desc,
            _article = null;
        if (this.state.mode === 'welcome') {
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>

        } else if (this.state.mode === 'read') {
            var _content = this.getReadContent();
            _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

        } else if (this.state.mode === 'create') {
            _article = <CreateContent
                onSubmit={function (_title, _desc) {
                this.max_content_id = this.max_content_id + 1;
                var _contents = Array.from(this.state.contents);
                _contents.push({id: this.max_content_id, title: _title, desc: _desc});
                this.setState({contents: _contents, mode: 'read', selected_content_id: this.max_content_id});
            }.bind(this)}></CreateContent>

        } else if (this.state.mode === 'update') {
            _content = this.getReadContent();
            _article = <UpdateContent
                data={_content}
                onSubmit={function (_id, _title, _desc) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                    if (_contents[i].id === _id) {
                        _contents[i] = {
                            id: _id,
                            title: _title,
                            desc: _desc
                        };
                        break;
                    }
                    i = i + 1;
                }
                this.setState({contents: _contents, mode: 'read'});
            }.bind(this)}></UpdateContent>
        }
        return _article;
    }
    render() { //어떤 html을 그릴것인가 props나 state값이 바뀌면 해당되는 component의 render함수가 호출되어 화면이 다시 그려진다
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function () {
                    this.setState({mode: 'welcome'});
                }.bind(this)}></Subject>
                <TOC
                    onChangePage={function (id) {
                    this.setState({mode: 'read', selected_content_id: Number(id)});
                }.bind(this)}
                    data={this.state.contents}></TOC>
                <Control
                    onChangeMode={function (_mode) {
                    if (_mode === 'delete') {
                        if (window.confirm('really??')) {
                            var _contents = Array.from(this.state.contents);
                            var i = 0;
                            while (_contents.length) {
                                if (_contents[i].id === this.state.selected_content_id) {
                                    _contents.splice(i, 1);
                                    break;
                                }
                                i = i + 1;
                            }
                            this.setState({mode: 'welcome', contents: _contents});
                            alert('delete ok');
                        }
                    } else {
                        this.setState({mode: _mode});
                    }
                }.bind(this)}></Control>
                {this.getContent()}
            </div>
        );
    }
}
export default App;