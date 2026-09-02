import NavigationBar from './NavigationBar';
import PostFeed from './PostFeed'

function Home(){
    return(
        <div className="home">
            <NavigationBar/>
            <PostFeed/>
        </div>
    )
}

export default Home;