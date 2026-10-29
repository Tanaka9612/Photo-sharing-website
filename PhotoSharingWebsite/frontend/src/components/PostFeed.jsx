import Post from './Post';

function PostFeed({posts}){
    return (
        <>
            { 
                posts.map((post) =>{ 
                    return <Post key={post._id} post={post} />;
                })
            }
        </>
    )
}
export default PostFeed;