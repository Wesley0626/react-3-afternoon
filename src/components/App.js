import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'
import Header from './Header/Header'
import Compose from './Compose/Compose'

import './App.css';



class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(res => {
      this.setState({posts: res.data})
      console.log(res)
    })
  }

  updatePost(id, text) {
  axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then(res =>{
    this.setState({posts: res.data})
  })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(res=> {
      this.setState({ posts: res.data})
    })
  }

  createPost(text) {
    axios.post("https://practiceapi.devmountain.com/api/posts", {text}).then(res => {
      this.setState({posts: res.data})
    })
  }

  // searchPost()

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

            
          <Compose createPostFn={this.createPost} />
          {posts.map((element, i) => {
            return <Post 
            key={element.id} 
            text={posts[i].text} 
            date={posts[i].date} 
            updatePostFn={this.updatePost} 
            id={element.id}
            deletePostFn={this.deletePost} 
            />
          })}
        </section>
      </div>
    );
  }

}

export default App;


