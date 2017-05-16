const template = require('../includes/repo.pug');

export function RepositoryGenerator() {
	const self = {};
	let repos = [];

	// Make a GET request to GitHub and parse the returned JSON object
	self.getRepos = () => {
		return new Promise((resolve,reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", "https://api.github.com/users/sandramedina/repos", false);
			xhr.onload = function () {
				if (this.status >= 200 && this.status < 300) {
        			resolve(xhr.response); 
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				}
			};
			xhr.onerror = function () {
				reject({
				status: this.status,
				statusText: xhr.statusText
				});
		    };
			xhr.send();

			repos = JSON.parse(xhr.responseText);

			self.convertToHTML();
		});
	}

	// Create a string of html for each repo, concatenate, then set it to the inner html of the container
	self.convertToHTML = () => {
		let html = "";

		for(let i=0, len = repos.length; i < len; i++) {
			let repo = repos[i];

			let locals = {
				"name": repo.name,
				"description": repo.description,
				"url": repo.html_url
			}

			let htmlSnippet = template(locals);

			html = html + htmlSnippet
		}

		document.getElementById("repos").innerHTML = html;
	}

	// Get the value by which to filter the repos from the dropdown
	self.filterRepos = () => {
		let selectDropdown = document.getElementById('selectFilter');
		let selectedFilter = selectDropdown.options[selectDropdown.selectedIndex].value;

		let sortedRepos = repos.sort(self.sortRepos(selectedFilter));
		self.convertToHTML();
	}

	// Sort the repos based on what filter is chosen in the dropdown
	self.sortRepos = property => {
		if (property == "pushed_at") {
			return function (a,b) {
				let result = new Date(b.pushed_at) - new Date(a.pushed_at);
				return result;
			}
		}
		else {
			return function (a,b) {
				let aProperty = a[property].toLowerCase(),
					bProperty = b[property].toLowerCase();
	        	let result = (aProperty < bProperty) ? -1 : (aProperty > bProperty) ? 1 : 0;
	        	return result;
	    	}
		}
	}

	return self;
}