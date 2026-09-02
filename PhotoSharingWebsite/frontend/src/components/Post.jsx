function Post({post}){
    return (
        <div className="post">
            {/* <h1>Post {post.id}</h1> */}
            <div className="post-image">
                <img src={post.image} alt={post.caption} />
            </div>
            <div className="post-comments">
                {post.comments.map((comment, index) => (
                    <div key={index} className="comments">
                        <strong>{comment.username}</strong>
                        <p>{comment.text}</p>
                    </div>
                    ))}
                <div className="comment-form">
                    <form action="">
                        <input/>
                        <button>comment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Post;