'use strict';

app.factory('Post', function ($firebase, FIREBASE_URL){
    //console.log(Firebase);
    var ref = new Firebase(FIREBASE_URL);
    var posts = $firebase(ref.child('posts')).$asArray();

    var Post = {
        all : posts,
        create : function (post) {
            return posts.$add(post);
        },
        get : function(postId) {
            return $firebase(ref.child('posts').child(postId)).$asObject();
        },
        delete : function (post) {
            console.log("Deleting post");
            console.log(post);
            return posts.$remove(post);
        }
    };

    return Post;
});
