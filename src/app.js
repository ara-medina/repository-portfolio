import './app.scss';
import {RepositoryGenerator} from './modules/repo';

const repoPortfolio = () => {
	const repoGen = RepositoryGenerator();
	repoGen.getRepos();

	document.getElementById("selectFilter").onchange = function() {
		repoGen.filterRepos();
	}
}

window.onload = () => {
    window.app = repoPortfolio();
};
