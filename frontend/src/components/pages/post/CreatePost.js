import React from 'react';

export default function CreatePost(props){
    return (
        <>
            <h1>Create Post Page</h1>
            <form action="/api/post" method="POST" encType="multipart/form-data">
                <div>
                    <label htmlFor="InputOrder">Order</label>
                    <input type="text" id="InputOrder" name="order"/>
                </div>

                <div>
                    <label htmlFor="InputTitle">Title</label>
                    <input type="text" id="InputTitle" name="title"/>
                </div>

                <div>
                    <label htmlFor="InputBody">Body</label>
                    <input type="text" id="InputBody" name="body"/>
                </div>

                {/* <!-- FILE -->*/}
                <div>
                    <label htmlFor="InputPhoto">Photo</label>
                    <input type="file" accept="image/*" id="InputPhoto" name="photo"/>
                </div>

                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}