# Photo-sharing-website
- A website for users to share photos
- A profile page 
- Home Page ()
- Post page

**Required features**
[X] A user should be able to go to their profile page when they are logged in.
● The profile must have a profile image.
o BONUS: allow users to add an image using drag-and-drop.
o BONUS: come up with a way to randomise the placeholder image so that each one is different in some way. This should go beyond simply having a few images to select from.
● A profile must display appropriate personal information about a user, e.g., name, username (if appropriate), pronouns, short bio, links to other social media, etc. Look at other platforms/websites for ideas/guidance on what to include.
Note: Since all this information will be publicly visible, no private information must be shown.
● Each user's list of friends should appear on their profile but should only be visible if the logged-in user is friends with the user whose profile they are viewing. (Users should also be able to view their own list of friends on their profile.)
● Users must be able to edit the appropriate information on their profile in a logical and intuitive manner.
● When you visit another user's profile, it must clearly indicate your current friendship status (e.g., friends, friend request pending, or not friends).
o Any user can send another user a friend request, which must be accepted before they become friends. Once two users are friends, each user's posts will appear in the other's local activity feed and they can view each other's list of friends on their profiles.
o BONUS: Allow users to mark other users as favourites so that their posts appear first in the activity feed.
● There must be a logical way to manage friendships between users.
● All the user’s posts and albums must appear on their profile page. You must come up with a sensible and visually appealing way to display this. Keep in mind that there might be many posts and many albums with many images inside each, which means you must come up with an intuitive and visually appealing way to provide access to each.

Posts
A post in this context refers to an image with a text description, and one or more hashtags. The following applies with regards to creating and editing posts:
● Any user can create a post, making them the owner of that post. When creating a post, the user must be able to:
o Add an image, text description, and hashtags. You can decide whether users should be able to add them to the text description or in a separate input.
Note: A hashtag is an interactive piece of text that is created by prefixing a predefined symbol to it, e.g., #lunchtime. When a user clicks on a hashtag, it should behave as though they performed a search for that hashtag, displaying all posts containing that hashtag.
o BONUS: allow users to add images using drag-and-drop.
● The post's information must be displayed both in the activity feed and on a dedicated post page. The post page is functionally similar to a profile page, but displays the post, its description, hashtags, comments, and the album(s) to which it belongs, if any (the album information is not displayed in the activity feed).
● The creator of a post must be able to edit the post's description and hashtags, but not its image.
● Other users must be able to comment on a post. At least some of the comments should be displayed with the post in the activity feed.
o These should be displayed in a logical way, for example, if there are 50 comments on a post, only a few of them should be displayed on the newsfeed and the rest should be accessible by going to the post’s page.
● Other users should be able to report a post (users cannot report their own posts). A user who reports a post should be able to select a reason for doing so from a list of predefined reasons (only admins are able to create new reasons for reporting posts). You must come up with a sensible interface for implementing this.
● The creator of a post must also be able to delete their posts. This should automatically delete all comments that were posted for the post being deleted.
o BONUS: when the deleted post is the only post in an album, the album should automatically be deleted as well.

Albums
The following requirements apply to creating and managing albums:
● Any user can create albums, which are collections of posts. There must be a sensible and intuitive way for users to create albums and add posts to them.
o An album can have a name and description, both of which can be changed by the user who created the album.
o An album can also have hashtags, which should function similarly to those of posts.
o Users should be able to change the album’s name, description, and hashtags.
o Users should be able to add or remove posts from their own album.
o BONUS: When adding hashtags to an album, use the list of hashtags contained by the posts inside an album and provide them as recommended hashtags to add. Hashtags that appear
more frequently should appear first in the recommendation list and the list of recommended hashtags should not contain duplicates of hashtags. You must come up with an aesthetically pleasing and intuitive way to provide this functionality.
● Users can delete their own albums. This does not delete the posts inside the album.
Reported posts
● If a post has been reported more than twice, it must be hidden from the activity feed and replaced with an appropriate message informing users that the post has been reported. Users must be able to choose to view the post if they wish. You must come up with a sensible way to implement this.
● In addition to the normal functionality, only administrators may view all reported posts. Reported posts should be displayed in a logical manner together with the reason(s) they were reported.
● An administrator can then decide whether to delete the post or remove the report(s) associated with it.
o When a post is deleted by an administrator, the same behaviour should apply as when a user deletes their own post.
o BONUS: alert a user whose post has been deleted via an appropriate notification. You must come up with an aesthetically pleasing way to integrate this into the website.
● BONUS: come up with a way to detect users who are abusing the “report post” functionality. To obtain these marks, you will have to come up with a sensible system for assessing the situation and a user-friendly way for admins to deal with such users.
