export default {
    name: 'pin',
    title: 'Pin',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'about',
            title: 'About',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true //helps to automatically crop the not so required parts of image
            }
        },
        {
            name: 'destination',
            title: 'Destination',
            type: 'url',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'url',
        },
        {
            name: 'userId',
            title: 'UserID',
            type: 'string',
        },
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy', //this makes sanity understand that it is going to be a ref to another doc
        },
        {
            name: 'save',
            title: 'Save',
            type: 'array',
            of: [{type: 'save'}]
        },
        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of:[{type: 'comment'}]
        },
    ]
}