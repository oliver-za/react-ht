import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import axios from '../../../axios'
import Post from '../../../components/Post/Post'
import './Posts.css'

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount(){
        console.log(this.props);
        axios.get("/posts")
            .then(response => {
                const posts = response.data.slice(0,6)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'C-V-L-R'
                    }
                })

                this.setState({posts: updatedPosts})
            // console.log(response)
        })
        .catch(error => {
            console.log(error)
            // this.setState({
            //     error: true
            // })
        }) 
    }

    postSelectedHandler = (id) => {
        this.props.history.push({
            pathname: '/' + id
        });
    }
    
    render(){
        let posts = <p style={{textAlign: 'center'}}> Error: Something went wrong!</p>
        if (!this.state.error){
            posts = this.state.posts.map(post => {
            return (
                // <Link to={'/' + post.id} key={post.id}>
                        <Post   title={post.title}
                                key={post.id} 
                                author={post.author}
                                clickd={() => this.postSelectedHandler(post.id)} />
                // {/* </Link> */}
                );
        })
    }

        return (
            <section className="Posts">
            {posts}
            </section>
        )
    }
}

export default Posts