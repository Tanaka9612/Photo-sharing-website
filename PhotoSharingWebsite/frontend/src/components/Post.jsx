function Post({post}){
    return (
        <div className="post">
            <div className="post-image">
                <img src={post.image} alt={post.caption} />
            </div>
            <div className="post-comments">
                {post.comments.map((comment, index) => (
                    <div key={index}>
                        <strong>{comment.username}</strong>
                        <p>{comment.text}</p>
                    </div>
                    ))}
            </div>
        </div>
    )
}