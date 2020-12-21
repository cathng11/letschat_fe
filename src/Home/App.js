import React, { Component } from 'react';
import './App.css';
import Content from '../Components/Content/Content';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      reloadHeader: true,
      onReload: '',
    }
  }

  reloadHeader= () => {
    this.setState({ reloadHeader: !this.state.reloadHeader });
  }

  onReload = (data) => {
    this.setState({ onReload: data });
  }

  render() {
    var { data, reloadHeader, onReload } = this.state;
    return (
      <div className="wrapper">
        <header className="Header">
          <Header
            key={this.props.user['Username']}
            user={this.props.user['Avatar']}
            userFirstname={this.props.user['Firstname']}
            username={this.props.user['Username']}
            infoUser={this.props.user}
            reloadHeader={reloadHeader}
            onReload={this.onReload}
          />
        </header>
        <div className="content">
          <Content
            data={data}
            infoUser={this.props.user}
            username={this.props.user['Username']}
            reloadHeader={this.reloadHeader}
            onReload={onReload}
          />
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
