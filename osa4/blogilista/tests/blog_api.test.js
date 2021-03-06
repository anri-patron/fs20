const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.testBlogs)
})

describe('all blogs are returned as json', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.testBlogs.length)
    })
})

describe('blogs have id field in right format', () => {
    test('blogs have id field instead of _id field', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
        expect(response.body[0]._id).not.toBeDefined()
    })
})

describe('adding works', () => {
    test('a blog can be added', async () => {
        const newBlog = {
            title: "Test",
            author: "Tester",
            url: "https://testurl.com/",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDb()
        expect(blogsAfterPost).toHaveLength(helper.testBlogs.length + 1)

        // varmistetaan että 'Test' niminen blogi löytyy kannasta
        const titles = blogsAfterPost.map(blog => blog.title)
        expect(titles).toContain('Test')
    })
})

describe('blog is not added with missing information', () => {
    test('blog added without a like field is added with likes set to 0', async () => {
        const newBlog = {
            title: "blog with no likes",
            author: "Tester",
            url: "https://testurl.com/"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDb()
        expect(blogsAfterPost).toHaveLength(helper.testBlogs.length + 1)

        // varmistetaan että likes on 0
        expect(blogsAfterPost[helper.testBlogs.length].likes).toBe(0)
    })

    test('blog POST without a title is not added', async () => {
        const newBlog = {
            author: "Tester",
            url: "https://testurl.com/"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDb()
        expect(blogsAfterPost).toHaveLength(helper.testBlogs.length)
    })

    test('blog POST without a url is not added', async () => {
        const newBlog = {
            title: "blog without url",
            author: "Tester"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDb()
        expect(blogsAfterPost).toHaveLength(helper.testBlogs.length)
    })
})

describe('deleting works', () => {
    test('successful delete returns 204', async () => {
        const blogsInBeginning = await helper.blogsInDb()
        const toBeDeleted = blogsInBeginning[0]

        await api
            .delete(`/api/blogs/${toBeDeleted.id}`)
            .expect(204)

        const blogsAfterDelete = await helper.blogsInDb()

        expect(blogsAfterDelete).toHaveLength(helper.testBlogs.length - 1)
    })
})

describe('updating works', () => {
    test('PUT returns JSON and the blog is changed', async () => {
        const blogsInBeginning = await helper.blogsInDb()
        const blogToUpdate = blogsInBeginning[0]

        const updatedBlog = {
            title: "Updated",
            author: "Updater",
            url: "https://testurl.com/",
            likes: 1
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect('Content-Type', /application\/json/)

        const blogsAfterUpdate = await helper.blogsInDb()
        expect(blogsAfterUpdate[0].title).toBe('Updated')
    })
})


afterAll(() => {
    mongoose.connection.close()
})