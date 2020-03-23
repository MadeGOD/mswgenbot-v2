const http = require('http');
module.exports = {
    create: function (client, option) {
        const server = http.createServer(function (req, res) {
            try {
                if (req.method == 'GET') {
                    if (url.parse(req.url, true).pathname == '/') {
                        res.writeHead(200);
                        res.end(this.makeHTML(client));
                    } else {
                        res.writeHead(404);
                        res.end(`
                    <h1>����...</h1>
                    <h2>���� ����</h2>
                    <p>404: �������� ã�� �� �����ϴ�.</p>
                    <a href='/'>�������� ���ư���</a>
                `);
                    }
                } else {
                    res.writeHead(405);
                    res.end(`
                    <h1>����...</h1>
                    <h2>���� ����</h2>
                    <p>405: ������ ���� �޼����Դϴ�. (���� �޼���:GET)</p>
                    <a href='/'>�������� ���ư���</a>
                `);
                }

            } catch (err) {
                res.writeHead(500);
                res.end(`
                    <h1>����...</h1>
                    <h2>���� ����</h2>
                    <p>500: ���� �ڵ忡 ������ �ֽ��ϴ�.(���� ����: ${err})</p>
                    <a href='/'>�������� ���ư���</a>
                `);
            }
        });
        server.listen(option.port);
    },
    makeHTML: function (client) {
        return `< !DOCTYPE html >
<html>
<head>
<meta charset='utf-8'>
<meta name='keywords' content='${client.user.username}'>
<meta name='description' content='�� �׽�Ʈ ������'>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="index, follow">
<style>
body {
font - family:'���� ���', 'Malgun Gothic', sans-serif;
text-color:black;
}
</style>
<title>
${client.user.username}
</title>
<link rel='icon' href=${client.user.displayAvatarURL({
dynamic: true
})}>
</head>
<body>
<h1>${client.user.username}</h1>
<h2>���� ��</h2>
<p>
API ���� �ð�: ${client.ws.ping}
</p>
<h2>�ʴ� ��ũ</h2>
<p>
<a href='https://discordapp.com/api/oauth2/authorize?client_id=688672545184022579&permissions=8&scope=bot'>������ ����</a>
<a href='https://discordapp.com/api/oauth2/authorize?client_id=688672545184022579&permissions=37214528&scope=bot'>�⺻ ����</a>
</p>
<img src=${client.user.displayAvatarURL({
dynamic: true
})}>
<p>
<iframe src="https://discordapp.com/widget?id=688681923698229294&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
</p>
</body>
</html>
`;
    }
}