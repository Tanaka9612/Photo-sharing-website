import Post from './Post';

function PostFeed({posts}){
    return (
        <>
            { 
                posts.map((post, index) =>{
                    <div key={index}>
                        <Post post={post}/>
                    </div>
                })
            }
                
            
            
        </>
    )
}

export default PostFeed;