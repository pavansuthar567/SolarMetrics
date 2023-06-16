module.exports = {
    BindUrl: function () {
		var selfInst = this;
		

		app.get('/version', function (req, res) {
			res.send('Version 1.0');
		});
		
		//this only work for react
		app.get('/assets/*', (req, res) => {
			var url = req.url;
			if(url.startsWith("/assets/") == true) {
				url = url.replace('/assets/', '');
				res.sendFile(path.resolve(__dirname, '../views/assets/', url));
			} else {
				res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
			}
		});

		//load react index page
		app.get('*', (req, res) => {
		  	res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
		});
		
	}
}