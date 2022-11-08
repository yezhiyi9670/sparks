import express from 'express'
const app = express()

const host = '127.0.0.1'
const port = 8543

app.get('/', (req: express.Request, res: express.Response) => {
	res.writeHead(200, 'OK', {'content-type': 'text/plain'})
	res.end('Hello, world!')
})

app.get('/', (req: express.Request, res: express.Response) => {
	res.writeHead(200, 'OK', {'content-type': 'text/plain'})
	res.end('Hello, 2world!')
})

app.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`)
})
